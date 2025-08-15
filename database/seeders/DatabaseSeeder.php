<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer d'abord quelques utilisateurs
        \App\Models\User::factory(10)->create();

        $this->call([
            FormationSeeder::class,
            EventSeeder::class,
            CompetitionSeeder::class,
            ArticleSeeder::class,
            // MediaSeeder::class,
        ]);
    }
}
