<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = ['formation_id', 'title', 'description', 'order', 'duration'];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
    public function files() {
        return $this->hasMany(\App\Models\ModuleFile::class)->orderBy('position');
    }
}
