<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where(function ($q) {
                $q->whereDate('end_date', '>=', now()->toDateString());
            })
            ->orderBy('start_date', 'asc')
            ->get()
            ->map(function ($e) {
                return [
                    'id'             => $e->id,
                    'title'          => $e->title,
                    'description'    => $e->description,
                    'start_date'     => $e->start_date?->toISOString(),
                    'end_date'       => $e->end_date?->toISOString(),
                    'location'       => $e->location,
                    'category'       => $e->category,
                    'type'           => $e->type ?? 'Événement',
                    'max_attendees'  => $e->max_attendees,
                    'status'         => method_exists($e, 'computedStatus') ? $e->computedStatus() : ($e->status ?? 'upcoming'),
                    'logo'           => $e->logo ? Storage::url($e->logo) : null,
                ];
            });

        return inertia('etudiant/events', ['events' => $events]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required',
            'description'  => 'nullable',
            'start_date'   => 'required|date',
            'end_date'     => 'required|date|after_or_equal:start_date',
            'location'     => 'required',
            'maxAttendees' => 'required|integer|min:1',
            'category'     => 'required|string',
        ]);

        $validated['max_attendees'] = $validated['maxAttendees'];
        unset($validated['maxAttendees']);

        Event::create($validated);

        // adjust this route name to your admin listing if needed
        return redirect()->route('events.index');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'        => 'required',
            'description'  => 'nullable',
            'start_date'   => 'required|date',
            'end_date'     => 'required|date|after_or_equal:start_date',
            'location'     => 'required',
            'maxAttendees' => 'required|integer|min:1',
            'category'     => 'required|string',
            'status'       => 'required|in:upcoming,ongoing,completed,cancelled',
        ]);

        $validated['max_attendees'] = $validated['maxAttendees'];
        unset($validated['maxAttendees']);

        $event->update($validated);

        // adjust this route name to your admin listing if needed
        return redirect()->route('events.index');
    }

    public function edit(Event $event)
    {
        return inertia('Events/Edit', [
            'event' => [
                ...$event->toArray(),
                'maxAttendees' => $event->max_attendees,
            ],
        ]);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return redirect()->back();
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
        ]);

        $event = Event::findOrFail($id);
        $event->update(['status' => $request->input('status')]);

        return back();
    }

    /** Student-facing detail page */
    public function show(Event $event)
    {
        // Seats = only "registered" rows
        $registeredCount = \App\Models\EventRegistration::where('event_id', $event->id)
            ->where('status', 'registered')
            ->count();

        // Current student (adjust guard if needed)
        $me  = auth('web')->user();
        $reg = null;

        if ($me) {
            $reg = \App\Models\EventRegistration::where('event_id', $event->id)
                ->where('etudiant_id', $me->id)   // 👈 uses etudiant_id
                ->latest()
                ->first();
        }

        // null | 'waitlist' | 'registered' | 'cancelled' | 'rejected'
        $myStatus = $reg?->status;

        // Can click "Participer"?
        // - allowed if never registered OR previously cancelled by the student
        // - NOT allowed if waitlist/registered/rejected
        $canRegister = !$reg || $myStatus === 'cancelled';

        $data = [
            'id'                  => $event->id,
            'title'               => $event->title,
            'description'         => $event->description,
            'start_date'          => $event->start_date?->toISOString(),
            'end_date'            => $event->end_date?->toISOString(),
            'location'            => $event->location,
            'category'            => $event->category,
            'type'                => $event->type ?? 'Événement',
            'max_attendees'       => $event->max_attendees,
            'status'              => method_exists($event, 'computedStatus')
                                    ? $event->computedStatus()
                                    : ($event->status ?? 'upcoming'),
            'logo'                => $event->logo ? \Illuminate\Support\Facades\Storage::url($event->logo) : null,
            'created_at'          => $event->created_at?->toISOString(),
            'updated_at'          => $event->updated_at?->toISOString(),

            // Seats info
            'registrations_count' => $registeredCount,
            'seats_left'          => $event->max_attendees
                                            ? max(0, $event->max_attendees - $registeredCount)
                                            : null,

            // 👇 Student’s registration context
            'registration_status' => $myStatus,     // null|'waitlist'|'registered'|'cancelled'|'rejected'
            'can_register'        => $canRegister,  // boolean hint for UI
            'is_registered'       => $myStatus === 'registered', // (kept for backward-compat)
        ];

        return inertia('etudiant/event-detail', ['event' => $data]);
    }
}
