<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formations = Formation::with('modules')->latest()->get();
        return Inertia::render('dashboard_admin/formations', [
            'formations' => $formations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard_admin/formations_create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
        ]);

        Formation::create($validated);

        return redirect()->route('formations.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Formation $formation)
    {
        return Inertia::render('dashboard_admin/formation_show', [
            'formation' => $formation->load('modules')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Formation $formation)
    {
        return Inertia::render('dashboard_admin/formations_edit', [
            'formation' => $formation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
        ]);

        $formation->update($validated);

        return redirect()->route('formations.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formation $formation)
    {
        $formation->delete();
        return redirect()->route('formations.index');
    }
}
