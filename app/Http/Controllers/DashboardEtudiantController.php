<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Reservation;
use App\Models\Event;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardEtudiantController extends Controller
{
    public function index()
    {
        // Récupérer l'utilisateur authentifié
        $user = auth()->user();
        
        // Récupérer les statistiques depuis la base de données
        $stats = [
            'total_formations' => Formation::count(),
            'total_reservations' => Reservation::count(),
            'reservations_en_attente' => Reservation::where('status', 'pending')->count(),
            'reservations_approuvees' => Reservation::where('status', 'approved')->count(),
            'total_competitions' => Competition::count(),
            'total_events' => Event::count(),
        ];

        // Récupérer les formations pour affichage
        $formations = Formation::all();

        // Récupérer les événements à venir (les 4 prochains événements)
        $events = Event::where('status', 'upcoming')
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->limit(4)
            ->get();

        return Inertia::render('etudiant/DashboardEtudiant', [
            'stats' => $stats,
            'formations' => $formations,
            'events' => $events,
            'user' => $user
        ]);
    }
}
