import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

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
    article: Article;
}

export default function ArticleDetail({ article }: Props) {
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
            <Head title={`${article.title} - Articles`} />
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden bg-white">
                <AppSidebarHeader 
                    breadcrumbs={[
                        { title: 'Dashboard Étudiant', href: '/dashboard' },
                        { title: 'Articles', href: '/articles' },
                        { title: article.title, href: '' }
                    ]} 
                />
                
                <div className="p-6 space-y-6 max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link href="/articles">
                        <Button variant="outline" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux articles
                        </Button>
                    </Link>

                    {/* Article Card */}
                    <Card className="overflow-hidden">
                        {/* Hero Image */}
                        {article.image ? (
                            <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-6xl font-bold">
                                    {article.title.charAt(0)}
                                </span>
                            </div>
                        )}

                        <CardHeader className="pb-4">
                            {/* Badges */}
                            <div className="flex gap-2 mb-4">
                                <Badge className={getCategoryColor(article.category)} variant="secondary">
                                    {article.category}
                                </Badge>
                                <Badge className={getStatusColor(article.status)} variant="secondary">
                                    {article.status}
                                </Badge>
                            </div>

                            {/* Title */}
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                                {article.title}
                            </CardTitle>

                            {/* Meta Information */}
                            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>Par {article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    <span>{article.views} vue{article.views > 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            {/* Excerpt */}
                            {article.excerpt && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                    <p className="text-gray-700 italic">
                                        {article.excerpt}
                                    </p>
                                </div>
                            )}
                        </CardHeader>

                        <CardContent className="pt-0">
                            {/* Article Content */}
                            <div 
                                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </CardContent>
                    </Card>

                    {/* Back to Articles Button */}
                    <div className="text-center pt-6">
                        <Link href="/articles">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                Voir plus d'articles
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppContent>
        </AppShell>
    );
}
