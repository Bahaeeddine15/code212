<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Module;
use App\Models\ModuleFile; // 👈 new
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ModuleControllerAdmin extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the modules for a formation.
     */
    public function index(Formation $formation)
    {
        $modules = $formation->modules()
            ->orderBy('order')

            ->with(['files' => fn($q) => $q->orderBy('position')])

            ->with(['files']) // <-- eager load files

            ->get();

        return Inertia::render('dashboard_admin/formations/modules_list', [
            'formation' => $formation,
            'modules'   => $modules,
        ]);
    }

    /**
     * Show the form for creating a new module.
     */
    public function create(Formation $formation)
    {
        return Inertia::render('dashboard_admin/formations/module_create', [
            'formationId' => $formation->id,
            'formations'  => Formation::all(),
        ]);
    }

    /**
     * Store a newly created module in storage.
     */
    public function store(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'duration'    => 'required|string|max:100',
            'order'       => 'required|integer',
            // NEW: multiple files support (keep old "file" for compatibility)
            'files'       => 'nullable|array',
            'files.*'     => 'file|mimes:pdf,mp4,avi,mov|max:102400', // 100MB
            'file'        => 'nullable|file|mimes:pdf,mp4,avi,mov|max:102400', // legacy single file
        ]);

        $module = Module::create([
            'formation_id' => $formation->id,
            'title'        => $validated['title'],
            'description'  => $validated['description'],
            'duration'     => $validated['duration'],
            'order'        => $validated['order'],
        ]);

        // Handle new multiple files first
        if (!empty($validated['files'])) {
            $this->storeModuleFiles($formation, $module, $validated['files']);
        }

        // Backward compatibility: if "file" (single) is still posted
        if ($request->hasFile('file')) {
            $this->storeModuleFiles($formation, $module, [$request->file('file')]);

            // optional: keep legacy modules.file_path updated with first file
            $first = $module->files()->first();
            if ($first) {
                $module->update(['file_path' => $first->path]);
            }
        }

        return redirect()
            ->route('admin.formations.modules.index', ['formation' => $formation->id])
            ->with('success', 'Module créé avec succès.');
    }

    /**
     * Show the form for editing the specified module.
     */
    public function edit(Module $module)
    {
        $formation = $module->formation;

        // Load existing files to manage them in the UI
        $module->load('files');

        return Inertia::render('dashboard_admin/formations/module_edit', [
            'formation'   => $formation,
            'module'      => $module,
            'formationId' => $formation->id,
        ]);
    }

    /**
     * Update the specified module in storage.
     */
    public function update(Request $request, Module $module)
    {
        $formation = $module->formation;

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'duration'    => 'nullable|string|max:100',
            'order'       => 'nullable|integer',
            // NEW
            'files'       => 'nullable|array',
            'files.*'     => 'file|mimes:pdf,mp4,avi,mov|max:102400',
            'delete_file_ids' => 'nullable|array',
            'delete_file_ids.*' => 'integer|exists:module_files,id',
            // legacy
            'file'        => 'nullable|file|mimes:pdf,mp4,avi,mov|max:102400',
        ]);

        $module->update([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'duration'    => $validated['duration'] ?? $module->duration,
            'order'       => $validated['order'] ?? $module->order,
        ]);

        // Delete selected files
        if (!empty($validated['delete_file_ids'])) {
            $filesToDelete = ModuleFile::whereIn('id', $validated['delete_file_ids'])->get();
            foreach ($filesToDelete as $file) {
                if (Storage::disk($file->disk)->exists($file->path)) {
                    Storage::disk($file->disk)->delete($file->path);
                }
                $file->delete();
            }
        }

        // Add new multiple files
        if (!empty($validated['files'])) {
            $this->storeModuleFiles($formation, $module, $validated['files']);
        }

        // Legacy single file
        if ($request->hasFile('file')) {
            // If you want to replace all existing files with this one, uncomment next block:
            // foreach ($module->files as $f) {
            //     if (Storage::disk($f->disk)->exists($f->path)) {
            //         Storage::disk($f->disk)->delete($f->path);
            //     }
            //     $f->delete();
            // }

            $this->storeModuleFiles($formation, $module, [$request->file('file')]);

            $first = $module->files()->first();
            if ($first) {
                $module->update(['file_path' => $first->path]);
            }
        }

        return redirect()
            ->route('admin.formations.modules.index', ['formation' => $formation->id])
            ->with('success', 'Module mis à jour avec succès.');
    }

    /**
     * Remove the specified module from storage.
     */
    public function destroy(Module $module)
    {
        $formationId = $module->formation_id;

        // Delete all attached files from storage
        foreach ($module->files as $file) {
            if (Storage::disk($file->disk)->exists($file->path)) {
                Storage::disk($file->disk)->delete($file->path);
            }
            $file->delete();
        }

        // Delete legacy single file if exists
        if ($module->file_path && Storage::disk('public')->exists($module->file_path)) {
            Storage::disk('public')->delete($module->file_path);
        }

        $module->delete();

        return redirect()
            ->route('admin.formations.modules.index', ['formation' => $formationId])
            ->with('success', 'Module supprimé avec succès.');
    }
    // Stream or redirect to the file, with access control
    public function openFile(ModuleFile $file)
    {
        abort_unless(auth('admin')->check(), 403);

        $disk   = Storage::disk($file->disk);
        $driver = config("filesystems.disks.{$file->disk}.driver");
        $mime   = $file->mime_type ?: 'application/octet-stream';

        // Public disk: just redirect to the public URL
        if ($file->disk === 'public') {
            return redirect($disk->url($file->path));
        }

        // Local/private: stream inline
        $headers = [
            'Content-Type'        => $mime,
            'Content-Disposition' => 'inline; filename="'.addslashes($file->original_name).'"',
        ];

        if ($driver === 'local') {
            return response()->file($disk->path($file->path), $headers);
        }

        // S3-like: try temporary URL
        if (method_exists($disk, 'temporaryUrl')) {
            try {
                $url = $disk->temporaryUrl($file->path, now()->addMinutes(5), [
                    'ResponseContentType'        => $mime,
                    'ResponseContentDisposition' => 'inline; filename="'.$file->original_name.'"',
                ]);
                return redirect($url);
            } catch (\Throwable $e) {
                // fall through to streaming
            }
        }

        // Fallback: stream
        $stream = $disk->readStream($file->path);
        abort_if($stream === false, 404);

        return response()->stream(function () use ($stream) {
            fpassthru($stream);
            is_resource($stream) && fclose($stream);
        }, 200, $headers);
    }
    public function downloadFile(ModuleFile $file)
    {
        abort_unless(auth('admin')->check(), 403);

        $disk     = Storage::disk($file->disk);
        $driver   = config("filesystems.disks.{$file->disk}.driver");
        $filename = $file->original_name ?? basename($file->path);
        $mime     = $file->mime_type ?: 'application/octet-stream';
        $headers  = ['Content-Type' => $mime];

        if (method_exists($disk, 'download')) {
            return $disk->download($file->path, $filename, $headers);
        }

        if ($driver === 'local') {
            return response()->download($disk->path($file->path), $filename, $headers);
        }

        if (method_exists($disk, 'temporaryUrl')) {
            try {
                $url = $disk->temporaryUrl($file->path, now()->addMinutes(5), [
                    'ResponseContentType'        => $mime,
                    'ResponseContentDisposition' => 'attachment; filename="'.$filename.'"',
                ]);
                return redirect($url);
            } catch (\Throwable $e) {
                // fall through
            }
        }

        $stream = $disk->readStream($file->path);
        abort_if($stream === false, 404);

        return response()->streamDownload(function () use ($stream) {
            fpassthru($stream);
            is_resource($stream) && fclose($stream);
        }, $filename, $headers);
    }

    /**
     * Store uploaded files for a module and create ModuleFile rows.
     * Uses 'private' disk by default (safer). Switch to 'public' if you want open URLs.
     */
    private function storeModuleFiles(Formation $formation, Module $module, array $uploadedFiles): void
    {
        $disk = 'private'; // 🔒 recommend private; add a student controller to stream with ACL
        // $disk = 'public'; // 🌐 if you intentionally want public direct URLs

        foreach ($uploadedFiles as $idx => $file) {
            $ext  = strtolower($file->getClientOriginalExtension());
            $type = in_array($ext, ['mp4', 'mov', 'avi']) ? 'video' : ($ext === 'pdf' ? 'pdf' : 'other');

            $dir  = "formations/{$formation->id}/modules/{$module->id}";
            $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))
                . '-' . Str::random(6) . '.' . $ext;

            $path = $file->storeAs($dir, $name, $disk);

            $qualities = null;

            // If video, generate qualities
            if ($type === 'video') {
                $qualities = $this->generateVideoQualities($file, $dir, $disk);
            }

            $module->files()->create([
                'type'          => $type,
                'disk'          => $disk,
                'path'          => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type'     => $file->getClientMimeType(),
                'size'          => $file->getSize(),
                'position'      => ($module->files()->max('position') ?? 0) + ($idx + 1),
                'qualities'     => $qualities ? json_encode($qualities) : null,
            ]);
        }
    }
 
    


    /**
     * Generate multiple video qualities using FFmpeg.
     * Returns an array of quality => path.
     */
    private function generateVideoQualities($file, $dir, $disk)
    {
        $qualities = [
            '144p' => ['width' => 256,  'height' => 144,  'bitrate' => '200k'],
            '240p' => ['width' => 426,  'height' => 240,  'bitrate' => '400k'],
            '360p' => ['width' => 640,  'height' => 360,  'bitrate' => '800k'],
            '480p' => ['width' => 854,  'height' => 480,  'bitrate' => '1200k'],
            '720p' => ['width' => 1280, 'height' => 720,  'bitrate' => '2500k'],
        ];

        $result = [];
        $originalPath = Storage::disk($disk)->path($file->store($dir, $disk));
        $filenameBase = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        foreach ($qualities as $label => $settings) {
            $outputName = Str::slug($filenameBase) . "-{$label}-" . Str::random(4) . ".mp4";
            $outputPath = Storage::disk($disk)->path("$dir/$outputName");

            $cmd = sprintf(
                'ffmpeg -i "%s" -vf scale=%d:%d -b:v %s -c:v libx264 -c:a aac -preset fast -y "%s"',
                $originalPath,
                $settings['width'],
                $settings['height'],
                $settings['bitrate'],
                $outputPath
            );
            exec($cmd);

            // Save relative path for later streaming
            $result[$label] = "$dir/$outputName";
        }

        return $result;
    }

}
