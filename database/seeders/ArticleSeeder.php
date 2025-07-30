<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer un utilisateur existant ou créer un utilisateur par défaut
        $user = User::first() ?? User::factory()->create();

        $articles = [
            [
                'title' => 'Introduction à Laravel',
                'excerpt' => 'Découvrez les bases du framework Laravel pour développer des applications web modernes.',
                'content' => 'Laravel est un framework PHP élégant et expressif qui facilite le développement d\'applications web. Dans cet article, nous allons explorer les concepts fondamentaux de Laravel, y compris le routing, les contrôleurs, les modèles et les vues. Laravel offre une syntaxe claire et une architecture MVC qui permet aux développeurs de créer rapidement des applications robustes et maintenables.',
                'category' => 'Développement Web',
                'status' => 'published',
                'featured_image' => 'images/laravel-intro.jpg',
                'views' => 150,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Les bonnes pratiques en JavaScript',
                'excerpt' => 'Apprenez les meilleures pratiques pour écrire du code JavaScript propre et efficace.',
                'content' => 'JavaScript est un langage puissant qui nécessite de bonnes pratiques pour maintenir un code de qualité. Cet article couvre les conventions de nommage, la gestion des erreurs, l\'utilisation des fonctions fléchées, et les bonnes pratiques en matière de performance. Nous aborderons également les concepts modernes comme les modules ES6 et les async/await.',
                'category' => 'JavaScript',
                'status' => 'published',
                'featured_image' => 'images/javascript-best-practices.jpg',
                'views' => 89,
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'Guide complet de React',
                'excerpt' => 'Un guide complet pour maîtriser React et créer des interfaces utilisateur dynamiques.',
                'content' => 'React est une bibliothèque JavaScript populaire pour construire des interfaces utilisateur. Ce guide complet vous accompagnera depuis les concepts de base comme les composants et le JSX, jusqu\'aux concepts avancés comme les hooks, le context API et la gestion d\'état. Vous apprendrez également les meilleures pratiques pour organiser votre code React.',
                'category' => 'Frontend',
                'status' => 'published',
                'featured_image' => 'images/react-guide.jpg',
                'views' => 234,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Sécurité des applications web',
                'excerpt' => 'Les principes essentiels pour sécuriser vos applications web contre les vulnérabilités courantes.',
                'content' => 'La sécurité est un aspect crucial du développement web. Cet article couvre les vulnérabilités les plus courantes comme les injections SQL, les attaques XSS et CSRF. Nous verrons comment Laravel protège automatiquement contre certaines de ces attaques et quelles mesures supplémentaires vous pouvez prendre pour sécuriser vos applications.',
                'category' => 'Sécurité',
                'status' => 'published',
                'featured_image' => 'images/web-security.jpg',
                'views' => 67,
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Introduction aux API REST',
                'excerpt' => 'Comprendre les concepts fondamentaux des API REST et comment les implémenter.',
                'content' => 'Les API REST sont devenues le standard pour la communication entre applications. Cet article explique les principes REST, les codes de statut HTTP, la structure des URLs et comment concevoir une API claire et cohérente. Nous verrons également comment documenter votre API et gérer les versions.',
                'category' => 'API',
                'status' => 'draft',
                'featured_image' => null,
                'views' => 0,
                'published_at' => null,
            ],
            [
                'title' => 'Optimisation des performances web',
                'excerpt' => 'Techniques et stratégies pour améliorer les performances de vos applications web.',
                'content' => 'Les performances web sont cruciales pour l\'expérience utilisateur et le référencement. Cet article présente diverses techniques d\'optimisation : compression des images, minification du CSS/JS, mise en cache, optimisation des requêtes base de données, et utilisation des CDN. Nous aborderons également les outils de mesure des performances.',
                'category' => 'Performance',
                'status' => 'published',
                'featured_image' => 'images/web-performance.jpg',
                'views' => 178,
                'published_at' => now()->subDays(1),
            ]
        ];

        foreach ($articles as $articleData) {
            $articleData['user_id'] = $user->id;
            $articleData['slug'] = Str::slug($articleData['title']);
            
            Article::create($articleData);
        }
    }
}
