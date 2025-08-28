<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Add this line
use Illuminate\Support\Str;
use Inertia\Inertia;



class MediaControllerAdmin extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function index()
    {
        $media = Media::all()->groupBy('folder');
        return Inertia::render('dashboard_admin/galerie/media_index', [
            'mediaByFolder' => $media,
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/galerie/media_upload');
    }

    public function store(Request $request)
    {
        set_time_limit(0); // ⏳ Allow unlimited execution time for this request

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'folder' => 'required|string|max:255',
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,mp4,avi,mov,wmv|max:512000', // Increased for better quality
        ]);

        $file = $request->file('file');
        $originalPath = Storage::disk('public')->put("media/{$data['folder']}", $file);

        $mediaData = [
            'title' => $data['title'],
            'detail' => $data['detail'],
            'folder' => $data['folder'],
            'original_name' => $file->getClientOriginalName(),
            'file_path' => $originalPath,
            'slug' => Str::slug($data['title']) . '-' . uniqid(),
            'user_id' => auth('admin')->id(),
        ];

        Storage::disk('public')->setVisibility($originalPath, 'public');

        // 🎥 AUTOMATICALLY process video qualities if it's a video
        $isVideo = $this->isVideoFile($file->getClientOriginalName());
        if ($isVideo) {
            $mediaData['video_qualities'] = $this->processVideoQualities($originalPath, $data['folder']);
        }

        Media::create($mediaData);

        return redirect()->route('admin.media.index');
    }

    /**
     * 🎥 Check if uploaded file is a video
     */
    private function isVideoFile($filename)
    {
        $videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv', 'flv'];
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        return in_array($extension, $videoExtensions);
    }

    /**
     * 🎥 AUTOMATICALLY create multiple video qualities from ONE uploaded file
     */
    private function processVideoQualities($originalPath, $folder)
    {
        try {
            $qualities = [];
            $baseName = pathinfo($originalPath, PATHINFO_FILENAME);
            $fullOriginalPath = Storage::disk('public')->path($originalPath);

            // Create qualities directory
            $qualitiesDir = "media/{$folder}/qualities";
            if (!Storage::disk('public')->exists($qualitiesDir)) {
                Storage::disk('public')->makeDirectory($qualitiesDir);
            }

            // 🎬 Updated quality settings with 144p and 240p
            $qualitySettings = [
                '144p' => [
                    'width' => 256,
                    'height' => 144,
                    'bitrate' => '200k'
                ],
                '240p' => [
                    'width' => 426,
                    'height' => 240,
                    'bitrate' => '400k'
                ],
                '360p' => [
                    'width' => 640,
                    'height' => 360,
                    'bitrate' => '800k'
                ],
                '480p' => [
                    'width' => 854,
                    'height' => 480,
                    'bitrate' => '1200k'
                ],
                '720p' => [
                    'width' => 1280,
                    'height' => 720,
                    'bitrate' => '2500k'
                ],
            ];

            // 🚀 Use FFmpeg to create each quality automatically
            foreach ($qualitySettings as $quality => $settings) {
                try {
                    $outputFileName = "{$baseName}_{$quality}.mp4";
                    $outputPath = "{$qualitiesDir}/{$outputFileName}";
                    $fullOutputPath = Storage::disk('public')->path($outputPath);

                    // FFmpeg command to convert video
                    $command = sprintf(
                        'ffmpeg -i "%s" -vf scale=%d:%d -b:v %s -c:v libx264 -c:a aac -preset fast -y "%s" 2>&1',
                        $fullOriginalPath,
                        $settings['width'],
                        $settings['height'],
                        $settings['bitrate'],
                        $fullOutputPath
                    );

                    // Execute FFmpeg command
                    exec($command, $output, $returnCode);

                    if ($returnCode === 0 && file_exists($fullOutputPath)) {
                        $qualities[$quality] = $outputPath;
                        Storage::disk('public')->setVisibility($outputPath, 'public');
                        Log::info("✅ Created {$quality} quality for: {$baseName}");
                    } else {
                        Log::warning("❌ Failed to create {$quality} quality: " . implode("\n", $output));
                    }
                } catch (\Exception $e) {
                    Log::error("❌ Error creating {$quality} quality: " . $e->getMessage());
                }
            }

            return json_encode($qualities);
        } catch (\Exception $e) {
            Log::error("❌ Video processing failed: " . $e->getMessage());
            return null;
        }
    }

    /**
     * 🎥 Stream media file with range request support + quality selection
     */
    public function stream(Request $request, Media $media, $quality = null)
    {
        $filePath = $media->file_path;

        // If specific quality is requested, use that file
        if ($quality && $media->video_qualities) {
            $qualities = json_decode($media->video_qualities, true);
            if (isset($qualities[$quality])) {
                $filePath = $qualities[$quality];
            }
        }

        if (!Storage::disk('public')->exists($filePath)) {
            abort(404, 'File not found');
        }

        $fullPath = Storage::disk('public')->path($filePath);
        $fileSize = filesize($fullPath);
        $mimeType = mime_content_type($fullPath) ?: 'application/octet-stream';

        // Headers for proper video streaming
        $headers = [
            'Content-Type' => $mimeType,
            'Accept-Ranges' => 'bytes',
            'Cache-Control' => 'public, max-age=3600',
        ];

        // 🎯 Handle range requests for video seeking
        if ($request->hasHeader('Range')) {
            $range = $request->header('Range');

            if (preg_match('/bytes=(\d+)-(\d*)/', $range, $matches)) {
                $start = intval($matches[1]);
                $end = !empty($matches[2]) ? intval($matches[2]) : $fileSize - 1;
                $end = min($end, $fileSize - 1);
                $length = $end - $start + 1;

                if ($start >= $fileSize || $end >= $fileSize || $start > $end) {
                    return response('', 416, ['Content-Range' => "bytes */$fileSize"]);
                }

                $headers['Content-Range'] = "bytes $start-$end/$fileSize";
                $headers['Content-Length'] = $length;

                $stream = fopen($fullPath, 'rb');
                fseek($stream, $start);

                return response()->stream(function () use ($stream, $length) {
                    $chunkSize = 8192;
                    $remaining = $length;

                    while ($remaining > 0 && !feof($stream)) {
                        $chunk = fread($stream, min($chunkSize, $remaining));
                        if ($chunk === false) break;
                        echo $chunk;
                        $remaining -= strlen($chunk);
                        flush();
                    }
                    fclose($stream);
                }, 206, $headers);
            }
        }

        // Return full file
        $headers['Content-Length'] = $fileSize;
        return response()->stream(function () use ($fullPath) {
            readfile($fullPath);
        }, 200, $headers);
    }

    public function show(Media $media)
    {
        // Get available qualities if it's a video
        $qualities = [];
        if ($media->video_qualities) {
            $qualityPaths = json_decode($media->video_qualities, true);
            foreach ($qualityPaths as $quality => $path) {
                if (Storage::disk('public')->exists($path)) {
                    $qualities[$quality] = route('admin.media.stream.quality', ['media' => $media->id, 'quality' => $quality]);
                }
            }
        }

        return Inertia::render('dashboard_admin/galerie/media_show', [
            'media' => $media,
            'qualities' => $qualities, // Add this
            'streamUrl' => route('admin.media.stream', $media->id), // Add this
        ]);
    }

    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4,avi,mov,wmv|max:512000',
            'folder' => 'required|string|max:255',
        ]);

        // Generate new slug if title changed
        if ($data['title'] !== $media->title) {
            $baseSlug = Str::slug($data['title']);
            $slug = $baseSlug;
            $counter = 1;
            while (Media::where('slug', $slug)->where('id', '!=', $media->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            $data['slug'] = $slug;
        }

        // Handle file replacement
        if ($request->hasFile('file')) {
            // Delete old files including qualities
            $this->deleteMediaFiles($media);

            // Store new file
            $file = $request->file('file');
            $data['original_name'] = $file->getClientOriginalName();
            $data['file_path'] = Storage::disk('public')->put("media/{$data['folder']}", $file);
            Storage::disk('public')->setVisibility($data['file_path'], 'public');

            // 🎥 Auto-process video qualities for new file
            if ($this->isVideoFile($file->getClientOriginalName())) {
                $data['video_qualities'] = $this->processVideoQualities($data['file_path'], $data['folder']);
            }
        } elseif ($data['folder'] !== $media->folder && $media->file_path && Storage::disk('public')->exists($media->file_path)) {
            // Move files to new folder
            $this->moveMediaFiles($media, $data['folder']);
            $data['file_path'] = "media/{$data['folder']}/" . basename($media->file_path);
        }

        $media->update($data);
        return redirect()->route('admin.media.index');
    }

    /**
     * Delete all media files including qualities
     */
    private function deleteMediaFiles(Media $media)
    {
        // Delete main file
        if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
            Storage::disk('public')->delete($media->file_path);
        }

        // Delete quality files
        if ($media->video_qualities) {
            $qualities = json_decode($media->video_qualities, true);
            foreach ($qualities as $path) {
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        }
    }

    /**
     * Move media files to new folder
     */
    private function moveMediaFiles(Media $media, $newFolder)
    {
        // Move main file
        if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
            $filename = basename($media->file_path);
            $newPath = "media/{$newFolder}/{$filename}";
            Storage::disk('public')->move($media->file_path, $newPath);
        }

        // Move quality files
        if ($media->video_qualities) {
            $qualities = json_decode($media->video_qualities, true);
            $newQualities = [];
            foreach ($qualities as $quality => $path) {
                $filename = basename($path);
                $newPath = "media/{$newFolder}/qualities/{$filename}";
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->move($path, $newPath);
                }
                $newQualities[$quality] = $newPath;
            }
            $media->update(['video_qualities' => json_encode($newQualities)]);
        }
    }

    public function destroy(Media $media)
    {
        $this->deleteMediaFiles($media);
        $media->delete();
        return redirect()->route('admin.media.index');
    }

    public function edit(Media $media)
    {
        return Inertia::render('dashboard_admin/galerie/media_edit', [
            'media' => $media
        ]);
    }

    public function download(Media $media)
    {
        if (!Storage::disk('public')->exists($media->file_path)) {
            abort(404, 'File not found');
        }
        $filePath = Storage::disk('public')->path($media->file_path);
        return Response::download($filePath, $media->original_name);
    }

    public function showFolder($folder)
    {
        $mediaFiles = Media::where('folder', $folder)->get();
        return Inertia::render('dashboard_admin/galerie/folder_show', [
            'folder' => $folder,
            'files' => $mediaFiles,
        ]);
    }

    public function destroyFolder($folder)
    {
        $mediaFiles = Media::where('folder', $folder)->get();
        foreach ($mediaFiles as $media) {
            $this->deleteMediaFiles($media);
            $media->delete();
        }
        $folderPath = "media/{$folder}";
        if (Storage::disk('public')->exists($folderPath)) {
            Storage::disk('public')->deleteDirectory($folderPath);
        }
        return redirect()->route('admin.media.index');
    }
}
