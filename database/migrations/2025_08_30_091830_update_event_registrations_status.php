<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // MySQL enum alteration
        DB::statement(
            "ALTER TABLE event_registrations 
             MODIFY COLUMN status 
             ENUM('waitlist','registered','rejected','cancelled') 
             NOT NULL DEFAULT 'waitlist'"
        );
    }

    public function down(): void
    {
        DB::statement(
            "ALTER TABLE event_registrations 
             MODIFY COLUMN status 
             ENUM('registered','cancelled','waitlist') 
             NOT NULL DEFAULT 'registered'"
        );
    }
};
