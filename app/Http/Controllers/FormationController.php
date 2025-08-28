<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\FormationRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FormationController extends Controller
{
    /**
     * Display a listing of the formations.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->get('search', ''));

        $query = Formation::query()
            // Optional: only published for students
            ->when(\Schema::hasColumn('formations', 'status'), fn($q) => $q->where('status', 'published'))
            ->when($search, function ($q) use ($search) {
                $q->where(function ($w) use ($search) {
                    $w->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            });

        // Prefer published_at if present, else created_at
        $query = \Schema::hasColumn('formations', 'published_at')
            ? $query->latest('published_at')
            : $query->latest();

        $formations = $query->get()->map(function ($f) {
            return [
                'id'          => $f->id,
                'titre'       => $f->title,
                'description' => $f->description,
                'category'    => (string) ($f->category ?? ''),
                'niveau'      => (string) ($f->level ?? ''),
                'photo'       => $f->thumbnail ? url('/storage/' . $f->thumbnail) : '/images/default-formation.jpg',
            ];
        });

        return Inertia::render('etudiant/Formations', [
            'formations' => $formations,
            'search'     => $search,
        ]);
    }

    /**
     * Display the specified formation (with modules + files).
     */
    public function show(Formation $formation)
    {
        // Hide drafts from students if column exists
        if (isset($formation->status) && $formation->status !== 'published') {
            abort(404);
        }

        $user = Auth::user();
        $isSignedUp = $user
            ? FormationRegistration::where('user_id', $user->id)
            ->where('formation_id', $formation->id)
            ->exists()
            : false;

        // Load modules + files relation: Module::files()
        $formation->load(['modules.files']);

        $modules = $formation->modules->map(function ($m) use ($isSignedUp) {
            return [
                'id'          => $m->id,
                'titre'       => $m->title,
                'description' => $m->description,
                'assets'      => $m->files->map(function ($f) use ($isSignedUp) {
                    $mime = (string) ($f->mime_type ?? '');
                    $type = $f->type
                        ?? (str_starts_with($mime, 'video') ? 'video'
                            : (str_contains($mime, 'pdf') ? 'pdf' : 'other'));

                    return [
                        'id'   => $f->id,
                        'name' => $f->original_name,
                        'type' => $type, // 'pdf' | 'video' | 'other'
                        // Expose a URL only if the student is registered.
                        // This should point to your secure file controller:
                        // Route::get('module-files/{file}', ModuleFileController@open)->name('student.module_files.open')
                        'url'  => $isSignedUp ? route('student.module_files.open', $f->id) : null,
                    ];
                })->values(),
            ];
        })->values();

        return Inertia::render('etudiant/FormationShow', [
            'formation' => [
                'id'          => $formation->id,
                'titre'       => $formation->title,
                'description' => $formation->description,
                'category'    => (string) ($formation->category ?? ''),
                'niveau'      => (string) ($formation->level ?? ''),
                'photo'       => $formation->thumbnail ? url('/storage/' . $formation->thumbnail) : '/images/default-formation.jpg',
                'isSignedUp'  => $isSignedUp,
                'modules'     => $modules,
                'duration'    => $formation->duration ?? null,
                'status'      => $formation->status ?? null,
                'language'    => $formation->language ?? null,
            ],
        ]);
    }
    public function register(Formation $formation)
    {
        $user = Auth::user();
        abort_unless($user, 403);

        // Prevent duplicates; set initial status if your table has it
        FormationRegistration::firstOrCreate(
            ['user_id' => $user->id, 'formation_id' => $formation->id],
            ['status'  => \Schema::hasColumn('formation_registrations', 'status') ? 'pending' : null]
        );

        // Redirect back so the Show page can re-render with modules unlocked
        return back()->with('success', 'Inscription réussie !');
    }

    /**
     * (Optional) Allow a student to unregister.
     */
    public function unregister(Formation $formation)
    {
        $user = Auth::user();
        abort_unless($user, 403);

        FormationRegistration::where('user_id', $user->id)
            ->where('formation_id', $formation->id)
            ->delete();

        return back()->with('success', 'Désinscription effectuée.');
    }
}
