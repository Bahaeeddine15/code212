import AppLayout from '@/layouts/app-layout';
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
    Plus
} from 'lucide-react';
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
}

interface Registration {
    id: number;
    competitionId: number;
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
        router.get('/competitions/create');
    };

    const navigateToShow = (competition: Competition) => {
        router.get(`/competitions/${competition.id}`);
    };

    const navigateToEdit = (competition: Competition) => {
        router.get(`/competitions/${competition.id}/edit`);
    };

    const deleteCompetition = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette compétition ?')) {
            router.delete(`/competitions/${id}`);
        }
    };

    const closeCompetition = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir fermer cette compétition ?')) {
            router.patch(`/competitions/${id}/close`, {}, {
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
                return 'bg-green-100 text-green-800';
            case 'Complet':
                return 'bg-red-100 text-red-800';
            case 'Fermé':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getParticipantStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmé':
                return 'bg-green-100 text-green-800';
            case 'En attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'Refusé':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-blue-100 text-blue-800';
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
            reg.club.toLowerCase().includes(searchTerm.toLowerCase());
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

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inscription aux compétitions</h1>
                        <p className="text-muted-foreground">
                            Gérez les inscriptions et les participants aux compétitions
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={navigateToCreate}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle compétition
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Rechercher par titre ou lieu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
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

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Compétitions actives</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.activeCompetitions}</div>
                            <p className="text-xs text-muted-foreground">Total: {statistics.totalCompetitions}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total inscriptions</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.totalRegistrations}</div>
                            <p className="text-xs text-muted-foreground">
                                {statistics.totalRegistrations > 0
                                    ? `${Math.round((statistics.confirmedRegistrations / statistics.totalRegistrations) * 100)}% confirmées`
                                    : 'Aucune inscription'
                                }
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inscriptions confirmées</CardTitle>
                            <Medal className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.confirmedRegistrations}</div>
                            <p className="text-xs text-muted-foreground">
                                {statistics.pendingRegistrations} en attente
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Prochaine compétition</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{getNextCompetitionDays()}</div>
                            <p className="text-xs text-muted-foreground">jours restants</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Competitions List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Compétitions disponibles</CardTitle>
                        <CardDescription>
                            Liste des compétitions ouvertes aux inscriptions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredCompetitions.length === 0 ? (
                            <div className="text-center py-8">
                                <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune compétition</h3>
                                <p className="mt-1 text-sm text-gray-500">Commencez par créer votre première compétition.</p>
                                <div className="mt-6">
                                    <Button onClick={navigateToCreate}>
                                        <Trophy className="mr-2 h-4 w-4" />
                                        Nouvelle compétition
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredCompetitions.map((competition) => (
                                    <div
                                        key={competition.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                            selectedCompetition === competition.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => navigateToShow(competition)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-semibold">{competition.title}</h3>
                                                    <Badge className={getStatusColor(competition.status)}>
                                                        {competition.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(competition.date)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {competition.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {competition.registrations}/{competition.maxParticipants}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="h-4 w-4" />
                                                        {competition.views} vues
                                                    </div>
                                                </div>
                                                {competition.description && (
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        {competition.description}
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    Date limite: {formatDate(competition.deadline)}
                                                </p>
                                                {competition.status === 'Fermé' && competition.closed_at && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        Fermée le {formatDate(competition.closed_at)}
                                                        {competition.closed_by && ` par ${competition.closed_by}`}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {competition.status === 'Ouvert' && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            closeCompetition(competition.id);
                                                        }}
                                                        className="border-orange-600 text-orange-600 hover:bg-orange-50"
                                                    >
                                                        <Lock className="h-4 w-4 mr-1" />
                                                        Fermer
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigateToEdit(competition);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Modifier
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteCompetition(competition.id);
                                                    }}
                                                    className="border-red-600 text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Registrations Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Inscriptions récentes</CardTitle>
                                <CardDescription>
                                    Liste des dernières inscriptions aux compétitions
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Exporter
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredRegistrations.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune inscription</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Aucune inscription trouvée.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Participant</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Club</TableHead>
                                        <TableHead>Catégorie</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Paiement</TableHead>
                                        <TableHead>Date d'inscription</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRegistrations.slice(0, 10).map((registration) => (
                                        <TableRow key={registration.id}>
                                            <TableCell className="font-medium">
                                                {registration.participantName}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="text-sm">{registration.email}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {registration.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{registration.club}</TableCell>
                                            <TableCell>{registration.category}</TableCell>
                                            <TableCell>
                                                <Badge className={getParticipantStatusColor(registration.status)}>
                                                    {registration.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {registration.paymentStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{formatDate(registration.registrationDate)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
