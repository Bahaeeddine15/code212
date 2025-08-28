<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleFile extends Model
{
    protected $fillable = ['module_id', 'type', 'disk', 'path', 'original_name', 'mime_type', 'size', 'position', 'qualities'];
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
