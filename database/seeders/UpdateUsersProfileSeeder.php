<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UpdateUsersProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mettre à jour les utilisateurs existants avec des données de profil
        $users = User::all();
        
        foreach ($users as $user) {
            $user->update([
                'ecole' => $user->ecole ?: 'ENSA Marrakech',
                'telephone' => $user->telephone ?: '+212 6 12 34 56 78',
                'ville' => $user->ville ?: 'Marrakech',
                'student_id' => $user->student_id ?: 'ST' . str_pad($user->id, 6, '0', STR_PAD_LEFT),
                'departement' => $user->departement ?: 'Informatique',
                'bio' => $user->bio ?: 'Étudiant passionné par les nouvelles technologies.',
            ]);
        }
    }
}
