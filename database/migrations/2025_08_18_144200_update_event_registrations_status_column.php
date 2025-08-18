<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasColumn('event_registrations', 'status2')) {
            Schema::table('event_registrations', function (Blueprint $table) {
                $table->string('status2', 20)->nullable()->after('phone');
            });
        }

        if (Schema::hasColumn('event_registrations', 'status')) {
            DB::table('event_registrations')->update([
                'status2' => DB::raw("CASE 
                    WHEN status = 'registered' THEN 'approved'
                    WHEN status = 'cancelled' THEN 'cancelled'
                    WHEN status = 'waitlist' THEN 'waitlist'
                    ELSE COALESCE(status2, 'pending') END")
            ]);
        } else {
            DB::table('event_registrations')->update([
                'status2' => DB::raw("COALESCE(status2, 'pending')")
            ]);
        }

        if (Schema::hasColumn('event_registrations', 'status')) {
            Schema::table('event_registrations', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }

        if (Schema::hasColumn('event_registrations', 'status2')) {
            // Use raw SQL for reliable rename + default value definition across MySQL/MariaDB versions
            DB::statement("ALTER TABLE event_registrations CHANGE status2 status VARCHAR(20) NOT NULL DEFAULT 'pending'");
        }
    }

    public function down(): void
    {
        // No strict down migration; keep string status
    }
};
