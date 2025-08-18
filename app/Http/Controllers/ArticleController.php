<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 12;
        $search = $request->get('search');
        $category = $request->get('category');

        $query = Article::with('user')
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        $articles = $query->paginate($perPage);

        $articles->through(function ($article) {
            $image = null;
            if ($article->featured_image) {
                $image = Storage::url($article->featured_image);
            }
            
            return [
                'id' => $article->id,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'content' => substr(strip_tags($article->content), 0, 150) . '...',
                'author' => $article->user->name,
                'date' => $article->created_at->format('d-m-Y'),
                'status' => $article->status,
                'category' => $article->category,
                'views' => $article->views,
                'image' => $image,
                'published_at' => $article->published_at?->format('Y-m-d H:i:s'),
                'reading_time' => $this->calculateReadingTime($article->content),
            ];
        });

        $categories = Cache::remember('article_categories', 3600, function () {
            return Article::where('status', 'published')
                ->distinct()
                ->pluck('category')
                ->filter()
                ->sort()
                ->values();
        });

        return Inertia::render('etudiant/articles', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ]
        ]);
    }

    private function calculateReadingTime($content)
    {
        $wordCount = str_word_count(strip_tags($content));
        $readingSpeed = 200;
        $minutes = ceil($wordCount / $readingSpeed);
        return $minutes;
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/article/article_create');
    }

    public function show(Article $article)
    {
        if ($article->status !== 'published') {
            abort(404, 'Article not found');
        }

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
            'published_at' => $article->published_at?->toISOString(),
        ];

        return Inertia::render('etudiant/article-detail', [
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

    public function featured(Request $request)
    {
        $limit = $request->get('limit', 6);
        
        $articles = Article::with('user')
            ->where('status', 'published')
            ->orderBy('views', 'desc')
            ->orderBy('published_at', 'desc')
            ->limit($limit)
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
                    'author' => $article->user->name,
                    'date' => $article->created_at->format('d-m-Y'),
                    'category' => $article->category,
                    'views' => $article->views,
                    'image' => $image,
                    'reading_time' => $this->calculateReadingTime($article->content),
                ];
            });

        return response()->json($articles);
    }

    public function latest(Request $request)
    {
        $limit = $request->get('limit', 5);
        
        $articles = Article::with('user')
            ->where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => substr($article->excerpt, 0, 100) . '...',
                    'author' => $article->user->name,
                    'date' => $article->created_at->format('d-m-Y'),
                    'category' => $article->category,
                    'views' => $article->views,
                ];
            });

        return response()->json($articles);
    }
}
