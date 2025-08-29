<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('formation_registrations', function (Blueprint $table) {
            $table->id();

            // Create foreign key columns
            $table->foreignId('etudiant_id')->constrained('etudiant')->cascadeOnDelete();
            $table->foreignId('formation_id')->constrained('formations')->cascadeOnDelete();

            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('registered_at')->nullable();
            $table->timestamps();

            // Prevent duplicate registrations
            $table->unique(['etudiant_id', 'formation_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formation_registrations');
    }
};
