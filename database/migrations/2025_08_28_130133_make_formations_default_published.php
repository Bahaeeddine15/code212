<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    
        public function up(): void {
            // First, add the status column if it doesn't exist
            if (!Schema::hasColumn('formations', 'status')) {
                Schema::table('formations', function (Blueprint $table) {
                    $table->string('status', 20)->default('published')->after('id');
                });
            } else {
                // If it exists, just modify the default
                DB::statement("ALTER TABLE formations MODIFY status VARCHAR(20) NOT NULL DEFAULT 'published'");
            }

            // Add published_at column if it doesn't exist
            if (!Schema::hasColumn('formations', 'published_at')) {
                Schema::table('formations', function (Blueprint $table) {
                    $table->timestamp('published_at')->nullable();
                });
            }

            // Set published_at for rows already marked published but missing timestamp
            DB::statement("UPDATE formations SET published_at = NOW() WHERE status = 'published' AND published_at IS NULL");
        }

        public function down(): void {
            DB::statement("ALTER TABLE formations MODIFY status VARCHAR(20) NOT NULL DEFAULT 'draft'");
        }
};
