<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 random articles
        Article::factory()->count(10)->create();

        // Create 5 published articles
        Article::factory()->published()->count(5)->create();

        // Create 3 draft articles
        Article::factory()->draft()->count(3)->create();

        // Create 2 popular published articles
        Article::factory()->published()->popular()->count(2)->create();

        // Create 5 recent articles
        Article::factory()->recent()->count(5)->create();

        // Create articles for a specific user
        Article::factory()->count(3)->create(['user_id' => 1]);

        // Create a specific article
        Article::factory()->create([
            'title' => 'Custom Article Title',
            'category' => 'actualite',
            'status' => 'published'
        ]);
    }
}
