<?php

namespace Database\Seeders;
use App\Models\formation;
use Database\Factories\formationFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Formation::factory()->count(8)->create();
    }
}
