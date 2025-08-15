<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompetitionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer 15 compétitions factices
        \App\Models\Competition::factory(15)->create();
        
        // Optionnel: Créer quelques compétitions avec des données spécifiques
        \App\Models\Competition::factory()->create([
            'title' => 'Hackathon CODE212 2025',
            'description' => 'Le plus grand hackathon de programmation au Maroc. Venez relever des défis passionnants et gagner des prix incroyables !',
            'category' => 'Programmation',
            'location' => 'Casablanca',
            'status' => 'Ouvert',
            'max_participants' => 100,
        ]);
        
        \App\Models\Competition::factory()->create([
            'title' => 'Challenge IA & Machine Learning',
            'description' => 'Développez des solutions innovantes utilisant l\'intelligence artificielle pour résoudre des problèmes réels.',
            'category' => 'Intelligence Artificielle',
            'location' => 'Rabat',
            'status' => 'Ouvert',
            'max_participants' => 50,
        ]);
    }
}
