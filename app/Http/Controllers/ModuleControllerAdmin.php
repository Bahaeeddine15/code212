<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controller;

class ModuleControllerAdmin extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the modules for a formation.
     */
    public function index(Formation $formation)
    {
        $modules = $formation->modules()->orderBy('order')->get();
        return Inertia::render('dashboard_admin/formations/modules_list', [
            'formation' => $formation,
            'modules' => $modules
        ]);
    }

    /**
     * Show the form for creating a new module.
     */
    public function create(Formation $formation)
    {
        return Inertia::render('dashboard_admin/formations/module_create', [
            'formationId' => $formation->id,
            'formations' => Formation::all(),
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
            'duration' => 'required|string',
            'order' => 'required|integer',
            'file' => 'nullable|file|mimes:pdf,mp4,avi,mov|max:102400', // 100MB max
        ]);

        // ✅ The formation_id comes from the route parameter
        $validated['formation_id'] = $formation->id;

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('modules', 'public');
            Storage::disk('public')->setVisibility($validated['file_path'], 'public');
        }

        Module::create($validated);

        return redirect()->route('admin.formations.modules.index', ['formation' => $formation->id])
            ->with('success', 'Module créé avec succès.');
    }

    /**
     * Show the form for editing the specified module.
     */
    public function edit(Module $module)
    {
        $formation = $module->formation;

        return Inertia::render('dashboard_admin/formations/module_edit', [
            'formation' => $formation,
            'module' => $module,
            'formationId' => $formation->id,
        ]);
    }

    /**
     * Update the specified module in storage.
     */
    public function update(Request $request, Module $module)
    {
        $formation = $module->formation;

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
            $filePath = $request->file('file')->store('modules', 'public');
            Storage::disk('public')->setVisibility($filePath, 'public');
            $validated['file_path'] = $filePath;
        }

        $module->update($validated);

        return redirect()->route('admin.formations.modules.index', ['formation' => $formation->id])
            ->with('success', 'Module mis à jour avec succès.');
    }

    /**
     * Remove the specified module from storage.
     */
    public function destroy(Module $module)
    {
        $formationId = $module->formation_id;

        // Delete file from storage if exists
        if ($module->file_path && Storage::disk('public')->exists($module->file_path)) {
            Storage::disk('public')->delete($module->file_path);
        }

        $module->delete();

        return redirect()->route('admin.formations.modules.index', ['formation' => $formationId])
            ->with('success', 'Module supprimé avec succès.');
    }
}
