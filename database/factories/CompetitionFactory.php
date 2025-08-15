<?php

namespace Database\Factories;

use App\Models\Competition;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Competition>
 */
class CompetitionFactory extends Factory
{
    protected $model = Competition::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->randomElement([
            'Championnat National',
            'Tournoi Régional',
            'Coupe d\'Excellence',
            'Grand Prix',
            'Open International',
            'Challenge des Champions',
            'Trophée Elite',
            'Masters Tournament',
            'Compétition Jeunes',
            'Circuit Pro'
        ]) . ' ' . $this->faker->year();

        $date = $this->faker->dateTimeBetween('+1 week', '+6 months');
        $deadline = $this->faker->dateTimeBetween('now', $date);

        return [
            'title' => $title,
            'description' => $this->faker->paragraph(3),
            'date' => $date,
            'deadline' => $deadline,
            'location' => $this->faker->randomElement([
                'Stade Olympique',
                'Arena Sportive',
                'Centre Sportif Municipal',
                'Complexe Athlétique',
                'Palais des Sports',
                'Gymnase Principal',
                'Terrain Central',
                'Stade National'
            ]) . ', ' . $this->faker->city(),
            'category' => $this->faker->randomElement([
                'Junior',
                'Senior',
                'Elite',
                'Veteran',
                'Open'
            ]),
            'max_participants' => $this->faker->numberBetween(20, 100),
            'status' => $this->faker->randomElement([
                'Ouvert',
                'Complet',
                'Fermé'
            ]),
            'slug' => Str::slug($title),
            'views' => $this->faker->numberBetween(0, 500),
            'user_id' => User::factory(),
            'closed_at' => function (array $attributes) {
                return $attributes['status'] === 'Fermé'
                    ? $this->faker->dateTimeBetween($attributes['deadline'], 'now')
                    : null;
            },
            'closed_by' => function (array $attributes) {
                return $attributes['status'] === 'Fermé'
                    ? User::factory()
                    : null;
            },
        ];
    }

    /**
     * Create an open competition
     */
    public function open(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'Ouvert',
            'closed_at' => null,
            'closed_by' => null,
        ]);
    }

    /**
     * Create a closed competition
     */
    public function closed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'Fermé',
            'closed_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'closed_by' => User::factory(),
        ]);
    }

    /**
     * Create a full competition
     */
    public function full(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'Complet',
            'closed_at' => null,
            'closed_by' => null,
        ]);
    }
}
