<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $fillable = ['title', 'description', 'level', 'duration', 'category'];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
