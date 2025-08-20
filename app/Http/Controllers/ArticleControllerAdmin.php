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
                $image = null;
                if ($article->featured_image) {
                    $image = Storage::url($article->featured_image);
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
                    'image' => $image,
                    'featured_image' => $article->featured_image,
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
        $article->increment('views');

        $image = null;
        if ($article->featured_image) {
            $image = Storage::url($article->featured_image);
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
            'image' => $image,
            'created_at' => $article->created_at->toISOString(),
            'updated_at' => $article->updated_at->toISOString(),
        ];

        return Inertia::render('dashboard_admin/article/article_show', [
            'article' => $articleData
        ]);
    }

    public function edit(Article $article)
    {
        $image = null;
        if ($article->featured_image) {
            $image = Storage::url($article->featured_image);
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
            'featured_image' => $article->featured_image,
            'image' => $image,
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['slug'] = Str::slug($validated['title']);

        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('article', 'public');
            Storage::disk('public')->setVisibility($path, 'public');
            $validated['featured_image'] = $path;
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($validated['status'] === 'published' && $article->status !== 'published') {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('image')) {
            if ($article->featured_image && Storage::disk('public')->exists($article->featured_image)) {
                Storage::disk('public')->delete($article->featured_image);
            }
            $path = $request->file('image')->store('article', 'public');
            Storage::disk('public')->setVisibility($path, 'public');
            $validated['featured_image'] = $path;
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
