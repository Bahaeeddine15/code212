<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    //items
    protected $fillable = [
        'title',
        'description',
        'level',
        'duration',
        'category',
        'link',
        'thumbnail'
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
