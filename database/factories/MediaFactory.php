<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Media::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(rand(2, 5), true);
        $slug = Str::slug($title);

        // Generate random dimensions
        $width = rand(400, 1200);
        $height = rand(300, 800);

        // Random image categories for variety
        $categories = ['nature', 'city', 'abstract', 'people', 'technology', 'food', 'animals', 'business'];
        $category = fake()->randomElement($categories);

        // Generate random image URL using Lorem Picsum
        $imageId = rand(1, 1000);
        $imageUrl = "https://picsum.photos/seed/{$imageId}/{$width}/{$height}";

        // Alternative image services (uncomment to use different services)
        // $imageUrl = "https://source.unsplash.com/{$width}x{$height}/?{$category}";
        // $imageUrl = "https://loremflickr.com/{$width}/{$height}/{$category}";

        return [
            'title' => ucfirst($title),
            'slug' => $slug,
            'detail' => fake()->paragraph(rand(2, 4)),
            'file_path' => "media/{$slug}-{$imageId}.jpg",
            'original_name' => "{$slug}-{$imageId}.jpg",
            'user_id' => User::factory(),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-6 months', 'now'),
        ];
    }

    /**
     * Create a media with specific category
     */
    public function category(string $category): static
    {
        return $this->state(function (array $attributes) use ($category) {
            $title = fake()->words(rand(2, 4), true) . " {$category}";
            $slug = Str::slug($title);
            $imageId = rand(1, 1000);
            $width = rand(600, 1200);
            $height = rand(400, 800);

            return [
                'title' => ucfirst($title),
                'slug' => $slug,
                'detail' => fake()->paragraph() . " This is a {$category} related image.",
                'file_path' => "media/{$category}/{$slug}-{$imageId}.jpg",
                'original_name' => "{$slug}-{$imageId}.jpg",
            ];
        });
    }

    /**
     * Create a video media
     */
    public function video(): static
    {
        return $this->state(function (array $attributes) {
            $title = fake()->words(rand(2, 4), true) . " video";
            $slug = Str::slug($title);
            $videoId = rand(1, 100);

            return [
                'title' => ucfirst($title),
                'slug' => $slug,
                'detail' => fake()->paragraph() . " This is a sample video file.",
                'file_path' => "media/videos/{$slug}-{$videoId}.mp4",
                'original_name' => "{$slug}-{$videoId}.mp4",
            ];
        });
    }

    /**
     * Create high resolution image
     */
    public function highRes(): static
    {
        return $this->state(function (array $attributes) {
            $title = fake()->words(rand(2, 4), true) . " HD";
            $slug = Str::slug($title);
            $imageId = rand(1, 1000);

            return [
                'title' => ucfirst($title),
                'slug' => $slug,
                'detail' => fake()->paragraph() . " This is a high-resolution image.",
                'file_path' => "media/hd/{$slug}-{$imageId}.jpg",
                'original_name' => "{$slug}-{$imageId}.jpg",
            ];
        });
    }
}
