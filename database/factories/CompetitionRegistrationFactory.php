<?php

namespace Database\Factories;

use App\Models\Competition;
use App\Models\CompetitionRegistration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompetitionRegistration>
 */
class CompetitionRegistrationFactory extends Factory
{
    protected $model = CompetitionRegistration::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'competition_id' => Competition::factory(),
            'participant_name' => $this->faker->firstName() . ' ' . $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'club' => $this->faker->randomElement([
                'Club Sportif Paris',
                'AS Lyon',
                'Racing Club',
                'Union Sportive',
                'Athletic Club',
                'Sports Association',
                'Elite Team',
                'Champions Club'
            ]),
            'category' => $this->faker->randomElement([
                'Junior',
                'Senior',
                'Elite',
                'Veteran',
                'Open'
            ]),
            'status' => $this->faker->randomElement([
                'En attente',
                'Confirmé',
                'Refusé'
            ]),
            'payment_status' => $this->faker->randomElement([
                'En attente',
                'Payé',
                'Refusé'
            ]),
            'notes' => $this->faker->optional()->sentence(),
            'registered_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ];
    }

    /**
     * Create a confirmed registration
     */
    public function confirmed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'Confirmé',
            'payment_status' => 'Payé',
        ]);
    }

    /**
     * Create a pending registration
     */
    public function pending(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'En attente',
            'payment_status' => 'En attente',
        ]);
    }
}
