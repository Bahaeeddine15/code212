<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
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
            'slug' => str($data['title'])->slug() . '-' . uniqid(),
            'user_id' => $request->user()->id,
        ];
        Storage::disk('public')->setVisibility($mediaData['file_path'], 'public');
        \App\Models\Media::create($mediaData);

        return redirect()->route('media.index');
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
        // Check if the file exists
        if (!Storage::disk('public')->exists($media->file_path)) {
            abort(404, 'File not found');
        }

        // Get the full path to the file
        $filePath = Storage::disk('public')->path($media->file_path);

        // Return the file as a download response
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
            $baseSlug = str($data['title'])->slug();
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

            // Store new file
            $file = $request->file('file');
            $data['original_name'] = $file->getClientOriginalName();
            $data['file_path'] = Storage::disk('public')->put('media', $file);
            Storage::disk('public')->setVisibility($data['file_path'], 'public');
        }

        $media->update($data);

        return redirect()->route('media.index');
    }

    public function destroy(Media $media)
    {
        // Delete file from storage
        if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
            Storage::disk('public')->delete($media->file_path);
        }

        $media->delete();

        return redirect()->route('media.index');
    }

    public function showFolder($folder)
    {
        $mediaFiles = \App\Models\Media::where('folder', $folder)->get();
        return \Inertia\Inertia::render('dashboard_admin/galerie/folder_show', [
            'folder' => $folder,
            'files' => $mediaFiles,
        ]);
    }

    public function destroyFolder($folder)
    {
        $mediaFiles = \App\Models\Media::where('folder', $folder)->get();

        foreach ($mediaFiles as $media) {
            // Delete file from storage
            if ($media->file_path && Storage::disk('public')->exists($media->file_path)) {
                Storage::disk('public')->delete($media->file_path);
            }
            $media->delete();
        }

        // Optionally, remove the empty folder from storage
        $folderPath = "media/{$folder}";
        if (Storage::disk('public')->exists($folderPath)) {
            Storage::disk('public')->deleteDirectory($folderPath);
        }

        return redirect()->route('media.index');
    }
}
