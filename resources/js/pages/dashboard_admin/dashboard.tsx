import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
    CheckCircle
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

// Composant pour les certifications
const CertificationCard = ({ 
    title, 
    count, 
    icon: Icon, 
    color, 
    bgColor 
}: {
    title: string;
    count: number;
    icon: any;
    color: string;
    bgColor: string;
}) => (
    <div className={`relative overflow-hidden rounded-xl ${bgColor} p-8 shadow-lg border-2 border-opacity-20 ${color.replace('text-', 'border-')}`}>
        <div className="text-center">
            <div className={`mx-auto w-16 h-16 ${color} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                <Icon className={`w-8 h-8 ${color}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
            <p className={`text-4xl font-bold ${color}`}>{count}</p>
        </div>
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
                            <h2 className="text-2xl font-bold">IZELGUE MALIKA</h2>
                            <p className="text-pink-100">UNIVERSITÉ CADI AYYAD DE MARRAKECH</p>
                            <p className="text-pink-100">ENSAMR / Génie Informatique</p>
                            <p className="text-pink-100">CODE212 - BIBLIOTHÈQUE UNIVERSITAIRE</p>
                        </div>
                    </div>
                </div>

                {/* Statistiques principales avec couleurs prioritaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Étudiants actifs"
                        value="2,847"
                        icon={Users}
                        color="text-cyan-600"
                        bgColor="bg-cyan-50 dark:bg-cyan-900/20"
                        borderColor="border-cyan-200 dark:border-cyan-800"
                    />
                    <StatCard
                        title="Cours disponibles"
                        value="156"
                        icon={BookOpen}
                        color="text-emerald-600"
                        bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                        borderColor="border-emerald-200 dark:border-emerald-800"
                    />
                    <StatCard
                        title="Certifications"
                        value="89"
                        icon={Award}
                        color="text-amber-600"
                        bgColor="bg-amber-50 dark:bg-amber-900/20"
                        borderColor="border-amber-200 dark:border-amber-800"
                    />
                    <StatCard
                        title="Taux de réussite"
                        value="94%"
                        icon={TrendingUp}
                        color="text-pink-600"
                        bgColor="bg-pink-50 dark:bg-pink-900/20"
                        borderColor="border-pink-200 dark:border-pink-800"
                    />
                </div>

                {/* Section des certifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                        <GraduationCap className="w-8 h-8 mr-3 text-purple-700" />
                        Certifications
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CertificationCard
                            title="En cours"
                            count={2}
                            icon={Clock}
                            color="text-rose-600"
                            bgColor="bg-rose-50 dark:bg-rose-900/20"
                        />
                        <CertificationCard
                            title="Terminées"
                            count={0}
                            icon={CheckCircle}
                            color="text-emerald-600"
                            bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                        />
                    </div>
                </div>

                {/* Section des activités récentes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-cyan-600" />
                            Activités récentes
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border-l-4 border-cyan-500">
                                <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Nouveau cours ajouté
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 2 heures</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Certification validée
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 5 heures</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border-l-4 border-pink-500">
                                <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Rapport mensuel généré
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 1 jour</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                            <BarChart3 className="w-6 h-6 mr-2 text-lime-600" />
                            Statistiques mensuelles
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Nouveaux étudiants</span>
                                <span className="text-sm font-bold text-emerald-600">+12%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-sm" style={{ width: '75%' }}></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Cours complétés</span>
                                <span className="text-sm font-bold text-cyan-600">+8%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-3 rounded-full shadow-sm" style={{ width: '65%' }}></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Satisfaction</span>
                                <span className="text-sm font-bold text-pink-600">+15%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full shadow-sm" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section supplémentaire avec graphique visuel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <Star className="w-6 h-6 mr-2 text-amber-600" />
                        Aperçu des performances
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Identité principale', value: '85%', color: 'bg-pink-600' },
                            { label: 'Énergie digitale', value: '78%', color: 'bg-cyan-600' },
                            { label: 'Innovation', value: '92%', color: 'bg-emerald-600' },
                            { label: 'Équilibre', value: '88%', color: 'bg-purple-600' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center relative">
                                    <div className={`absolute inset-1 rounded-full ${item.color} opacity-20`}></div>
                                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100 relative z-10">{item.value}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
