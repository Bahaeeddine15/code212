<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+2 months');
        $endDate = fake()->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +7 days');
        
        return [
            'title' => fake()->randomElement([
                'Conférence Tech 2025',
                'Atelier React & TypeScript',
                'Formation Laravel Avancée',
                'Hackathon Code212',
                'Séminaire Intelligence Artificielle',
                'Workshop Design Thinking',
                'Masterclass DevOps',
                'Forum Entrepreneuriat',
                'Bootcamp Full Stack',
                'Symposium Cybersécurité'
            ]),
            'description' => fake()->randomElement([
                'Une session intensive pour apprendre les dernières technologies web.',
                'Découvrez les meilleures pratiques du développement moderne.',
                'Un événement unique pour développer vos compétences techniques.',
                'Rencontrez des experts et échangez sur les tendances actuelles.',
                'Formation pratique avec des projets concrets et des cas d\'usage réels.',
                'Plongez dans l\'écosystème du développement avec des professionnels.',
                'Explorez les outils et méthodologies qui façonnent l\'avenir du code.',
                'Une opportunité d\'apprentissage collaboratif et d\'innovation.'
            ]),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'location' => fake()->randomElement([
                'Salle de conférence A - Bâtiment principal',
                'Amphithéâtre Tech Hub',
                'Lab Informatique - 2ème étage',
                'Espace Innovation - Code212',
                'Auditorium Central',
                'Salle de formation B201',
                'Centre de conventions',
                'Campus numérique - Hall principal'
            ]),
            'category' => fake()->randomElement([
                'Développement Web',
                'Intelligence Artificielle',
                'DevOps & Cloud',
                'Mobile Development',
                'Cybersécurité',
                'Data Science',
                'Design & UX',
                'Entrepreneuriat Tech'
            ]),
            'max_attendees' => fake()->numberBetween(20, 150),
            'status' => fake()->randomElement(['upcoming', 'ongoing', 'completed', 'cancelled'])
        ];
    }
}
