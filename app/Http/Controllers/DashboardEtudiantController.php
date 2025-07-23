<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Reservation;
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
        ];

        // Récupérer les formations pour affichage
        $formations = Formation::all();

        return Inertia::render('etudiant/DashboardEtudiant', [
            'stats' => $stats,
            'formations' => $formations,
            'user' => $user
        ]);
    }
}
