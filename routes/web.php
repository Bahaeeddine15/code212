<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CompetitionController;
use Inertia\Inertia;
use App\Http\Controllers\MediaController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\ModuleController;
use App\Models\Module;
use App\Models\Formation;
use Illuminate\Http\Request;
use App\Http\Controllers\EventController;
use App\Models\Event;

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

     // List events
    Route::get('events', function () {
        $events = \App\Models\Event::orderBy('start_date', 'desc')->get();
        return Inertia::render('dashboard_admin/events', [
            'events' => $events,
        ]);
    })->name('events.index');

    // Create event page
    Route::get('events/create', function () {
        return Inertia::render('dashboard_admin/event_create');
    })->name('events.create');

    // Store event
    Route::post('events', [EventController::class, 'store'])->name('events.store');

    // Edit event page
    
    Route::get('dashboard_admin/event_edit/{id}', function ($id) {
        $event = Event::findOrFail($id);
        return Inertia::render('dashboard_admin/event_edit', [
            'event' => $event,
        ]);
    })->name('event.edit');

    // Update event

    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');

    Route::patch('/events/{event}/status', [EventController::class, 'updateStatus']);


    // Delete event
    Route::delete('events/{event}', [EventController::class, 'destroy'])->name('events.destroy');

    Route::resource('media', MediaController::class)->parameters(['media' => 'media']);
    Route::get('/media/{media}/download', [MediaController::class, 'download'])->name('media.download');

    Route::get('formations', function () {
        return Inertia::render('dashboard_admin/formations');
    })->name('formations');

    // Dedicated page for creating a formation (Inertia React)
    Route::get('dashboard_admin/formation_create', function () {
        return Inertia::render('dashboard_admin/formation_create');
    })->name('formation.create');

    // Dedicated page for creating a module (Inertia React)
    Route::get('dashboard_admin/module_create', function () {
        $formations = \App\Models\Formation::all(['id', 'title']);
        return Inertia::render('dashboard_admin/module_create', [
            'formations' => $formations,
            'formationId' => null,
        ]);
    })->name('module.create');

    Route::get('competitions', function () {
        return Inertia::render('dashboard_admin/competitions');
    })->name('competitions');

    Route::get('reservations', function () {
        return Inertia::render('dashboard_admin/reservations');
    })->name('reservations');

    Route::resource('competitions', CompetitionController::class);
    Route::patch('/competitions/{competition}/close', [CompetitionController::class, 'close'])
        ->name('competitions.close');

    Route::resource('formations', FormationController::class);
    Route::resource('formations.modules', ModuleController::class)->shallow();

    Route::get('dashboard_admin/formation_edit/{id}', function ($id) {
        $formation = \App\Models\Formation::findOrFail($id);
        return Inertia::render('dashboard_admin/formation_edit', [
            'formation' => $formation,
        ]);
    })->name('formation.edit');

    Route::get('dashboard_admin/formation/{id}/modules', function ($id) {
        $formation = \App\Models\Formation::with('modules')->findOrFail($id);
        return Inertia::render('dashboard_admin/modules_list', [
            'formation' => $formation,
            'modules' => $formation->modules,
        ]);
    })->name('formation.modules');

    Route::get('dashboard_admin/module_edit/{id}', function ($id) {
        $module = Module::findOrFail($id);
        $formationId = $module->formation_id ?? null;
        return Inertia::render('dashboard_admin/module_edit', [
            'module' => $module,
            'formationId' => $formationId,
        ]);
    });

    Route::put('/formations/{formation}/modules/{module}', function (Request $request, $formation, $module) {
        $module = Module::where('id', $module)->where('formation_id', $formation)->firstOrFail();
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|string|max:50',
            'order' => 'required|integer|min:1',
        ]);
        $module->update($validated);
        return redirect()->back()->with('success', 'Module mis à jour avec succès.');
    });

    Route::delete('/admin/modules/{id}', function ($id) {
        $module = Module::findOrFail($id);
        $module->delete();
        return back()->with('success', 'Module supprimé avec succès.');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
