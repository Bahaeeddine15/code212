<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Module;
use App\Models\FormationRegistration;

class Formation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'level',
        'duration',
        'category',
        'link',
        'thumbnail',
        'language',
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function registrations()
    {
        return $this->hasMany(FormationRegistration::class);
    }
}
