<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('etudiant/DashboardEtudiant');
    })->name('etudiant.dashboard');



    Route::get('formations', function () {
        return Inertia::render('etudiant/Formations');
    })->name('etudiant.dashboard');

    Route::get('certificats', function () {
        return Inertia::render('etudiant/Certificats');
    })->name('etudiant.certificats');

    
    Route::get('reservations', function () {
        return Inertia::render('etudiant/Reservations');
    })->name('etudiant.reservations');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';