<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArticleControllerAdmin extends Controller
{
    public function index()
    {
        $articles = Article::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) {
               
                $images = [];
                if ($article->featured_image) {
                    $decoded = json_decode($article->featured_image, true);
                    if (is_array($decoded)) {
                        
                        $images = array_map(fn($p) => Storage::url($p), array_filter($decoded));
                    } else {
                     
                        $images = [Storage::url($article->featured_image)];
                    }
                }
                
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'content' => $article->content,
                    'author' => $article->user->name,
                    'date' => $article->created_at->format('d-m-Y'),
                    'status' => $article->status,
                    'category' => $article->category,
                    'views' => $article->views,
                    
                    'images' => $images,
                    
                    'raw_images' => $article->featured_image ? json_decode($article->featured_image, true) : [],
                ];
            });

        return Inertia::render('dashboard_admin/article/article_index', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/article/article_create');
    }

    public function show(Article $article)
    {
        // Increment view count
        $article->increment('views');

        // Prepare images - handle both single path and JSON array
        $images = [];
        if ($article->featured_image) {
            $decoded = json_decode($article->featured_image, true);
            if (is_array($decoded)) {
                // It's a JSON array of paths
                $images = array_map(fn($p) => Storage::url($p), array_filter($decoded));
            } else {
                // It's a single path string
                $images = [Storage::url($article->featured_image)];
            }
        }

        $articleData = [
            'id' => $article->id,
            'title' => $article->title,
            'excerpt' => $article->excerpt,
            'content' => $article->content,
            'author' => $article->user->name,
            'date' => $article->created_at->format('Y-m-d'),
            'status' => $article->status,
            'category' => $article->category,
            'views' => $article->views,
            'images' => $images,
            'created_at' => $article->created_at->toISOString(),
            'updated_at' => $article->updated_at->toISOString(),
        ];

        return Inertia::render('dashboard_admin/article/article_show', [
            'article' => $articleData
        ]);
    }

    public function edit(Article $article)
    {
        // Prepare images - handle both single path and JSON array
        $images = [];
        $rawImages = [];
        if ($article->featured_image) {
            $decoded = json_decode($article->featured_image, true);
            if (is_array($decoded)) {
                // It's a JSON array of paths
                $rawImages = $decoded;
                $images = array_map(fn($p) => Storage::url($p), array_filter($decoded));
            } else {
                // It's a single path string
                $rawImages = [$article->featured_image];
                $images = [Storage::url($article->featured_image)];
            }
        }

        $articleData = [
            'id' => $article->id,
            'title' => $article->title,
            'excerpt' => $article->excerpt,
            'content' => $article->content,
            'author' => $article->user->name,
            'date' => $article->created_at->format('Y-m-d'),
            'status' => $article->status,
            'category' => $article->category,
            'views' => $article->views,
            'images' => $rawImages, // Raw paths for editing
            'image_urls' => $images, // URLs for display
            'created_at' => $article->created_at->toISOString(),
            'updated_at' => $article->updated_at->toISOString(),
        ];

        return Inertia::render('dashboard_admin/article/article_edit', [
            'article' => $articleData
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120', // 5MB per image
        ]);

        $validated['user_id'] = Auth::id();
        $validated['slug'] = Str::slug($validated['title']);

        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        // Handle images
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('article', 'public');
                Storage::disk('public')->setVisibility($path, 'public');
                $imagePaths[] = $path;
            }
        }

        // Check image count
        if (count($imagePaths) > 5) {
            return back()->withErrors(['images' => 'Vous pouvez ajouter jusqu\'à 5 images maximum.']);
        }

        // Save all image paths as JSON in featured_image
        $validated['featured_image'] = !empty($imagePaths) ? json_encode($imagePaths) : null;

        $article = Article::create($validated);

        return redirect()->route('articles.index')->with('success', 'Article créé avec succès!');
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120', // 5MB per image
            'existing_images' => 'nullable|string', // JSON array of kept images
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($validated['status'] === 'published' && $article->status !== 'published') {
            $validated['published_at'] = now();
        }

        // Handle images
        $imagePaths = [];

        // 1. Keep existing images that the user did not remove
        if ($request->filled('existing_images')) {
            $existingImages = json_decode($request->input('existing_images'), true) ?? [];
            $imagePaths = array_filter($existingImages, fn($img) => !empty($img));
        }

        // 2. Add new uploaded images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('article', 'public');
                Storage::disk('public')->setVisibility($path, 'public');
                $imagePaths[] = $path;
            }
        }

        // Check image count
        if (count($imagePaths) > 5) {
            return back()->withErrors(['images' => 'Vous pouvez ajouter jusqu\'à 5 images maximum.']);
        }

        // 3. Save all image paths as JSON in featured_image
        $validated['featured_image'] = !empty($imagePaths) ? json_encode($imagePaths) : null;

        $article->update($validated);

        return redirect()->route('articles.index')->with('success', 'Article mis à jour avec succès!');
    }

    public function destroy(Article $article)
    {
        // Delete associated images from storage
        if ($article->featured_image) {
            $decoded = json_decode($article->featured_image, true);
            if (is_array($decoded)) {
                // It's a JSON array of paths
                foreach ($decoded as $imagePath) {
                    if (Storage::disk('public')->exists($imagePath)) {
                        Storage::disk('public')->delete($imagePath);
                    }
                }
            } else {
                // It's a single path string
                if (Storage::disk('public')->exists($article->featured_image)) {
                    Storage::disk('public')->delete($article->featured_image);
                }
            }
        }

        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article supprimé avec succès!');
    }
}
