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
        Schema::table('competition_registrations', function (Blueprint $table) {
            // Add user_id referencing the etudiant table (students)
            if (!Schema::hasColumn('competition_registrations', 'user_id')) {
                $table->foreignId('user_id')
                    ->nullable()
                    ->after('competition_id')
                    ->constrained('etudiant')
                    ->onDelete('cascade');
            }

            // Add a unique composite index to prevent duplicates per student per competition
            // Note: Doctrine is optional; if unavailable, the following may be ignored by some DB drivers
            try {
                $table->unique(['competition_id', 'user_id']);
            } catch (\Throwable $e) {
                // ignore if already exists
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competition_registrations', function (Blueprint $table) {
            // Drop unique index if exists
            try {
                $table->dropUnique('competition_registrations_competition_id_user_id_unique');
            } catch (\Throwable $e) {
                // ignore if not exists
            }

            if (Schema::hasColumn('competition_registrations', 'user_id')) {
                try {
                    $table->dropForeign(['user_id']);
                } catch (\Throwable $e) {
                    // ignore
                }
                $table->dropColumn('user_id');
            }
        });
    }
};
