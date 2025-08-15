<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(rand(4, 8));
        $content = $this->faker->paragraphs(rand(5, 10), true);

        return [
            'title' => rtrim($title, '.'),
            'excerpt' => $this->faker->paragraph(rand(2, 4)),
            'content' => $content,
            'slug' => Str::slug($title),
            'category' => $this->faker->randomElement([
                'actualite',
                'information',
                'guide',
                'evenement',
                'annonce',
                'ressource'
            ]),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'featured_image' => $this->faker->optional(0.7)->imageUrl(800, 400, 'articles'),
            'views' => $this->faker->numberBetween(0, 1000),
            'published_at' => $this->faker->optional(0.8)->dateTimeBetween('-3 months', 'now'),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the article is published.
     */
    public function published(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'published',
            'published_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
        ]);
    }

    /**
     * Indicate that the article is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the article has many views.
     */
    public function popular(): static
    {
        return $this->state(fn(array $attributes) => [
            'views' => $this->faker->numberBetween(500, 2000),
        ]);
    }

    /**
     * Indicate that the article is recent.
     */
    public function recent(): static
    {
        return $this->state(fn(array $attributes) => [
            'published_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}
