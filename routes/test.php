<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Routes de Test et Debug
|--------------------------------------------------------------------------
|
| Ce fichier contient toutes les routes utilisées pour tester et déboguer
| l'application. Ces routes doivent être SUPPRIMÉES en production.
|
| Pour inclure ces routes, ajoutez dans web.php :
| require __DIR__.'/test.php';
|
*/

// ==============================================
// ROUTES DE TEST EMAIL
// ==============================================

// Route de test basique pour vérifier l'envoi d'emails
Route::get('test-email', function() {
    try {
        \Illuminate\Support\Facades\Mail::raw('Ceci est un test d\'email depuis Laravel avec Gmail!', function($message) {
            $message->to('test@example.com')->subject('Test Email Laravel - Gmail');
        });
        return response()->json(['success' => true, 'message' => 'Email de test envoyé avec succès via Gmail!']);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()]);
    }
})->name('test.email');

// Route de test pour email avec votre vraie adresse
Route::get('test-email-real/{email}', function($email) {
    try {
        $config = config('mail');
        \Illuminate\Support\Facades\Mail::raw(
            "Félicitations ! Votre configuration Gmail fonctionne parfaitement.\n\n" .
            "Envoyé depuis votre application Laravel Code212.\n\n" .
            "Date: " . now()->format('d/m/Y H:i:s'),
            function($message) use ($email) {
                $message->to($email)->subject('🎉 Test Gmail réussi - Code212');
            }
        );
        return response()->json([
            'success' => true, 
            'message' => "Email de test envoyé avec succès à {$email} via Gmail!",
            'config' => [
                'host' => $config['mailers']['smtp']['host'],
                'port' => $config['mailers']['smtp']['port'],
                'username' => $config['mailers']['smtp']['username'],
                'encryption' => config('mail.mailers.smtp.encryption', 'Non défini')
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage(), 'type' => 'general']);
    }
})->name('test.email.real');

// ==============================================
// ROUTES DE TEST RÉSERVATIONS
// ==============================================

// Route de test pour envoyer une notification de réservation
Route::get('test-reservation-notification/{email}', function($email) {
    try {
        $reservation = \App\Models\Reservation::where('email', $email)->latest()->first();
        
        if (!$reservation) {
            return response()->json([
                'success' => false, 
                'error' => "Aucune réservation trouvée pour l'email: {$email}"
            ]);
        }
        
        $notifiableUser = new \App\Models\NotifiableUser($email);
        $notification = new \App\Notifications\ReservationStatusNotification($reservation);
        $notifiableUser->notify($notification);
        
        return response()->json([
            'success' => true, 
            'message' => "Notification de statut envoyée avec succès à {$email}",
            'reservation' => [
                'id' => $reservation->id,
                'status' => $reservation->status,
                'nom' => $reservation->nom,
                'date' => $reservation->date_reservation
            ]
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false, 
            'error' => 'Erreur lors de l\'envoi: ' . $e->getMessage()
        ]);
    }
})->name('test.reservation.notification');

// Route de test pour simuler un utilisateur avec réservation
Route::get('reservations/test/{email}', function($email) {
    session(['user_email' => $email]);
    return redirect()->route('etudiant.reservations');
})->name('test.reservation');

// Route de test pour simuler l'approbation/rejet d'une réservation
Route::get('reservations/test-status/{email}/{status}', function($email, $status, \App\Http\Controllers\ReservationController $controller) {
    $reservation = \App\Models\Reservation::where('email', $email)->latest()->first();
    if ($reservation && in_array($status, ['approved', 'rejected'])) {
        $request = new \Illuminate\Http\Request(['status' => $status]);
        $controller->updateStatus($request, $reservation);
    }
    session(['user_email' => $email]);
    return redirect()->route('etudiant.reservations');
})->name('test.reservation.status');

// ==============================================
// ROUTES DE DEBUG ET DIAGNOSTIC
// ==============================================

// Route de diagnostic pour voir les réservations
Route::get('debug-reservations', function() {
    $reservations = \App\Models\Reservation::all();
    return response()->json([
        'total' => $reservations->count(),
        'reservations' => $reservations->map(function($r) {
            return [
                'id' => $r->id,
                'email' => $r->email,
                'nom' => $r->nom,
                'status' => $r->status,
                'date_reservation' => $r->date_reservation,
                'created_at' => $r->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $r->updated_at->format('Y-m-d H:i:s'),
            ];
        })
    ]);
})->name('debug.reservations');

// Route de test pour diagnostic Gmail
Route::get('test-gmail-diagnosis', function() {
    $config = config('mail');
    return response()->json([
        'mail_config' => [
            'default' => $config['default'],
            'host' => $config['mailers']['smtp']['host'],
            'port' => $config['mailers']['smtp']['port'],
            'username' => $config['mailers']['smtp']['username'],
            'password_set' => !empty($config['mailers']['smtp']['password']),
            'encryption' => config('mail.mailers.smtp.encryption'),
            'from_address' => $config['from']['address'],
            'from_name' => $config['from']['name'],
        ]
    ]);
})->name('gmail.diagnosis');

// Route de test pour vérifier la session utilisateur
Route::get('test-session', function() {
    return response()->json([
        'session_data' => session()->all(),
        'user_email' => session('user_email'),
        'auth_user' => auth()->user() ? auth()->user()->email : 'Non connecté'
    ]);
})->name('test.session');
