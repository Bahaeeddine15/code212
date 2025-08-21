<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\CompetitionRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompetitionControllerAdmin extends Controller
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
                    'date' => optional($competition->date)->toDateString(),
                    'deadline' => optional($competition->deadline)->toDateString(),
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
                    'type' => $competition->type,
                ];
            });

        $registrations = CompetitionRegistration::with(['competition', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($registration) {
                return [
                    'id' => $registration->id,
                    'competitionId' => $registration->competition_id,
                    'competitionTitle' => $registration->competition->title,
                    'competitionType' => $registration->competition->type, // Add this line
                    'userId' => $registration->user_id,
                    'userName' => $registration->user->name ?? null,
                    'participantName' => $registration->participant_name,
                    'email' => $registration->email,
                    'phone' => $registration->phone,
                    'category' => $registration->category,
                    'club' => $registration->club,
                    'registrationDate' => $registration->registered_at?->format('Y-m-d'),
                    'status' => $registration->status,
                    'paymentStatus' => $registration->payment_status,
                    'notes' => $registration->notes,
                    'groupMembers' => $registration->group_members,
                ];
            });

        return Inertia::render('dashboard_admin/competitions/competition_index', [
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
            'type' => 'required|in:individual,group',
        ]);

        $validated['user_id'] = auth('admin')->id();
        $validated['slug'] = $this->generateUniqueSlug($validated['title']);
        $validated['max_participants'] = $validated['maxParticipants'];
        unset($validated['maxParticipants']);

        Competition::create($validated);

        return redirect()->route('admin.competitions.index')->with('success', 'Compétition créée avec succès!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Competition $competition)
    {
        $competition->increment('views');

        $registrations = $competition->registrations->map(function ($registration) {
            return [
                'id' => $registration->id,
                'participant_name' => $registration->participant_name,
                'email' => $registration->email,
                'phone' => $registration->phone,
                'status' => $registration->status,
                'category' => $registration->category,
                'club' => $registration->club,
                'notes' => $registration->notes,
                'group_name' => $registration->group_name,
                'group_members' => $registration->group_members,
                'registered_at' => $registration->registered_at ? $registration->registered_at->toISOString() : null,
            ];
        });

        return Inertia::render('dashboard_admin/competitions/competition_show', [
            'competition' => [
                'id' => $competition->id,
                'title' => $competition->title,
                'date' => $competition->date?->format('Y-m-d'),
                'location' => $competition->location,
                'category' => $competition->category,
                'maxParticipants' => $competition->max_participants,
                'deadline' => $competition->deadline?->format('Y-m-d'),
                'description' => $competition->description,
                'status' => $competition->status,
                'registrations' => $competition->registrations->count(),
                'created_at' => $competition->created_at->toISOString(),
                'updated_at' => $competition->updated_at->toISOString(),
                'type' => $competition->type, // Add this line
            ],
            'registrations' => $registrations,
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
            'date' => optional($competition->date)->toDateString(),
            'deadline' => optional($competition->deadline)->toDateString(),
            'location' => $competition->location,
            'category' => $competition->category,
            'maxParticipants' => $competition->max_participants,
            'registrations' => $competition->registrations->count(),
            'status' => $competition->status,
            'type' => $competition->type,
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
            'type' => 'required|in:individual,group',
        ]);

        $validated['slug'] = $this->generateUniqueSlug($validated['title'], $competition->id);
        $validated['max_participants'] = $validated['maxParticipants'];
        unset($validated['maxParticipants']);

        $competition->update($validated);

        return redirect()->route('admin.competitions.index')->with('success', 'Compétition mise à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competition $competition)
    {
        $competition->delete();

        return redirect()->route('admin.competitions.index')->with('success', 'Compétition supprimée avec succès!');
    }

    /**
     * Close the specified competition.
     */
    public function close(Competition $competition)
    {
        if ($competition->status === 'Fermé') {
            return back()->with('error', 'Cette compétition est déjà fermée.');
        }

        $competition->update([
            'status' => 'Fermé',
            'closed_at' => now(),
            'closed_by' => auth('admin')->id()
        ]);

        return back()->with('success', 'Compétition fermée avec succès.');
    }
}
