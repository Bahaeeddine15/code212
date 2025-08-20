<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
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
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'folder' => 'required|string|max:255',
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,mp4,avi,mov,wmv|max:51200',
        ]);

        $file = $request->file('file');
        $mediaData = [
            'title' => $data['title'],
            'detail' => $data['detail'],
            'folder' => $data['folder'],
            'original_name' => $file->getClientOriginalName(),
            'file_path' => Storage::disk('public')->put("media/{$data['folder']}", $file),
            'slug' => Str::slug($data['title']) . '-' . uniqid(),
            'user_id' => auth('admin')->id(), // <-- Changed this line
        ];
        Storage::disk('public')->setVisibility($mediaData['file_path'], 'public');
        Media::create($mediaData);

        return redirect()->route('admin.media.index');
    }

    public function show(Media $media)
    {
        return Inertia::render('dashboard_admin/galerie/media_show', [
            'media' => $media,
        ]);
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

    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4,avi,mov,wmv|max:51200',
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
            // Delete old file
            if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
                Storage::disk('public')->delete($media->file_path);
            }
            // Store new file in the correct folder
            $file = $request->file('file');
            $data['original_name'] = $file->getClientOriginalName();
            $data['file_path'] = Storage::disk('public')->put("media/{$data['folder']}", $file);
            Storage::disk('public')->setVisibility($data['file_path'], 'public');
        } elseif ($data['folder'] !== $media->folder && $media->file_path && Storage::disk('public')->exists($media->file_path)) {
            // Move file to new folder if folder changed and no new file uploaded
            $oldPath = $media->file_path;
            $filename = basename($oldPath);
            $newPath = "media/{$data['folder']}/{$filename}";
            Storage::disk('public')->move($oldPath, $newPath);
            $data['file_path'] = $newPath;
        }

        $media->update($data);

        return redirect()->route('admin.media.index');
    }

    public function destroy(Media $media)
    {
        if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
            Storage::disk('public')->delete($media->file_path);
        }
        $media->delete();
        return redirect()->route('admin.media.index');
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
            if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
                Storage::disk('public')->delete($media->file_path);
            }
            $media->delete();
        }
        $folderPath = "media/{$folder}";
        if (Storage::disk('public')->exists($folderPath)) {
            Storage::disk('public')->deleteDirectory($folderPath);
        }
        return redirect()->route('admin.media.index');
    }
}
