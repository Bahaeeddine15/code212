<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormationRegistration extends Model
{
    protected $fillable = [
        'user_id',
        'formation_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
