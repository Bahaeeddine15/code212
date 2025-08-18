<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'location',
        'max_attendees',
        'category',
    'type',
        'status',
        'logo',
    ];
    
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    // Compute a consistent status from dates and stored status
    public function computedStatus(): string
    {
        if ($this->status === 'cancelled') {
            return 'cancelled';
        }
        if ($this->end_date && $this->end_date->isPast()) {
            return 'completed';
        }
        if ($this->start_date && $this->start_date->isFuture()) {
            return 'upcoming';
        }
        return 'ongoing';
    }
}
