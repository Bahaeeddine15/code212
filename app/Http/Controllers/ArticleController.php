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
        $perPage = 12; // Articles per page
        $search = $request->get('search');
        $category = $request->get('category');

        $query = Article::with('user')
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');

        // Add search functionality
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Add category filter
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        $articles = $query->paginate($perPage);

        // Transform the paginated results
        $articles->through(function ($article) {
            // Support multiple images: featured_image can be a JSON array or a single path
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
            
            return [
                'id' => $article->id,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'content' => substr(strip_tags($article->content), 0, 150) . '...', // Preview content
                'author' => $article->user->name,
                'date' => $article->created_at->format('d-m-Y'),
                'status' => $article->status,
                'category' => $article->category,
                'views' => $article->views,
                'image' => $firstImage,
                'images' => $images,
                'published_at' => $article->published_at?->format('Y-m-d H:i:s'),
                'reading_time' => $this->calculateReadingTime($article->content),
            ];
        });

        // Get available categories for filter (cached for 1 hour)
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

    /**
     * Calculate estimated reading time
     */
    private function calculateReadingTime($content)
    {
        $wordCount = str_word_count(strip_tags($content));
        $readingSpeed = 200; // words per minute
        $minutes = ceil($wordCount / $readingSpeed);
        return $minutes;
    }

    public function create()
    {
        return Inertia::render('dashboard_admin/article/article_create');
    }

    public function show(Article $article)
    {
        // Only allow viewing published articles for students
        if ($article->status !== 'published') {
            abort(404, 'Article not found');
        }

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
            'published_at' => $article->published_at?->toISOString(),
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

    /**
     * Get featured articles for homepage or widgets
     */
    public function featured(Request $request)
    {
        $limit = $request->get('limit', 6);
        
        $articles = Article::with('user')
            ->where('status', 'published')
            ->orderBy('views', 'desc') // Most viewed first
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($article) {
                $images = [];
                if ($article->featured_image) {
                    $decoded = json_decode($article->featured_image, true);
                    if (is_array($decoded)) {
                        $images = array_map(fn ($p) => Storage::url($p), array_filter($decoded));
                    } else {
                        $images = [Storage::url($article->featured_image)];
                    }
                }
                
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'author' => $article->user->name,
                    'date' => $article->created_at->format('d-m-Y'),
                    'category' => $article->category,
                    'views' => $article->views,
                    'image' => $images[0] ?? null,
                    'reading_time' => $this->calculateReadingTime($article->content),
                ];
            });

        return response()->json($articles);
    }

    /**
     * Get latest articles
     */
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
