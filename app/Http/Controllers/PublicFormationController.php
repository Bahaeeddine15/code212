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

        // Grouper les formations par catégorie et convertir en tableau simple
        $formationsByCategory = [];
        foreach ($formations->groupBy('category') as $category => $items) {
            $formationsByCategory[$category] = $items->values()->toArray();
        }

        // Statistiques
        $totalFormations = $formations->count();
        $totalCategories = count($formationsByCategory);
        $totalLevels = $formations->pluck('level')->unique()->count();

        return Inertia::render('nos-programmes', [
            'formationsByCategory' => $formationsByCategory,
            'stats' => [
                'total_formations' => $totalFormations,
                'total_categories' => $totalCategories,
                'total_levels' => $totalLevels
            ]
        ]);
    }
}
