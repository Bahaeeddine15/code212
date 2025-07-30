import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FileText, 
    Plus, 
    Edit3, 
    Trash2, 
    Search,
    Eye,
    Calendar,
    User,
    Tag,
    BookOpen,
    TrendingUp
} from 'lucide-react';
import { ModernCard, PageHeader, ModernButton } from '@/components/ui/modern-components';

// Types
interface Article {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    status: 'published' | 'draft' | 'archived';
    category: string;
    views: number;
    likes: number;
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
    onDelete,
    onView
}: {
    article: Article;
    onEdit: (article: Article) => void;
    onDelete: (article: Article) => void;
    onView: (article: Article) => void;
}) => {
    const { title, excerpt, author, publishedAt, status, category, views, likes } = article;
    
    const getStatusColor = () => {
        switch (status) {
            case 'published':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            case 'draft':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
            case 'archived':
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
            default:
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
        }
    };

    const getThemeByStatus = () => {
        switch (status) {
            case 'published': return 'success';
            case 'draft': return 'warning';
            case 'archived': return 'secondary';
            default: return 'primary';
        }
    };

    return (
        <ModernCard theme={getThemeByStatus() as any} className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-6 mb-6">
                <FileText className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
            </div>
            
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground line-clamp-2">{title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor()}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{publishedAt}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-600 dark:text-green-400">{likes}</span>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold rounded-full">{category}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <ModernButton
                        size="sm"
                        theme="info"
                        icon={Eye}
                        onClick={() => onView(article)}
                    >
                        Voir
                    </ModernButton>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onEdit(article)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDelete(article)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ModernCard>
    );
};

// Mock data pour les articles
const mockArticles: Article[] = [
    {
        id: 1,
        title: "Introduction au Machine Learning avec Python",
        content: "Contenu complet de l'article...",
        excerpt: "Découvrez les bases du machine learning et apprenez à créer vos premiers modèles avec Python et scikit-learn.",
        author: "Dr. Ahmed Benali",
        publishedAt: "2024-02-15",
        status: "published",
        category: "IA",
        views: 1245,
        likes: 89
    },
    {
        id: 2,
        title: "Développement d'applications React modernes",
        content: "Contenu complet de l'article...",
        excerpt: "Guide complet pour créer des applications React performantes avec les dernières bonnes pratiques et hooks.",
        author: "Sarah Alami",
        publishedAt: "2024-02-10",
        status: "published",
        category: "Développement",
        views: 856,
        likes: 67
    },
    {
        id: 3,
        title: "Sécurité des applications web : Guide pratique",
        content: "Contenu complet de l'article...",
        excerpt: "Apprenez à sécuriser vos applications web contre les principales vulnérabilités et attaques courantes.",
        author: "Mohamed Tazi",
        publishedAt: "2024-02-08",
        status: "draft",
        category: "Sécurité",
        views: 234,
        likes: 12
    },
    {
        id: 4,
        title: "Tendances du développement mobile en 2024",
        content: "Contenu complet de l'article...",
        excerpt: "Explorez les dernières tendances et technologies dans le développement d'applications mobiles.",
        author: "Fatima Benkhadra",
        publishedAt: "2024-01-28",
        status: "archived",
        category: "Mobile",
        views: 567,
        likes: 34
    }
];

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Fonctions de gestion
    const handleArticleEdit = (article: Article) => {
        console.log('Éditer article:', article);
        router.visit(`/dashboard_admin/article_edit/${article.id}`);
    };

    const handleArticleDelete = (article: Article) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            setArticles(prev => prev.filter(a => a.id !== article.id));
        }
    };

    const handleArticleView = (article: Article) => {
        router.visit(`/dashboard_admin/article_show/${article.id}`);
    };

    // Filtrage des articles
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Statistiques
    const stats = {
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        draft: articles.filter(a => a.status === 'draft').length,
        archived: articles.filter(a => a.status === 'archived').length,
        totalViews: articles.reduce((sum, a) => sum + a.views, 0)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des articles" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">
                
                {/* Header moderne */}
                <PageHeader
                    title="Gestion des articles"
                    description="Créez et gérez vos articles et publications"
                    icon={FileText}
                    theme="primary"
                    actions={
                        <ModernButton
                            theme="primary"
                            icon={Plus}
                            onClick={() => router.visit('/dashboard_admin/article_create')}
                        >
                            Nouvel article
                        </ModernButton>
                    }
                />

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <ModernCard theme="primary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Total articles</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="success">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Publiés</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.published}</p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="warning">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Brouillons</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.draft}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                <Edit3 className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="secondary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Archivés</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.archived}</p>
                            </div>
                            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                                <Tag className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="info">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Vues totales</p>
                                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">{stats.totalViews}</p>
                            </div>
                            <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-2xl">
                                <Eye className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                            </div>
                        </div>
                    </ModernCard>
                </div>

                {/* Filtres et recherche */}
                <ModernCard theme="primary">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="published">Publiés</option>
                                <option value="draft">Brouillons</option>
                                <option value="archived">Archivés</option>
                            </select>
                        </div>
                    </div>
                </ModernCard>

                {/* Liste des articles */}
                <ModernCard theme="primary">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground flex items-center">
                            <FileText className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" />
                            Articles ({filteredArticles.length})
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <ArticleCard 
                                key={article.id} 
                                article={article}
                                onEdit={handleArticleEdit}
                                onDelete={handleArticleDelete}
                                onView={handleArticleView}
                            />
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Aucun article trouvé</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre premier article'}
                            </p>
                            <ModernButton
                                theme="primary"
                                icon={Plus}
                                onClick={() => router.visit('/dashboard_admin/article_create')}
                            >
                                Créer un article
                            </ModernButton>
                        </div>
                    )}
                </ModernCard>
            </div>
        </AppLayout>
    );
}
