<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    /** @use HasFactory<\Database\Factories\MediaFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'detail',
        'file_path',
        'video_qualities', // Add this line
        'original_name',
        'user_id',
        'folder',
    ];

    protected $appends = ['full_url', 'file_size', 'file_extension'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the full URL of the media file
     */
    public function getFullUrlAttribute()
    {
        return $this->file_path ? Storage::url($this->file_path) : null;
    }

    /**
     * Get the file size in a readable format
     */
    public function getFileSizeAttribute()
    {
        if (!$this->file_path || !Storage::disk('public')->exists($this->file_path)) {
            return null;
        }

        $bytes = Storage::disk('public')->size($this->file_path);

        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }

    /**
     * Get the file extension
     */
    public function getFileExtensionAttribute()
    {
        return $this->file_path ? pathinfo($this->file_path, PATHINFO_EXTENSION) : null;
    }

    /**
     * Get media type based on folder
     */
    public function getTypeAttribute()
    {
        if (str_contains($this->folder, 'event') || str_contains($this->folder, 'hackathon')) {
            return 'event';
        } elseif (str_contains($this->folder, 'competition') || str_contains($this->folder, 'contest')) {
            return 'competition';
        } elseif (str_contains($this->folder, 'formation') || str_contains($this->folder, 'course')) {
            return 'formation';
        } else {
            return 'general';
        }
    }

    /**
     * Check if the file is an image
     */
    public function getIsImageAttribute()
    {
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
        return in_array(strtolower($this->file_extension), $imageExtensions);
    }

    /**
     * Check if the file is a video
     */
    public function getIsVideoAttribute()
    {
        $videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'];
        return in_array(strtolower($this->file_extension), $videoExtensions);
    }
}
