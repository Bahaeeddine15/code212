<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('module_files', function (Blueprint $t) {
            $t->id();
            $t->foreignId('module_id')->constrained()->cascadeOnDelete();
            $t->enum('type', ['pdf','video','other'])->default('other');
            $t->string('disk')->default('private'); // 'private' recommended
            $t->string('path');                     // e.g. formations/{formation_id}/{module_id}/file.ext
            $t->string('original_name');
            $t->string('mime_type')->nullable();
            $t->unsignedBigInteger('size')->nullable();
            $t->unsignedInteger('position')->default(1);
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('module_files');
    }
};