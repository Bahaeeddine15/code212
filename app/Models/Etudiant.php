<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Etudiant extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'etudiant';

    protected $fillable = [
        'name',
        'email',
        'password',
        'ecole',
        'telephone',
        'ville',
        'student_id',
        'departement',
        'bio',
        'avatar_url',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function eventRegistrations()
    {
        return $this->hasMany(EventRegistration::class, 'user_id');
    }
}
