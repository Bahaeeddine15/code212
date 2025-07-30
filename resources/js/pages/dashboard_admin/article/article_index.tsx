import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

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
    images?: string[]; // <-- Add this line
}

interface ArticlesProps {
    articles: Article[];
}

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
        const statusConfig = {
            published: { label: 'Publié', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
            draft: { label: 'Brouillon', variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
            archived: { label: 'Archivé', variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' }
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
        router.visit(`/articles/${article.id}`);
    };

    return (
        <Card
            className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <CardTitle className="text-lg mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                            {article.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Par {article.author}</span>
                            <span>{article.date}</span>
                            <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {article.views}
                            </span>
                        </div>
                    </div>
                    {getStatusBadge()}
                </div>
            </CardHeader>
            <CardContent>
                {article.images && article.images.length > 0 && (
                    <img
                        src={`/storage/${article.images[0]}`}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-t"
                    />
                )}
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(article)}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(article.id)}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
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

    const handleEdit = (article: Article) => {
        // Redirect to edit page instead of showing inline form
        router.visit(`/articles/${article.id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            router.delete(`/articles/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des articles" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Gestion des articles
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Créez, modifiez et gérez vos articles
                        </p>
                    </div>
                    {/* Link to create page instead of showing inline form */}
                    <Link href="/articles/create">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvel article
                        </Button>
                    </Link>
                </div>

                {/* Filtres et recherche */}
                <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Rechercher des articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40">
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
                            <SelectTrigger className="w-40">
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

                {/* Liste des articles */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        <p className="text-gray-500 text-lg">Aucun article trouvé</p>
                        {/* Link to create page instead of showing inline form */}
                        <Link href="/articles/create">
                            <Button className="mt-4" variant="outline">
                                Créer votre premier article
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
