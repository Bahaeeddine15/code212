<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormationController extends Controller
{
    /**
     * Display a listing of the formations.
     */
    public function index()
    {
        $formations = Formation::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('formations/Index', [
            'formations' => $formations
        ]);
    }

    /**
     * Show the form for creating a new formation.
     */
    public function create()
    {
        return Inertia::render('formations/Create');
    }

    /**
     * Store a newly created formation in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'niveau' => 'required|string',
            'category' => 'required|string|max:255',
            'photo' => 'nullable|string',
        ]);

        Formation::create($validated);

        return redirect()->route('formations.index')
            ->with('success', 'Formation créée avec succès.');
    }

    /**
     * Display the specified formation.
     */
    public function show($id)
    {
        $formation = Formation::findOrFail($id);
        
        return Inertia::render('formations/Show', [
            'formation' => $formation
        ]);
    }

    /**
     * Show the form for editing the specified formation.
     */
    public function edit(Formation $formation) // Majuscule ici
    {
        return Inertia::render('formations/Edit', [
            'formation' => $formation
        ]);
    }

    /**
     * Update the specified formation in storage.
     */
    public function update(Request $request, Formation $formation) // Majuscule ici
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'niveau' => 'required|string',
            'category' => 'required|string|max:255',
            'photo' => 'nullable|string',
        ]);

        $formation->update($validated);

        return redirect()->route('formations.index')
            ->with('success', 'Formation mise à jour avec succès.');
    }

    /**
     * Remove the specified formation from storage.
     */
    public function destroy(Formation $formation) // Majuscule ici
    {
        $formation->delete();

        return redirect()->route('formations.index')
            ->with('success', 'Formation supprimée avec succès.');
    }

    /**
     * Display formations dashboard
     */
    public function dashboard()
    {
        $formations = Formation::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('formations/Dashboard', [
            'formations' => $formations
        ]);
    }
}
