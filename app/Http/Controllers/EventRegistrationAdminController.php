<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventRegistrationAdminController extends Controller
{
    public function index(Event $event)
    {
    $registrations = EventRegistration::with('user')
            ->where('event_id', $event->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($r) {
                return [
                    'id' => $r->id,
                    'name' => $r->participant_name ?? optional($r->user)->name,
                    'email' => $r->email ?? optional($r->user)->email,
            'ecole' => optional($r->user)->ecole,
                    'status' => $r->status,
                    'registered_at' => optional($r->registered_at)->toISOString(),
                ];
            });

        return Inertia::render('dashboard_admin/Evenements/evenement_registrations', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'start_date' => optional($event->start_date)->toISOString(),
                'end_date' => optional($event->end_date)->toISOString(),
                'max_attendees' => $event->max_attendees,
            ],
            'registrations' => $registrations,
        ]);
    }

    public function approve(EventRegistration $registration)
    {
        $registration->update(['status' => 'approved']);
        return back();
    }

    public function reject(EventRegistration $registration)
    {
        $registration->update(['status' => 'rejected']);
        return back();
    }
}
