<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\formation>
 */
class formationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $levels = ['0','10' ,'20','30','40','50','60','70','80','90','100'];
        $category = [
            'Développement Web',
            'Développement Mobile',
            'Data Science',
            'Intelligence Artificielle',
            'Cybersécurité',
            'Cloud Computing',
            'DevOps',
            'Design UI/UX',
            'Marketing Digital',
            'Gestion de Projet',
            'Base de Données',
            'Réseaux & Systèmes',
            'Blockchain',
            'Machine Learning',
            'Photographie',
            'Montage Vidéo',
            'Comptabilité',
            'Ressources Humaines',
            'Communication',
            'Langues Étrangères'
        ];

        return [
            'titre' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'niveau' => $this->faker->randomElement($levels),
            'category' => $this->faker->randomElement($category),
            'photo' => 'formations/default.jpg',
        ];
    }
}
