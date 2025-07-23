<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('etudiant/DashboardEtudiant');
    })->name('dashboard');

    Route::get('formations', [App\Http\Controllers\FormationController::class, 'index'])->name('etudiant.formations');

    Route::get('certificats', function () {
        return Inertia::render('etudiant/Certificats');
    })->name('etudiant.certificats');

    // Routes pour les réservations
    Route::get('reservations', [App\Http\Controllers\ReservationController::class, 'index'])->name('etudiant.reservations');
    Route::post('reservations', [App\Http\Controllers\ReservationController::class, 'store'])->name('reservations.store');
    Route::get('reservations/{reservation}/edit', [App\Http\Controllers\ReservationController::class, 'edit'])->name('reservations.edit');
    Route::put('reservations/{reservation}', [App\Http\Controllers\ReservationController::class, 'update'])->name('reservations.update');
    Route::delete('reservations/{reservation}', [App\Http\Controllers\ReservationController::class, 'destroy'])->name('reservations.destroy');
    
    // Route pour l'administration des réservations (optionnel)
    Route::patch('reservations/{reservation}/status', [App\Http\Controllers\ReservationController::class, 'updateStatus'])->name('reservations.updateStatus');
    
    // Routes simples pour approuver/rejeter par URL (sans interface admin)
    Route::get('approve-reservation/{id}', function($id) {
        // Augmenter le temps d'exécution pour cette route
        set_time_limit(120);
        
        $reservation = \App\Models\Reservation::find($id);
        
        if (!$reservation) {
            return response()->json(['error' => 'Réservation non trouvée'], 404);
        }
        
        if ($reservation->status !== 'pending') {
            return response()->json(['error' => 'Cette réservation a déjà été traitée'], 400);
        }
        
        // Mettre à jour le statut d'abord
        $reservation->update(['status' => 'approved']);
        
        // Envoyer la notification de manière asynchrone avec timeout réduit
        $emailStatus = "Statut mis à jour avec succès";
        
        try {
            // Configuration temporaire pour éviter les timeouts
            ini_set('default_socket_timeout', 15);
            
            $notifiableUser = new \App\Models\NotifiableUser($reservation->email, $reservation->prenom . ' ' . $reservation->nom);
            $notifiableUser->notify(new \App\Notifications\ReservationStatusNotification($reservation));
            $emailStatus = "Email d'approbation envoyé avec succès à {$reservation->email}";
            
        } catch (\Swift_TransportException $e) {
            $emailStatus = "Approbation enregistrée, mais erreur d'envoi d'email (SMTP): " . $e->getMessage();
            \Log::error('Erreur SMTP lors de l\'approbation: ' . $e->getMessage());
        } catch (\Exception $e) {
            $emailStatus = "Approbation enregistrée, mais erreur d'envoi d'email: " . $e->getMessage();
            \Log::error('Erreur envoi email notification approbation: ' . $e->getMessage());
        }
        
        return response()->json([
            'success' => true,
            'message' => "✅ Réservation de {$reservation->prenom} {$reservation->nom} approuvée avec succès!",
            'email_status' => $emailStatus,
            'reservation_updated' => true,
            'reservation_id' => $reservation->id,
            'new_status' => 'approved'
        ]);
    })->name('approve.reservation');
    
    Route::get('reject-reservation/{id}', function($id) {
        // Augmenter le temps d'exécution pour cette route
        set_time_limit(120);
        
        $reservation = \App\Models\Reservation::find($id);
        
        if (!$reservation) {
            return response()->json(['error' => 'Réservation non trouvée'], 404);
        }
        
        if ($reservation->status !== 'pending') {
            return response()->json(['error' => 'Cette réservation a déjà été traitée'], 400);
        }
        
        // Mettre à jour le statut d'abord
        $reservation->update(['status' => 'rejected']);
        
        // Envoyer la notification de manière asynchrone avec timeout réduit
        $emailStatus = "Statut mis à jour avec succès";
        
        try {
            // Configuration temporaire pour éviter les timeouts
            ini_set('default_socket_timeout', 15);
            
            $notifiableUser = new \App\Models\NotifiableUser($reservation->email, $reservation->prenom . ' ' . $reservation->nom);
            $notifiableUser->notify(new \App\Notifications\ReservationStatusNotification($reservation));
            $emailStatus = "Email de rejet envoyé avec succès à {$reservation->email}";
            
        } catch (\Swift_TransportException $e) {
            $emailStatus = "Rejet enregistré, mais erreur d'envoi d'email (SMTP): " . $e->getMessage();
            \Log::error('Erreur SMTP lors du rejet: ' . $e->getMessage());
        } catch (\Exception $e) {
            $emailStatus = "Rejet enregistré, mais erreur d'envoi d'email: " . $e->getMessage();
            \Log::error('Erreur envoi email notification rejet: ' . $e->getMessage());
        }
        
        return response()->json([
            'success' => true,
            'message' => "✅ Réservation de {$reservation->prenom} {$reservation->nom} rejetée avec succès!",
            'email_status' => $emailStatus,
            'reservation_updated' => true,
            'reservation_id' => $reservation->id,
            'new_status' => 'rejected'
        ]);
    })->name('reject.reservation');
    
    // Route pour marquer la notification comme lue
    Route::post('reservations/dismiss-notification', function(Request $request) {
        $email = session('user_email');
        if ($email && $request->reservation_id) {
            session(["notification_dismissed_{$request->reservation_id}" => true]);
        }
        return response()->json(['success' => true]);
    })->name('reservations.dismissNotification');
    
});

// Route de rejet rapide sans email (pour test/urgence)
Route::get('quick-reject-reservation/{id}', function($id) {
    $reservation = \App\Models\Reservation::find($id);
    
    if (!$reservation) {
        return response()->json(['error' => 'Réservation non trouvée'], 404);
    }
    
    if ($reservation->status !== 'pending') {
        return response()->json(['error' => 'Cette réservation a déjà été traitée'], 400);
    }
    
    $reservation->update(['status' => 'rejected']);
    
    return response()->json([
        'success' => true,
        'message' => "⚡ Réservation #{$reservation->id} rejetée rapidement (sans email)",
        'reservation_id' => $reservation->id,
        'new_status' => 'rejected',
        'note' => 'Email de notification non envoyé - traitement rapide'
    ]);
})->name('quick.reject.reservation');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// ⚠️ ROUTES DE TEST - À SUPPRIMER EN PRODUCTION
// Décommentez la ligne suivante pour activer les routes de test :
require __DIR__.'/test.php';