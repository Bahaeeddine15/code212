<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        return Inertia::render('dashboard_admin/dashboard', ['name' => $user->name]);
    })->name('dashboard');

    Route::resource('articles', ArticleController::class);

    Route::get('events', function () {
        return Inertia::render('dashboard_admin/events');
    })->name('events');

    Route::get('media', function () {
        return Inertia::render('dashboard_admin/media');
    })->name('media');

    Route::get('formations', function () {
        return Inertia::render('dashboard_admin/formations');
    })->name('formations');

    Route::get('competitions', function () {
        return Inertia::render('dashboard_admin/competitions');
    })->name('competitions');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
