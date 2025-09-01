<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClubAdhesion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_organisation',
        'contact_principal',
        'email',
        'telephone',
        'description_projet',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
