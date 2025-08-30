<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventRegistrationAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    // List registrations for a single event
    public function index(Event $event)
    {
        $registrations = EventRegistration::where('event_id', $event->id)
            ->with(['etudiant:id,name,email,telephone,ecole,ville'])
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($r) {
                return [
                    'id'            => $r->id,
                    'status'        => $r->status, // waitlist|registered|cancelled
                    'registered_at' => $r->registered_at?->toDateTimeString(),
                    'etudiant'      => [
                        'id'         => $r->etudiant_id,
                        'name'       => $r->etudiant?->name,
                        'email'      => $r->etudiant?->email,
                        'telephone'  => $r->etudiant?->telephone,
                        'ecole'      => $r->etudiant?->ecole,
                        'ville'      => $r->etudiant?->ville,
                    ],
                ];
            });

        return inertia('dashboard_admin/Evenements/evenement_registrations', [
            'event'         => [
                'id' => $event->id,
                'title' => $event->title,
                'start_date' => optional($event->start_date)->toISOString(),
                'end_date' => optional($event->end_date)->toISOString(),
                'max_attendees' => $event->max_attendees,
            ],
            'registrations' => $registrations,
        ]);
    }

    public function approve(Event $event, EventRegistration $registration)
    {
        abort_unless($registration->event_id === $event->id, 404);

        $registration->update([
            'status'        => EventRegistration::APPROVED,
            'cancelled_at'  => null,
            'registered_at' => now(),
        ]);
        $registration->update([
            'status' => 'registered',
            'registered_at' => now(),
        ]);

        // (Optional later) notify student here
        return back()->with('success', 'Participation approuvée.');
    }

    public function reject(Event $event, EventRegistration $registration)
    {
        abort_unless($registration->event_id === $event->id, 404);

        $registration->update([
            'status' => 'rejected',
        ]);

        // (Optional later) notify student here
        return back()->with('success', 'Participation refusée.');
    }
}
