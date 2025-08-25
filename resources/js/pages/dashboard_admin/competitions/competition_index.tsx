import AppLayout from '@/layouts/app-layout-admin';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Trophy,
    Users,
    Calendar,
    MapPin,
    Medal,
    UserPlus,
    FileText,
    Download,
    Eye,
    Edit,
    Trash2,
    Lock,
    Plus,
    CheckCircle2,
    XCircle,
    User
} from 'lucide-react';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';
import { useState } from 'react';
import { router } from '@inertiajs/react';

// Types
interface Competition {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    registrations: number;
    maxParticipants: number;
    status: 'Ouvert' | 'Complet' | 'Fermé';
    deadline: string;
    description?: string;
    slug: string;
    views: number;
    created_at: string;
    updated_at: string;
    closed_at?: string | null;
    closed_by?: string | null;
    type: 'individual' | 'group';
}

interface Registration {
    id: number;
    competitionId: number;
    competitionTitle: string;
    competitionType: 'individual' | 'group';
    participantName: string;
    email: string;
    phone: string;
    category: string;
    club: string;
    registrationDate: string;
    status: 'Confirmé' | 'En attente' | 'Refusé';
    paymentStatus: 'Payé' | 'En attente' | 'Refusé';
    notes?: string;
}

interface Statistics {
    totalCompetitions: number;
    activeCompetitions: number;
    totalRegistrations: number;
    confirmedRegistrations: number;
    pendingRegistrations: number;
}

interface Props {
    competitions: Competition[];
    registrations: Registration[];
    statistics: Statistics;
}

