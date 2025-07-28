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
        Schema::create('competition_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('competition_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('participant_name');
            $table->string('email');
            $table->string('phone');
            $table->string('club')->nullable();
            $table->string('category'); // Category they're registering for
            $table->enum('status', ['En attente', 'Confirmé', 'Refusé'])->default('En attente');
            $table->enum('payment_status', ['En attente', 'Payé', 'Refusé'])->default('En attente');
            $table->text('notes')->nullable();
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamps();

            // Prevent duplicate registrations
            $table->unique(['competition_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_registrations');
    }
};
