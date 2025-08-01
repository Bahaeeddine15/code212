<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    /** @use HasFactory<\Database\Factories\MediaFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'detail',
        'file_path',
        'original_name',
        'user_id',
        'folder', // <-- add this
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
