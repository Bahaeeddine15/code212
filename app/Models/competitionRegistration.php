<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionRegistration extends Model
{
    /** @use HasFactory<\Database\Factories\CompetitionRegistrationFactory> */
    use HasFactory;

    protected $fillable = [
        'competition_id',
        'participant_name',
        'email',
        'phone',
        'club',
        'category',
        'status',
        'payment_status',
        'notes',
        'registered_at'
    ];

    protected $casts = [
        'registered_at' => 'datetime',
    ];

    // Relationships
    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }
}
