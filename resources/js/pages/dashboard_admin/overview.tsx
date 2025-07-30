import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { 
    BarChart, 
    Users, 
    BookOpen, 
    Calendar,
    Trophy,
    FileImage,
    TrendingUp,
    Activity,
    Clock,
    Target,
    Award,
    Star,
    Zap,
    Rocket
} from 'lucide-react';
import { ModernCard, PageHeader, ModernButton } from '@/components/ui/modern-components';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Vue d\'ensemble',
        href: '/dashboard_admin/overview',
    },
];

// Données mockées pour le tableau de bord
const dashboardStats = {
    formations: {
        total: 24,
        active: 18,
        participants: 456,
        growth: 15
    },
    events: {
        total: 12,
        upcoming: 5,
        participants: 234,
        growth: 22
    },
    competitions: {
        total: 8,
        active: 3,
        participants: 145,
        growth: 35
    },
    articles: {
        total: 67,
        published: 52,
        views: 12540,
        growth: 8
    },
    media: {
        total: 234,
        downloads: 3420,
        storage: "2.4 GB",
        growth: 12
    },
    users: {
        total: 1240,
        active: 890,
        newThisMonth: 67,
        growth: 18
    }
};

const recentActivities = [
    {
        id: 1,
        type: 'formation',
        title: 'Nouvelle formation "React Avancé" créée',
        user: 'Prof. Ahmed',
        time: '2h',
        icon: BookOpen,
        color: 'text-blue-600'
    },
    {
        id: 2,
        type: 'event',
        title: 'Événement "Workshop IA" programmé',
        user: 'Admin',
        time: '4h',
        icon: Calendar,
        color: 'text-green-600'
    },
    {
        id: 3,
        type: 'competition',
        title: 'Compétition "Hackathon 2024" lancée',
        user: 'Organisateur',
        time: '6h',
        icon: Trophy,
        color: 'text-yellow-600'
    },
    {
        id: 4,
        type: 'article',
        title: 'Article "Tendances Tech 2024" publié',
        user: 'Rédacteur',
        time: '1j',
        icon: FileImage,
        color: 'text-purple-600'
    },
    {
        id: 5,
        type: 'user',
        title: '12 nouveaux utilisateurs inscrits',
        user: 'Système',
        time: '1j',
        icon: Users,
        color: 'text-cyan-600'
    }
];

const quickActions = [
    {
        title: 'Nouvelle Formation',
        description: 'Créer une nouvelle formation',
        icon: BookOpen,
        color: 'blue',
        href: '/dashboard_admin/formation_create'
    },
    {
        title: 'Nouvel Événement',
        description: 'Organiser un événement',
        icon: Calendar,
        color: 'green',
        href: '/dashboard_admin/event_create'
    },
    {
        title: 'Nouvelle Compétition',
        description: 'Lancer une compétition',
        icon: Trophy,
        color: 'yellow',
        href: '/dashboard_admin/competition_create'
    },
    {
        title: 'Nouvel Article',
        description: 'Rédiger un article',
        icon: FileImage,
        color: 'purple',
        href: '/dashboard_admin/article_create'
    }
];

