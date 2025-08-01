<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
            'file' => 'nullable|file|mimes:pdf,mp4,avi,mov|max:51200',
        ]);

        // Handle file upload if present
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            
            $data['file_path'] = Storage::disk('public')->put('formations', $file);
            Storage::disk('public')->setVisibility($data['file_path'], 'public');
        }

        Formation::create($data);
        //dd($request->file('file'));

        return redirect()->route('formations.index')->with('success', 'Formation créée avec succès.');
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
            'file_path' => 'nullable|file|mimes:pdf|max:10240', // Optional file upload (PDF)
        ]);

        // Handle file upload if present
        if ($request->hasFile('file_path')) {
            // Delete old file if it exists
            if ($formation->file_path && Storage::disk('public')->exists($formation->file_path)) {
                Storage::disk('public')->delete($formation->file_path);
            }

            // Store new file
            $path = $request->file('file_path')->store('formations', 'public');
            $validated['file_path'] = $path;
        }

        $formation->update($validated);

        return redirect()->route('formations.index')->with('success', 'Formation updated successfully!');
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
