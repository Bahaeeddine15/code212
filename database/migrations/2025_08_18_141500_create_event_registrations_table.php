<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            // Users are stored in 'etudiant' table
            $table->foreignId('etudiant_id')->constrained('etudiant')->onDelete('cascade');  // ✅ Changer en etudiant_id
            $table->string('participant_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->enum('status', ['registered','cancelled','waitlist'])->default('registered');
            $table->timestamp('registered_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            $table->unique(['event_id','etudiant_id']);  // ✅ Changer la contrainte unique aussi
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
    }
};
