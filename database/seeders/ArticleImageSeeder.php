<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Images existantes dans le dossier public
        $defaultImages = [
            'code212.png',
            'code-212-with-bg.jpeg',
            'lgcode212-2.png',
            '212.png',
            'logo.svg'
        ];

        // Récupérer tous les articles sans image
        $articles = Article::whereNull('featured_image')->get();

        foreach ($articles as $index => $article) {
            // Assigner une image par défaut de manière cyclique
            $imageIndex = $index % count($defaultImages);
            
            $article->update([
                'featured_image' => $defaultImages[$imageIndex]
            ]);
            
            $this->command->info("Image assignée à l'article: {$article->title}");
        }

        $this->command->info("Seeder terminé. {$articles->count()} articles mis à jour.");
    }
}