export default function DashboardOverview() {

    const getGrowthColor = (growth: number) => {
        return growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    };

    const getGrowthIcon = (growth: number) => {
        return growth > 0 ? TrendingUp : Activity;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vue d'ensemble - Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">
                
                {/* Header moderne */}
                <PageHeader
                    title="Tableau de bord général"
                    description="Vue d'ensemble de toutes vos activités et statistiques"
                    icon={BarChart}
                    theme="primary"
                />

                {/* Statistiques principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Formations */}
                    <ModernCard theme="primary" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className={`flex items-center space-x-1 ${getGrowthColor(dashboardStats.formations.growth)}`}>
                                    {getGrowthIcon(dashboardStats.formations.growth)({ className: "w-4 h-4" })}
                                    <span className="text-sm font-semibold">+{dashboardStats.formations.growth}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Formations</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total</span>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{dashboardStats.formations.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Actives</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{dashboardStats.formations.active}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Participants</span>
                                    <span className="text-sm font-bold text-foreground">{dashboardStats.formations.participants}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    {/* Événements */}
                    <ModernCard theme="success" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                    <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div className={`flex items-center space-x-1 ${getGrowthColor(dashboardStats.events.growth)}`}>
                                    {getGrowthIcon(dashboardStats.events.growth)({ className: "w-4 h-4" })}
                                    <span className="text-sm font-semibold">+{dashboardStats.events.growth}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Événements</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{dashboardStats.events.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">À venir</span>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{dashboardStats.events.upcoming}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Participants</span>
                                    <span className="text-sm font-bold text-foreground">{dashboardStats.events.participants}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    {/* Compétitions */}
                    <ModernCard theme="warning" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                    <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div className={`flex items-center space-x-1 ${getGrowthColor(dashboardStats.competitions.growth)}`}>
                                    {getGrowthIcon(dashboardStats.competitions.growth)({ className: "w-4 h-4" })}
                                    <span className="text-sm font-semibold">+{dashboardStats.competitions.growth}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Compétitions</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total</span>
                                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{dashboardStats.competitions.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Actives</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{dashboardStats.competitions.active}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Participants</span>
                                    <span className="text-sm font-bold text-foreground">{dashboardStats.competitions.participants}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    {/* Articles */}
                    <ModernCard theme="secondary" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                                    <FileImage className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className={`flex items-center space-x-1 ${getGrowthColor(dashboardStats.articles.growth)}`}>
                                    {getGrowthIcon(dashboardStats.articles.growth)({ className: "w-4 h-4" })}
                                    <span className="text-sm font-semibold">+{dashboardStats.articles.growth}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Articles</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total</span>
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{dashboardStats.articles.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Publiés</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{dashboardStats.articles.published}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Vues</span>
                                    <span className="text-sm font-bold text-foreground">{dashboardStats.articles.views.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    {/* Médias */}
                    <ModernCard theme="info" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-2xl">
                                    <FileImage className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className={`flex items-center space-x-1 ${getGrowthColor(dashboardStats.media.growth)}`}>
                                    {getGrowthIcon(dashboardStats.media.growth)({ className: "w-4 h-4" })}
                                    <span className="text-sm font-semibold">+{dashboardStats.media.growth}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Médias</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Fichiers</span>
                                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{dashboardStats.media.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Téléchargements</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{dashboardStats.media.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Stockage</span>
                                    <span className="text-sm font-bold text-foreground">{dashboardStats.media.storage}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    {/* Utilisateurs */}
                    <ModernCard theme="danger" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-2xl">
                                    <Users className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <div className={`flex items-center space-x-1 ${getGrowthColor(dashboardStats.users.growth)}`}>
                                    {getGrowthIcon(dashboardStats.users.growth)({ className: "w-4 h-4" })}
                                    <span className="text-sm font-semibold">+{dashboardStats.users.growth}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Utilisateurs</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total</span>
                                    <span className="text-sm font-bold text-red-600 dark:text-red-400">{dashboardStats.users.total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Actifs</span>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{dashboardStats.users.active}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Nouveaux</span>
                                    <span className="text-sm font-bold text-foreground">{dashboardStats.users.newThisMonth}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>
                </div>

                {/* Actions rapides et activités récentes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Actions rapides */}
                    <ModernCard theme="primary">
                        <div className="flex items-center mb-6">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl mr-4">
                                <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Actions rapides</h2>
                                <p className="text-muted-foreground">Créez du nouveau contenu en un clic</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quickActions.map((action, index) => (
                                <div 
                                    key={index}
                                    onClick={() => router.visit(action.href)}
                                    className="p-4 border-2 border-border rounded-xl hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-xl bg-${action.color}-100 dark:bg-${action.color}-900 group-hover:scale-110 transition-transform duration-200`}>
                                            <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground text-sm">{action.title}</h3>
                                            <p className="text-xs text-muted-foreground">{action.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ModernCard>

                    {/* Activités récentes */}
                    <ModernCard theme="secondary">
                        <div className="flex items-center mb-6">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-2xl mr-4">
                                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Activités récentes</h2>
                                <p className="text-muted-foreground">Dernières actions sur la plateforme</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground line-clamp-1">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">par {activity.user}</p>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="pt-4 border-t border-border mt-6">
                            <ModernButton
                                theme="secondary"
                                size="sm"
                                className="w-full"
                                onClick={() => router.visit('/dashboard_admin/activities')}
                            >
                                Voir toutes les activités
                            </ModernButton>
                        </div>
                    </ModernCard>
                </div>

                {/* Navigation rapide vers les sections */}
                <ModernCard theme="info">
                    <div className="flex items-center mb-6">
                        <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-2xl mr-4">
                            <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Navigation rapide</h2>
                            <p className="text-muted-foreground">Accédez directement aux différentes sections</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <ModernButton theme="primary" size="sm" icon={BookOpen} onClick={() => router.visit('/dashboard_admin/formations')}>
                            Formations
                        </ModernButton>
                        <ModernButton theme="success" size="sm" icon={Calendar} onClick={() => router.visit('/dashboard_admin/events')}>
                            Événements
                        </ModernButton>
                        <ModernButton theme="warning" size="sm" icon={Trophy} onClick={() => router.visit('/dashboard_admin/competitions')}>
                            Compétitions
                        </ModernButton>
                        <ModernButton theme="secondary" size="sm" icon={FileImage} onClick={() => router.visit('/dashboard_admin/articles')}>
                            Articles
                        </ModernButton>
                        <ModernButton theme="info" size="sm" icon={FileImage} onClick={() => router.visit('/dashboard_admin/media')}>
                            Médias
                        </ModernButton>
                        <ModernButton theme="danger" size="sm" icon={Users} onClick={() => router.visit('/dashboard_admin/users')}>
                            Utilisateurs
                        </ModernButton>
                    </div>
                </ModernCard>
            </div>
        </AppLayout>
    );
}
