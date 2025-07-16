import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    GraduationCap, 
    Plus, 
    Edit3, 
    Trash2, 
    Search,
    Clock,
    Users,
    Award,
    BookOpen,
    CheckCircle,
    PlayCircle,
    FileText
} from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Formations/Certifications',
        href: '/formations',
    },
];

// Types d'interfaces
interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
    isCompleted: boolean;
}

interface Formation {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    category: string;
    modules: Module[];
    enrolledStudents?: number;
    maxStudents?: number;
}

type Props = {
    formations: Formation[];
};

// Composant pour les cartes de formation
const FormationCard = ({ 
    formation,
    onDelete,
    onViewModules
}: {
    formation: Formation;
    onDelete: (formation: Formation) => void;
    onViewModules: (formation: Formation) => void;
}) => {
    const { title, description, level, duration, modules, category, enrolledStudents = 0, maxStudents = 0 } = formation;
    const getStatusBadge = () => {
        switch (status) {
            case 'active':
                return <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Active</span>;
            case 'draft':
                return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">Brouillon</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Archivée</span>;
        }
    };

    const getLevelColor = () => {
        switch (level) {
            case 'Débutant':
                return 'bg-green-100 text-green-800';
            case 'Intermédiaire':
                return 'bg-yellow-100 text-yellow-800';
            case 'Avancé':
                return 'bg-red-100 text-red-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-white opacity-80" />
            </div>
            
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{description}</p>
                    </div>
                    {getStatusBadge()}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor()}`}>
                            {level}
                        </span>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{duration}</span>
                        </div>
                    </div>
                    
                </div>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Modules</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{modules.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Inscrits</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{enrolledStudents}/{maxStudents}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(enrolledStudents / maxStudents) * 100}%` }}
                        ></div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{category}</span>
                    <div className="flex space-x-2">
                        <Link
                            href={`/dashboard_admin/formation_edit/${formation.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </Link>
                        <button 
                            onClick={() => onDelete(formation)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/dashboard_admin/formation/${formation.id}/modules`}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        >
                          Voir modules
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant pour les modules de formation
const ModuleCard = ({
    module,
    onDelete,
    onPlay
}: {
    module: Module;
    onDelete: (module: Module) => void;
    onPlay: (module: Module) => void;
}) => {
    const { title, description, duration, order, isCompleted, id } = module;

    // You need the selectedFormation?.id to build the edit link
    // Pass selectedFormationId as a prop if needed

    return (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-600'
                }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="text-sm font-bold">{order}</span>}
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex space-x-1">
                            <button 
                                onClick={() => onPlay(module)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <PlayCircle className="w-3 h-3" />
                            </button>
                            {/* EDIT BUTTON */}
                            <Link
                                href={`/dashboard_admin/module_edit/${selectedFormation?.id}/${module.id}`}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                <Edit3 className="w-3 h-3" />
                            </Link>
                            <button 
                                onClick={() => onDelete(module)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Formations({ formations }: Props) {
    // State for selected formation and module view
    const [showModules, setShowModules] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);

    // Only keep delete/view logic, remove modal form logic
    const handleFormationDelete = (formation: Formation) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
            router.delete(`/formations/${formation.id}`);
        }
    };

    const handleModuleDelete = (module: Module) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce module ?') && selectedFormation) {
            router.delete(`/formations/${selectedFormation.id}/modules/${module.id}`);
        }
    };

    const handleViewModules = (formation: Formation) => {
        setSelectedFormation(formation);
        setShowModules(true);
    };

    const handleModulePlay = (module: Module) => {
        console.log('Lecture du module:', module);
        // Ici vous pourriez ajouter la logique pour lancer le module
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Formations/Certifications" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                
                {/* En-tête avec actions */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Formations & Certifications</h1>
                            <p className="text-indigo-100">Créez et gérez vos formations</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link 
                                href={`/dashboard_admin/module_create?formationId=${selectedFormation?.id}`}
                                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Ajouter module</span>
                            </Link>
                            <Link 
                                href="/dashboard_admin/formation_create"
                                className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Nouvelle formation</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total formations</p>
                                <p className="text-2xl font-bold text-indigo-600 mt-1">18</p>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                                <GraduationCap className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Étudiants inscrits</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">247</p>
                            </div>
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                                <Users className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Certifications</p>
                                <p className="text-2xl font-bold text-purple-600 mt-1">89</p>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Modules actifs</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">156</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher une formation..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                <option>Tous les niveaux</option>
                                <option>Débutant</option>
                                <option>Intermédiaire</option>
                                <option>Avancé</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                <option>Toutes les catégories</option>
                                <option>Développement</option>
                                <option>IA</option>
                                <option>Sécurité</option>
                                <option>Programmation</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des formations */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                            <GraduationCap className="w-6 h-6 mr-2 text-indigo-600" />
                            Formations disponibles
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formations.map((formation) => (
                            <FormationCard 
                                key={formation.id} 
                                formation={formation}
                                onDelete={handleFormationDelete}
                                onViewModules={handleViewModules}
                            />
                        ))}
                    </div>
                </div>

                {/* Aperçu des modules section removed. Use selectedFormation?.modules below. */}

                {/* Modal forms removed. Use dedicated pages for creation/editing. */}

                {/* Aperçu des modules sélectionnés */}
                {showModules && selectedFormation && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                                <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
                                Modules - {selectedFormation.title}
                            </h2>
                            <Link 
                                href={`/dashboard_admin/module_create?formationId=${selectedFormation?.id}`}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Ajouter module</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedFormation?.modules.map((module: Module) => (
                                <ModuleCard 
                                    key={module.id} 
                                    module={module}
                                    onEdit={handleModuleEdit}
                                    onDelete={handleModuleDelete}
                                    onPlay={handleModulePlay}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
