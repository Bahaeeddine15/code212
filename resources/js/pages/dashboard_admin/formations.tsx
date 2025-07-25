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
import { ModernCard, PageHeader, ModernButton } from '@/components/ui/modern-components';

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
    
    const getLevelColor = () => {
        switch (level) {
            case 'Débutant':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            case 'Intermédiaire':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
            case 'Avancé':
                return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
        }
    };

    return (
        <ModernCard theme="primary" className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center -m-6 mb-6">
                <GraduationCap className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
            </div>
            
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{description}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-between text-sm mb-6">
                <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getLevelColor()}`}>
                        {level}
                    </span>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Modules</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{modules.length}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Inscrits</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{enrolledStudents}/{maxStudents}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                        style={{ width: `${(enrolledStudents / maxStudents) * 100}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">{category}</span>
                <div className="flex space-x-2">
                    <Link
                        href={`/dashboard_admin/formation_edit/${formation.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                    >
                        <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => onDelete(formation)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <ModernButton
                        size="sm"
                        theme="primary"
                        onClick={() => router.visit(`/dashboard_admin/formation/${formation.id}/modules`)}
                    >
                        Voir modules
                    </ModernButton>
                </div>
            </div>
        </ModernCard>
    );
};

// Composant pour les modules de formation
const ModuleCard = ({
    module,
    onEdit,
    onDelete,
    onPlay,
    selectedFormationId
}: {
    module: Module;
    onEdit: (module: Module) => void;
    onDelete: (module: Module) => void;
    onPlay: (module: Module) => void;
    selectedFormationId?: number;
}) => {
    const { title, description, duration, order, isCompleted, id } = module;

    return (
        <ModernCard theme={isCompleted ? "success" : "info"} className="transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isCompleted 
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                }`}>
                    {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                    ) : (
                        <span className="text-lg font-bold">{order}</span>
                    )}
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2">{title}</h4>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{duration}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => onPlay(module)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                            >
                                <PlayCircle className="w-4 h-4" />
                            </button>
                            <Link
                                href={`/dashboard_admin/module_edit/${selectedFormationId}/${module.id}`}
                                className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200"
                            >
                                <Edit3 className="w-4 h-4" />
                            </Link>
                            <button 
                                onClick={() => onDelete(module)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModernCard>
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

    const handleModuleEdit = (module: Module) => {
        // Navigation vers la page d'édition du module
        if (selectedFormation) {
            router.visit(`/dashboard_admin/module_edit/${selectedFormation.id}/${module.id}`);
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
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">
                
                {/* Header moderne */}
                <PageHeader
                    title="Formations & Certifications"
                    description="Créez et gérez vos formations professionnelles"
                    icon={GraduationCap}
                    theme="primary"
                    actions={
                        <div className="flex space-x-3">
                            {selectedFormation && (
                                <ModernButton
                                    theme="secondary"
                                    icon={FileText}
                                    onClick={() => router.visit(`/dashboard_admin/module_create?formationId=${selectedFormation.id}`)}
                                >
                                    Ajouter module
                                </ModernButton>
                            )}
                            <ModernButton
                                theme="primary"
                                icon={Plus}
                                onClick={() => router.visit('/dashboard_admin/formation_create')}
                            >
                                Nouvelle formation
                            </ModernButton>
                        </div>
                    }
                />

                {/* Statistiques principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <ModernCard theme="primary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Total formations</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">18</p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="success">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Étudiants inscrits</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">247</p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="secondary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Certifications</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">89</p>
                            </div>
                            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="info">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Modules actifs</p>
                                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">156</p>
                            </div>
                            <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-2xl">
                                <BookOpen className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                            </div>
                        </div>
                    </ModernCard>
                </div>

                {/* Barre de recherche et filtres */}
                <ModernCard theme="primary">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher une formation..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select className="px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200">
                                <option>Tous les niveaux</option>
                                <option>Débutant</option>
                                <option>Intermédiaire</option>
                                <option>Avancé</option>
                            </select>
                            <select className="px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200">
                                <option>Toutes les catégories</option>
                                <option>Développement</option>
                                <option>IA</option>
                                <option>Sécurité</option>
                                <option>Programmation</option>
                            </select>
                        </div>
                    </div>
                </ModernCard>

                {/* Liste des formations */}
                <ModernCard theme="primary">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground flex items-center">
                            <GraduationCap className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" />
                            Formations disponibles
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {formations.map((formation) => (
                            <FormationCard 
                                key={formation.id} 
                                formation={formation}
                                onDelete={handleFormationDelete}
                                onViewModules={handleViewModules}
                            />
                        ))}
                    </div>
                </ModernCard>

                {/* Aperçu des modules sélectionnés */}
                {showModules && selectedFormation && (
                    <ModernCard theme="secondary">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-foreground flex items-center">
                                <BookOpen className="w-7 h-7 mr-3 text-purple-600 dark:text-purple-400" />
                                Modules - {selectedFormation.title}
                            </h2>
                            <ModernButton
                                theme="secondary"
                                icon={Plus}
                                onClick={() => router.visit(`/dashboard_admin/module_create?formationId=${selectedFormation.id}`)}
                            >
                                Ajouter module
                            </ModernButton>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedFormation?.modules.map((module: Module) => (
                                <ModuleCard 
                                    key={module.id} 
                                    module={module}
                                    onEdit={handleModuleEdit}
                                    onDelete={handleModuleDelete}
                                    onPlay={handleModulePlay}
                                    selectedFormationId={selectedFormation.id}
                                />
                            ))}
                        </div>
                    </ModernCard>
                )}
            </div>
        </AppLayout>
    );
}
