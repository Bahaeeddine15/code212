import AppLayout from '@/layouts/app-layout-admin';
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

// ModuleCard component for displaying module details
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
    selectedFormationId: number;
}) => {
    return (
        <div className="bg-background rounded-xl shadow border border-border p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-start justify-between gap-3">
                <h4 className="text-base sm:text-lg font-semibold text-foreground flex-1 line-clamp-2">{module.title}</h4>
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <button
                        className="p-1.5 sm:p-2 text-primary hover:bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors"
                        onClick={() => onEdit(module)}
                        title="Modifier"
                    >
                        <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                        className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => onDelete(module)}
                        title="Supprimer"
                    >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                        className="p-1.5 sm:p-2 text-green-600 dark:text-green-400 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => onPlay(module)}
                        title="Lire"
                    >
                        <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{module.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 sm:gap-0">
                <span>Durée : {module.duration}</span>
                <span>Ordre : {module.order}</span>
            </div>
            {module.file_path && (
                <a
                    href={`/storage/${module.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline text-xs"
                >
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Voir le fichier
                </a>
            )}
        </div>
    );
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Formations/Certifications',
        href: '/admin/formations',
    },
];

// Types d'interfaces
interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
    file_path?: string;
}

interface Formation {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    category: string;
    link?: string;
    modules: Module[];
    enrolledStudents?: number;
    maxStudents?: number;
    thumbnail?: string;
    language?: string;
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
    const { title, description, level, duration, modules, category, enrolledStudents = 0, maxStudents = 0, link } = formation;

    const getLevelColor = () => {
        switch (level) {
            case 'Débutant':
                return 'bg-green-100 dark:bg-green-900 text-green-800';
            case 'Intermédiaire':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800';
            case 'Avancé':
                return 'bg-red-100 dark:bg-red-900 text-red-800';
            default:
                return 'bg-gray-100 text-foreground';
        }
    };

    // Card is always a <div>, but if link exists, clicking the card (except on buttons) opens the link
    const handleCardClick = (e: React.MouseEvent) => {
        // Only trigger if not clicking on a button or link
        if (link && !(e.target as HTMLElement).closest('button, a')) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            className={`bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`}
            onClick={handleCardClick}
            title={link ? "Voir la formation externe" : undefined}
        >
            <div className="h-36 sm:h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center -m-4 sm:-m-6 mb-4 sm:mb-6">
                {formation.thumbnail ? (
                    <img
                        src={`/storage/${formation.thumbnail}`}
                        alt={formation.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                    />
                ) : (
                    <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90 drop-shadow-lg" />
                )}
            </div>

            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-2">{title}</h3>
                    <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2 text-sm sm:text-base">{description}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm mb-4 sm:mb-6 gap-3 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full self-start ${getLevelColor()}`}>
                        {level}
                    </span>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{duration}</span>
                    </div>
                    {/* Add language info here */}
                    {formation.language && (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <span className="text-xs sm:text-sm">
                                <span className="font-semibold">Langue:</span> {formation.language}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium text-sm">Modules</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{modules.length}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium text-sm">Inscrits</span>
                    <span className="font-bold text-green-600 dark:text-green-400 text-sm">{enrolledStudents}/{maxStudents}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${(enrolledStudents / maxStudents) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <span className="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full self-start">{category}</span>
                <div className="flex space-x-2">
                    <Link
                        href={`/admin/formations/${formation.id}/edit`}
                        className="p-1.5 sm:p-2 text-primary hover:bg-blue-50 dark:bg-blue-900/20 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                    <button
                        onClick={e => { e.stopPropagation(); onDelete(formation); }}
                        className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                    >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    {!link && (
                        <ModernButton
                            size="sm"
                            theme="primary"
                            onClick={() => onViewModules(formation)}
                        >
                            <span className="hidden sm:inline">Voir modules</span>
                            <span className="sm:hidden">Modules</span>
                        </ModernButton>
                    )}
                    {link && (
                        <span className="text-primary text-xs font-semibold ml-2">Lien externe</span>
                    )}
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
            router.delete(`/admin/formations/${formation.id}`);
        }
    };

    const handleModuleDelete = (module: Module) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce module ?') && selectedFormation) {
            router.delete(`/admin/formations/${selectedFormation.id}/modules/${module.id}`);
        }
    };

    const handleModuleEdit = (module: Module) => {
        if (selectedFormation) {
            router.visit(`/admin/modules/${selectedFormation.id}/${module.id}/edit`);
        }
    };

    const handleViewModules = (formation: Formation) => {
        router.visit(`/admin/formations/${formation.id}/modules`);
    };

    const handleModulePlay = (module: Module) => {
        // Logic for playing module
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Formations/Certifications" />
            <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 overflow-x-auto bg-background">

                {/* Header moderne */}
                <PageHeader
                    title="Formations & Certifications"
                    description="Créez et gérez vos formations professionnelles"
                    icon={GraduationCap}
                    theme="primary"
                    actions={
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            {selectedFormation && (
                                <ModernButton
                                    theme="secondary"
                                    icon={FileText}
                                    onClick={() => router.visit(`/admin/formations/${selectedFormation.id}/modules/create`)}
                                >
                                    <span className="hidden sm:inline">Ajouter module</span>
                                    <span className="sm:hidden">Module</span>
                                </ModernButton>
                            )}
                            <ModernButton
                                theme="primary"
                                icon={Plus}
                                onClick={() => router.visit('/admin/formations/create')}
                            >
                                <span className="hidden sm:inline">Nouvelle formation</span>
                                <span className="sm:hidden">Nouveau</span>
                            </ModernButton>
                        </div>
                    }
                />

                {/* Statistiques principales */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total formations</p>
                                <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">18</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Étudiants inscrits</p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">247</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Certifications</p>
                                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1 sm:mt-2">89</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-purple-100 rounded-2xl">
                                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Modules actifs</p>
                                <p className="text-2xl sm:text-3xl font-bold text-cyan-600 mt-1 sm:mt-2">156</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-cyan-100 rounded-2xl">
                                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher une formation..."
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl bg-card dark:bg-card text-foreground text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <select className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl bg-card dark:bg-card text-foreground text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-all duration-200">
                                <option>Tous les niveaux</option>
                                <option>Débutant</option>
                                <option>Intermédiaire</option>
                                <option>Avancé</option>
                            </select>
                            <select className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl bg-card dark:bg-card text-foreground text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-all duration-200">
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
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center">
                            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
                            Formations disponibles
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
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

                {/* Aperçu des modules sélectionnés */}
                {showModules && selectedFormation && (
                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center">
                                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-purple-600" />
                                Modules - {selectedFormation.title}
                            </h2>
                            <ModernButton
                                theme="secondary"
                                icon={Plus}
                                onClick={() => router.visit(`/admin/formations/${selectedFormation.id}/modules/create`)}
                            >
                                <span className="hidden sm:inline">Ajouter module</span>
                                <span className="sm:hidden">Ajouter</span>
                            </ModernButton>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
