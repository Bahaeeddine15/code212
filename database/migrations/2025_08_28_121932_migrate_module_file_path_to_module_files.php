<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration {
    public function up(): void {
        $modules = DB::table('modules')->whereNotNull('file_path')->get();
        foreach ($modules as $m) {
            $path = $m->file_path;
            $ext  = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            $type = in_array($ext, ['mp4','mov','avi']) ? 'video' : ($ext === 'pdf' ? 'pdf' : 'other');

            // Detect which disk the file is on (adjust if needed)
            $disk = Storage::disk('public')->exists($path) ? 'public'
                  : (Storage::disk('private')->exists($path) ? 'private' : 'public');

            DB::table('module_files')->insert([
                'module_id'     => $m->id,
                'type'          => $type,
                'disk'          => $disk,
                'path'          => $path,
                'original_name' => basename($path),
                'mime_type'     => null,
                'size'          => null,
                'position'      => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);

            // Optional: clear legacy column so you can drop it later
            DB::table('modules')->where('id',$m->id)->update(['file_path' => null]);
        }
    }
    public function down(): void { /* no-op */ }
};