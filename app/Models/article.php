<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'slug',
        'category',
        'status',
        'featured_image',
        'views',
        'published_at',
        'user_id',
    ];
    protected $casts = [
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    /**
     * Get the image URLs as an array
     */
    public function getImageUrlsAttribute(): array
    {
        if (!$this->featured_image) {
            return [];
        }

        $decoded = json_decode($this->featured_image, true);
        if (is_array($decoded)) {
            // It's a JSON array of paths
            return array_map(fn($p) => \Illuminate\Support\Facades\Storage::url($p), array_filter($decoded));
        } else {
            // It's a single path string
            return [\Illuminate\Support\Facades\Storage::url($this->featured_image)];
        }
    }

    /**
     * Get the first image URL
     */
    public function getFirstImageUrlAttribute(): ?string
    {
        $urls = $this->getImageUrlsAttribute();
        return $urls[0] ?? null;
    }

    /**
     * Check if article has images
     */
    public function hasImages(): bool
    {
        return !empty($this->featured_image);
    }
}