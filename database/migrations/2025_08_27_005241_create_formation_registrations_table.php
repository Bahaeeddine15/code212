<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('formation_registrations', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->foreignId('formation_id')->constrained()->cascadeOnDelete();
            $t->enum('status', ['pending','approved','rejected'])->default('pending');
            $t->timestamps();
            $t->unique(['user_id','formation_id']); // no duplicate registrations
        });
    }
    public function down(): void {
        Schema::dropIfExists('formation_registrations');
    }
};
