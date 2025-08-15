<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Media;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer les dossiers nécessaires
        $folders = [
            'media/hackathonevent',
            'media/competition',
            'media/formation',
            'media/general'
        ];

        foreach ($folders as $folder) {
            Storage::disk('public')->makeDirectory($folder);
        }

        // Obtenir un utilisateur pour associer les médias
        $user = User::first();
        
        if (!$user) {
            // Créer un utilisateur par défaut si aucun n'existe
            $user = User::create([
                'name' => 'Admin',
                'email' => 'admin@code212.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);
        }

        // Exemples de médias pour hackathon event
        $hackathonMedias = [
            [
                'title' => 'Cérémonie d\'ouverture du Hackathon 2025',
                'detail' => 'Photo de la cérémonie d\'ouverture avec tous les participants réunis dans l\'auditorium principal.',
                'folder' => 'hackathonevent',
                'original_name' => 'hackathon_ouverture.jpg'
            ],
            [
                'title' => 'Équipes au travail - Session coding',
                'detail' => 'Les équipes concentrées sur leurs projets lors de la phase intensive de développement.',
                'folder' => 'hackathonevent',
                'original_name' => 'teams_coding.jpg'
            ],
            [
                'title' => 'Présentation des projets finaux',
                'detail' => 'Moment des présentations finales où chaque équipe démontre son innovation.',
                'folder' => 'hackathonevent',
                'original_name' => 'presentations_finales.jpg'
            ]
        ];

        // Exemples de médias pour compétitions
        $competitionMedias = [
            [
                'title' => 'Compétition de Programmation - Podium',
                'detail' => 'Les gagnants de la compétition de programmation algorithmique sur le podium.',
                'folder' => 'competition',
                'original_name' => 'programming_contest_podium.jpg'
            ],
            [
                'title' => 'Code Challenge en cours',
                'detail' => 'Participants concentrés lors du défi de programmation de 4 heures.',
                'folder' => 'competition',
                'original_name' => 'code_challenge_action.jpg'
            ]
        ];

        // Exemples de médias pour formations
        $formationMedias = [
            [
                'title' => 'Formation React.js - Session pratique',
                'detail' => 'Étudiants suivant la formation React.js avec des exercices pratiques.',
                'folder' => 'formation',
                'original_name' => 'react_formation.jpg'
            ],
            [
                'title' => 'Workshop Machine Learning',
                'detail' => 'Atelier pratique sur les algorithmes de machine learning et leur implémentation.',
                'folder' => 'formation',
                'original_name' => 'ml_workshop.jpg'
            ]
        ];

        // Insérer tous les médias
        $allMedias = array_merge($hackathonMedias, $competitionMedias, $formationMedias);

        foreach ($allMedias as $mediaData) {
            $fileName = time() . '_' . $mediaData['original_name'];
            $filePath = 'media/' . $mediaData['folder'] . '/' . $fileName;
            $this->makeFakeImage($filePath, $mediaData['title']);

            Media::create([
                'title' => $mediaData['title'],
                'slug' => Str::slug($mediaData['title']),
                'detail' => $mediaData['detail'],
                'file_path' => $filePath,
                'folder' => $mediaData['folder'],
                'original_name' => $mediaData['original_name'],
                'user_id' => $user->id,
            ]);
            usleep(80000); // éviter collision
        }

        $this->command->info('Médias d\'exemple créés avec succès!');
    }

    private function makeFakeImage(string $relativePath, string $title): void
    {
        try {
            $full = storage_path('app/public/' . $relativePath);
            @mkdir(dirname($full), 0775, true);
            $w=800; $h=450;
            $im = imagecreatetruecolor($w,$h);
            $colors=[[59,130,246],[236,72,153],[16,185,129],[245,158,11],[139,92,246],[14,165,233]];
            $c=$colors[array_rand($colors)];
            $bg=imagecolorallocate($im,$c[0],$c[1],$c[2]);
            imagefilledrectangle($im,0,0,$w,$h,$bg);
            $overlay=imagecolorallocatealpha($im,0,0,0,70);
            imagefilledrectangle($im,0,$h-90,$w,$h,$overlay);
            $white=imagecolorallocate($im,255,255,255);
            $short=mb_strimwidth($title,0,42,'…','UTF-8');
            $font=base_path('resources/fonts/Inter-Bold.ttf');
            if (file_exists($font) && function_exists('imagettftext')) {
                imagettftext($im,28,0,30,$h-35,$white,$font,$short);
            } else {
                imagestring($im,5,30,$h-60,$short,$white);
            }
            imagejpeg($im,$full,85);
            imagedestroy($im);
        } catch (\Throwable $e) {
            $placeholder=base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
            Storage::disk('public')->put($relativePath,$placeholder);
        }
    }
}
