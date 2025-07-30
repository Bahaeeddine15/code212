import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Trophy, 
    Plus, 
    Edit3, 
    Trash2, 
    Search,
    Calendar,
    Users,
    Medal,
    Target,
    Award,
    Clock,
    Star
} from 'lucide-react';
import { ModernCard, PageHeader, ModernButton } from '@/components/ui/modern-components';

// Types
interface Competition {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
    participants: number;
    maxParticipants: number;
    status: 'upcoming' | 'active' | 'completed' | 'cancelled';
    category: string;
    prizes: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestion des compétitions',
        href: '/competitions',
    },
];

// Composant pour les cartes de compétitions
const CompetitionCard = ({ 
    competition,
    onEdit,
    onDelete,
    onView
}: {
    competition: Competition;
    onEdit: (competition: Competition) => void;
    onDelete: (competition: Competition) => void;
    onView: (competition: Competition) => void;
}) => {
    const { title, description, startDate, endDate, participants, maxParticipants, status, category, prizes, difficulty } = competition;
    
    const getStatusColor = () => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
            case 'active':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            case 'completed':
                return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
            case 'cancelled':
                return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
        }
    };

    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'beginner':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            case 'intermediate':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
            case 'advanced':
                return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
        }
    };

    const getThemeByStatus = () => {
        switch (status) {
            case 'upcoming': return 'primary';
            case 'active': return 'success';
            case 'completed': return 'secondary';
            case 'cancelled': return 'danger';
            default: return 'primary';
        }
    };

    return (
        <ModernCard theme={getThemeByStatus() as any} className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-yellow-500 via-orange-600 to-red-500 flex items-center justify-center -m-6 mb-6">
                <Trophy className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
            </div>
            
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground line-clamp-2">{title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor()}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{startDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{endDate}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Participants</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{participants}/{maxParticipants}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                            style={{ width: `${(participants / maxParticipants) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getDifficultyColor()}`}>
                            {difficulty}
                        </span>
                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold rounded-full">{category}</span>
                    </div>
                </div>

                {prizes.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3">
                        <div className="flex items-center space-x-2 mb-2">
                            <Medal className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Prix</span>
                        </div>
                        <div className="text-xs text-yellow-700 dark:text-yellow-300">
                            {prizes.slice(0, 2).join(', ')}
                            {prizes.length > 2 && '...'}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <ModernButton
                        size="sm"
                        theme="info"
                        icon={Trophy}
                        onClick={() => onView(competition)}
                    >
                        Détails
                    </ModernButton>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onEdit(competition)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDelete(competition)}
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

// Mock data pour les compétitions
const mockCompetitions: Competition[] = [
    {
        id: 1,
        title: "Hackathon IA 2024",
        description: "Compétition de 48h pour développer des solutions innovantes utilisant l'intelligence artificielle pour résoudre des problèmes sociétaux.",
        startDate: "2024-03-15",
        endDate: "2024-03-17",
        registrationDeadline: "2024-03-10",
        participants: 78,
        maxParticipants: 100,
        status: "upcoming",
        category: "IA",
        prizes: ["5000 DH", "3000 DH", "1500 DH"],
        difficulty: "advanced"
    },
    {
        id: 2,
        title: "Concours de Programmation Web",
        description: "Créez l'application web la plus innovante en utilisant les dernières technologies React, Node.js et bases de données modernes.",
        startDate: "2024-02-20",
        endDate: "2024-02-22",
        registrationDeadline: "2024-02-15",
        participants: 45,
        maxParticipants: 60,
        status: "active",
        category: "Développement Web",
        prizes: ["3000 DH", "2000 DH", "1000 DH"],
        difficulty: "intermediate"
    },
    {
        id: 3,
        title: "Challenge Cybersécurité",
        description: "Testez vos compétences en sécurité informatique à travers des défis de pentesting et de cryptographie.",
        startDate: "2024-01-10",
        endDate: "2024-01-12",
        registrationDeadline: "2024-01-05",
        participants: 32,
        maxParticipants: 40,
        status: "completed",
        category: "Sécurité",
        prizes: ["4000 DH", "2500 DH", "1200 DH"],
        difficulty: "advanced"
    },
    {
        id: 4,
        title: "Code Challenge Débutants",
        description: "Compétition friendly pour les débutants en programmation avec des exercices algorithmiques adaptés.",
        startDate: "2024-04-01",
        endDate: "2024-04-03",
        registrationDeadline: "2024-03-25",
        participants: 15,
        maxParticipants: 50,
        status: "upcoming",
        category: "Algorithmique",
        prizes: ["2000 DH", "1200 DH", "800 DH"],
        difficulty: "beginner"
    }
];

export default function Competitions() {
    const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Fonctions de gestion
    const handleCompetitionEdit = (competition: Competition) => {
        console.log('Éditer compétition:', competition);
        router.visit(`/dashboard_admin/competition_edit/${competition.id}`);
    };

    const handleCompetitionDelete = (competition: Competition) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétition ?')) {
            setCompetitions(prev => prev.filter(c => c.id !== competition.id));
        }
    };

    const handleCompetitionView = (competition: Competition) => {
        router.visit(`/dashboard_admin/competition_show/${competition.id}`);
    };

    // Filtrage des compétitions
    const filteredCompetitions = competitions.filter(competition => {
        const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             competition.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || competition.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Statistiques
    const stats = {
        total: competitions.length,
        upcoming: competitions.filter(c => c.status === 'upcoming').length,
        active: competitions.filter(c => c.status === 'active').length,
        completed: competitions.filter(c => c.status === 'completed').length,
        totalParticipants: competitions.reduce((sum, c) => sum + c.participants, 0)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des compétitions" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">
                
                {/* Header moderne */}
                <PageHeader
                    title="Gestion des compétitions"
                    description="Organisez et gérez vos compétitions et concours"
                    icon={Trophy}
                    theme="warning"
                    actions={
                        <ModernButton
                            theme="warning"
                            icon={Plus}
                            onClick={() => router.visit('/dashboard_admin/competition_create')}
                        >
                            Nouvelle compétition
                        </ModernButton>
                    }
                />

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <ModernCard theme="warning">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Total compétitions</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="primary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">À venir</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.upcoming}</p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="success">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Actives</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.active}</p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="secondary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Terminées</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.completed}</p>
                            </div>
                            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="info">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Participants</p>
                                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">{stats.totalParticipants}</p>
                            </div>
                            <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-2xl">
                                <Users className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
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
                                placeholder="Rechercher une compétition..."
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
                                <option value="upcoming">À venir</option>
                                <option value="active">Actives</option>
                                <option value="completed">Terminées</option>
                                <option value="cancelled">Annulées</option>
                            </select>
                        </div>
                    </div>
                </ModernCard>

                {/* Liste des compétitions */}
                <ModernCard theme="primary">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground flex items-center">
                            <Trophy className="w-7 h-7 mr-3 text-yellow-600 dark:text-yellow-400" />
                            Compétitions ({filteredCompetitions.length})
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCompetitions.map((competition) => (
                            <CompetitionCard 
                                key={competition.id} 
                                competition={competition}
                                onEdit={handleCompetitionEdit}
                                onDelete={handleCompetitionDelete}
                                onView={handleCompetitionView}
                            />
                        ))}
                    </div>

                    {filteredCompetitions.length === 0 && (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Aucune compétition trouvée</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre première compétition'}
                            </p>
                            <ModernButton
                                theme="warning"
                                icon={Plus}
                                onClick={() => router.visit('/dashboard_admin/competition_create')}
                            >
                                Créer une compétition
                            </ModernButton>
                        </div>
                    )}
                </ModernCard>
            </div>
        </AppLayout>
    );
}
