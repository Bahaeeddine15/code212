<?php

use App\Http\Controllers\FormationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/etudiant/dashboard', function () {
    $formations = \App\Models\Formation::all();
    return Inertia::render('etudiant/DashboardEtudiant', [
        'formations' => $formations
    ]);
})->name('etudiant.dashboard');

Route::get('/etudiant/dashboard/formation', [FormationController::class, 'dashboard'])->name('formation.dashboard');

Route::prefix('etudiant')->group(function () {
    Route::get('dashboard/formation/{id}', [FormationController::class, 'show'])->name('etudiant.formation.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Formation routes
    Route::resource('formations', FormationController::class);
    Route::get('formations-dashboard', [FormationController::class, 'dashboard'])->name('formations.dashboard');
    Route::get('/formations/{formation}', [FormationController::class, 'show'])->name('formations.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
