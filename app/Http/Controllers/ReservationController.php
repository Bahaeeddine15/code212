<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\NotifiableUser;
use App\Notifications\ReservationStatusNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        // Pour une démonstration simple, nous utiliserons l'email en session
        // Dans un vrai projet, vous utiliseriez auth()->user()->id
        
        // Simuler un email utilisateur (vous pouvez le récupérer de la session ou auth)
        $userEmail = session('user_email'); // Vous pouvez adapter selon votre système d'auth
        
        $existingReservation = null;
        $lastProcessedReservation = null;
        
        if ($userEmail) {
            // Réservation en attente
            $existingReservation = Reservation::where('email', $userEmail)
                ->where('status', Reservation::STATUS_PENDING)
                ->first();
            
            // Dernière réservation traitée (pour notification)
            if (!$existingReservation) {
                $lastProcessedReservation = Reservation::where('email', $userEmail)
                    ->whereIn('status', [Reservation::STATUS_APPROVED, Reservation::STATUS_REJECTED])
                    ->latest('updated_at')
                    ->first();
            }
        }
        
        return Inertia::render('etudiant/Reservations', [
            'existingReservation' => $existingReservation,
            'lastProcessedReservation' => $lastProcessedReservation,
            'userEmail' => $userEmail,
            'showNotification' => $lastProcessedReservation ? 
                !session("notification_dismissed_{$lastProcessedReservation->id}") : false,
        ]);
    }

    public function store(Request $request)
    {
        // Vérifier si l'utilisateur a déjà une réservation en attente
        $existingPendingReservation = Reservation::where('email', $request->email)
            ->where('status', Reservation::STATUS_PENDING)
            ->first();

        if ($existingPendingReservation) {
            return back()->withErrors([
                'email' => 'Vous avez déjà une réservation en attente. Veuillez attendre qu\'elle soit traitée avant d\'en faire une nouvelle.'
            ]);
        }

        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'num_apogee' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'description' => 'required|string',
            'date_reservation' => 'required|date|after_or_equal:today',
            'resource_type' => 'required|in:pc,local',
            'location_type' => 'nullable|required_if:resource_type,local|in:salle_conference,salle_reunion',
            'room_details' => 'nullable|required_if:location_type,salle_reunion|in:1er_etage,2eme_etage,3eme_etage',
        ]);

        Reservation::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'num_apogee' => $request->num_apogee,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'description' => $request->description,
            'date_reservation' => $request->date_reservation,
            'resource_type' => $request->resource_type,
            'location_type' => $request->location_type,
            'room_details' => $request->room_details,
            'status' => Reservation::STATUS_PENDING,
        ]);

        // Stocker l'email en session pour le tracking
        session(['user_email' => $request->email]);

        return back()->with('success', 'Réservation créée avec succès! Elle sera traitée sous peu.');
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:' . Reservation::STATUS_APPROVED . ',' . Reservation::STATUS_REJECTED,
        ]);

        $oldStatus = $reservation->status;
        $newStatus = $request->status;

        $reservation->update([
            'status' => $newStatus,
        ]);

        // Envoyer une notification par email si le statut a changé
        if ($oldStatus !== $newStatus && in_array($newStatus, [Reservation::STATUS_APPROVED, Reservation::STATUS_REJECTED])) {
            $notifiableUser = new NotifiableUser(
                $reservation->email, 
                $reservation->prenom . ' ' . $reservation->nom
            );
            
            $notifiableUser->notify(new ReservationStatusNotification($reservation));
        }

        $statusMessage = $request->status === Reservation::STATUS_APPROVED ? 'approuvée' : 'rejetée';
        
        return back()->with('success', "Réservation {$statusMessage} avec succès. Un email de notification a été envoyé.");
    }

    public function edit(Reservation $reservation)
    {
        // Vérifier que la réservation peut être modifiée (uniquement si en attente)
        if ($reservation->status !== Reservation::STATUS_PENDING) {
            return back()->with('error', 'Seules les réservations en attente peuvent être modifiées.');
        }

        return Inertia::render('etudiant/EditReservation', [
            'reservation' => $reservation
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        // Vérifier que la réservation peut être modifiée
        if ($reservation->status !== Reservation::STATUS_PENDING) {
            return back()->with('error', 'Seules les réservations en attente peuvent être modifiées.');
        }

        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'num_apogee' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'description' => 'required|string',
            'date_reservation' => 'required|date|after_or_equal:today',
            'resource_type' => 'required|in:pc,local',
            'location_type' => 'nullable|required_if:resource_type,local|in:salle_conference,salle_reunion',
            'room_details' => 'nullable|required_if:location_type,salle_reunion|in:1er_etage,2eme_etage,3eme_etage',
        ]);

        $reservation->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'num_apogee' => $request->num_apogee,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'description' => $request->description,
            'date_reservation' => $request->date_reservation,
            'resource_type' => $request->resource_type,
            'location_type' => $request->location_type,
            'room_details' => $request->room_details,
        ]);

        // Mettre à jour l'email en session si changé
        session(['user_email' => $request->email]);

        return redirect()->route('etudiant.reservations')->with('success', 'Réservation mise à jour avec succès!');
    }

    public function destroy(Reservation $reservation)
    {
        // Vérifier que la réservation peut être supprimée (uniquement si en attente)
        if ($reservation->status !== Reservation::STATUS_PENDING) {
            return back()->with('error', 'Seules les réservations en attente peuvent être supprimées.');
        }

        $reservation->delete();

        return back()->with('success', 'Réservation supprimée avec succès.');
    }
}
