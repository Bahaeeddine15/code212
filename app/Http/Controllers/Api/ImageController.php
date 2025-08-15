<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * Upload image via AJAX
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'nullable|string|max:255'
        ]);

        try {
            $title = $request->input('title', 'untitled');
            $imagePath = $this->imageService->uploadArticleImage(
                $request->file('image'), 
                $title
            );

            return response()->json([
                'success' => true,
                'path' => $imagePath,
                'url' => $this->imageService->getImageUrl($imagePath),
                'message' => 'Image uploadée avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'upload: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete image via AJAX
     */
    public function delete(Request $request): JsonResponse
    {
        $request->validate([
            'path' => 'required|string'
        ]);

        try {
            $deleted = $this->imageService->deleteImage($request->input('path'));

            return response()->json([
                'success' => $deleted,
                'message' => $deleted ? 'Image supprimée avec succès' : 'Image non trouvée'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression: ' . $e->getMessage()
            ], 500);
        }
    }
}
