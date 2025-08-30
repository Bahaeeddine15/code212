<?php

namespace Database\Seeders;

use App\Models\Etudiant;
use Illuminate\Database\Seeder;

class EtudiantTestSeeder extends Seeder
{
    public function run(): void
    {
        Etudiant::create([
            'nom' => 'Doe',
            'prenom' => 'John',
            'email' => 'john@test.com',
            'telephone' => '0612345678',
            'ecole' => 'ENSIAS',
            'niveau' => 'Master'
        ]);

        Etudiant::create([
            'nom' => 'Smith',
            'prenom' => 'Jane',
            'email' => 'jane@test.com',
            'telephone' => '0687654321',
            'ecole' => 'EMI',
            'niveau' => 'Licence'
        ]);

        echo "2 étudiants de test créés avec succès!\n";
    }
}
