<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Competition>
 */
class CompetitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Programmation', 'Web Development', 'Data Science', 'Intelligence Artificielle', 'Cybersécurité', 'Mobile Development'];
        $locations = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Oujda'];
        $statuses = ['Ouvert', 'Complet', 'Fermé'];
        
        $title = $this->faker->randomElement([
            'Hackathon CODE212',
            'Concours de Programmation',
            'Challenge Tech',
            'Competition IA',
            'Défi Web Development',
            'Tournoi Algorithmes',
            'Contest Cybersécurité',
            'Battle Code',
            'Tech Challenge',
            'Innovation Contest'
        ]);

        return [
            'title' => $title . ' ' . $this->faker->year(),
            'description' => $this->faker->paragraph(3),
            'date' => $this->faker->dateTimeBetween('+1 week', '+3 months'),
            'deadline' => $this->faker->dateTimeBetween('now', '+1 week'),
            'location' => $this->faker->randomElement($locations),
            'category' => $this->faker->randomElement($categories),
            'max_participants' => $this->faker->numberBetween(20, 200),
            'status' => $this->faker->randomElement($statuses),
            'slug' => \Illuminate\Support\Str::slug($title . '-' . $this->faker->year() . '-' . $this->faker->unique()->randomNumber(3)),
            'user_id' => \App\Models\User::factory(),
            'views' => $this->faker->numberBetween(0, 1000),
            'closed_at' => null,
            'closed_by' => null,
        ];
    }
}
