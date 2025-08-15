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
        href: '/dashboard',
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
                <Icon className="w-7 h-7 text-blue-600" />
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center mb-5">
            <div className="p-3 bg-blue-50 rounded-lg mr-3">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>

        <div className="space-y-2 mb-5">
            {data.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1.5">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-base font-semibold text-gray-900">{item.value}</span>
                </div>
            ))}
        </div>

        {showReadMore && (
            <Link
                href={href}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200"
            >
                Lire plus
                <ArrowRight className="w-4 h-4 ml-2" />
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
            <div className="bg-gray-50 min-h-screen p-6">

                {/* Section du profil utilisateur inspirée de l'image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                    {/* Carte de profil avec design circulaire */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-22 h-22 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-4 relative">
                                <div className="text-white font-bold text-sm">
                                    <div className="flex items-center justify-center">
                                        <span>CODE</span>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">{name}</h2>
                        </div>
                    </div>

                    {/* Carte d'informations */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-600">University</span>
                                <span className="text-sm text-gray-900 text-right">UNIVERSITÉ CADI AYYAD DE MARRAKECH</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-600">Center</span>
                                <span className="text-sm text-gray-900 text-right">CODE212 - BIBLIOTHÈQUE UNIVERSITAIRE</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm font-medium text-gray-600">Email</span>
                                <span className="text-sm text-gray-900">admin@code212.ma</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques principales avec style plus épuré */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-7">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        href="/articles"
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
                        href="/events"
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
                        href="/media"
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
                        href="/formations"
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
                        href="/competitions"
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
                        href="/dashboard"
                        showReadMore={false}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
