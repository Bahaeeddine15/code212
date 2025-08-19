<?php

namespace App\Http\Controllers;

use App\Models\CompetitionRegistration;
use App\Models\NotifiableUser;
use App\Notifications\CompetitionRegistrationStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CompetitionRegistrationControllerAdmin extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CompetitionRegistration $competitionRegistration)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CompetitionRegistration $competitionRegistration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompetitionRegistration $competitionRegistration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompetitionRegistration $competitionRegistration)
    {
        //
    }

    /**
     * Approve a pending registration and send notification email.
     */
    public function approve($id)
    {
        $registration = CompetitionRegistration::findOrFail($id);
        $oldStatus = $registration->status;
        
        $registration->status = 'Confirmé';
        $registration->save();

        // Send email notification if status changed
        if ($oldStatus !== 'Confirmé') {
            $this->sendNotificationEmail($registration);
        }

        return back()->with('success', 'Inscription confirmée et email de notification envoyé.');
    }

    /**
     * Reject a pending registration and send notification email.
     */
    public function reject($id)
    {
        $registration = CompetitionRegistration::findOrFail($id);
        $oldStatus = $registration->status;
        
        $registration->status = 'Refusé';
        $registration->save();

        // Send email notification if status changed
        if ($oldStatus !== 'Refusé') {
            $this->sendNotificationEmail($registration);
        }

        return back()->with('success', 'Inscription refusée et email de notification envoyé.');
    }

    /**
     * Send notification email to the registered participant.
     */
    private function sendNotificationEmail(CompetitionRegistration $registration)
    {
        try {
            // Create a notifiable user instance
            $notifiableUser = new NotifiableUser($registration->email, $registration->participant_name);

            // Send the notification
            $notifiableUser->notify(new CompetitionRegistrationStatusNotification($registration));
            
        } catch (\Exception $e) {
            // Log the error but don't fail the status update
            Log::error('Failed to send competition registration notification: ' . $e->getMessage());
        }
    }
}
