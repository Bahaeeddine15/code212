<?php

namespace Database\Factories;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formation>
 */
class FormationFactory extends Factory
{
    protected $model = Formation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'level' => $this->faker->randomElement(['Débutant', 'Intermédiaire', 'Avancé']),
            'duration' => $this->faker->numberBetween(10, 100) . 'h',
            'category' => $this->faker->word,
        ];
    }
}
