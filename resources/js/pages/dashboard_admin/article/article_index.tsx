import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';
import { BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2, Eye, Search, Filter, FileText, BookOpen, Users, TrendingUp } from 'lucide-react';

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
    images?: string[];
}

interface ArticlesProps {
    articles: Article[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des articles',
        href: '/admin/articles',
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
        const statusConfig = {
            published: { label: 'Publié', variant: 'default' as const, className: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-semibold' },
            draft: { label: 'Brouillon', variant: 'secondary' as const, className: 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 font-semibold' },
            archived: { label: 'Archivé', variant: 'outline' as const, className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold' }
        };

        const config = statusConfig[article.status];
        return (
            <Badge variant={config.variant} className={config.className}>
                {config.label}
            </Badge>
        );
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking on buttons
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        router.visit(`/admin/articles/${article.id}`);
    };

    return (
        <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={handleCardClick}
        >
            {article.images && article.images.length > 0 && (
                <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-6 mb-6 rounded-t-2xl">
                    <img
                        src={`/storage/${article.images[0]}`}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                    />
                </div>
            )}
            {!article.images && (
                <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-6 mb-6 rounded-t-2xl">
                    <FileText className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground line-clamp-2 hover:text-purple-600 transition-colors">
                            {article.title}
                        </h3>
                        {getStatusBadge()}
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Par {article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{article.views} vues</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">{article.date}</span>
                    </div>
                    <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">{article.category}</Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onEdit(article)}
                            className="p-2 text-primary hover:bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-all duration-200"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(article.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 rounded-xl transition-all duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Articles({ articles }: ArticlesProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Filter articles based on search and filters
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Calculer les statistiques
    const stats = {
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        draft: articles.filter(a => a.status === 'draft').length,
        archived: articles.filter(a => a.status === 'archived').length,
        totalViews: articles.reduce((sum, a) => sum + a.views, 0)
    };

    const handleEdit = (article: Article) => {
        // Redirect to edit page instead of showing inline form
        router.visit(`/admin/articles/${article.id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            router.delete(`/admin/articles/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des articles" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-background">

                {/* Header moderne */}
                <PageHeader
                    title="Articles & Publications"
                    description="Créez et gérez vos articles et publications"
                    icon={FileText}
                    theme="primary"
                    actions={
                        <Link href="/admin/articles/create">
                            <ModernButton theme="primary" icon={Plus}>
                                Nouvel article
                            </ModernButton>
                        </Link>
                    }
                />

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Total articles</p>
                                <p className="text-3xl font-bold text-primary mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Publiés</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.published}</p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Brouillons</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.draft}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                <Edit className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Vues totales</p>
                                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalViews}</p>
                            </div>
                            <div className="p-4 bg-purple-100 rounded-2xl">
                                <Eye className="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres et recherche */}
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="px-4 py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-40">
                                    <SelectValue placeholder="Statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="published">Publié</SelectItem>
                                    <SelectItem value="draft">Brouillon</SelectItem>
                                    <SelectItem value="archived">Archivé</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="px-4 py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-40">
                                    <SelectValue placeholder="Catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les catégories</SelectItem>
                                    <SelectItem value="actualite">Actualité</SelectItem>
                                    <SelectItem value="information">Information</SelectItem>
                                    <SelectItem value="guide">Guide</SelectItem>
                                    <SelectItem value="evenement">Événement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Liste des articles */}
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground flex items-center">
                            <FileText className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" />
                            Articles disponibles ({filteredArticles.length})
                        </h2>
                    </div>

                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Aucun article trouvé</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre premier article'}
                            </p>
                            <Link href="/admin/articles/create">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto">
                                    <Plus className="w-5 h-5" />
                                    <span>Créer un article</span>
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
