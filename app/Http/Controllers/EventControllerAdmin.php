<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;

class EventControllerAdmin extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        // Set to 'ongoing' if today is the start_date
        Event::whereDate('start_date', $today)
            ->whereNotIn('status', ['ongoing', 'completed', 'cancelled'])
            ->update(['status' => 'ongoing']);

        // Set to 'completed' if today is past the end_date
        Event::whereDate('end_date', '<', $today)
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->update(['status' => 'completed']);

        $events = Event::withCount(['registrations' => function ($q) {
            $q->where('status', 'approved');
        }])
            ->latest()->get()->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => optional($event->start_date)->toISOString(),
                    'endDate' => optional($event->end_date)->toISOString(),
                    'location' => $event->location,
                    'attendees' => $event->registrations_count ?? 0,
                    'maxAttendees' => $event->max_attendees,
                    'status' => $event->status ?? 'upcoming',
                    'category' => $event->category ?? 'Conférence',
                    'type' => $event->type ?? 'Conférence',
                ];
            });
        return Inertia::render('dashboard_admin/Evenements/evenement_index', ['events' => $events]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'location' => 'required|string|max:255',
            'maxAttendees' => 'required|integer|min:1',
            'category' => 'required|string',
            'type' => 'required|string',
        ]);

        $validated['max_attendees'] = $validated['maxAttendees'];
        unset($validated['maxAttendees']);
        $validated['user_id'] = auth('admin')->id();

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Événement créé avec succès!');
    }

    public function edit(Event $event)
    {
        return Inertia::render('dashboard_admin/Evenements/evenement_edit', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'category' => $event->category,
                'type' => $event->type,
                'location' => $event->location,
                'status' => $event->status,
                'maxAttendees' => $event->max_attendees,
                // Format datetime fields properly for datetime-local inputs
                'start_date' => $event->start_date ? $event->start_date->format('Y-m-d\TH:i') : '',
                'end_date' => $event->end_date ? $event->end_date->format('Y-m-d\TH:i') : '',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/Evenements/evenement_create');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string|max:255',
            'maxAttendees' => 'required|integer|min:1',
            'category' => 'required|string',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
            'type' => 'required|string|in:Conférence,Workshop,Séminaire,Formation,Networking,Webinaire,Table Ronde,Présentation',
        ]);

        $validated['max_attendees'] = $validated['maxAttendees'];
        unset($validated['maxAttendees']);

        // Optionally track which admin updated the event
        $validated['updated_by'] = auth('admin')->id();

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Événement modifié avec succès!');
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
            // Optionally track which admin updated the status
            'updated_by' => auth('admin')->id(),
        ]);

        return back();
    }
}
