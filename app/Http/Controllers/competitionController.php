<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\CompetitionRegistration;
use App\Models\NotifiableUser;
use App\Notifications\CompetitionRegistrationStatusNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studentId = auth('web')->id();

        $competitions = Competition::with(['user', 'registrations', 'closedBy'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($competition) use ($studentId) {
                $registration = $competition->registrations()
                    ->where('user_id', $studentId)
                    ->first();

                return [
                    'id' => $competition->id,
                    'title' => $competition->title,
                    'description' => $competition->description,
                    'date' => $competition->date?->format('Y-m-d'), // ✅ Fixed
                    'deadline' => $competition->deadline?->format('Y-m-d'), // ✅ Fixed
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
                    'my_registration' => $registration ? [
                        'status' => $registration->status,
                    ] : null,
                ];
            });

        // Get all registrations for statistics
        $registrations = CompetitionRegistration::with(['competition', 'user'])
            ->where('user_id', $studentId) // ✅ Only show current user's registrations
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
                    'registrationDate' => $registration->registered_at?->format('Y-m-d'),
                    'status' => $registration->status,
                    'paymentStatus' => $registration->payment_status,
                    'notes' => $registration->notes,
                    'groupMembers' => $registration->group_members,
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

        if ($competition->status !== 'Ouvert') {
            return redirect()->route('etudiant.competition')
                ->with('error', 'Cette compétition n\'est plus ouverte aux inscriptions.');
        }

        if ($competition->deadline < now()) {
            return redirect()->route('etudiant.competition')
                ->with('error', 'La date limite d\'inscription pour cette compétition est dépassée.');
        }

        return Inertia::render('etudiant/competitionRegistration', [
            'competition' => [
                'id' => $competition->id,
                'title' => $competition->title,
                'description' => $competition->description,
                'date' => $competition->date?->format('Y-m-d'), // ✅ Fixed
                'deadline' => $competition->deadline?->format('Y-m-d'), // ✅ Fixed
                'location' => $competition->location,
                'category' => $competition->category,
                'maxParticipants' => $competition->max_participants,
                'registrations' => $competition->registrations->count(),
                'status' => $competition->status,
                'type' => $competition->type,
                // ✅ Removed 'groupMembers' property that doesn't exist
            ]
        ]);
    }

    /**
     * Display public competition details for students.
     */
    public function showDetails($id)
    {
        $competition = Competition::with(['registrations'])->findOrFail($id);
        $studentId = auth('web')->id();

        $myRegistration = $competition->registrations()
            ->where('user_id', $studentId)
            ->first();

        $competitionData = [
            'id' => $competition->id,
            'title' => $competition->title,
            'description' => $competition->description,
            'date' => $competition->date?->format('Y-m-d'), // ✅ Fixed
            'deadline' => $competition->deadline?->format('Y-m-d'), // ✅ Fixed
            'location' => $competition->location,
            'category' => $competition->category,
            'maxParticipants' => $competition->max_participants,
            'registrations' => $competition->registrations->count(),
            'status' => $competition->status,
            'views' => $competition->views,
            'type' => $competition->type,
            'my_registration' => $myRegistration ? [
                'status' => $myRegistration->status,
            ] : null,
        ];

        return Inertia::render('etudiant/competitionShow', [
            'competition' => $competitionData,
        ]);
    }

    /**
     * Store a new competition registration.
     */
    public function storeRegistration(Request $request, $competitionId)
    {
        $competition = Competition::findOrFail($competitionId);

        $rules = [
            'participant_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'club' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ];

        // Add group-specific validation rules
        if ($competition->type === 'group') {
            $rules['group_name'] = 'required|string|max:255';
            $rules['group_members'] = 'required|string|max:2000'; // Increase limit for detailed member list
        }

        $validated = $request->validate($rules);

        $studentId = auth('web')->id();

        // Check if already registered
        $existing = CompetitionRegistration::where('competition_id', $competitionId)
            ->where('user_id', $studentId)
            ->first();

        if ($existing) {
            return back()->withErrors(['participant_name' => 'Vous avez déjà une demande pour cette compétition. Statut: ' . $existing->status]);
        }

        // Create registration with status "En attente"
        $registration = CompetitionRegistration::create([
            'competition_id' => $competitionId,
            'user_id' => $studentId,
            'participant_name' => $validated['participant_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'club' => $validated['club'] ?? null,
            'category' => $validated['category'],
            'notes' => $validated['notes'],
            // Store both group name and members for group competitions
            'group_name' => $competition->type === 'group' ? $validated['group_name'] : null,
            'group_members' => $competition->type === 'group' ? $validated['group_members'] : null,
            'status' => 'En attente',
            'payment_status' => 'En attente',
            'registered_at' => now(),
        ]);

        $this->sendRegistrationConfirmationEmail($registration);

        return redirect()->route('etudiant.competition')->with('success', 'Votre demande a été envoyée et est en attente de validation. Un email de confirmation vous a été envoyé.');
    }

    /**
     * Send registration confirmation email.
     */
    private function sendRegistrationConfirmationEmail(CompetitionRegistration $registration)
    {
        try {
            $notifiableUser = new NotifiableUser($registration->email, $registration->participant_name);
            $notifiableUser->notify(new CompetitionRegistrationStatusNotification($registration));
        } catch (\Exception $e) {
            Log::error('Failed to send competition registration confirmation email: ' . $e->getMessage());
        }
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

        $validated['user_id'] = auth('web')->id();
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
            'date' => $competition->date ? Carbon::parse($competition->date)->format('d-m-Y') : null,
            'deadline' => $competition->deadline ? Carbon::parse($competition->deadline)->format('d-m-Y') : null,
            'location' => $competition->location,
            'category' => $competition->category,
            'maxParticipants' => $competition->max_participants,
            'registrations' => $competition->registrations->count(),
            'status' => $competition->status,
            'slug' => $competition->slug,
            'views' => $competition->views,
            'created_at' => $competition->created_at->toISOString(),
            'updated_at' => $competition->updated_at->toISOString(),
            'type' => $competition->type,
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
                'groupMembers' => $registration->group_members,
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
            'date' => $competition ? Carbon::parse($competition->date)->format('Y-m-d') : null,
            'deadline' => $competition ? Carbon::parse($competition->deadline)->format('Y-m-d') : null,
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
        if ($competition->status === 'Fermé') {
            return back()->with('error', 'Cette compétition est déjà fermée.');
        }

        $competition->update([
            'status' => 'Fermé',
            'closed_at' => now(),
            'closed_by' => auth('web')->id()
        ]);

        return back()->with('success', 'Compétition fermée avec succès.');
    }
}
