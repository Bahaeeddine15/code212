<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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

    public function create(Request $request)
    {
        $formationId = (int) $request->query('formationId');

        return Inertia::render('dashboard_admin/modules_create', [
            'formationId' => $formationId,  // ✅ Send it to frontend
            'formations' => Formation::all(),
        ]);
    }

    /**
     * Store a newly created module in storage.
     */
    public function store(Request $request, $formationId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|string',
            'order' => 'required|integer',
            'file' => 'nullable|file|mimes:mp4,pdf', // or whatever you accept
        ]);

        $validated['formation_id'] = $formationId;

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('modules', 'public');
        }

        Module::create($validated);

        return redirect()->route('formation.modules', ['id' => $formationId]);
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
            'file' => 'nullable|file|mimes:pdf,mp4,avi,mov|max:51200',
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($module->file_path && Storage::disk('public')->exists($module->file_path)) {
                Storage::disk('public')->delete($module->file_path);
            }

            // Store new file
            $filePath = $request->file('file')->store('modules', 'public');
            Storage::disk('public')->setVisibility($filePath, 'public');
            $validated['file_path'] = $filePath;
        }

        $module->update($validated);

        return redirect()->route('formations.index')->with('success', 'Module mis à jour avec succès.');
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
