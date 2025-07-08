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
        Schema::table('media', function (Blueprint $table) {
            $table->string('title')->nullable()->after('name');
            $table->text('description')->nullable()->after('title');
            $table->string('alt_text')->nullable()->after('description');
            $table->json('tags')->nullable()->after('mime_type');
            $table->string('category')->nullable()->after('tags');
            $table->enum('status', ['active', 'archived', 'private'])->default('active')->after('category');
            $table->integer('views')->default(0)->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'alt_text', 'tags', 'category', 'status', 'views']);
        });
    }
};
