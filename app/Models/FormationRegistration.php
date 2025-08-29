<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Etudiant;
use App\Models\Formation;

class FormationRegistration extends Model
{
    protected $fillable = [
        'etudiant_id',
        'formation_id',
        'registered_at',
        // Remove 'status' from fillable
    ];

    protected $casts = [
        'registered_at' => 'datetime',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
