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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('excerpt'); // For the summary/resume field
            $table->longText('content'); // For the full article content
            $table->string('slug')->unique(); // SEO-friendly URL
            $table->string('category'); // Category field from your form
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft'); // Status from your form
            $table->string('featured_image')->nullable(); // For article images
            $table->integer('views')->default(0); // View count
            $table->timestamp('published_at')->nullable(); // When article was published
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Author (user who created it)
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
