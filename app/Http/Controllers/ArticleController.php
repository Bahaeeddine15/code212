<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('user')
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($article) {
                // Support multiple images: featured_image can be a JSON array or a single path
                $images = [];
                if ($article->featured_image) {
                    $decoded = json_decode($article->featured_image, true);
                    if (is_array($decoded)) {
                        $images = array_map(fn ($p) => \Illuminate\Support\Facades\Storage::url($p), array_filter($decoded));
                    } else {
                        $images = [\Illuminate\Support\Facades\Storage::url($article->featured_image)];
                    }
                }
                $firstImage = $images[0] ?? null;
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
                    // For backward compatibility keep 'image' with the first image
                    'image' => $firstImage,
                    // Provide all images for the student UI
                    'images' => $images,
                ];
            });

        return Inertia::render('etudiant/articles', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/article/article_create');
    }

    public function show(Article $article)
    {
        $article->increment('views');
        // Prepare images array (supports JSON array or single path)
        $images = [];
        if ($article->featured_image) {
            $decoded = json_decode($article->featured_image, true);
            if (is_array($decoded)) {
                $images = array_map(fn ($p) => Storage::url($p), array_filter($decoded));
            } else {
                $images = [Storage::url($article->featured_image)];
            }
        }
        $firstImage = $images[0] ?? null;

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
            'image' => $firstImage,
            'images' => $images,
            'created_at' => $article->created_at->toISOString(),
            'updated_at' => $article->updated_at->toISOString(),
        ];

        return Inertia::render('etudiant/article-detail', [
            'article' => $articleData
        ]);
    }

    public function edit(Article $article)
    {
        // Prepare images array for potential use in admin edit view
        $images = [];
        if ($article->featured_image) {
            $decoded = json_decode($article->featured_image, true);
            if (is_array($decoded)) {
                $images = array_map(fn ($p) => Storage::url($p), array_filter($decoded));
            } else {
                $images = [Storage::url($article->featured_image)];
            }
        }
        $firstImage = $images[0] ?? null;

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
            'image' => $firstImage,
            'images' => $images,
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
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $path = $image->store('article', 'public');
            $validated['featured_image'] = $path;
        }

        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        Article::create($validated);

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
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            if ($article->featured_image && Storage::disk('public')->exists($article->featured_image)) {
                Storage::disk('public')->delete($article->featured_image);
            }
            $image = $request->file('featured_image');
            $path = $image->store('article', 'public');
            $validated['featured_image'] = $path;
        }

        if ($validated['status'] === 'published' && $article->status !== 'published') {
            $validated['published_at'] = now();
        }

        $article->update($validated);

        return redirect()->route('articles.index')->with('success', 'Article mis à jour avec succès!');
    }

    public function destroy(Article $article)
    {
        if ($article->featured_image && Storage::disk('public')->exists($article->featured_image)) {
            Storage::disk('public')->delete($article->featured_image);
        }

        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article supprimé avec succès!');
    }
}
