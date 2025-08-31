<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class Etudiant extends Authenticatable implements MustVerifyEmail
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

    // Registration records
    public function formationRegistrations()
    {
        return $this->hasMany(FormationRegistration::class);
    }

    // All enrolled formations (with pivot data)
    public function enrolledFormations()
    {
        return $this->belongsToMany(Formation::class, 'formation_registrations', 'etudiant_id', 'formation_id')
            ->withPivot('status', 'registered_at')
            ->withTimestamps();
    }

    // Only approved formations
    public function approvedFormations()
    {
        return $this->belongsToMany(Formation::class, 'formation_registrations', 'etudiant_id', 'formation_id')
            ->wherePivot('status', 'approved')
            ->withPivot('status', 'registered_at')
            ->withTimestamps();
    }

    // ADD: Certificates relationship
    public function certificates()
    {
        return $this->hasMany(\App\Models\Certificate::class, 'student_id', 'id');
    }

    // ADD: Module completions relationship
    public function moduleCompletions()
    {
        return $this->hasMany(\App\Models\ModuleCompletion::class, 'etudiant_id', 'id');
    }

    // New: Formations relationship
    public function formations()
    {
        return $this->belongsToMany(Formation::class, 'formation_registrations', 'etudiant_id', 'formation_id')
            ->withPivot('registered_at', 'status')
            ->withTimestamps();
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\EtudiantResetPassword($token));
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\EtudiantVerifyEmail);
    }
}
