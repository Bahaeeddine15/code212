<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationControllerAdmin extends Controller
{
    /**
     * Display a listing of the reservations for admin review.
     */
    public function index()
    {
        // Get all reservations, newest first
        $reservations = Reservation::orderBy('created_at', 'desc')->get();

        // Map to frontend-friendly structure
        $data = $reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'studentName' => $reservation->nom . ' ' . $reservation->prenom,
                'studentEmail' => $reservation->email,
                'studentPhone' => '', // Add if you have this field
                'studentId' => $reservation->num_apogee,
                'roomName' => '', // Add if you have room relation
                'roomId' => null, // Add if you have room relation
                'capacity' => null, // Add if you have room relation
                'date' => $reservation->date_reservation,
                'timeStart' => '', // Add if you have this field
                'timeEnd' => '',   // Add if you have this field
                'purpose' => '',   // Add if you have this field
                'description' => $reservation->description,
                'status' => $reservation->status,
                'submittedAt' => $reservation->created_at,
                'processedAt' => $reservation->updated_at,
                'processedBy' => '', // Add if you have this field
            ];
        });

        return Inertia::render('dashboard_admin/reservation/reservation_index', [
            'reservations' => $data,
        ]);
    }

    /**
     * Approve a reservation.
     */
    public function approve(Request $request, Reservation $reservation)
    {
        $reservation->status = Reservation::STATUS_APPROVED;
        $reservation->save();

        return redirect()->back()->with('success', 'Réservation approuvée.');
    }

    /**
     * Reject a reservation.
     */
    public function reject(Request $request, Reservation $reservation)
    {
        $reservation->status = Reservation::STATUS_REJECTED;
        $reservation->save();

        return redirect()->back()->with('success', 'Réservation rejetée.');
    }

    /**
     * Display the specified reservation.
     */
    public function show(Reservation $reservation)
    {
        $data = [
            'id' => $reservation->id,
            'studentName' => $reservation->nom . ' ' . $reservation->prenom,
            'studentEmail' => $reservation->email,
            'studentPhone' => '', // Add if you have this field
            'studentId' => $reservation->num_apogee,
            'roomName' => '', // Add if you have room relation
            'roomId' => null, // Add if you have room relation
            'capacity' => null, // Add if you have room relation
            'date' => $reservation->date_reservation,
            'timeStart' => '', // Add if you have this field
            'timeEnd' => '',   // Add if you have this field
            'purpose' => '',   // Add if you have this field
            'description' => $reservation->description,
            'status' => $reservation->status,
            'submittedAt' => $reservation->created_at,
            'processedAt' => $reservation->updated_at,
            'processedBy' => '', // Add if you have this field
        ];

        return Inertia::render('dashboard_admin/reservation/reservation_show', [
            'reservation' => $data,
        ]);
    }
}
