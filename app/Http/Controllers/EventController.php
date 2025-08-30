<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    

    private function computeNormalizedStatus(Event $e): string
    {
        // If you already store a status column, normalize it
        $raw = $e->status ? strtolower(trim($e->status)) : null;
        if (in_array($raw, ['upcoming','ongoing','completed','cancelled'], true)) {
            return $raw;
        }

        // Derive from dates if not explicitly set
        $now = now();
        if ($e->start_date && $e->end_date) {
            if ($now->lt($e->start_date))   return 'upcoming';
            if ($now->between($e->start_date, $e->end_date)) return 'ongoing';
            return 'completed';
        }

        return 'upcoming';
    }

    private function seatsLeft(Event $e, int $registeredCount): ?int
    {
        return $e->max_attendees ? max(0, $e->max_attendees - $registeredCount) : null;
    }

    private function canRegisterForEvent(string $status, ?string $myStatus, Event $e, int $registeredCount): bool
    {
        // Only allow new registrations while upcoming (adjust if you want to allow during ongoing)
        if ($status !== 'upcoming') return false;

        // Student can apply if not already registered/waitlist/rejected
        // If they cancelled previously, they can re-apply.
        if (in_array($myStatus, ['registered','waitlist','rejected'], true)) return false;

        // Capacity guard (if you want waitlist when full, flip this to true)
        $seatsLeft = $this->seatsLeft($e, $registeredCount);
        if (is_int($seatsLeft) && $seatsLeft <= 0) return false;

        return true;
    }

    public function index()
    {
        $events = Event::whereDate('end_date', '>=', now()->toDateString())
            ->orderBy('start_date', 'asc')
            ->get()
            ->map(function ($e) {
                $status = $this->computeNormalizedStatus($e);

                $registeredCount = EventRegistration::where('event_id', $e->id)
                    ->where('status', 'registered')->count();

                $seatsLeft = $this->seatsLeft($e, $registeredCount);

                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'description' => $e->description,
                    'start_date' => $e->start_date?->toISOString(),
                    'end_date' => $e->end_date?->toISOString(),
                    'location' => $e->location,
                    'category' => $e->category,
                    'type' => $e->type ?? 'Événement',
                    'max_attendees' => $e->max_attendees,
                    'status' => $status,
                    'logo' => $e->logo ? Storage::url($e->logo) : null,
                    'registrations_count' => $registeredCount,
                    'seats_left' => $seatsLeft,
                    // not computing can_register here (list page usually doesn’t need it)
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
        $registeredCount = EventRegistration::where('event_id', $event->id)
            ->where('status', 'registered')
            ->count();

        // student (adjust guard if needed)
        $me = auth('web')->user();

        $myStatus = null; // 'waitlist' | 'registered' | 'rejected' | 'cancelled' | null
        if ($me) {
            $myReg = EventRegistration::where('event_id', $event->id)
                ->where('etudiant_id', $me->id)   // you asked to use etudiant_id
                ->latest()->first();
            $myStatus = $myReg?->status;
        }

        $status    = $this->computeNormalizedStatus($event);
        $seatsLeft = $this->seatsLeft($event, $registeredCount);
        $canRegister = $this->canRegisterForEvent($status, $myStatus, $event, $registeredCount);

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
            'status' => $status,                         // <- always normalized
            'logo' => $event->logo ? Storage::url($event->logo) : null,
            'created_at' => $event->created_at?->toISOString(),
            'updated_at' => $event->updated_at?->toISOString(),
            'registrations_count' => $registeredCount,
            'seats_left' => $seatsLeft,

            // NEW: student’s own status + can_apply flag
            'registration_status' => $myStatus,          // null | 'waitlist' | 'registered' | 'rejected' | 'cancelled'
            'can_register'        => $canRegister,       // boolean the UI will trust
        ];

        return inertia('etudiant/event-detail', ['event' => $data]);
    }
}
