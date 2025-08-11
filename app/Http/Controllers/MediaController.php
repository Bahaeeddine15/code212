<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Event;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medias = Media::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        // Transformer les données pour inclure l'URL complète
        $medias->getCollection()->transform(function ($media) {
            $media->full_url = $media->file_path ? Storage::url($media->file_path) : null;
            
            // Déterminer le type basé sur le dossier
            $media->type = $this->getMediaType($media->folder);
            
            return $media;
        });

        return Inertia::render('etudiant/Media', [
            'medias' => $medias,
            'folders' => $this->getAvailableFolders()
        ]);
    }

    /**
     * Filter medias by folder/type
     */
    public function filter(Request $request)
    {
        $query = Media::with('user')->orderBy('created_at', 'desc');

        if ($request->has('folder') && $request->folder !== 'all') {
            $query->where('folder', $request->folder);
        }

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('detail', 'like', '%' . $request->search . '%');
            });
        }

        $medias = $query->paginate(12);

        // Transformer les données
        $medias->getCollection()->transform(function ($media) {
            $media->full_url = $media->file_path ? Storage::url($media->file_path) : null;
            $media->type = $this->getMediaType($media->folder);
            return $media;
        });

        return response()->json([
            'medias' => $medias,
            'folders' => $this->getAvailableFolders()
        ]);
    }

    /**
     * Get available folders from the database
     */
    private function getAvailableFolders()
    {
        return Media::select('folder')
            ->distinct()
            ->whereNotNull('folder')
            ->pluck('folder')
            ->map(function($folder) {
                return [
                    'value' => $folder,
                    'label' => ucfirst(str_replace(['_', '-'], ' ', $folder)),
                    'type' => $this->getMediaType($folder)
                ];
            })
            ->toArray();
    }

    /**
     * Determine media type based on folder name
     */
    private function getMediaType($folder)
    {
        if (str_contains($folder, 'event') || str_contains($folder, 'hackathon')) {
            return 'event';
        } elseif (str_contains($folder, 'competition') || str_contains($folder, 'contest')) {
            return 'competition';
        } elseif (str_contains($folder, 'formation') || str_contains($folder, 'course')) {
            return 'formation';
        } else {
            return 'general';
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('etudiant/MediaCreate', [
            'events' => Event::select('id', 'title', 'slug')->get(),
            'competitions' => Competition::select('id', 'title', 'slug')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,avi|max:10240',
            'folder' => 'required|string'
        ]);

        // Créer le dossier basé sur le type sélectionné
        $folderPath = 'media/' . $request->folder;

        // Stocker le fichier
        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs($folderPath, $filename, 'public');

        // Créer l'enregistrement
        Media::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'detail' => $request->detail,
            'file_path' => $filePath,
            'folder' => $request->folder,
            'original_name' => $file->getClientOriginalName(),
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('etudiant.media')->with('success', 'Media ajouté avec succès!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        $media->load('user');
        $media->full_url = $media->file_path ? Storage::url($media->file_path) : null;
        $media->type = $this->getMediaType($media->folder);

        return Inertia::render('etudiant/MediaShow', [
            'media' => $media
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Media $media)
    {
        return Inertia::render('etudiant/MediaEdit', [
            'media' => $media,
            'events' => Event::select('id', 'title', 'slug')->get(),
            'competitions' => Competition::select('id', 'title', 'slug')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Media $media)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,avi|max:10240',
            'folder' => 'required|string'
        ]);

        $updateData = [
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'detail' => $request->detail,
            'folder' => $request->folder,
        ];

        // Si un nouveau fichier est uploadé
        if ($request->hasFile('file')) {
            // Supprimer l'ancien fichier
            if ($media->file_path) {
                Storage::disk('public')->delete($media->file_path);
            }

            // Stocker le nouveau fichier
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $folderPath = 'media/' . $request->folder;
            $filePath = $file->storeAs($folderPath, $filename, 'public');

            $updateData['file_path'] = $filePath;
            $updateData['original_name'] = $file->getClientOriginalName();
        }

        $media->update($updateData);

        return redirect()->route('etudiant.media')->with('success', 'Media mis à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media)
    {
        // Supprimer le fichier du storage
        if ($media->file_path) {
            Storage::disk('public')->delete($media->file_path);
        }

        $media->delete();

        return redirect()->route('etudiant.media')->with('success', 'Media supprimé avec succès!');
    }
}
