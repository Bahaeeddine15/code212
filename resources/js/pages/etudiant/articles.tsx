import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Eye } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Articles", isActive: true },
];

interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    status: string;
    category: string;
    views: number;
    image?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    articles: Article[];
}

export default function Articles({ articles }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getCategoryColor = (category: string) => {
        const colors = [
            'bg-blue-100 text-blue-800',
            'bg-purple-100 text-purple-800',
            'bg-pink-100 text-pink-800',
            'bg-indigo-100 text-indigo-800',
            'bg-cyan-100 text-cyan-800',
        ];
        const index = category.length % colors.length;
        return colors[index];
    };

    return (
        <AppShell variant="sidebar">
            <Head title="Articles" />
            <div className="flex w-full min-h-screen">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden overflow-y-auto h-screen bg-white">
                    <AppSidebarHeader 
                        breadcrumbs={[
                            { title: 'Dashboard Étudiant', href: '/dashboard' },
                            { title: 'Articles', href: '/articles' }
                        ]} 
                    />
                    <div className="p-6 space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
                                <p className="text-gray-600 mt-2">
                                    Découvrez nos derniers articles et ressources
                                </p>
                            </div>
                            <Badge variant="secondary" className="text-sm">
                                {articles.length} article{articles.length > 1 ? 's' : ''}
                            </Badge>
                        </div>

                        {/* Articles Grid */}
                        {articles.length > 0 ? (
                            <div className="space-y-4">
                                {articles.map((article) => (
                                    <Card key={article.id} className="hover:shadow-lg transition-shadow duration-200">
                                        <div className="flex">
                                            {/* Image placeholder */}
                                            <div className="flex-shrink-0 w-48">
                                                {article.image ? (
                                                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-l-lg overflow-hidden flex items-center justify-center">
                                                        <img 
                                                            src={article.image} 
                                                            alt={article.title}
                                                            className="h-full w-full object-cover"
                                                            style={{ userSelect: 'none' }}
                                                            onContextMenu={e => e.preventDefault()}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-l-lg flex items-center justify-center">
                                                        <span className="text-white text-lg font-semibold text-center px-2">
                                                            {article.title}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col">
                                                <CardHeader className="pb-3">
                                                    <div className="flex justify-between items-start gap-2 mb-2">
                                                        <Badge className={getCategoryColor(article.category)} variant="secondary">
                                                            {article.category}
                                                        </Badge>
                                                        <Badge className={getStatusColor(article.status)} variant="secondary">
                                                            {article.status}
                                                        </Badge>
                                                    </div>
                                                    <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                                                        {article.title}
                                                    </CardTitle>
                                                </CardHeader>

                                                <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                        {article.excerpt}
                                                    </p>

                                                    <div className="flex justify-between items-end">
                                                        {/* Meta Information */}
                                                        <div className="flex gap-4 text-xs text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                <User className="w-3 h-3" />
                                                                <span>Par {article.author}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="w-3 h-3" />
                                                                <span>{article.views} vue{article.views > 1 ? 's' : ''}</span>
                                                            </div>
                                                        </div>

                                                        {/* Action Button */}
                                                        <Link 
                                                            href={`/articles/${article.id}`}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors inline-block"
                                                        >
                                                            Lire l'article
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article disponible</h3>
                                <p className="text-gray-500">Il n'y a pas encore d'articles publiés.</p>
                            </div>
                        )}
                    </div>
                </AppContent>
            </div>
        </AppShell>
    );
}
