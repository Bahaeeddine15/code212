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

    public function index(Request $request)
    {
        $status = $request->get('status', 'published');

        $query = Formation::query()->withCount(['modules', 'registrations'])->latest();
        if ($status === 'draft') $query->drafts();
        elseif ($status !== 'all') $query->published();

        $formations = $query->get()->values()->map(function ($formation) {
            $modules = $formation->modules ?? [];
            return [
                'id'                => $formation->id,
                'title'             => $formation->title,
                'description'       => $formation->description,
                'level'             => $formation->level,
                'duration'          => $formation->duration,
                'category'          => $formation->category,
                'link'              => $formation->link,
                'photo'             => $formation->thumbnail ? url('/storage/' . $formation->thumbnail) : '/images/default-formation.jpg',
                'status'            => $formation->status,
                'language'          => $formation->language,
                'modules_count'     => $formation->modules_count,
                'modules'           => $modules,
                'enrolledStudents'  => $formation->registrations_count, // Real count from DB
                'created_at'        => $formation->created_at,
                'updated_at'        => $formation->updated_at,
            ];
        });

        // Calculate real statistics
        $totalEnrolledStudents = \App\Models\FormationRegistration::count();
        $totalActiveModules = \App\Models\Module::count();
        $totalCertifications = \App\Models\Formation::where('category', 'Certification')->count();

        return Inertia::render('dashboard_admin/formations/formations_index', [
            'formations'    => $formations,
            'activeStatus'  => $status,
            'counts'        => [
                'published' => Formation::published()->count(),
                'draft'     => Formation::drafts()->count(),
                'all'       => Formation::count(),
            ],
            'stats' => [
                'totalEnrolledStudents' => $totalEnrolledStudents,
                'totalActiveModules'    => $totalActiveModules,
                'totalCertifications'   => $totalCertifications,
                'totalFormations'       => Formation::count(),
            ],
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
            'status' => 'nullable|in:draft,published',
            'language' => 'nullable|string|max:100',
            'pre_requis' => 'nullable|string',

        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        }
        // default to published if not provided
        $validated['status'] = $validated['status'] ?? 'published';
        $validated['published_at'] = $validated['status'] === 'published' ? now() : null;

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
            'status' => 'nullable|in:draft,published',
            'language' => 'nullable|string|max:100',

        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        }
        if (array_key_exists('status', $validated)) {
            $validated['published_at'] = $validated['status'] === 'published' ? now() : null;
        }

        // Uncomment the next line if you want to track the admin who updated the formation
        // $validated['updated_by'] = auth('admin')->id();

        $formation->update($validated);

        return redirect()->route('admin.formations.index');
    }

    /**
     * Update only the status of the specified formation.
     */
    public function updateStatus(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'status' => 'required|in:draft,published',
        ]);

        $formation->status = $validated['status'];
        $formation->published_at = $validated['status'] === 'published' ? now() : null;
        $formation->save();

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
