<?php

namespace Database\Seeders;

use App\Models\Formation;
use Illuminate\Database\Seeder;

class FormationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $formations = [
            [
                'title' => 'Fullstack Web avec Laravel & Vue',
                'description' => 'Créer des applications web modernes avec Laravel et Vue.js',
                'category' => 'Développement Web',
                'level' => 'Intermediaire',
                'duration' => 40,
            ],
            [
                'title' => 'Cybersécurité pour les débutants',
                'description' => 'Comprendre les bases de la sécurité informatique',
                'category' => 'Cybersécurité',
                'level' => 'Débutant',
                'duration' => 30,
            ],
            [
                'title' => 'Analyse de données avec Python',
                'description' => 'Utiliser Python et Pandas pour explorer les données',
                'category' => 'Data Science',
                'level' => 'Intermediaire',
                'duration' => 35,
            ],
            [
                'title' => 'Introduction à l\'Intelligence Artificielle',
                'description' => 'Découvrir les concepts fondamentaux de l\'IA',
                'category' => 'Intelligence Artificielle',
                'level' => 'Débutant',
                'duration' => 25,
            ],
            [
                'title' => 'Développement Mobile avec React Native',
                'description' => 'Créer des applications mobiles multiplateformes',
                'category' => 'Développement Mobile',
                'level' => 'Intermediaire',
                'duration' => 45,
            ],
            [
                'title' => 'Architecture des Microservices',
                'description' => 'Concevoir des systèmes distribués avec des microservices',
                'category' => 'Architecture Logicielle',
                'level' => 'Avancé',
                'duration' => 50,
            ],
            [
                'title' => 'Machine Learning avec TensorFlow',
                'description' => 'Construire des modèles de machine learning avancés',
                'category' => 'Machine Learning',
                'level' => 'Avancé',
                'duration' => 60,
            ],
        ];

        foreach ($formations as $formation) {
            Formation::create($formation);
        }
    }
}
