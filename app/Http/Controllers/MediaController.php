<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
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
     * Display the specified media file.
     */
    public function show(Media $media)
    {
        return Inertia::render('etudiant/MediaShow', [
            'media' => $media
        ]);
    }
}
