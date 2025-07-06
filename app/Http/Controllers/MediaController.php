<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
   public function index()
    {
        $media = Media::latest()->get();

        return Inertia::render('dashboard_admin/media', [
            'media' => $media
        ]);
    }

    // Upload media
    public function store(Request $request)
    {
        try {
            // Validate the upload
            $request->validate([
                'media' => 'required|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi,pdf,doc,docx,txt|max:20480', // 20MB max
            ]);

            $file = $request->file('media');
            $mime = $file->getMimeType();

            // Detect type
            $type = str_starts_with($mime, 'image') ? 'image' :
                    (str_starts_with($mime, 'video') ? 'video' : 'document');

            // Store file
            $path = $file->store('media', 'public');

            // Create media entry
            $media = Media::create([
                'filename' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $mime,
                'type' => $type,
                'user_id' => auth()->id() ?? 1, // Use auth if available, fallback to 1
            ]);
            // Return Inertia response for regular form submissions
            return back()->with('success', 'Media uploaded successfully')->with('media', $media);

        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }
            return back()->withErrors($e->errors())->withInput();

        } catch (\Exception $e) {
            \Log::error('Media upload error: ' . $e->getMessage());
            
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Upload failed: ' . $e->getMessage(),
                ], 500);
            }
            return back()->with('error', 'Upload failed: ' . $e->getMessage());
        }
    }

    // Download or view media
    public function show($id)
    {
        $media = Media::findOrFail($id);
        return Storage::disk('public')->download($media->filename, $media->original_name);
    }

    // Delete media
    public function destroy($id)
    {
        try {
            $media = Media::findOrFail($id);
            
            // Delete file from storage
            if (Storage::disk('public')->exists($media->filename)) {
                Storage::disk('public')->delete($media->filename);
            }
            
            // Delete database record
            $media->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Media deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }
}