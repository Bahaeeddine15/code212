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
use App\Http\Controllers\ModuleFileController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\ClubControllerAdmin;

// Admin authentication routes
Route::prefix('admin')->group(function () {
    Route::get('login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('login', [AdminAuthController::class, 'login'])->name('admin.login.post');
    Route::get('supermegaregister', [AdminAuthController::class, 'showRegisterForm'])->name('admin.register');
    Route::post('register', [AdminAuthController::class, 'register'])->name('admin.register.post');
    Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

// Protected admin routes
Route::prefix('admin')->middleware(['auth:admin', 'verified'])->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');

    Route::resource('articles', ArticleControllerAdmin::class);

    // Events
    Route::resource('events', EventControllerAdmin::class);
    Route::patch('/events/{id}/status', [EventControllerAdmin::class, 'updateStatus'])->name('events.updateStatus');
    Route::get('/events/{event}/registrations', [EventRegistrationAdminController::class, 'index'])
        ->name('events.registrations.index');

    Route::patch('/events/{event}/registrations/{registration}/approve', [EventRegistrationAdminController::class, 'approve'])
        ->name('events.registrations.approve');

    Route::patch('/events/{event}/registrations/{registration}/reject', [EventRegistrationAdminController::class, 'reject'])
        ->name('events.registrations.reject');

    // Media
    Route::resource('media', MediaControllerAdmin::class)->parameters(['media' => 'media']);
    Route::get('/media/{media}/download', [MediaControllerAdmin::class, 'download'])->name('media.download');
    Route::get('/media/folder/{folder}', [MediaControllerAdmin::class, 'showFolder'])->name('media.folder');
    Route::delete('/media/folder/{folder}', [MediaControllerAdmin::class, 'destroyFolder'])->name('media.folder.destroy');
    Route::get('/media/{media}/stream/{quality?}', [MediaControllerAdmin::class, 'stream'])->name('media.stream');
    Route::get('/media/{media}/stream/quality/{quality}', [MediaControllerAdmin::class, 'stream'])->name('media.stream.quality');

    // Formations
    Route::resource('formations', FormationControllerAdmin::class);
    Route::patch('/formations/{formation}/status', [FormationControllerAdmin::class, 'updateStatus'])->name('formations.updateStatus');

    // Modules
    Route::get('formations/{formation}/modules', [ModuleControllerAdmin::class, 'index'])->name('formations.modules.index');
    Route::get('formations/{formation}/modules/create', [ModuleControllerAdmin::class, 'create'])->name('formations.modules.create');
    Route::post('formations/{formation}/modules', [ModuleControllerAdmin::class, 'store'])->name('formations.modules.store');
    Route::get('modules/{module}', [ModuleControllerAdmin::class, 'show'])->name('modules.show');
    Route::get('modules/{module}/edit', [ModuleControllerAdmin::class, 'edit'])->name('modules.edit');
    Route::put('modules/{module}', [ModuleControllerAdmin::class, 'update'])->name('modules.update');
    Route::delete('modules/{module}', [ModuleControllerAdmin::class, 'destroy'])->name('modules.destroy');

    // FIXED: Admin file access routes
    Route::get('module-files/{file}', [ModuleFileController::class, 'open'])
        ->name('modules.files.open');
    Route::get('module-files/{file}/download', [ModuleFileController::class, 'download'])
        ->name('modules.files.download');
    Route::get('module-files/{file}/video', [ModuleFileController::class, 'showVideoAdmin'])
        ->name('modules.files.video');
    Route::get('module-files/{file}/quality/{quality}', [ModuleFileController::class, 'openQuality'])
        ->name('admin.modules.files.quality');

    // Competitions
    Route::resource('competitions', CompetitionControllerAdmin::class);
    Route::patch('/competitions/{competition}/close', [CompetitionControllerAdmin::class, 'close'])->name('competitions.close');
    Route::patch('/competition-registrations/{registration}/approve', [CompetitionRegistrationControllerAdmin::class, 'approve'])->name('competitionRegistrations.approve');
    Route::patch('/competition-registrations/{registration}/reject', [CompetitionRegistrationControllerAdmin::class, 'reject'])->name('competitionRegistrations.reject');
    Route::delete('/competition-registrations/{registration}', [CompetitionRegistrationControllerAdmin::class, 'destroy'])->name('competitionRegistrations.destroy');

    // Reservations
    Route::resource('reservations', ReservationControllerAdmin::class);
    Route::patch('/reservations/{reservation}/approve', [ReservationControllerAdmin::class, 'approve'])->name('reservations.approve');
    Route::patch('/reservations/{reservation}/reject', [ReservationControllerAdmin::class, 'reject'])->name('reservations.reject');

    // Certificate Management Routes
    Route::get('certificates', [App\Http\Controllers\CertificateAdminController::class, 'index'])
        ->name('certificates.index');
    Route::post('certificates/{certificate}/generate', [App\Http\Controllers\CertificateAdminController::class, 'generate'])
        ->name('certificates.generate');
    Route::post('certificates/bulk-generate', [App\Http\Controllers\CertificateAdminController::class, 'bulkGenerate'])
        ->name('certificates.bulk-generate');
    Route::get('certificates/{certificate}/download', [App\Http\Controllers\CertificateAdminController::class, 'download'])
        ->name('certificates.download');
    Route::get('certificates/statistics', [App\Http\Controllers\CertificateAdminController::class, 'statistics'])
        ->name('certificates.statistics');
    Route::delete('certificates/{certificate}', [App\Http\Controllers\CertificateAdminController::class, 'destroy'])
        ->name('certificates.destroy');

    // Generate certificate for specific student from modules page
    Route::post('certificates/generate-for-student', [App\Http\Controllers\CertificateAdminController::class, 'generateForStudent'])
        ->name('certificates.generate-for-student');
    
    Route::resource('clubs', ClubControllerAdmin::class);
});
