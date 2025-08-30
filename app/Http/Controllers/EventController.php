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
                    'id' => $e->id,
                    'title' => $e->title,
                    'description' => $e->description,
                    'start_date' => $e->start_date?->toISOString(),
                    'end_date' => $e->end_date?->toISOString(),
                    'location' => $e->location,
                    'category' => $e->category,
                    'type' => $e->type ?? 'Événement', // Add type field
                    'max_attendees' => $e->max_attendees,
                    'status' => method_exists($e, 'computedStatus') ? $e->computedStatus() : ($e->status ?? 'upcoming'),
                    'logo' => $e->logo ? Storage::url($e->logo) : null,
                ];
            });
        return inertia('etudiant/events', ['events' => $events]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required',
            'maxAttendees' => 'required|integer|min:1',
            'category' => 'required|string',
        ]);

        $validated['max_attendees'] = $validated['maxAttendees'];
        unset($validated['maxAttendees']);

        Event::create($validated);
        return redirect()->route('events.index');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required',
            'maxAttendees' => 'required|integer|min:1',
            'category' => 'required|string',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
        ]);

        $validated['max_attendees'] = $validated['maxAttendees'];
        unset($validated['maxAttendees']);

        $event->update($validated);
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

        $event->update([
            'status' => $request->input('status'),
        ]);

        return back();
    }

    public function show(Event $event)
    {
        $registrations = EventRegistration::where('event_id', $event->id)
            ->where('status', 'approved')
            ->count();

        // Check user registration status
        $userRegistration = null;
        $isRegistered = false;
        $isRejected = false;
        
        if (auth('web')->check()) {
            $userRegistration = EventRegistration::where('event_id', $event->id)
                ->where('user_id', auth('web')->id())
                ->first();
            
            if ($userRegistration) {
                $isRegistered = in_array($userRegistration->status, ['pending', 'approved']);
                $isRejected = $userRegistration->status === 'rejected';
            }
        }

        $data = [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'start_date' => $event->start_date?->toISOString(),
            'end_date' => $event->end_date?->toISOString(),
            'location' => $event->location,
            'category' => $event->category,
            'type' => $event->type ?? 'Événement',
            'max_attendees' => $event->max_attendees,
            'status' => method_exists($event, 'computedStatus') ? $event->computedStatus() : ($event->status ?? 'upcoming'),
            'logo' => $event->logo ? Storage::url($event->logo) : null,
            'created_at' => $event->created_at?->toISOString(),
            'updated_at' => $event->updated_at?->toISOString(),
            'registrations_count' => $registrations,
            'is_registered' => $isRegistered,
            'is_rejected' => $isRejected,
            'registration_status' => $userRegistration?->status,
            'seats_left' => $event->max_attendees ? max(0, $event->max_attendees - $registrations) : null,
        ];

        return inertia('etudiant/event-detail', ['event' => $data]);
    }
}
