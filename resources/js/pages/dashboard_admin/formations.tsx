import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { 
    GraduationCap, 
    Plus, 
    Edit3, 
    Trash2, 
    Search,
    Filter,
    Clock,
    Users,
    Award,
    BookOpen,
    CheckCircle,
    PlayCircle,
    FileText,
    X,
    Save
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
interface Formation {
    id: number;
    title: string;
    description: string;
    level: 'Débutant' | 'Intermédiaire' | 'Avancé';
    duration: string;
    modules: number;
    enrolledStudents: number;
    maxStudents: number;
    status: 'active' | 'draft' | 'archived';
    price: string;
    category: string;
}

interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
    isCompleted: boolean;
}

// Composant pour les cartes de formation
const FormationCard = ({ 
    formation,
    onEdit,
    onDelete,
    onViewModules
}: {
    formation: Formation;
    onEdit: (formation: Formation) => void;
    onDelete: (formation: Formation) => void;
    onViewModules: (formation: Formation) => void;
}) => {
    const { title, description, level, duration, modules, enrolledStudents, maxStudents, status, price, category } = formation;
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
                    <div className="text-lg font-bold text-indigo-600">{price}</div>
                </div>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Modules</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{modules}</span>
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
                        <button 
                            onClick={() => onEdit(formation)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDelete(formation)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onViewModules(formation)}
                            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Voir modules
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant pour les modules de formation
const ModuleCard = ({ 
    module,
    onEdit,
    onDelete,
    onPlay
}: {
    module: Module;
    onEdit: (module: Module) => void;
    onDelete: (module: Module) => void;
    onPlay: (module: Module) => void;
}) => {
    const { title, description, duration, order, isCompleted } = module;
    
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
                        <button 
                            onClick={() => onEdit(module)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            <Edit3 className="w-3 h-3" />
                        </button>
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

export default function Formations() {
    const formations: Formation[] = [
        {
            id: 1,
            title: 'Développement Web Full Stack',
            description: 'Formation complète pour devenir développeur full stack avec React, Node.js et MongoDB',
            level: 'Intermédiaire' as const,
            duration: '12 semaines',
            modules: 8,
            enrolledStudents: 45,
            maxStudents: 50,
            status: 'active' as const,
            price: '2500 DH',
            category: 'Développement'
        },
        {
            id: 2,
            title: 'Intelligence Artificielle',
            description: 'Découvrez les bases de l\'IA et du Machine Learning avec Python',
            level: 'Avancé' as const,
            duration: '16 semaines',
            modules: 12,
            enrolledStudents: 28,
            maxStudents: 40,
            status: 'active' as const,
            price: '3500 DH',
            category: 'IA'
        },
        {
            id: 3,
            title: 'Cybersécurité Essentials',
            description: 'Formation sur la sécurité informatique et la protection des données',
            level: 'Intermédiaire' as const,
            duration: '10 semaines',
            modules: 6,
            enrolledStudents: 0,
            maxStudents: 30,
            status: 'draft' as const,
            price: '2000 DH',
            category: 'Sécurité'
        },
        {
            id: 4,
            title: 'Initiation à la Programmation',
            description: 'Apprenez les bases de la programmation avec Python',
            level: 'Débutant' as const,
            duration: '8 semaines',
            modules: 5,
            enrolledStudents: 67,
            maxStudents: 80,
            status: 'active' as const,
            price: '1500 DH',
            category: 'Programmation'
        }
    ];

    const modules: Module[] = [
        {
            id: 1,
            title: 'Introduction au HTML/CSS',
            description: 'Apprenez les bases du développement web',
            duration: '3h',
            order: 1,
            isCompleted: true
        },
        {
            id: 2,
            title: 'JavaScript Fundamentals',
            description: 'Maîtrisez les concepts de base de JavaScript',
            duration: '5h',
            order: 2,
            isCompleted: true
        },
        {
            id: 3,
            title: 'React.js Basics',
            description: 'Introduction au framework React',
            duration: '6h',
            order: 3,
            isCompleted: false
        },
        {
            id: 4,
            title: 'Node.js & Express',
            description: 'Développement backend avec Node.js',
            duration: '4h',
            order: 4,
            isCompleted: false
        }
    ];

    const [isModuleFormOpen, setIsModuleFormOpen] = useState(false);
    const [isFormationFormOpen, setIsFormationFormOpen] = useState(false);
    const [editedModule, setEditedModule] = useState<Module | null>(null);
    const [editedFormation, setEditedFormation] = useState<Formation | null>(null);
    const [showModules, setShowModules] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);

    const handleModuleEdit = (module: Module) => {
        setEditedModule(module);
        setIsModuleFormOpen(true);
    };

    const handleFormationEdit = (formation: Formation) => {
        setEditedFormation(formation);
        setIsFormationFormOpen(true);
    };

    const handleModuleDelete = (module: Module) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce module ?')) {
            console.log('Module supprimé:', module);
            // Ici vous pourriez ajouter la logique pour supprimer le module
        }
    };

    const handleFormationDelete = (formation: Formation) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
            console.log('Formation supprimée:', formation);
            // Ici vous pourriez ajouter la logique pour supprimer la formation
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

    const handleAddFormation = () => {
        setEditedFormation(null);
        setIsFormationFormOpen(true);
    };

    const handleAddModule = () => {
        setEditedModule(null);
        setIsModuleFormOpen(true);
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
                            <button 
                                onClick={handleAddModule}
                                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Ajouter module</span>
                            </button>
                            <button 
                                onClick={handleAddFormation}
                                className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Nouvelle formation</span>
                            </button>
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
                                onEdit={handleFormationEdit}
                                onDelete={handleFormationDelete}
                                onViewModules={handleViewModules}
                            />
                        ))}
                    </div>
                </div>

                {/* Aperçu des modules */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                            <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
                            Modules - Développement Web Full Stack
                        </h2>
                        <button 
                            onClick={handleAddModule}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Ajouter module</span>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {modules.map((module) => (
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

                {/* Modal pour ajouter/modifier une formation */}
                {isFormationFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {editedFormation ? 'Modifier la formation' : 'Nouvelle formation'}
                                </h3>
                                <button 
                                    onClick={() => setIsFormationFormOpen(false)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Titre
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editedFormation?.title || ''}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Titre de la formation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        defaultValue={editedFormation?.description || ''}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        rows={3}
                                        placeholder="Description de la formation"
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => setIsFormationFormOpen(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        onClick={() => {
                                            // Logique de sauvegarde
                                            setIsFormationFormOpen(false);
                                        }}
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        <Save className="w-4 h-4 inline mr-2" />
                                        Sauvegarder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal pour ajouter/modifier un module */}
                {isModuleFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {editedModule ? 'Modifier le module' : 'Nouveau module'}
                                </h3>
                                <button 
                                    onClick={() => setIsModuleFormOpen(false)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Titre
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editedModule?.title || ''}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Titre du module"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Durée
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editedModule?.duration || ''}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Ex: 2h"
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => setIsModuleFormOpen(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        onClick={() => {
                                            // Logique de sauvegarde
                                            setIsModuleFormOpen(false);
                                        }}
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        <Save className="w-4 h-4 inline mr-2" />
                                        Sauvegarder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
