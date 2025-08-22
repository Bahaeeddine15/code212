<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:web');
    }

    /**
     * Display a listing of the resource, grouped by folder.
     */
    public function index()
    {
        $mediaByFolder = Media::orderBy('created_at', 'desc')
            ->get()
            ->groupBy('folder')
            ->map(function ($group) {
                return $group->values();
            });

        return Inertia::render('etudiant/Media', [
            'mediaByFolder' => $mediaByFolder,
            'folders' => $this->getAvailableFolders(),
        ]);
    }

    /**
     * Show all media in a specific folder.
     */
    public function showFolder($folder)
    {
        $files = Media::where('folder', $folder)->orderBy('created_at', 'desc')->get();

        return Inertia::render('etudiant/folder_show_etudiant', [
            'folder' => $folder,
            'files' => $files,
        ]);
    }

    /**
     * 🎥 Stream media file with range request support for video seeking
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

    /**
     * Filter medias by folder/type.
     */
    public function filter(Request $request)
    {
        $query = Media::orderBy('created_at', 'desc');

        if ($request->has('folder') && $request->folder !== 'all') {
            $query->where('folder', $request->folder);
        }

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('detail', 'like', '%' . $request->search . '%');
            });
        }

        $mediaByFolder = $query->get()
            ->groupBy('folder')
            ->map(function ($group) {
                return $group->values();
            });

        return response()->json([
            'mediaByFolder' => $mediaByFolder,
            'folders' => $this->getAvailableFolders(),
        ]);
    }

    /**
     * Get available folders from the database.
     */
    private function getAvailableFolders()
    {
        return Media::select('folder')
            ->distinct()
            ->whereNotNull('folder')
            ->pluck('folder')
            ->map(function ($folder) {
                return [
                    'value' => $folder,
                    'label' => ucfirst(str_replace(['_', '-'], ' ', $folder)),
                ];
            })
            ->toArray();
    }

    /**
     * Display the specified media file with streaming support.
     */
    public function show(Media $media)
    {
        // Get available qualities for video player
        $qualities = [];
        if ($media->video_qualities) {
            $qualityPaths = json_decode($media->video_qualities, true);
            foreach ($qualityPaths as $quality => $path) {
                if (Storage::disk('public')->exists($path)) {
                    $qualities[$quality] = route('media.stream.quality', ['media' => $media->id, 'quality' => $quality]);
                }
            }
        }

        return Inertia::render('etudiant/MediaShow', [
            'media' => $media,
            'qualities' => $qualities,
            'streamUrl' => route('media.stream', $media->id),
        ]);
    }
}
