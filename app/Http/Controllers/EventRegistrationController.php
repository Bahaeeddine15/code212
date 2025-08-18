<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EventRegistrationController extends Controller
{
    public function store(Request $request, Event $event)
    {
        $user = $request->user();

        // Prevent registration if event finished or cancelled/completed
    $status = method_exists($event, 'computedStatus') ? $event->computedStatus() : ($event->status ?? 'upcoming');
    if (in_array($status, ['completed','cancelled'])) {
            return back()->withErrors(['registration' => "Les inscriptions ne sont pas ouvertes pour cet événement."]);
        }

        // Check existing request (pending/approved)
        $existing = EventRegistration::where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->whereNotIn('status', ['cancelled','rejected'])
            ->first();
        if ($existing) {
            return back()->withErrors(['registration' => 'Votre demande existe déjà (en attente ou approuvée).']);
        }

        // Check capacity
        $confirmedCount = EventRegistration::where('event_id', $event->id)
            ->where('status', 'approved')
            ->count();
    if ($event->max_attendees && $confirmedCount >= $event->max_attendees) {
            return back()->withErrors(['registration' => "Le nombre maximum de places est atteint."]);
        }

    EventRegistration::updateOrCreate(
            ['event_id' => $event->id, 'user_id' => $user->id],
            [
                'participant_name' => $user->name,
                'email' => $user->email,
        'status' => 'approved',
                'registered_at' => now(),
                'cancelled_at' => null,
            ]
        );

        return back()->with('success', 'Inscription confirmée.');
    }

    public function destroy(Request $request, Event $event)
    {
        $user = $request->user();
    $registration = EventRegistration::where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->first();
        if (!$registration) {
            return back()->withErrors(['registration' => "Vous n'êtes pas inscrit à cet événement."]);
        }

        $registration->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);

        return back()->with('success', 'Votre participation a été annulée.');
    }
}
