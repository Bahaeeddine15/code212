<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    /**
     * Display a listing of the modules for a formation.
     */
    public function index(Formation $formation)
    {
        $modules = $formation->modules()->orderBy('order')->get();
        return Inertia::render('dashboard_admin/modules', [
            'formation' => $formation,
            'modules' => $modules
        ]);
    }

    /**
     * Show the form for creating a new module.
     */
    public function create(Formation $formation)
    {
        return Inertia::render('dashboard_admin/modules_create', [
            'formation' => $formation
        ]);
    }

    /**
     * Store a newly created module in storage.
     */
    public function store(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
        ]);

        $formation->modules()->create($validated);

        return redirect()->route('formations.index');
    }

    /**
     * Show the form for editing the specified module.
     */
    public function edit(Formation $formation, Module $module)
    {
        return Inertia::render('dashboard_admin/modules_edit', [
            'formation' => $formation,
            'module' => $module
        ]);
    }

    /**
     * Update the specified module in storage.
     */
    public function update(Request $request, Formation $formation, Module $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
        ]);

        $module->update($validated);

        return redirect()->route('formations.index');
    }

    /**
     * Remove the specified module from storage.
     */
    public function destroy(Formation $formation, Module $module)
    {
        $module->delete();
        return redirect()->route('formations.index');
    }
}
