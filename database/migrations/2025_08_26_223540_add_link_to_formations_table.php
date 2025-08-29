<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('formations', function (Blueprint $table) {
            if (!Schema::hasColumn('formations', 'link')) {
                $table->string('link')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('formations', function (Blueprint $table) {
            $table->dropColumn('link');
        });
    }
};
