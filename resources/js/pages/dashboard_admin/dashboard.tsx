import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
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
    color, 
    bgColor, 
    borderColor 
}: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
}) => (
    <div className={`relative overflow-hidden rounded-xl border-2 ${borderColor} ${bgColor} p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
                <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
            </div>
            <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
                <Icon className={`w-8 h-8 ${color}`} />
            </div>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
            <Icon className="w-full h-full" />
        </div>
    </div>
);

// Composant pour les compartiments de données
const DataCompartment = ({ 
    title, 
    description,
    icon: Icon, 
    color, 
    bgColor,
    data,
    href,
    showReadMore = true
}: {
    title: string;
    description: string;
    icon: any;
    color: string;
    bgColor: string;
    data: { label: string; value: string | number }[];
    href: string;
    showReadMore?: boolean;
}) => (
    <div className={`relative overflow-hidden rounded-xl ${bgColor} p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl`}>
        <div className="flex items-center mb-4">
            <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-3`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </div>
        
        <div className="space-y-3 mb-6">
            {data.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                    <span className={`text-sm font-semibold ${color}`}>{item.value}</span>
                </div>
            ))}
        </div>
        
        {showReadMore && (
            <Link
                href={href}
                className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-lg hover:opacity-90 text-white font-medium text-sm transition-all duration-200 hover:scale-105 ${
                    color === 'text-cyan-600' ? 'bg-cyan-600' :
                    color === 'text-emerald-600' ? 'bg-emerald-600' :
                    color === 'text-amber-600' ? 'bg-amber-600' :
                    color === 'text-purple-600' ? 'bg-purple-600' :
                    color === 'text-pink-600' ? 'bg-pink-600' :
                    color === 'text-indigo-600' ? 'bg-indigo-600' :
                    'bg-gray-600'
                }`}
            >
                Lire plus
                <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
        )}
    </div>
);

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                
                {/* Section du profil utilisateur avec dégradé inspiré de votre palette */}
                <div className="bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-2xl font-bold">IM</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">MALIKA</h2>
                            <p className="text-pink-100">UNIVERSITÉ CADI AYYAD DE MARRAKECH</p>
                            <p className="text-pink-100">CODE212 - BIBLIOTHÈQUE UNIVERSITAIRE</p>
                        </div>
                    </div>
                </div>

                {/* Statistiques principales avec couleurs prioritaires */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <StatCard
                        title="Articles"
                        value="24"
                        icon={FileText}
                        color="text-cyan-600"
                        bgColor="bg-cyan-50 dark:bg-cyan-900/20"
                        borderColor="border-cyan-200 dark:border-cyan-800"
                    />
                    <StatCard
                        title="Événements terminés"
                        value="8"
                        icon={CalendarCheck}
                        color="text-emerald-600"
                        bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                        borderColor="border-emerald-200 dark:border-emerald-800"
                    />
                    <StatCard
                        title="Images"
                        value="156"
                        icon={Images}
                        color="text-amber-600"
                        bgColor="bg-amber-50 dark:bg-amber-900/20"
                        borderColor="border-amber-200 dark:border-amber-800"
                    />
                    <StatCard
                        title="Formations"
                        value="12"
                        icon={GraduationCap}
                        color="text-purple-600"
                        bgColor="bg-purple-50 dark:bg-purple-900/20"
                        borderColor="border-purple-200 dark:border-purple-800"
                    />
                    <StatCard
                        title="Compétitions"
                        value="6"
                        icon={Trophy}
                        color="text-pink-600"
                        bgColor="bg-pink-50 dark:bg-pink-900/20"
                        borderColor="border-pink-200 dark:border-pink-800"
                    />
                </div>

                {/* Section des compartiments de données */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DataCompartment
                        title="Gestion des Articles"
                        description="Aperçu des articles publiés"
                        icon={FileText}
                        color="text-cyan-600"
                        bgColor="bg-white dark:bg-gray-800"
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
                        color="text-emerald-600"
                        bgColor="bg-white dark:bg-gray-800"
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
                        color="text-amber-600"
                        bgColor="bg-white dark:bg-gray-800"
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
                        color="text-purple-600"
                        bgColor="bg-white dark:bg-gray-800"
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
                        color="text-pink-600"
                        bgColor="bg-white dark:bg-gray-800"
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
                        color="text-indigo-600"
                        bgColor="bg-white dark:bg-gray-800"
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
