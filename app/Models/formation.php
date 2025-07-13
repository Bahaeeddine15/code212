<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model // Majuscule pour Formation
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'category',
        'niveau',
        'photo'
    ];
}
