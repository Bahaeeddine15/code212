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
            $table->text('group_members')->nullable()->after('participant_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competition_registrations', function (Blueprint $table) {
            $table->dropColumn('group_members');
        });
    }
};
