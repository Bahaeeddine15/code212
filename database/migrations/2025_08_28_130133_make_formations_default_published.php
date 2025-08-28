<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    
        public function up(): void {
            // MySQL alter default (no doctrine/dbal needed)
            DB::statement("ALTER TABLE formations MODIFY status VARCHAR(20) NOT NULL DEFAULT 'published'");

            // Set published_at for rows already marked published but missing timestamp
            DB::statement("UPDATE formations SET published_at = NOW() WHERE status = 'published' AND published_at IS NULL");
        }

        public function down(): void {
            DB::statement("ALTER TABLE formations MODIFY status VARCHAR(20) NOT NULL DEFAULT 'draft'");
        }
};
