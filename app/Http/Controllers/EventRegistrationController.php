<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventRegistrationController extends Controller
{
    public function store(Request $request, Event $event)
    {
        $student = auth('web')->user(); // your student guard
        abort_unless($student, 403);

        $reg = EventRegistration::firstOrNew([
            'event_id'    => $event->id,
            'etudiant_id' => $student->id,  // ✅ Remettre etudiant_id
        ]);

        if ($reg->exists && $reg->status === 'rejected') {
            return back()->withErrors(['register' => 'Votre demande a été refusée. Vous ne pouvez pas vous réinscrire.']);
        }

        $reg->fill([
            'participant_name' => $student->name,
            'email'            => $student->email,
            'phone'            => $student->telephone,
            'status'           => 'waitlist',
            'registered_at'    => now(),
            'cancelled_at'     => null,
        ])->save();

    
        return back()->with('success', 'Demande envoyée. En attente de validation.');
    }

    public function destroy(Request $request, Event $event)
    {
        $student = auth('web')->user();
        abort_unless($student, 403);

        $reg = EventRegistration::where('event_id',$event->id)
            ->where('etudiant_id',$student->id)->first();  // ✅ Remettre etudiant_id

        if ($reg) {
            $reg->update([
                'status' => 'cancelled',
                'cancelled_at' => now(),
            ]);
        }
   
        return back()->with('success', 'Votre demande a été annulée.');
    }
}
