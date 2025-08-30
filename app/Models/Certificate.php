<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'code',
        'student_id',
        'formation_id',
        'student_name',
        'formation_title',
        'issued_date',
        'registered_date',
        'pdf_path',
        'preview_image',
        'verification_code',
        'is_generated',
        'certificate_data'
    ];

    protected $casts = [
        'issued_date' => 'datetime',
        'registered_date' => 'datetime',
        'is_generated' => 'boolean',
        'certificate_data' => 'array'
    ];

    public function student()
    {
        return $this->belongsTo(\App\Models\Etudiant::class, 'student_id', 'id');
    }

    public function formation()
    {
        return $this->belongsTo(\App\Models\Formation::class);
    }
}
