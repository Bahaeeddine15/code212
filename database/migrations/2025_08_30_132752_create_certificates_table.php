<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // CERT-2025-001
            $table->foreignId('student_id')->constrained('etudiant')->onDelete('cascade');
            $table->foreignId('formation_id')->constrained('formations')->onDelete('cascade');
            $table->string('student_name');
            $table->string('formation_title');
            $table->timestamp('issued_date')->nullable(); // When admin generates it
            $table->timestamp('registered_date')->useCurrent(); // FIX: Add default current timestamp
            $table->string('pdf_path')->nullable();
            $table->string('preview_image')->nullable();
            $table->string('verification_code')->nullable()->unique();
            $table->boolean('is_generated')->default(false); // Key field!
            $table->json('certificate_data')->nullable();
            $table->timestamps();

            $table->index(['student_id', 'formation_id']);
            $table->index('verification_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
