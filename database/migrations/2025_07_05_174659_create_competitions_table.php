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
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('date'); // Competition date
            $table->date('deadline'); // Registration deadline
            $table->string('location');
            $table->string('category');
            $table->integer('max_participants');
            $table->enum('status', ['Ouvert', 'Complet', 'Fermé'])->default('Ouvert');
            $table->integer('views')->default(0);
            $table->string('slug')->unique();
            $table->timestamp('closed_at')->nullable(); // Remove the 'after' clause
            $table->foreignId('closed_by')->nullable()->constrained('users');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};
