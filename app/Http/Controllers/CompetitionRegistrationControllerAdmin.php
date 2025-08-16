<?php

namespace App\Http\Controllers;

use App\Models\CompetitionRegistration;
use Illuminate\Http\Request;

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
     * Approve a pending registration.
     */
    public function approve(CompetitionRegistration $registration)
    {
        if ($registration->status === 'Confirmé') {
            return back()->with('info', "L'inscription est déjà confirmée.");
        }
        if ($registration->status === 'Refusé') {
            return back()->with('error', "Cette inscription a déjà été refusée.");
        }

        $registration->update([
            'status' => 'Confirmé',
        ]);

        return back()->with('success', "Inscription confirmée avec succès.");
    }

    /**
     * Reject a pending registration.
     */
    public function reject(CompetitionRegistration $registration)
    {
        if ($registration->status === 'Refusé') {
            return back()->with('info', "L'inscription est déjà refusée.");
        }
        if ($registration->status === 'Confirmé') {
            return back()->with('error', "Cette inscription a déjà été confirmée.");
        }

        $registration->update([
            'status' => 'Refusé',
        ]);

        return back()->with('success', "Inscription refusée avec succès.");
    }
}
