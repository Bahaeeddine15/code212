<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer 15 événements aléatoires
        Event::factory(15)->create();
        
        // Vous pouvez aussi créer des événements spécifiques
        Event::factory()->create([
            'title' => 'Événement Spécial Code212',
            'description' => 'Un événement incontournable pour tous les étudiants en développement.',
            'category' => 'Événement Spécial',
            'status' => 'upcoming',
            'max_attendees' => 200
        ]);
    }
}
