<?php

use App\Http\Controllers\Settings\PasswordControllerAdmin;
use App\Http\Controllers\Settings\ProfileControllerAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth:admin')->prefix('admin')->group(function () {
    Route::redirect('settings', 'admin/settings/profile');

    Route::get('settings/profile', [ProfileControllerAdmin::class, 'edit'])->name('admin.settings.profile.edit');
    Route::patch('settings/profile', [ProfileControllerAdmin::class, 'update'])->name('admin.settings.profile.update');
    Route::delete('settings/profile', [ProfileControllerAdmin::class, 'destroy'])->name('admin.settings.profile.destroy');

    Route::get('settings/password', [PasswordControllerAdmin::class, 'edit'])->name('admin.settings.password.edit');
    Route::put('settings/password', [PasswordControllerAdmin::class, 'update'])->name('admin.settings.password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings_admin/appearance');
    })->name('appearance');
});