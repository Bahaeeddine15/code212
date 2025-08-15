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
        Schema::table('users', function (Blueprint $table) {
            $table->string('ecole')->after('email');
            $table->string('telephone')->nullable()->after('ecole');
            $table->string('ville')->nullable()->after('telephone');
            $table->string('student_id')->nullable()->after('ville');
            $table->string('departement')->nullable()->after('student_id');
            $table->text('bio')->nullable()->after('departement');
            $table->string('avatar_url')->nullable()->after('bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'ecole', 
                'telephone', 
                'ville', 
                'student_id', 
                'departement', 
                'bio', 
                'avatar_url'
            ]);
        });
    }
};
