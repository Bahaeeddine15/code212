<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Event;
use App\Models\Competition;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medias = Media::orderBy('created_at', 'desc')->paginate(12);

        // Transformer les données pour inclure l'URL complète
        $medias->getCollection()->transform(function ($media) {
            $media->full_url = $media->file_path ? Storage::url($media->file_path) : null;
            
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
        $query = Media::orderBy('created_at', 'desc');

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
                ];
            })
            ->toArray();
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        $media->full_url = $media->file_path ? Storage::url($media->file_path) : null;

        return Inertia::render('etudiant/MediaShow', [
            'media' => $media
        ]);
    }

    /**
     * Show create media form.
     */
    public function create()
    {
        // Récupérer quelques events/competitions basiques (id,title,slug)
        $events = Event::select('id','title')->orderBy('created_at','desc')->limit(20)->get()->map(function($e){
            // fabriquer un pseudo slug
            $slug = \Illuminate\Support\Str::slug($e->title);
            return ['id'=>$e->id,'title'=>$e->title,'slug'=>$slug];
        });
        $competitions = Competition::select('id','title','slug')->orderBy('created_at','desc')->limit(20)->get();

        return Inertia::render('etudiant/MediaCreate', [
            'events' => $events,
            'competitions' => $competitions,
        ]);
    }

    /**
     * Store a newly created media (image or video).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'folder' => 'required|string|max:120',
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,svg,webp,mp4,mov,avi,wmv,flv,webm|max:20480', // max 20MB
        ]);

        $path = $request->file('file')->store('media/' . $validated['folder'], 'public');

        $media = Media::create([
            'title' => $validated['title'],
            'slug' => \Illuminate\Support\Str::slug($validated['title']) . '-' . uniqid(),
            'detail' => $validated['detail'],
            'file_path' => $path, // stored relative path
            'original_name' => $request->file('file')->getClientOriginalName(),
            'user_id' => $request->user()->id,
            'folder' => $validated['folder'],
        ]);

        return redirect()->route('etudiant.media')->with('success', 'Média ajouté avec succès.');
    }
}
