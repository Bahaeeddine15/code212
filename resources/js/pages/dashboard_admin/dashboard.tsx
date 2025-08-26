import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    BookOpen,
    Award,
    TrendingUp,
    Calendar,
    BarChart3,
    GraduationCap,
    Star,
    Clock,
    CheckCircle,
    FileText,
    CalendarCheck,
    Images,
    Trophy,
    ArrowRight,
    Eye,
    Plus
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

// Composant pour les cartes de statistiques
const StatCard = ({
    title,
    value,
    icon: Icon,
    theme = 'primary'
}: {
    title: string;
    value: string | number;
    icon: any;
    theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}) => (
    <div className="bg-card dark:bg-card rounded-lg shadow-sm border border-border p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow w-full min-h-[80px] sm:min-h-[100px]">
        <div className="flex items-center justify-between h-full">
            <div className="min-w-0 flex-1 pr-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate leading-tight">{title}</p>
                <p className="text-base sm:text-lg lg:text-2xl font-bold text-foreground leading-tight">{value}</p>
            </div>
            <div className="p-1.5 sm:p-2 lg:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-blue-600 dark:text-blue-400" />
            </div>
        </div>
    </div>
);

// Composant pour les compartiments de données
const DataCompartment = ({
    title,
    description,
    icon: Icon,
    theme = 'primary',
    data,
    href,
    showReadMore = true
}: {
    title: string;
    description: string;
    icon: any;
    theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    data: { label: string; value: string | number }[];
    href: string;
    showReadMore?: boolean;
}) => (
    <div className="bg-card dark:bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-5 hover:shadow-md transition-shadow w-full h-full flex flex-col">
        <div className="flex items-start mb-3 sm:mb-4 lg:mb-5">
            <div className="p-2 sm:p-2.5 lg:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground truncate leading-tight">{title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight mt-1">{description}</p>
            </div>
        </div>

        <div className="space-y-1 sm:space-y-1.5 lg:space-y-2 mb-3 sm:mb-4 lg:mb-5 flex-1">
            {data.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-0.5 sm:py-1 lg:py-1.5">
                    <span className="text-xs sm:text-sm text-muted-foreground truncate pr-2 max-w-[60%]">{item.label}</span>
                    <span className="text-sm sm:text-base font-semibold text-foreground flex-shrink-0">{item.value}</span>
                </div>
            ))}
        </div>

        {showReadMore && (
            <Link
                href={href}
                className="inline-flex items-center justify-center w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:text-white text-xs sm:text-sm font-medium transition-colors duration-200 mt-auto"
            >
                Lire plus
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 flex-shrink-0" />
            </Link>
        )}
    </div>
);

interface DashboardProps{
    name : string;
}

export default function Dashboard({name}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="bg-background min-h-screen p-2 sm:p-3 lg:p-6">

                {/* Section du profil utilisateur inspirée de l'image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-5">
                    {/* Carte de profil avec design circulaire */}
                    <div className="bg-card dark:bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-5">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 relative">
                                <div className="text-white font-bold text-xs sm:text-sm">
                                    <div className="flex items-center justify-center">
                                        <span>CODE</span>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-1">{name}</h2>
                        </div>
                    </div>

                    {/* Carte d'informations */}
                    <div className="bg-card dark:bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 lg:p-5">
                        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 sm:py-2 border-b border-border gap-1 sm:gap-0">
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground">University</span>
                                <span className="text-xs sm:text-sm text-foreground text-left sm:text-right leading-tight">UNIVERSITÉ CADI AYYAD DE MARRAKECH</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 sm:py-2 border-b border-border gap-1 sm:gap-0">
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Center</span>
                                <span className="text-xs sm:text-sm text-foreground text-left sm:text-right leading-tight">CODE212 - BIBLIOTHÈQUE UNIVERSITAIRE</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 sm:py-2 gap-1 sm:gap-0">
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Email</span>
                                <span className="text-xs sm:text-sm text-foreground">admin@code212.ma</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques principales avec style plus épuré */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 lg:mb-7">
                    <StatCard
                        title="Articles"
                        value="24"
                        icon={FileText}
                        theme="primary"
                    />
                    <StatCard
                        title="Événements terminés"
                        value="8"
                        icon={CalendarCheck}
                        theme="success"
                    />
                    <StatCard
                        title="Images"
                        value="156"
                        icon={Images}
                        theme="info"
                    />
                    <StatCard
                        title="Formations"
                        value="12"
                        icon={GraduationCap}
                        theme="secondary"
                    />
                    <StatCard
                        title="Compétitions"
                        value="6"
                        icon={Trophy}
                        theme="warning"
                    />
                </div>


                {/* Section des compartiments de données avec style plus épuré */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
                    <DataCompartment
                        title="Gestion des Articles"
                        description="Aperçu des articles publiés"
                        icon={FileText}
                        theme="primary"
                        data={[
                            { label: "Articles publiés", value: "24" },
                            { label: "Brouillons", value: "5" },
                            { label: "Vues totales", value: "1,245" },
                            { label: "Articles ce mois", value: "8" }
                        ]}
                        href="/admin/articles"
                    />

                    <DataCompartment
                        title="Événements"
                        description="Gestion des événements"
                        icon={Calendar}
                        theme="success"
                        data={[
                            { label: "Événements terminés", value: "8" },
                            { label: "Événements en cours", value: "3" },
                            { label: "Événements à venir", value: "12" },
                            { label: "Participants totaux", value: "456" }
                        ]}
                        href="/admin/events"
                    />

                    <DataCompartment
                        title="Galerie Médias"
                        description="Gestion des fichiers médias"
                        icon={Images}
                        theme="info"
                        data={[
                            { label: "Images", value: "156" },
                            { label: "Vidéos", value: "23" },
                            { label: "Documents", value: "89" },
                            { label: "Taille totale", value: "2.3 GB" }
                        ]}
                        href="/admin/media"
                    />

                    <DataCompartment
                        title="Formations"
                        description="Formations et certifications"
                        icon={GraduationCap}
                        theme="secondary"
                        data={[
                            { label: "Formations disponibles", value: "12" },
                            { label: "Étudiants inscrits", value: "245" },
                            { label: "Certifications délivrées", value: "89" },
                            { label: "Taux de réussite", value: "92%" }
                        ]}
                        href="/admin/formations"
                    />

                    <DataCompartment
                        title="Compétitions"
                        description="Gestion des compétitions"
                        icon={Trophy}
                        theme="warning"
                        data={[
                            { label: "Compétitions actives", value: "6" },
                            { label: "Participants inscrits", value: "78" },
                            { label: "Compétitions terminées", value: "15" },
                            { label: "Prix distribués", value: "45" }
                        ]}
                        href="/admin/competitions"
                    />

                    <DataCompartment
                        title="Statistiques Générales"
                        description="Vue d'ensemble du système"
                        icon={BarChart3}
                        theme="danger"
                        data={[
                            { label: "Utilisateurs actifs", value: "342" },
                            { label: "Connexions ce mois", value: "1,567" },
                            { label: "Nouvelles inscriptions", value: "23" },
                            { label: "Taux d'engagement", value: "87%" }
                        ]}
                        href="/admin/dashboard"
                        showReadMore={false}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
