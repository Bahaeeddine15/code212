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
        <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={handleCardClick}
        >
            {article.images && article.images.length > 0 && (
                <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-4 sm:-m-5 lg:-m-6 mb-4 sm:mb-5 lg:mb-6 rounded-t-xl lg:rounded-t-2xl">
                    <img
                        src={`/storage/${article.images[0]}`}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-t-xl lg:rounded-t-2xl"
                    />
                </div>
            )}
            {!article.images && (
                <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-4 sm:-m-5 lg:-m-6 mb-4 sm:mb-5 lg:mb-6 rounded-t-xl lg:rounded-t-2xl">
                    <FileText className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white opacity-90 drop-shadow-lg" />
                </div>
            )}

            <div className="space-y-3 sm:space-y-4">
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2 hover:text-purple-600 transition-colors flex-1">
                            {article.title}
                        </h3>
                        <div className="flex-shrink-0">
                            {getStatusBadge()}
                        </div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 mb-3 sm:mb-4">{article.excerpt}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground truncate">Par {article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">{article.views} vues</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-4 text-xs sm:text-sm">
                        <span className="text-muted-foreground">{article.date}</span>
                    </div>
                    <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs sm:text-sm w-fit">{article.category}</Badge>
                </div>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onEdit(article)}
                            className="p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg sm:rounded-xl transition-all duration-200"
                            title="Modifier"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(article.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg sm:rounded-xl transition-all duration-200"
                            title="Supprimer"
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

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">

                {/* Header moderne */}
                <PageHeader
                    title="Articles & Publications"
                    description="Créez et gérez vos articles et publications"
                    icon={FileText}
                    theme="primary"
                    actions={
                        <Link href="/admin/articles/create" className="w-full sm:w-auto">
                            <ModernButton theme="primary" icon={Plus} className="w-full sm:w-auto">
                                Nouvel article
                            </ModernButton>
                        </Link>
                    }
                />

                {/* Statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total articles</p>
                                <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">{stats.total}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl lg:rounded-2xl">
                                <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Publiés</p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">{stats.published}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-green-100 dark:bg-green-900 rounded-xl lg:rounded-2xl">
                                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Brouillons</p>
                                <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1 sm:mt-2">{stats.draft}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl lg:rounded-2xl">
                                <Edit className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Vues totales</p>
                                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1 sm:mt-2">{stats.totalViews}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-purple-100 rounded-xl lg:rounded-2xl">
                                <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres et recherche */}
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                            <Input
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-full sm:w-40 text-sm sm:text-base">
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
                                <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-full sm:w-40 text-sm sm:text-base">
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
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground flex items-center">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
                            <span className="hidden sm:inline">Articles disponibles ({filteredArticles.length})</span>
                            <span className="sm:hidden">Articles ({filteredArticles.length})</span>
                        </h2>
                    </div>

                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                        <div className="text-center py-8 sm:py-12">
                            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Aucun article trouvé</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre premier article'}
                            </p>
                            <Link href="/admin/articles/create">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto text-sm sm:text-base">
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
