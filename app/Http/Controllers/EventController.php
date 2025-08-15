<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
   public function index()
    {
        $events = Event::latest()->get();
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

        // Map maxAttendees to max_attendees if needed
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
                'maxAttendees' => $event->max_attendees,  // Convert for frontend
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

        return back(); // or return a 200 response
    }

}
