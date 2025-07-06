import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    FileText, 
    Plus, 
    Edit3, 
    Trash2, 
    Search,
    Filter,
    Eye,
    Calendar,
    User,
    Tag,
    MoreHorizontal,
    Save,
    X
} from 'lucide-react';
import { useState } from 'react';

// Types pour les articles
interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    status: 'published' | 'draft' | 'archived';
    category: string;
    views: number;
    image?: string;
}

// Données simulées d'articles
const initialArticles: Article[] = [
    {
        id: 1,
        title: "Guide complet de la bibliothèque universitaire",
        excerpt: "Découvrez tous les services et ressources disponibles dans notre bibliothèque.",
        content: "Contenu complet de l'article...",
        author: "Admin",
        date: "2024-01-15",
        status: "published",
        category: "Guide",
        views: 245,
        image: "/images/library-guide.jpg"
    },
    {
        id: 2,
        title: "Nouvelles acquisitions de janvier",
        excerpt: "Présentation des derniers ouvrages ajoutés à notre collection.",
        content: "Contenu de l'article sur les nouvelles acquisitions...",
        author: "Bibliothécaire",
        date: "2024-01-20",
        status: "draft",
        category: "Actualité",
        views: 0
    },
    {
        id: 3,
        title: "Horaires d'été de la bibliothèque",
        excerpt: "Consultez les nouveaux horaires en vigueur pendant la période estivale.",
        content: "Détails des horaires d'été...",
        author: "Admin",
        date: "2024-01-10",
        status: "archived",
        category: "Information",
        views: 189
    }
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestion des articles',
        href: '/articles',
    },
];

// Composant pour les cartes d'articles
const ArticleCard = ({ 
    article,
    onEdit,
    onDelete
}: {
    article: Article;
    onEdit: (article: Article) => void;
    onDelete: (id: number) => void;
}) => {
    const getStatusBadge = () => {
        switch (article.status) {
            case 'published':
                return <Badge className="bg-emerald-100 text-emerald-800">Publié</Badge>;
            case 'draft':
                return <Badge className="bg-amber-100 text-amber-800">Brouillon</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800">Archivé</Badge>;
        }
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            {article.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
            )}
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                        {article.title}
                    </h3>
                    {getStatusBadge()}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(article)}>
                            <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDelete(article.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// Formulaire d'article
const ArticleForm = ({ 
    article, 
    onSave, 
    onCancel 
}: { 
    article?: Article; 
    onSave: (article: Partial<Article>) => void; 
    onCancel: () => void; 
}) => {
    const [formData, setFormData] = useState({
        title: article?.title || '',
        excerpt: article?.excerpt || '',
        content: article?.content || '',
        category: article?.category || '',
        status: article?.status || 'draft' as const
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>{article ? 'Modifier l\'article' : 'Nouvel article'}</CardTitle>
                <CardDescription>
                    {article ? 'Modifiez les informations de l\'article' : 'Créez un nouvel article'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Titre de l'article"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Catégorie</Label>
                            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technologie">Technologie</SelectItem>
                                    <SelectItem value="developpement">Développement</SelectItem>
                                    <SelectItem value="carriere">Carrière</SelectItem>
                                    <SelectItem value="securite">Sécurité</SelectItem>
                                    <SelectItem value="guide">Guide</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Résumé</Label>
                        <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="Résumé de l'article"
                            rows={3}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="content">Contenu</Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Contenu complet de l'article"
                            rows={8}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="status">Statut</Label>
                        <Select onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData(prev => ({ ...prev, status: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Statut de l'article" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Brouillon</SelectItem>
                                <SelectItem value="published">Publié</SelectItem>
                                <SelectItem value="archived">Archivé</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            <X className="w-4 h-4 mr-2" />
                            Annuler
                        </Button>
                        <Button type="submit">
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [showForm, setShowForm] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Filtrer les articles
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || article.category.toLowerCase() === categoryFilter;
        
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleAddArticle = () => {
        setEditingArticle(null);
        setShowForm(true);
    };

    const handleEditArticle = (article: Article) => {
        setEditingArticle(article);
        setShowForm(true);
    };

    const handleDeleteArticle = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            setArticles(prev => prev.filter(article => article.id !== id));
        }
    };

    const handleSaveArticle = (articleData: Partial<Article>) => {
        if (editingArticle) {
            // Modification
            setArticles(prev => prev.map(article => 
                article.id === editingArticle.id 
                    ? { ...article, ...articleData, date: new Date().toLocaleDateString() }
                    : article
            ));
        } else {
            // Ajout
            const newArticle: Article = {
                id: Math.max(...articles.map(a => a.id)) + 1,
                title: articleData.title || '',
                excerpt: articleData.excerpt || '',
                content: articleData.content || '',
                author: 'Admin',
                date: new Date().toLocaleDateString(),
                status: articleData.status || 'draft',
                category: articleData.category || '',
                views: 0
            };
            setArticles(prev => [newArticle, ...prev]);
        }
        setShowForm(false);
        setEditingArticle(null);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingArticle(null);
    };

    // Statistiques
    const stats = {
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        draft: articles.filter(a => a.status === 'draft').length,
        totalViews: articles.reduce((sum, a) => sum + a.views, 0)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des articles" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                
                {/* En-tête avec actions */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Gestion des Articles</h1>
                            <p className="text-blue-100">Créez, modifiez et gérez vos articles</p>
                        </div>
                        <Button 
                            onClick={handleAddArticle}
                            className="bg-white text-indigo-600 hover:bg-gray-100"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Nouvel article
                        </Button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total articles</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.total}</p>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Publiés</p>
                                    <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.published}</p>
                                </div>
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                                    <Eye className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Brouillons</p>
                                    <p className="text-2xl font-bold text-amber-600 mt-1">{stats.draft}</p>
                                </div>
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                                    <Edit3 className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Vues totales</p>
                                    <p className="text-2xl font-bold text-purple-600 mt-1">{stats.totalViews.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                                    <Eye className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Formulaire d'ajout/modification */}
                {showForm && (
                    <ArticleForm 
                        article={editingArticle || undefined}
                        onSave={handleSaveArticle}
                        onCancel={handleCancelForm}
                    />
                )}

                {/* Barre de recherche et filtres */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher un article..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <Select onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Tous les statuts" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="published">Publié</SelectItem>
                                        <SelectItem value="draft">Brouillon</SelectItem>
                                        <SelectItem value="archived">Archivé</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={setCategoryFilter}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Toutes les catégories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les catégories</SelectItem>
                                        <SelectItem value="technologie">Technologie</SelectItem>
                                        <SelectItem value="developpement">Développement</SelectItem>
                                        <SelectItem value="carriere">Carrière</SelectItem>
                                        <SelectItem value="securite">Sécurité</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Liste des articles */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="w-6 h-6 mr-2 text-blue-600" />
                            Articles ({filteredArticles.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Aucun article trouvé</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredArticles.map((article) => (
                                    <ArticleCard 
                                        key={article.id} 
                                        article={article}
                                        onEdit={handleEditArticle}
                                        onDelete={handleDeleteArticle}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
