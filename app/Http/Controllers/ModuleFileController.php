<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModuleFile;
use App\Models\FormationRegistration;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ModuleFileController extends Controller
{
    /**
     * Determine if the current user is an admin (from users table).
     */
    private function isAdmin()
    {
        // Check the admin guard
        return auth()->guard('admin')->check();
    }

    private function getCurrentUser()
    {
        // Return the user from either guard
        return auth()->guard('admin')->user() ?? auth()->guard('web')->user();
    }

    /**
     * ACL: Allow admins or registered students.
     */
    private function canAccess($user, $formationId)
    {
        if ($this->isAdmin()) {
            return true;
        }
        // Student: must be registered - FIX: use etudiant_id instead of user_id
        return FormationRegistration::where('etudiant_id', $user->id) // Changed from user_id
            ->where('formation_id', $formationId)
            ->exists();
    }

    public function open(Request $request, ModuleFile $file)
    {
        $user = $this->getCurrentUser();
        $formationId = $file->module->formation_id;

        abort_unless($this->canAccess($user, $formationId), 403);

        $disk = Storage::disk($file->disk);

        // Public disk → simple redirect to URL
        if ($file->disk === 'public') {
            return redirect($disk->url($file->path));
        }

        // Build common headers for inline display
        $headers = [
            'Content-Type'        => $file->mime_type ?: 'application/octet-stream',
            'Content-Disposition' => 'inline; filename="' . addslashes($file->original_name) . '"',
        ];

        // If local driver, serve via absolute path
        $driver = config("filesystems.disks.{$file->disk}.driver");
        if ($driver === 'local') {
            $absolutePath = $disk->path($file->path); // absolute path on disk
            return response()->file($absolutePath, $headers); // inline
        }

        // If the disk supports temporary URLs (e.g. s3), prefer that
        if (method_exists($disk, 'temporaryUrl')) {
            try {
                $tempUrl = $disk->temporaryUrl($file->path, now()->addMinutes(5));
                return redirect($tempUrl);
            } catch (\Throwable $e) {
                // fall through to streaming
            }
        }

        // Fallback: stream the file contents
        $stream = $disk->readStream($file->path);
        abort_if($stream === false, 404);

        return response()->stream(function () use ($stream) {
            fpassthru($stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, $headers);
    }

    public function download(Request $request, ModuleFile $file)
    {
        $user = $this->getCurrentUser();
        $formationId = $file->module->formation_id;

        abort_unless($this->canAccess($user, $formationId), 403);

        $disk     = Storage::disk($file->disk);
        $driver   = config("filesystems.disks.{$file->disk}.driver");
        $filename = $file->original_name ?? basename($file->path);
        $mime     = $file->mime_type ?: 'application/octet-stream';
        $headers  = ['Content-Type' => $mime];

        // If your adapter actually supports ->download(), use it; otherwise fallback
        if (method_exists($disk, 'download')) {
            return $disk->download($file->path, $filename, $headers);
        }

        // Public/local: use absolute path with response()->download()
        if ($driver === 'local') {
            $absolute = $disk->path($file->path);         // storage/app/<disk>/...
            return response()->download($absolute, $filename, $headers);
        }

        // S3-like: try a short-lived signed URL with attachment headers
        if (method_exists($disk, 'temporaryUrl')) {
            try {
                $tempUrl = $disk->temporaryUrl(
                    $file->path,
                    now()->addMinutes(5),
                    [
                        'ResponseContentType'        => $mime,
                        'ResponseContentDisposition' => 'attachment; filename="' . $filename . '"',
                    ]
                );
                return redirect($tempUrl);
            } catch (\Throwable $e) {
                // fall through to streaming
            }
        }

        // Fallback: stream the file to the browser as a download
        $stream = $disk->readStream($file->path);
        abort_if($stream === false, 404);

        return response()->streamDownload(function () use ($stream) {
            fpassthru($stream);
            is_resource($stream) && fclose($stream);
        }, $filename, $headers);
    }

    public function openQuality(Request $request, ModuleFile $file, $quality)
    {
        $user = $this->getCurrentUser();
        $formationId = $file->module->formation_id;

        abort_unless($this->canAccess($user, $formationId), 403);

        $disk = Storage::disk($file->disk);

        if ($quality === 'original') {
            $path = $file->path;
        } else {
            $qualities = $file->qualities ? json_decode($file->qualities, true) : [];
            if (!isset($qualities[$quality])) {
                abort(404, 'Quality not available');
            }
            $path = $qualities[$quality];
        }

        $headers = [
            'Content-Type'        => 'video/mp4',
            'Content-Disposition' => 'inline; filename="' . addslashes($file->original_name) . '"',
        ];

        $driver = config("filesystems.disks.{$file->disk}.driver");
        if ($driver === 'local') {
            $absolutePath = $disk->path($path);
            return response()->file($absolutePath, $headers);
        }

        // Fallback: stream the file contents
        $stream = $disk->readStream($path);
        abort_if($stream === false, 404);

        return response()->stream(function () use ($stream) {
            fpassthru($stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, $headers);
    }

    // ADMIN VIDEO PLAYER
    public function showVideoAdmin(ModuleFile $file)
    {
        abort_unless(auth()->guard('admin')->check(), 403);

        return inertia('dashboard_admin/formations/module_video_admin', [
            'file' => $file,
        ]);
    }

    // NEW: STUDENT VIDEO PLAYER
    public function showVideoStudent(ModuleFile $file)
    {
        $user = $this->getCurrentUser();
        abort_unless($user, 403, 'Non authentifié');

        // Only allow students (not admins) to use this route
        abort_if($this->isAdmin(), 403, 'Cette route est réservée aux étudiants');

        $module = $file->module;
        $formation = $module->formation;

        // Check if student is registered for this formation
        $isRegistered = FormationRegistration::where('etudiant_id', $user->id)
            ->where('formation_id', $formation->id)
            ->exists();

        abort_unless($isRegistered, 403, 'Vous devez être inscrit à cette formation pour accéder au contenu.');

        // Only allow video files
        abort_unless($file->type === 'video', 404, 'Ce fichier n\'est pas une vidéo.');

        // Get qualities if they exist
        $qualities = [];
        if ($file->qualities) {
            $qualitiesData = json_decode($file->qualities, true);
            if (is_array($qualitiesData)) {
                foreach ($qualitiesData as $quality => $path) {
                    if (Storage::disk($file->disk)->exists($path)) {
                        $qualities[$quality] = $this->getFileUrl($path, $file->disk, $file->id);
                    }
                }
            }
        }

        return Inertia::render('etudiant/formation_view_video', [
            'file' => [
                'id' => $file->id,
                'original_name' => $file->original_name,
                'type' => $file->type,
                'mime_type' => $file->mime_type,
                'size' => $file->size,
            ],
            'qualities' => $qualities,
            'originalUrl' => $this->getFileUrl($file->path, $file->disk, $file->id),
            'downloadUrl' => route('student.module_files.download', $file->id),
            'module' => [
                'id' => $module->id,
                'title' => $module->title,
            ],
            'formation' => [
                'id' => $formation->id,
                'title' => $formation->title,
            ],
        ]);
    }

    /**
     * Helper to get file URL based on context (admin vs student)
     */
    private function getFileUrl(string $path, string $disk, int $fileId): string
    {
        $diskInstance = Storage::disk($disk);

        if ($disk === 'public') {
            return $diskInstance->url($path);
        }

        // For private disks, use temporary URL if possible
        if (method_exists($diskInstance, 'temporaryUrl')) {
            try {
                return $diskInstance->temporaryUrl($path, now()->addHour());
            } catch (\Throwable $e) {
                // fallback to route
            }
        }

        // Fallback: determine route based on current context
        if ($this->isAdmin()) {
            return route('admin.modules.files.open', $fileId);
        } else {
            return route('student.module_files.open', $fileId);
        }
    }
}
