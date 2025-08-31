<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'level',
        'duration',
        'category',
        'link',
        'thumbnail'
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }


    public function registrations()
    {
        return $this->hasMany(\App\Models\FormationRegistration::class, 'formation_id');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeDrafts($query)
    {
        return $query->where('status', 'draft');
    }
}
