<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        $images = [];
        if ($this->featured_image) {
            $decoded = json_decode($this->featured_image, true);
            if (is_array($decoded)) {
                $images = array_map(fn ($p) => Storage::url($p), array_filter($decoded));
            } else {
                $images = [Storage::url($this->featured_image)];
            }
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->when($request->routeIs('etudiant.article.show'), $this->content),
            'author' => $this->user->name,
            'date' => $this->created_at->format('d-m-Y'),
            'category' => $this->category,
            'status' => $this->status,
            'views' => $this->views,
            'image' => $images[0] ?? null,
            'images' => $images,
            'reading_time' => $this->calculateReadingTime($this->content),
            'published_at' => $this->published_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }

    /**
     * Calculate estimated reading time
     */
    private function calculateReadingTime($content)
    {
        $wordCount = str_word_count(strip_tags($content));
        $readingSpeed = 200;
        $minutes = ceil($wordCount / $readingSpeed);
        return max(1, $minutes);
    }
}
