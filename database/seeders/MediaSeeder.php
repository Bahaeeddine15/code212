<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have at least one user
        if (User::count() === 0) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        // Create media directories
        $this->createDirectories();

        // Create random media files
        $this->createRandomMedia();

        // Create categorized media
        $this->createCategorizedMedia();

        // Create some videos
        $this->createVideoMedia();

        $this->command->info('Media seeded successfully with random images from Lorem Picsum!');
    }

    /**
     * Create necessary directories
     */
    private function createDirectories(): void
    {
        $directories = [
            'media',
            'media/nature',
            'media/city',
            'media/abstract',
            'media/people',
            'media/technology',
            'media/food',
            'media/animals',
            'media/business',
            'media/videos',
            'media/hd',
        ];

        foreach ($directories as $directory) {
            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory);
            }
        }
    }

    /**
     * Create random media files
     */
    private function createRandomMedia(): void
    {
        // Create 20 random media files
        Media::factory(20)->create();

        $this->command->info('Created 20 random media files');
    }

    /**
     * Create categorized media
     */
    private function createCategorizedMedia(): void
    {
        $categories = ['nature', 'city', 'abstract', 'people', 'technology', 'food', 'animals', 'business'];

        foreach ($categories as $category) {
            Media::factory(3)->category($category)->create();
        }

        $this->command->info('Created categorized media files');
    }

    /**
     * Create video media
     */
    private function createVideoMedia(): void
    {
        Media::factory(5)->video()->create();

        $this->command->info('Created video media files');
    }

    /**
     * Create high resolution media
     */
    private function createHighResMedia(): void
    {
        Media::factory(8)->highRes()->create();

        $this->command->info('Created high resolution media files');
    }

    /**
     * Download and store actual images (optional)
     */
    private function downloadSampleImages(): void
    {
        $sampleImages = [
            'https://picsum.photos/800/600?random=1',
            'https://picsum.photos/1200/800?random=2',
            'https://picsum.photos/600/400?random=3',
            'https://picsum.photos/1000/700?random=4',
            'https://picsum.photos/800/800?random=5',
        ];

        foreach ($sampleImages as $index => $url) {
            try {
                $imageContent = file_get_contents($url);
                if ($imageContent) {
                    $filename = "sample-image-{$index}.jpg";
                    Storage::disk('public')->put("media/{$filename}", $imageContent);

                    Media::create([
                        'title' => "Sample Image " . ($index + 1),
                        'slug' => "sample-image-" . ($index + 1),
                        'detail' => "This is a sample image downloaded from Lorem Picsum",
                        'file_path' => "media/{$filename}",
                        'original_name' => $filename,
                        'user_id' => User::first()->id,
                    ]);
                }
            } catch (\Exception $e) {
                $this->command->warn("Failed to download image {$index}: " . $e->getMessage());
            }
        }

        $this->command->info('Downloaded sample images');
    }
}
