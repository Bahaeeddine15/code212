<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class FormationControllerAdmin extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formations = Formation::with('modules')->latest()->get();
        return Inertia::render('dashboard_admin/formations/formations_index', [
            'formations' => $formations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard_admin/formations/formation_create');
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
            'link' => 'nullable|url|max:255',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        }

        // Uncomment the next line if you want to track the admin who created the formation
        // $validated['user_id'] = auth('admin')->id();

        Formation::create($validated);

        return redirect()->route('admin.formations.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Formation $formation)
    {
        return Inertia::render('dashboard_admin/formations/formation_show', [
            'formation' => $formation->load('modules')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Formation $formation)
    {
        return Inertia::render('dashboard_admin/formations/formation_edit', [
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
            'link' => 'nullable|url|max:255',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        }

        // Uncomment the next line if you want to track the admin who updated the formation
        // $validated['updated_by'] = auth('admin')->id();

        $formation->update($validated);

        return redirect()->route('admin.formations.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formation $formation)
    {
        $formation->delete();
        return redirect()->route('admin.formations.index');
    }
}
