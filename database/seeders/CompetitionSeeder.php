<?php

namespace Database\Seeders;

use App\Models\Competition;
use App\Models\CompetitionRegistration;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompetitionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure we have users to assign competitions to
        if (User::count() === 0) {
            User::factory(5)->create();
        }

        // Create 15 competitions with different statuses
        $competitions = collect();

        // 8 open competitions
        $openCompetitions = Competition::factory(8)
            ->open()
            ->create();
        $competitions = $competitions->merge($openCompetitions);

        // 4 full competitions
        $fullCompetitions = Competition::factory(4)
            ->full()
            ->create();
        $competitions = $competitions->merge($fullCompetitions);

        // 3 closed competitions
        $closedCompetitions = Competition::factory(3)
            ->closed()
            ->create();
        $competitions = $competitions->merge($closedCompetitions);

        // Create registrations for each competition
        foreach ($competitions as $competition) {
            $registrationCount = match ($competition->status) {
                'Ouvert' => rand(5, $competition->max_participants - 5), // Partially filled
                'Complet' => $competition->max_participants, // Completely full
                'Fermé' => rand(10, $competition->max_participants), // Variable for closed
                default => rand(5, 15)
            };

            // Create registrations
            CompetitionRegistration::factory($registrationCount)
                ->for($competition)
                ->create()
                ->each(function ($registration) {
                    // Make sure category matches competition category sometimes
                    if (rand(1, 3) === 1) {
                        $registration->update([
                            'category' => $registration->competition->category
                        ]);
                    }
                });

            // For full competitions, make sure we have exactly max_participants
            if ($competition->status === 'Complet') {
                $currentCount = $competition->registrations()->count();
                if ($currentCount !== $competition->max_participants) {
                    // Adjust the count
                    $difference = $competition->max_participants - $currentCount;
                    if ($difference > 0) {
                        CompetitionRegistration::factory($difference)
                            ->for($competition)
                            ->confirmed()
                            ->create();
                    } elseif ($difference < 0) {
                        $competition->registrations()
                            ->limit(abs($difference))
                            ->delete();
                    }
                }
            }
        }

        $this->command->info('Created ' . Competition::count() . ' competitions with ' . CompetitionRegistration::count() . ' registrations.');
    }
}
