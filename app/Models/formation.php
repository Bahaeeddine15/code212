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
        'thumbnail',
        'status',
        'language',
        'pre_requis',
        'published_at'
    ];

    // Relationship: modules
    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    // Relationship: registrations
    public function registrations()
    {
        return $this->hasMany(\App\Models\FormationRegistration::class, 'formation_id');
    }

    // Scope: published
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    // Scope: drafts
    public function scopeDrafts($query)
    {
        return $query->where('status', 'draft');
    }
}