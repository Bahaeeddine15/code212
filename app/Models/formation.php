<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Module;
use App\Models\FormationRegistration;

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
    
    public function isPublished(): bool { return $this->status === 'published'; }

    public function scopePublished($q) { return $q->where('status','published'); }
    
    public function scopeDrafts($q)    { return $q->where('status','draft'); }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function registrations()
    {
        return $this->hasMany(FormationRegistration::class);
    }
}
