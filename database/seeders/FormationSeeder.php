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
                'titre' => 'Fullstack Web avec Laravel & Vue',
                'description' => 'Créer des applications web modernes avec Laravel et Vue.js',
                'category' => 'Développement Web',
                'niveau' => 'Intermediaire',
                'photo' => 'https://humadev-international.com/wp-content/uploads/2021/01/humadev-cabinet-de-formation-au-maroc.jpg',
            ],
            [
                'titre' => 'Cybersécurité pour les débutants',
                'description' => 'Comprendre les bases de la sécurité informatique',
                'category' => 'Cybersécurité',
                'niveau' => 'Débutant',
                'photo' => 'https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg',
            ],
            [
                'titre' => 'Analyse de données avec Python',
                'description' => 'Utiliser Python et Pandas pour explorer les données',
                'category' => 'Data Science',
                'niveau' => 'Intermediaire',
                'photo' => 'https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg',
            ],
            [
                'titre' => 'Introduction à l\'Intelligence Artificielle',
                'description' => 'Découvrir les concepts fondamentaux de l\'IA',
                'category' => 'Intelligence Artificielle',
                'niveau' => 'Débutant',
                'photo' => 'https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg',
            ],
            [
                'titre' => 'Développement Mobile avec React Native',
                'description' => 'Créer des applications mobiles multiplateformes',
                'category' => 'Développement Mobile',
                'niveau' => 'Intermediaire',
                'photo' => 'https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg',
            ],
            [
                'titre' => 'Architecture des Microservices',
                'description' => 'Concevoir des systèmes distribués avec des microservices',
                'category' => 'Architecture Logicielle',
                'niveau' => 'Avancé',
                'photo' => 'https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg',
            ],
            [
                'titre' => 'Machine Learning avec TensorFlow',
                'description' => 'Construire des modèles de machine learning avancés',
                'category' => 'Machine Learning',
                'niveau' => 'Avancé',
                'photo' => 'https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg',
            ],
        ];

        foreach ($formations as $formation) {
            Formation::create($formation);
        }
    }
}