export default function CompetitionsPage({ competitions, registrations, statistics }: Props) {
    // State management
    const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Navigation functions
    const navigateToCreate = () => {
        router.get('/admin/competitions/create');
    };

    const navigateToShow = (competition: Competition) => {
        router.get(`/admin/competitions/${competition.id}`);
    };

    const navigateToEdit = (competition: Competition) => {
        router.get(`/admin/competitions/${competition.id}/edit`);
    };

    const deleteCompetition = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette compétition ?')) {
            router.delete(`/admin/competitions/${id}`);
        }
    };

    const closeCompetition = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir fermer cette compétition ?')) {
            router.patch(`/admin/competitions/${id}/close`, {}, {
                onSuccess: () => {
                    // Competition will be refreshed automatically by Inertia
                },
                onError: (errors) => {
                    console.error('Error closing competition:', errors);
                }
            });
        }
    };

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ouvert':
                return 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-semibold';
            case 'Complet':
                return 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 font-semibold';
            case 'Fermé':
                return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold';
            default:
                return 'bg-blue-50 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-semibold';
        }
    };

    const getParticipantStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmé':
                return 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-semibold';
            case 'En attente':
                return 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 font-semibold';
            case 'Refusé':
                return 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 font-semibold';
            default:
                return 'bg-blue-50 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-semibold';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'group':
                return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200';
            case 'individual':
                return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200';
            default:
                return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'group':
                return 'En équipe';
            case 'individual':
                return 'Individuel';
            default:
                return 'Non défini';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'group':
                return Users;
            case 'individual':
                return User;
            default:
                return Trophy;
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    // Get next competition date
    const getNextCompetitionDays = () => {
        const openCompetitions = competitions.filter(c => c.status === 'Ouvert');
        if (openCompetitions.length === 0) return 0;

        const nextCompetition = openCompetitions
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

        const today = new Date();
        const competitionDate = new Date(nextCompetition.date);
        const diffTime = competitionDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return Math.max(0, diffDays);
    };

    // Filtered data
    const filteredRegistrations = registrations.filter(reg => {
        const matchesCompetition = selectedCompetition ? reg.competitionId === selectedCompetition : true;
        const matchesSearch = searchTerm === '' ||
            reg.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.competitionTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
        return matchesCompetition && matchesSearch && matchesStatus;
    });

    const filteredCompetitions = competitions.filter(comp => {
        const matchesSearch = searchTerm === '' ||
            comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comp.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="Inscription aux compétitions" />

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">
                {/* Header moderne */}
                <PageHeader
                    title="Inscription aux compétitions"
                    description="Gérez les inscriptions et les participants aux compétitions"
                    icon={Trophy}
                    theme="primary"
                    actions={
                        <ModernButton theme="primary" icon={Plus} onClick={navigateToCreate}>
                            <span className="hidden sm:inline">Nouvelle compétition</span>
                            <span className="sm:hidden">Nouvelle</span>
                        </ModernButton>
                    }
                />

                {/* Search and Filters */}
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Rechercher par participant, email, club ou compétition..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-full sm:w-48 text-sm sm:text-base">
                                    <SelectValue placeholder="Filtrer par statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="Confirmé">Confirmé</SelectItem>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="Refusé">Refusé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Compétitions actives</p>
                                <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">{statistics.activeCompetitions}</p>
                                <p className="text-xs text-muted-foreground mt-1">Total: {statistics.totalCompetitions}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl lg:rounded-2xl">
                                <Trophy className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total inscriptions</p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">{statistics.totalRegistrations}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {statistics.totalRegistrations > 0
                                        ? `${Math.round((statistics.confirmedRegistrations / statistics.totalRegistrations) * 100)}% confirmées`
                                        : 'Aucune inscription'
                                    }
                                </p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-green-100 dark:bg-green-900 rounded-xl lg:rounded-2xl">
                                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Confirmées</p>
                                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1 sm:mt-2">{statistics.confirmedRegistrations}</p>
                                <p className="text-xs text-muted-foreground mt-1">{statistics.pendingRegistrations} en attente</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-purple-100 rounded-xl lg:rounded-2xl">
                                <Medal className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Compétitions individuelles</p>
                                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
                                    {competitions.filter(c => c.type === 'individual').length}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {competitions.filter(c => c.type === 'group').length} en équipe
                                </p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl lg:rounded-2xl">
                                <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Competitions List */}
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground flex items-center">
                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
                            <span className="hidden sm:inline">Compétitions disponibles</span>
                            <span className="sm:hidden">Compétitions</span>
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Liste des compétitions ouvertes aux inscriptions</p>

                    {filteredCompetitions.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Aucune compétition</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Commencez par créer votre première compétition.</p>
                            <Button
                                onClick={navigateToCreate}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto text-sm sm:text-base"
                            >
                                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Nouvelle compétition</span>
                                <span className="sm:hidden">Nouvelle</span>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {filteredCompetitions.map((competition) => (
                                <div
                                    key={competition.id}
                                    className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                                        selectedCompetition === competition.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-border hover:border-gray-300'
                                    }`}
                                    onClick={() => navigateToShow(competition)}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
                                        <div className="flex-1 space-y-2 sm:space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                                <h3 className="font-semibold text-sm sm:text-base">{competition.title}</h3>
                                                <div className="flex items-center gap-2">
                                                    <Badge className={`${getStatusColor(competition.status)} text-xs`}>
                                                        {competition.status}
                                                    </Badge>
                                                    <Badge variant="outline" className={`${getTypeColor(competition.type)} text-xs`}>
                                                        {(() => {
                                                            const IconComponent = getTypeIcon(competition.type);
                                                            return (
                                                                <>
                                                                    <IconComponent className="w-3 h-3 mr-1" />
                                                                    <span className="hidden sm:inline">{getTypeLabel(competition.type)}</span>
                                                                    <span className="sm:hidden">{competition.type === 'individual' ? 'Ind.' : 'Éq.'}</span>
                                                                </>
                                                            );
                                                        })()}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 h-3 sm:h-4 sm:w-4" />
                                                    <span>{formatDate(competition.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 h-3 sm:h-4 sm:w-4" />
                                                    <span className="truncate">{competition.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-3 h-3 sm:h-4 sm:w-4" />
                                                    <span>{competition.registrations}/{competition.maxParticipants}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 h-3 sm:h-4 sm:w-4" />
                                                    <span>{competition.views} vues</span>
                                                </div>
                                                <div className="flex items-center gap-1 lg:hidden">
                                                    {(() => {
                                                        const IconComponent = getTypeIcon(competition.type);
                                                        return <IconComponent className="h-3 h-3 sm:h-4 sm:w-4" />;
                                                    })()}
                                                    <span>{getTypeLabel(competition.type)}</span>
                                                </div>
                                            </div>
                                            {competition.description && (
                                                <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                                    {competition.description}
                                                </p>
                                            )}
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">
                                                    Date limite: {formatDate(competition.deadline)}
                                                </p>
                                                {competition.status === 'Fermé' && competition.closed_at && (
                                                    <p className="text-xs text-red-600 dark:text-red-400">
                                                        Fermée le {formatDate(competition.closed_at)}
                                                        {competition.closed_by && ` par ${competition.closed_by}`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                            {competition.status === 'Ouvert' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        closeCompetition(competition.id);
                                                    }}
                                                    className="border-orange-600 text-orange-600 hover:bg-orange-50 text-xs sm:text-sm w-full sm:w-auto"
                                                >
                                                    <Lock className="h-3 h-3 sm:h-4 sm:w-4 mr-1" />
                                                    <span className="hidden sm:inline">Fermer</span>
                                                    <span className="sm:hidden">Fermer</span>
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigateToEdit(competition);
                                                }}
                                                className="text-xs sm:text-sm w-full sm:w-auto"
                                            >
                                                <Edit className="h-3 h-3 sm:h-4 sm:w-4 mr-1" />
                                                <span className="hidden sm:inline">Modifier</span>
                                                <span className="sm:hidden">Modifier</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteCompetition(competition.id);
                                                }}
                                                className="border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs sm:text-sm w-full sm:w-auto"
                                            >
                                                <Trash2 className="h-3 h-3 sm:h-4 sm:w-4 mr-1" />
                                                <span className="hidden sm:inline">Supprimer</span>
                                                <span className="sm:hidden">Supprimer</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Registrations Table */}
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                        <div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground flex items-center">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 text-green-600 dark:text-green-400" />
                                <span className="hidden sm:inline">Inscriptions récentes</span>
                                <span className="sm:hidden">Inscriptions</span>
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Liste des dernières inscriptions aux compétitions</p>
                        </div>
                        {/* ✅ Removed export button */}
                    </div>

                    {filteredRegistrations.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Aucune inscription</h3>
                            <p className="text-muted-foreground">Aucune inscription trouvée.</p>
                        </div>
                    ) : (
                        <div className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table className="min-w-[700px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs sm:text-sm">Participant</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Compétition</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden md:table-cell">Type</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Contact</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Club</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Catégorie</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Statut</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Date d'inscription</TableHead>
                                            <TableHead className="text-xs sm:text-sm text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                {filteredRegistrations.slice(0, 10).map((registration) => (
                                    <TableRow key={registration.id}>
                                        <TableCell className="font-medium text-xs sm:text-sm">
                                            {registration.participantName}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="max-w-[200px]">
                                                <button
                                                    onClick={() => {
                                                        const competition = competitions.find(c => c.id === registration.competitionId);
                                                        if (competition) {
                                                            navigateToShow(competition);
                                                        }
                                                    }}
                                                    className="font-medium text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 truncate text-left block w-full"
                                                    title={registration.competitionTitle}
                                                >
                                                    {registration.competitionTitle}
                                                </button>
                                                <div className="text-xs text-muted-foreground">
                                                    ID: {registration.competitionId}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge variant="outline" className={`text-xs ${getTypeColor(registration.competitionType)}`}>
                                                {(() => {
                                                    const IconComponent = getTypeIcon(registration.competitionType);
                                                    return (
                                                        <>
                                                            <IconComponent className="w-3 h-3 mr-1" />
                                                            {getTypeLabel(registration.competitionType)}
                                                        </>
                                                    );
                                                })()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="text-xs sm:text-sm truncate">{registration.email}</div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                    {registration.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{registration.club}</TableCell>
                                        <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{registration.category}</TableCell>
                                        <TableCell>
                                            <Badge className={`text-xs ${getParticipantStatusColor(registration.status)}`}>
                                                {registration.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{formatDate(registration.registrationDate)}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        router.patch(
                                                            `/admin/competition-registrations/${registration.id}/approve`
                                                        );
                                                    }}
                                                    disabled={registration.status === 'Confirmé'}
                                                    title="Accepter"
                                                    className="w-full sm:w-auto text-xs sm:text-sm p-1 sm:p-2"
                                                >
                                                    <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                                    <span className="ml-1 sm:hidden">Accepter</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        router.patch(
                                                            `/admin/competition-registrations/${registration.id}/reject`
                                                        );
                                                    }}
                                                    disabled={registration.status === 'Refusé'}
                                                    title="Refuser"
                                                    className="w-full sm:w-auto text-xs sm:text-sm p-1 sm:p-2"
                                                >
                                                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
                                                    <span className="ml-1 sm:hidden">Refuser</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}