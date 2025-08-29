<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Module;
use App\Models\ModuleFile;
use App\Models\FormationRegistration; // Add this import
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
    public function index(Formation $formation, Request $request)
    {
        $modules = $formation->modules()
            ->orderBy('order')
            ->with(['files' => fn($q) => $q->orderBy('position')])
            ->get();

        // Get registered students with pagination and search
        $search = $request->get('search');
        $totalModules = $modules->count(); // ADD THIS LINE

        $studentsQuery = FormationRegistration::with('etudiant')
            ->where('formation_id', $formation->id)
            ->when($search, function ($q) use ($search) {
                $q->whereHas('etudiant', function ($studentQuery) use ($search) {
                    $studentQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('ecole', 'like', "%{$search}%")
                        ->orWhere('ville', 'like', "%{$search}%");
                });
            })
            ->latest('registered_at');

        $registrations = $studentsQuery->paginate(10)->withQueryString();

        // REPLACE the transform section with this updated version:
        $students = $registrations->through(function ($registration) use ($formation, $totalModules) {
            $etudiant = $registration->etudiant;

            // Count completed modules for this student
            $completedModules = \App\Models\ModuleCompletion::where('etudiant_id', $etudiant->id)
                ->whereHas('module', function ($query) use ($formation) {
                    $query->where('formation_id', $formation->id);
                })
                ->count();

            // Get last activity (most recent completion)
            $lastActivity = \App\Models\ModuleCompletion::where('etudiant_id', $etudiant->id)
                ->whereHas('module', function ($query) use ($formation) {
                    $query->where('formation_id', $formation->id);
                })
                ->latest('completed_at')
                ->first();

            $progressPercentage = $totalModules > 0 ? round(($completedModules / $totalModules) * 100) : 0;

            return [
                'id' => $etudiant->id,
                'name' => $etudiant->name,
                'email' => $etudiant->email,
                'ecole' => $etudiant->ecole,
                'ville' => $etudiant->ville,
                'telephone' => $etudiant->telephone,
                'student_id' => $etudiant->student_id,
                'registered_at' => $registration->registered_at->toISOString(),
                // ADD PROGRESS DATA:
                'completed_modules' => $completedModules,
                'total_modules' => $totalModules,
                'progress_percentage' => $progressPercentage,
                'last_activity' => $lastActivity ? $lastActivity->completed_at->toISOString() : null,
            ];
        });

        return Inertia::render('dashboard_admin/formations/modules_list', [
            'formation' => [
                'id' => $formation->id,
                'title' => $formation->title,
            ],
            'modules' => $modules->map(function ($module) {
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'duration' => $module->duration,
                    'order' => $module->order,
                    'files' => $module->files->map(function ($file) {
                        return [
                            'id' => $file->id,
                            'original_name' => $file->original_name,
                            'type' => $file->type,
                        ];
                    }),
                ];
            }),
            'students' => $students,
            'search' => $search,
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

        // Delete selected files (improved cleanup)
        if (!empty($validated['delete_file_ids'])) {
            $filesToDelete = ModuleFile::whereIn('id', $validated['delete_file_ids'])->get();
            foreach ($filesToDelete as $file) {
                // Delete the main file
                if (Storage::disk($file->disk)->exists($file->path)) {
                    Storage::disk($file->disk)->delete($file->path);
                }

                // Delete video qualities if they exist
                if ($file->qualities) {
                    $qualities = json_decode($file->qualities, true);
                    if (is_array($qualities)) {
                        foreach ($qualities as $quality => $path) {
                            if (Storage::disk($file->disk)->exists($path)) {
                                Storage::disk($file->disk)->delete($path);
                            }
                        }
                    }
                }

                // Delete the database record
                $file->delete();
            }
        }

        // Add new multiple files
        if (!empty($validated['files'])) {
            $this->storeModuleFiles($formation, $module, $validated['files']);
        }

        // Legacy single file
        if ($request->hasFile('file')) {
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

        // Delete all attached files from storage (including video qualities)
        foreach ($module->files as $file) {
            // Delete the main file
            if (Storage::disk($file->disk)->exists($file->path)) {
                Storage::disk($file->disk)->delete($file->path);
            }

            // Delete video qualities if they exist
            if ($file->qualities) {
                $qualities = json_decode($file->qualities, true);
                if (is_array($qualities)) {
                    foreach ($qualities as $quality => $path) {
                        if (Storage::disk($file->disk)->exists($path)) {
                            Storage::disk($file->disk)->delete($path);
                        }
                    }
                }
            }

            // Delete the database record
            $file->delete();
        }

        // Delete legacy single file if exists (backward compatibility)
        if ($module->file_path && Storage::disk('public')->exists($module->file_path)) {
            Storage::disk('public')->delete($module->file_path);
        }

        // Optional: Delete the entire module directory if empty
        $moduleDir = "formations/{$module->formation_id}/modules/{$module->id}";
        if (Storage::disk('private')->exists($moduleDir)) {
            // Get all files in the module directory
            $remainingFiles = Storage::disk('private')->files($moduleDir);
            if (empty($remainingFiles)) {
                // Directory is empty, delete it
                Storage::disk('private')->deleteDirectory($moduleDir);
            }
        }

        // Delete the module from database
        $module->delete();

        return redirect()
            ->route('admin.formations.modules.index', ['formation' => $formationId])
            ->with('success', 'Module et tous ses fichiers supprimés définitivement.');
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
                $qualities = $this->generateVideoQualities($file, $dir, $disk, $path); // Pass the stored path
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
    private function generateVideoQualities($file, $dir, $disk, $originalStoredPath)
    {
        $qualities = [
            '144p' => ['width' => 256,  'height' => 144,  'bitrate' => '200k'],
            '240p' => ['width' => 426,  'height' => 240,  'bitrate' => '400k'],
            '360p' => ['width' => 640,  'height' => 360,  'bitrate' => '800k'],
            '480p' => ['width' => 854,  'height' => 480,  'bitrate' => '1200k'],
            '720p' => ['width' => 1280, 'height' => 720,  'bitrate' => '2500k'],
        ];

        $result = [];

        // Use the already stored original file path instead of storing again
        $originalPath = Storage::disk($disk)->path($originalStoredPath);
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

            // Execute the command and check if it was successful
            $output = [];
            $returnCode = 0;
            exec($cmd . ' 2>&1', $output, $returnCode);

            if ($returnCode === 0 && file_exists($outputPath)) {
                // Save relative path for later streaming
                $result[$label] = "$dir/$outputName";
            } else {
                // Log the error for debugging
                \Log::error("Failed to generate {$label} quality", [
                    'command' => $cmd,
                    'output' => implode("\n", $output),
                    'return_code' => $returnCode
                ]);
            }
        }

        return $result;
    }
    /**
     * Delete a specific file from a module
     */
    public function deleteFile(ModuleFile $file)
    {
        abort_unless(auth('admin')->check(), 403);

        // Delete the main file
        if (Storage::disk($file->disk)->exists($file->path)) {
            Storage::disk($file->disk)->delete($file->path);
            \Log::info("Deleted main file: " . $file->path);
        }

        // Delete video qualities if they exist
        if ($file->qualities) {
            $qualities = json_decode($file->qualities, true);
            if (is_array($qualities)) {
                foreach ($qualities as $quality => $path) {
                    if (Storage::disk($file->disk)->exists($path)) {
                        Storage::disk($file->disk)->delete($path);
                        \Log::info("Deleted quality {$quality}: " . $path);
                    }
                }
            }
        }

        // Delete the database record
        $file->delete();

        return back()->with('success', 'Fichier supprimé définitivement du disque.');
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
            'Content-Disposition' => 'inline; filename="' . addslashes($file->original_name) . '"',
        ];

        if ($driver === 'local') {
            return response()->file($disk->path($file->path), $headers);
        }

        // S3-like: try temporary URL
        if (method_exists($disk, 'temporaryUrl')) {
            try {
                $url = $disk->temporaryUrl($file->path, now()->addMinutes(5), [
                    'ResponseContentType'        => $mime,
                    'ResponseContentDisposition' => 'inline; filename="' . $file->original_name . '"',
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
                    'ResponseContentDisposition' => 'attachment; filename="' . $filename . '"',
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
}
