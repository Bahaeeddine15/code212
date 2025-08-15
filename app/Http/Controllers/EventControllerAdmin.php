<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;

class EventControllerAdmin extends Controller
{
    public function index()
    {
        $events = Event::latest()->get()->map(function ($event) {
            return array_merge(
                $event->toArray(),
                [
                    'maxAttendees' => $event->max_attendees,
                    'date' => $event->start_date,
                    'endDate' => $event->end_date,
                ]
            );
        });
        return Inertia::render('dashboard_admin/Evenements/evenement_index', ['events' => $events]);
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

    public function edit(Event $event)
    {
        return Inertia::render('dashboard_admin/Evenements/evenement_edit', [
            'event' => array_merge(
                $event->toArray(),
                [
                    'maxAttendees' => $event->max_attendees,
                    'date' => $event->start_date,
                ]
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/Evenements/evenement_create');
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
}
