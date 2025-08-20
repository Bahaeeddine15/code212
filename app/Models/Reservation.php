<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Reservation extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'num_apogee',
        'email',
        'telephone',
        'description',
        'status',
        'date_reservation',
        'resource_type',
        'location_type',
        'room_details',
    ];

    protected $casts = [
        'date_reservation' => 'date',
    ];

    // Constantes pour les statuts
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    // Scopes pour filtrer les réservations
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    public function scopeRejected($query)
    {
        return $query->where('status', self::STATUS_REJECTED);
    }

    // Méthodes d'état
    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isApproved()
    {
        return $this->status === self::STATUS_APPROVED;
    }

    public function isRejected()
    {
        return $this->status === self::STATUS_REJECTED;
    }
}
