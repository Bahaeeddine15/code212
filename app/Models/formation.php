<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formation extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'titre',
        'description', 
        'niveau',
        'category',
        'photo'
    ];
}
