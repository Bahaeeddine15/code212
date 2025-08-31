<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicFormationController extends Controller
{
    /**
     * Display the public formations page
     */
    public function index()
    {
        $formations = Formation::select([
            'id',
            'title',
            'description', 
            'level',
            'duration',
            'category',
            'thumbnail'
        ])
        ->where('status', 'published')
        ->get();

        // Grouper les formations par catégorie
        $formationsByCategory = $formations->groupBy('category');
        
        // Statistiques
        $totalFormations = $formations->count();
        $totalCategories = $formationsByCategory->count();
        $totalLevels = $formations->pluck('level')->unique()->count();

        return Inertia::render('our-programs', [
            'formationsByCategory' => $formationsByCategory,
            'stats' => [
                'total_formations' => $totalFormations,
                'total_categories' => $totalCategories,
                'total_levels' => $totalLevels
            ]
        ]);
    }
}
