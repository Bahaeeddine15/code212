<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImageService
{
    protected string $disk = 'public';
    protected string $path = 'articles/images';

    /**
     * Upload and process an image for articles
     */
    public function uploadArticleImage(UploadedFile $file, string $articleTitle): string
    {
        // Generate unique filename
        $filename = $this->generateFilename($file, $articleTitle);
        
        // Store the original image
        $path = $file->storeAs($this->path, $filename, $this->disk);
        
        // Optionally resize/optimize the image
        $this->processImage($path);
        
        return $path;
    }

    /**
     * Delete an image from storage
     */
    public function deleteImage(?string $imagePath): bool
    {
        if (!$imagePath || !Storage::disk($this->disk)->exists($imagePath)) {
            return false;
        }

        return Storage::disk($this->disk)->delete($imagePath);
    }

    /**
     * Get the full URL for an image
     */
    public function getImageUrl(string $imagePath): string
    {
        return asset('storage/' . $imagePath);
    }

    /**
     * Check if an image exists
     */
    public function imageExists(?string $imagePath): bool
    {
        if (!$imagePath) {
            return false;
        }

        return Storage::disk($this->disk)->exists($imagePath);
    }

    /**
     * Generate a unique filename for the image
     */
    protected function generateFilename(UploadedFile $file, string $articleTitle): string
    {
        $extension = $file->getClientOriginalExtension();
        $slug = Str::slug($articleTitle);
        $timestamp = time();
        
        return "{$timestamp}_{$slug}.{$extension}";
    }

    /**
     * Process image (resize, optimize, etc.)
     * Note: This requires intervention/image package
     */
    protected function processImage(string $path): void
    {
        // Uncomment if you install intervention/image
        /*
        $fullPath = Storage::disk($this->disk)->path($path);
        
        $image = Image::make($fullPath);
        
        // Resize if larger than 800px width
        if ($image->width() > 800) {
            $image->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
        }
        
        // Save with 85% quality
        $image->save($fullPath, 85);
        */
    }

    /**
     * Generate multiple sizes for responsive images
     */
    public function generateResponsiveSizes(string $imagePath): array
    {
        // This would generate thumbnail, medium, large versions
        // Implementation depends on your needs
        return [
            'original' => $this->getImageUrl($imagePath),
            'thumbnail' => $this->getImageUrl($imagePath), // Could be processed version
            'medium' => $this->getImageUrl($imagePath),
        ];
    }
}
