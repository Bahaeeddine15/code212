<?php

namespace App\Http\Controllers;

use App\Models\Competition; // Fix the import - should be Competition, not competition
use App\Models\CompetitionRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $competitions = Competition::with(['user', 'registrations', 'closedBy'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($competition) {
                return [
                    'id' => $competition->id,
                    'title' => $competition->title,
                    'description' => $competition->description,
                    'date' => $competition->date->format('Y-m-d'),
                    'deadline' => $competition->deadline->format('Y-m-d'),
                    'location' => $competition->location,
                    'category' => $competition->category,
                    'maxParticipants' => $competition->max_participants,
                    'registrations' => $competition->registrations->count(),
                    'status' => $competition->status,
                    'slug' => $competition->slug,
                    'views' => $competition->views,
                    'created_at' => $competition->created_at->toISOString(),
                    'updated_at' => $competition->updated_at->toISOString(),
                    'closed_at' => $competition->closed_at ? $competition->closed_at->toISOString() : null,
                    'closed_by' => $competition->closedBy ? $competition->closedBy->name : null,
                ];
            });

        // Get all registrations for statistics
        $registrations = CompetitionRegistration::with(['competition', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($registration) {
                return [
                    'id' => $registration->id,
                    'competitionId' => $registration->competition_id,
                    'userId' => $registration->user_id,
                    'userName' => $registration->user->name ?? null,
                    'participantName' => $registration->participant_name,
                    'email' => $registration->email,
                    'phone' => $registration->phone,
                    'category' => $registration->category,
                    'club' => $registration->club,
                    'registrationDate' => $registration->registered_at->format('Y-m-d'),
                    'status' => $registration->status,
                    'paymentStatus' => $registration->payment_status,
                    'notes' => $registration->notes,
                ];
            });

        return Inertia::render('etudiant/competition', [
            'competitions' => $competitions,
            'registrations' => $registrations,
            'statistics' => [
                'totalCompetitions' => $competitions->count(),
                'activeCompetitions' => $competitions->where('status', 'Ouvert')->count(),
                'totalRegistrations' => $registrations->count(),
                'confirmedRegistrations' => $registrations->where('status', 'Confirmé')->count(),
                'pendingRegistrations' => $registrations->where('status', 'En attente')->count(),
            ]
        ]);
    }

    /**
     * Show the registration form for a specific competition.
     */
    public function showRegistration($id)
    {
        $competition = Competition::findOrFail($id);
        
        // Vérifier si la compétition est ouverte aux inscriptions
        if ($competition->status !== 'Ouvert') {
            return redirect()->route('etudiant.competition')
                ->with('error', 'Cette compétition n\'est plus ouverte aux inscriptions.');
        }
        
        // Vérifier si la date limite n'est pas dépassée
        if ($competition->deadline < now()) {
            return redirect()->route('etudiant.competition')
                ->with('error', 'La date limite d\'inscription pour cette compétition est dépassée.');
        }
        
        return Inertia::render('etudiant/competitionRegistration', [
            'competition' => [
                'id' => $competition->id,
                'title' => $competition->title,
                'description' => $competition->description,
                'date' => $competition->date->format('Y-m-d'),
                'deadline' => $competition->deadline->format('Y-m-d'),
                'location' => $competition->location,
                'category' => $competition->category,
                'maxParticipants' => $competition->max_participants,
                'registrations' => $competition->registrations->count(),
                'status' => $competition->status,
            ]
        ]);
    }

    /**
     * Store a new competition registration.
     */
    public function storeRegistration(Request $request, $id)
    {
        $competition = Competition::findOrFail($id);
        
        // Vérifier si la compétition est ouverte aux inscriptions
        if ($competition->status !== 'Ouvert') {
            return redirect()->route('etudiant.competition')
                ->with('error', 'Cette compétition n\'est plus ouverte aux inscriptions.');
        }
        
        // Vérifier si la date limite n'est pas dépassée
        if ($competition->deadline < now()) {
            return redirect()->route('etudiant.competition')
                ->with('error', 'La date limite d\'inscription pour cette compétition est dépassée.');
        }
        
        // Vérifier s'il reste des places
        $currentRegistrations = $competition->registrations()->count();
        if ($currentRegistrations >= $competition->max_participants) {
            return redirect()->route('etudiant.competition')
                ->with('error', 'Cette compétition est complète.');
        }
        
        // Validation des données
        $validated = $request->validate([
            'participant_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'club' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);
        
        // Vérifier si l'utilisateur n'est pas déjà inscrit pour cette compétition
        $existingRegistration = CompetitionRegistration::where('competition_id', $id)
            ->where('user_id', $request->user()->id)
            ->first();
            
        if ($existingRegistration) {
            return redirect()->back()
                ->withErrors(['general' => 'Vous êtes déjà inscrit à cette compétition.'])
                ->withInput();
        }
        
        // Créer l'inscription
        $registration = CompetitionRegistration::create([
            'competition_id' => $id,
            'user_id' => $request->user()->id, // Ajouter l'ID de l'utilisateur connecté
            'participant_name' => $validated['participant_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'club' => $validated['club'],
            'category' => $validated['category'],
            'notes' => $validated['notes'],
            'status' => 'En attente',
            'payment_status' => 'En attente',
            'registered_at' => now(),
        ]);
        
        return redirect()->route('etudiant.competition')
            ->with('success', 'Votre inscription a été enregistrée avec succès! Vous recevrez une confirmation par email.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard_admin/competitions/competition_create');
    }

    /**
     * Generate a unique slug for competition
     */
    private function generateUniqueSlug($title, $excludeId = null)
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        $query = Competition::where('slug', $slug);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        while ($query->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;

            $query = Competition::where('slug', $slug);
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }
        }

        return $slug;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date|after:today',
            'deadline' => 'required|date|before:date',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'maxParticipants' => 'required|integer|min:1',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['slug'] = $this->generateUniqueSlug($validated['title']);
        $validated['max_participants'] = $validated['maxParticipants'];
        unset($validated['maxParticipants']);

        Competition::create($validated);

        return redirect()->route('competitions.index')->with('success', 'Compétition créée avec succès!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Competition $competition)
    {
        $competition->increment('views');

        $competitionData = [
            'id' => $competition->id,
            'title' => $competition->title,
            'description' => $competition->description,
            'date' => $competition->date->format('d-m-Y'),
            'deadline' => $competition->deadline->format('d-m-Y'),
            'location' => $competition->location,
            'category' => $competition->category,
            'maxParticipants' => $competition->max_participants,
            'registrations' => $competition->registrations->count(),
            'status' => $competition->status,
            'slug' => $competition->slug,
            'views' => $competition->views,
            'created_at' => $competition->created_at->toISOString(),
            'updated_at' => $competition->updated_at->toISOString(),
        ];

        $registrations = $competition->registrations->map(function ($registration) {
            return [
                'id' => $registration->id,
                'participant_name' => $registration->participant_name,
                'email' => $registration->email,
                'phone' => $registration->phone,
                'category' => $registration->category,
                'club' => $registration->club,
                'status' => $registration->status,
                'registered_at' => $registration->registered_at->format('d-m-Y'),
            ];
        });

        return Inertia::render('dashboard_admin/competitions/competition_show', [
            'competition' => $competitionData,
            'registrations' => $registrations
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Competition $competition)
    {
        $competitionData = [
            'id' => $competition->id,
            'title' => $competition->title,
            'description' => $competition->description,
            'date' => $competition->date->format('Y-m-d'),
            'deadline' => $competition->deadline->format('Y-m-d'),
            'location' => $competition->location,
            'category' => $competition->category,
            'maxParticipants' => $competition->max_participants,
            'registrations' => $competition->registrations->count(),
            'status' => $competition->status,
        ];

        return Inertia::render('dashboard_admin/competitions/competition_edit', [
            'competition' => $competitionData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Competition $competition)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'deadline' => 'required|date|before:date',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'maxParticipants' => 'required|integer|min:1',
        ]);

        $validated['slug'] = $this->generateUniqueSlug($validated['title'], $competition->id);
        $validated['max_participants'] = $validated['maxParticipants'];
        unset($validated['maxParticipants']);

        $competition->update($validated);

        return redirect()->route('competitions.index')->with('success', 'Compétition mise à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competition $competition)
    {
        $competition->delete();

        return redirect()->route('competitions.index')->with('success', 'Compétition supprimée avec succès!');
    }

    /**
     * Close the specified competition.
     */
    public function close(Competition $competition)
    {
        // Check if competition is already closed
        if ($competition->status === 'Fermé') {
            return back()->with('error', 'Cette compétition est déjà fermée.');
        }

        // Update competition status
        $competition->update([
            'status' => 'Fermé',
            'closed_at' => now(),
            'closed_by' => Auth::id()
        ]);

        return back()->with('success', 'Compétition fermée avec succès.');
    }
}
