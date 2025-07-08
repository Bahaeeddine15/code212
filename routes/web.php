<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CompetitionController;
use Inertia\Inertia;
use App\Http\Controllers\MediaController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard_admin/dashboard', [
            'name' => Auth::user()->name,
        ]);
    })->name('dashboard');

    Route::resource('articles', ArticleController::class);

    Route::get('events', function () {
        return Inertia::render('dashboard_admin/events');
    })->name('events');

    Route::get('media', function () {
        return Inertia::render('dashboard_admin/galerie/media_index');
    })->name('media');

    // Route::resource('media', MediaController::class);
    // Route::get('media/upload', [MediaController::class, 'upload'])->name('media.upload');
    // Route::post('media/bulk-store', [MediaController::class, 'bulkStore'])->name('media.bulkStore');
    // Route::get('media/{media}/download', [MediaController::class, 'download'])->name('media.download');

    Route::get('formations', function () {
        return Inertia::render('dashboard_admin/formations');
    })->name('formations');

    Route::resource('competitions', CompetitionController::class);
    Route::patch('/competitions/{competition}/close', [CompetitionController::class, 'close'])
        ->name('competitions.close');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
