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
            $table->string('group_name')->nullable()->after('category');
            // group_members column should already exist, but let's make sure it can handle more text
            $table->text('group_members')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competition_registrations', function (Blueprint $table) {
            $table->dropColumn('group_name');
        });
    }
};
