<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Competition extends Model
{
    /** @use HasFactory<\Database\Factories\CompetitionFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'deadline',
        'location',
        'category',
        'max_participants',
        'status',
        'slug',
        'user_id',
        'views',
        'closed_at',  // Add this
        'closed_by'   // Add this
    ];

    protected $casts = [
        'date' => 'date',
        'deadline' => 'date',
        'closed_at' => 'datetime',  // Add this
    ];

    // Relationships
    public function user()
    {
        // Creator of the competition is an admin user
        return $this->belongsTo(User::class);
    }

    public function registrations()
    {
        return $this->hasMany(CompetitionRegistration::class);
    }

    public function closedBy()
    {
        // Closed by admin user
        return $this->belongsTo(User::class, 'closed_by');
    }

    // Accessors
    public function getRegistrationsCountAttribute()
    {
        return $this->registrations()->count();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', '!=', 'Fermé');
    }

    public function scopeClosed($query)
    {
        return $query->where('status', 'Fermé');
    }
}
