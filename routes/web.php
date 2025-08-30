<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/clubs-partners', function () {
    return Inertia::render('clubs-partners');
})->name('clubs.partners');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

Route::get('module-files/{file}/quality/{quality}', [App\Http\Controllers\ModuleFileController::class, 'openQuality'])
    ->middleware('auth:admin,web')
    ->name('student.module_files.open_quality');

require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/settings_admin.php';

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [App\Http\Controllers\DashboardEtudiantController::class, 'index'])->name('dashboard');

    Route::get('formations', [App\Http\Controllers\FormationController::class, 'index'])->name('etudiant.formations');
    Route::get('formations/{formation}', [App\Http\Controllers\FormationController::class, 'show'])->name('formations.show');

    // Register/Unregister
    Route::post('formations/{formation}/register', [App\Http\Controllers\FormationRegistrationController::class, 'store'])
        ->whereNumber('formation')
        ->name('formations.register');
    Route::delete('formations/{formation}/register', [App\Http\Controllers\FormationRegistrationController::class, 'destroy'])
        ->whereNumber('formation')
        ->name('formations.unregister');

    // Module Completion Toggle
    Route::post('/modules/{module}/toggle-completion', [App\Http\Controllers\ModuleCompletionController::class, 'toggle'])
        ->name('modules.toggle-completion');

    // FIXED: Student module file access routes with correct names
    Route::get('student/module-files/{file}', [App\Http\Controllers\ModuleFileController::class, 'open'])
        ->name('student.module_files.open');
    Route::get('student/module-files/{file}/download', [App\Http\Controllers\ModuleFileController::class, 'download'])
        ->name('student.module_files.download');
    Route::get('student/module-files/{file}/video', [App\Http\Controllers\ModuleFileController::class, 'showVideoStudent'])
        ->name('student.module_files.video');
    Route::get('student/module-files/{file}/quality/{quality}', [App\Http\Controllers\ModuleFileController::class, 'openQuality'])
        ->name('student.module_files.quality');

    Route::get('certificats', [App\Http\Controllers\CertificateController::class, 'index'])
        ->name('etudiant.certificats');

    // Events
    Route::get('events', [App\Http\Controllers\EventController::class, 'index'])->name('etudiant.events');
    Route::get('events/{event}', [App\Http\Controllers\EventController::class, 'show'])->name('etudiant.events.show');
    Route::post('events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'store'])->name('events.register');
    Route::delete('events/{event}/register', [App\Http\Controllers\EventRegistrationController::class, 'destroy'])->name('events.unregister');

    // Competition
    Route::get('competition', [App\Http\Controllers\CompetitionController::class, 'index'])->name('etudiant.competition');
    Route::get('competition/{id}/register', [App\Http\Controllers\CompetitionController::class, 'showRegistration'])->name('competition.register');
    Route::post('competition/{id}/register', [App\Http\Controllers\CompetitionController::class, 'storeRegistration'])->name('competition.store');
    Route::get('competition/{competitionId}/registration/{registrationId}/edit', [App\Http\Controllers\CompetitionController::class, 'editRegistration'])->name('competition.registration.edit');
    Route::put('competition/{competitionId}/registration/{registrationId}', [App\Http\Controllers\CompetitionController::class, 'updateRegistration'])->name('competition.registration.update');
    Route::get('competition/{id}', [App\Http\Controllers\CompetitionController::class, 'showDetails'])->name('competition.show');

    // Articles
    Route::get('articles', [App\Http\Controllers\ArticleController::class, 'index'])->name('etudiant.article');
    Route::get('articles/featured', [App\Http\Controllers\ArticleController::class, 'featured'])->name('etudiant.article.featured');
    Route::get('articles/latest', [App\Http\Controllers\ArticleController::class, 'latest'])->name('etudiant.article.latest');
    Route::get('articles/{article}', [App\Http\Controllers\ArticleController::class, 'show'])->name('etudiant.article.show');

    // Media
    Route::resource('media', App\Http\Controllers\MediaController::class)->parameters(['media' => 'media']);
    Route::get('/media/folder/{folder}', [\App\Http\Controllers\MediaController::class, 'showFolder'])->name('media.folder');
    Route::get('/media/{media}/stream/{quality?}', [App\Http\Controllers\MediaController::class, 'stream'])->name('media.stream');
    Route::get('/media/{media}/stream/quality/{quality}', [App\Http\Controllers\MediaController::class, 'stream'])->name('media.stream.quality');

    // Reservations
    Route::get('reservations', [App\Http\Controllers\ReservationController::class, 'index'])->name('etudiant.reservations');
    Route::post('reservations', [App\Http\Controllers\ReservationController::class, 'store'])->name('reservations.store');
    Route::get('reservations/{reservation}/edit', [App\Http\Controllers\ReservationController::class, 'edit'])->name('reservations.edit');
    Route::put('reservations/{reservation}', [App\Http\Controllers\ReservationController::class, 'update'])->name('reservations.update');
    Route::delete('reservations/{reservation}', [App\Http\Controllers\ReservationController::class, 'destroy'])->name('reservations.destroy');
    Route::patch('reservations/{reservation}/status', [App\Http\Controllers\ReservationController::class, 'updateStatus'])->name('reservations.updateStatus');

    Route::get('approve-reservation/{id}', function ($id) {
        $reservation = \App\Models\Reservation::find($id);
        if (!$reservation) {
            return response()->json(['error' => 'Réservation non trouvée'], 404);
        }
        if ($reservation->status !== 'pending') {
            return response()->json(['error' => 'Cette réservation a déjà été traitée'], 400);
        }
        $reservation->update(['status' => 'approved']);
        try {
            $notifiableUser = new \App\Models\NotifiableUser($reservation->email, $reservation->prenom . ' ' . $reservation->nom);
            $notifiableUser->notify(new \App\Notifications\ReservationStatusNotification($reservation));
            $emailStatus = "Email envoyé avec succès à {$reservation->email}";
        } catch (\Exception $e) {
            $emailStatus = "Erreur email: " . $e->getMessage();
            Log::error('Erreur envoi email notification: ' . $e->getMessage());
        }
        return response()->json([
            'success' => true,
            'message' => "Réservation de {$reservation->prenom} {$reservation->nom} approuvée avec succès!",
            'email_status' => $emailStatus,
            'reservation_updated' => true
        ]);
    })->name('approve.reservation');

    Route::get('reject-reservation/{id}', function ($id) {
        $reservation = \App\Models\Reservation::find($id);
        if (!$reservation) {
            return response()->json(['error' => 'Réservation non trouvée'], 404);
        }
        if ($reservation->status !== 'pending') {
            return response()->json(['error' => 'Cette réservation a déjà été traitée'], 400);
        }
        $reservation->update(['status' => 'rejected']);
        try {
            $notifiableUser = new \App\Models\NotifiableUser($reservation->email, $reservation->prenom . ' ' . $reservation->nom);
            $notifiableUser->notify(new \App\Notifications\ReservationStatusNotification($reservation));
            $emailStatus = "Email envoyé avec succès à {$reservation->email}";
        } catch (\Exception $e) {
            $emailStatus = "Erreur email: " . $e->getMessage();
            Log::error('Erreur envoi email notification: ' . $e->getMessage());
        }
        return response()->json([
            'success' => true,
            'message' => "Réservation de {$reservation->prenom} {$reservation->nom} rejetée avec succès!",
            'email_status' => $emailStatus,
            'reservation_updated' => true
        ]);
    })->name('reject.reservation');

    Route::post('reservations/dismiss-notification', function (Request $request) {
        $email = session('user_email');
        if ($email && $request->reservation_id) {
            session(["notification_dismissed_{$request->reservation_id}" => true]);
        }
        return response()->json(['success' => true]);
    })->name('reservations.dismissNotification');
});



// ⚠️ ROUTES DE TEST - À SUPPRIMER EN PRODUCTION
// Décommentez la ligne suivante pour activer les routes de test :
// require __DIR__.'/test.php';
