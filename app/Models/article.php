<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class article extends Model
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
     * Get the full URL for the featured image
     */
    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (!$this->featured_image) {
            return null;
        }

        // Vérifier si le fichier existe
        if (!file_exists(public_path($this->featured_image))) {
            return asset('code212.png'); // Image par défaut
        }

        return asset($this->featured_image);
    }

    /**
     * Check if article has a featured image
     */
    public function hasFeaturedImage(): bool
    {
        return !empty($this->featured_image) && file_exists(public_path($this->featured_image));
    }
}