<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Module;
use App\Models\FormationRegistration;
use App\Models\Etudiant; // Add this import

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
        'published_at',
        'language',
    ];

    protected $casts = ['published_at' => 'datetime'];

    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    public function scopePublished($q)
    {
        return $q->where('status', 'published');
    }

    public function scopeDrafts($q)
    {
        return $q->where('status', 'draft');
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function registrations()
    {
        return $this->hasMany(FormationRegistration::class);
    }

    public function enrolledStudents()
    {
        return $this->belongsToMany(Etudiant::class, 'formation_registrations', 'formation_id', 'etudiant_id')
            ->withPivot('status', 'registered_at')
            ->withTimestamps();
    }

    // Optional: Get only approved students
    public function approvedStudents()
    {
        return $this->belongsToMany(Etudiant::class, 'formation_registrations', 'formation_id', 'etudiant_id')
            ->wherePivot('status', 'approved')
            ->withPivot('status', 'registered_at')
            ->withTimestamps();
    }
}