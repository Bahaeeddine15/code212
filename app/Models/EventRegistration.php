<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;
    
    public const PENDING  = 'waitlist';
    public const APPROVED = 'registered';
    public const REJECTED = 'cancelled';

    protected $table = 'event_registrations';
    
    protected $fillable = [
        'event_id',
        'etudiant_id',  // ✅ Remettre etudiant_id
        'participant_name',
        'email',
        'phone',
        'status',
        'registered_at',
        'cancelled_at',
    ];

    protected $casts = [
        'registered_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');  // ✅ Remettre etudiant_id
    }

    public function user()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');  // ✅ Alias pointant vers etudiant_id
    }
}
