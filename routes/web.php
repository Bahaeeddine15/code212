<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MediaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard_admin/dashboard');
    })->name('dashboard');
    
    Route::get('articles', function () {
        return Inertia::render('dashboard_admin/articles');
    })->name('articles');
    
    Route::get('events', function () {
        return Inertia::render('dashboard_admin/events');
    })->name('events');
    
    Route::get('media', [MediaController::class, 'index'])->name('media');
    Route::post('media', [MediaController::class, 'store']);
    Route::get('media/{id}', [MediaController::class, 'show']);
    Route::delete('media/{id}', [MediaController::class, 'destroy']);
    
    Route::get('formations', function () {
        return Inertia::render('dashboard_admin/formations');
    })->name('formations');
    
    Route::get('competitions', function () {
        return Inertia::render('dashboard_admin/competitions');
    })->name('competitions');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
