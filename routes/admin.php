<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleControllerAdmin;
use App\Http\Controllers\CompetitionControllerAdmin;
use Inertia\Inertia;
use App\Http\Controllers\MediaControllerAdmin;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\FormationControllerAdmin;
use App\Http\Controllers\ModuleControllerAdmin;
use App\Http\Controllers\EventControllerAdmin;
use App\Http\Controllers\ReservationControllerAdmin;
use App\Http\Controllers\EventRegistrationAdminController;
use App\Http\Controllers\CompetitionRegistrationControllerAdmin;
use App\Http\Controllers\Auth\AdminAuthController;

// Admin authentication routes (accessible without authentication) - ADD ADMIN PREFIX
Route::prefix('admin')->group(function () {
    Route::get('login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('login', [AdminAuthController::class, 'login'])->name('admin.login.post');
    Route::get('supermegaregister', [AdminAuthController::class, 'showRegisterForm'])->name('admin.register');
    Route::post('register', [AdminAuthController::class, 'register'])->name('admin.register.post');
    Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

// Protected admin routes
Route::prefix('admin')->middleware(['auth:admin', 'verified'])->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard_admin/dashboard', [
            'name' => Auth::user()->name,
        ]);
    })->name('dashboard'); // This will be admin.dashboard

    Route::resource('articles', ArticleControllerAdmin::class);

    // Events routes - will automatically be named admin.events.*
    Route::resource('events', EventControllerAdmin::class);
    Route::patch('/events/{id}/status', [EventControllerAdmin::class, 'updateStatus'])->name('events.updateStatus');
    // Event registrations management
    Route::get('/events/{event}/registrations', [EventRegistrationAdminController::class, 'index'])->name('events.registrations');
    Route::patch('/events/registrations/{registration}/approve', [EventRegistrationAdminController::class, 'approve'])->name('events.registrations.approve');
    Route::patch('/events/registrations/{registration}/reject', [EventRegistrationAdminController::class, 'reject'])->name('events.registrations.reject');

    // Media routes - cleaned up
    Route::resource('media', MediaControllerAdmin::class)->parameters(['media' => 'media']);
    Route::get('/media/{media}/download', [MediaControllerAdmin::class, 'download'])->name('media.download');
    Route::get('/media/folder/{folder}', [MediaControllerAdmin::class, 'showFolder'])->name('media.folder');
    Route::delete('/media/folder/{folder}', [MediaControllerAdmin::class, 'destroyFolder'])->name('media.folder.destroy');
    Route::get('/media/{media}/stream/{quality?}', [MediaControllerAdmin::class, 'stream'])->name('media.stream');
    Route::get('/media/{media}/stream/quality/{quality}', [MediaControllerAdmin::class, 'stream'])->name('media.stream.quality');

    Route::resource('formations', FormationControllerAdmin::class);
    Route::resource('formations.modules', ModuleControllerAdmin::class)->shallow();

    Route::resource('competitions', CompetitionControllerAdmin::class);
    Route::patch('/competitions/{competition}/close', [CompetitionControllerAdmin::class, 'close'])->name('competitions.close');

    // Approve/Reject competition registrations
    Route::patch('/competition-registrations/{registration}/approve', [CompetitionRegistrationControllerAdmin::class, 'approve'])->name('competitionRegistrations.approve');
    Route::patch('/competition-registrations/{registration}/reject', [CompetitionRegistrationControllerAdmin::class, 'reject'])->name('competitionRegistrations.reject');
    Route::delete('/competition-registrations/{registration}', [CompetitionRegistrationControllerAdmin::class, 'destroy'])->name('competitionRegistrations.destroy');

    Route::resource('reservations', ReservationControllerAdmin::class);
    Route::patch('/reservations/{reservation}/approve', [ReservationControllerAdmin::class, 'approve'])->name('reservations.approve');
    Route::patch('/reservations/{reservation}/reject', [ReservationControllerAdmin::class, 'reject'])->name('reservations.reject');
});
