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
    XCircle
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

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Inscription aux compétitions</h1>
                                <p className="text-gray-600 mt-2 text-lg">Gérez les inscriptions et les participants aux compétitions</p>
                            </div>
                        </div>
                        <Button
                            onClick={navigateToCreate}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Nouvelle compétition</span>
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Rechercher par titre ou lieu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-48">
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Compétitions actives</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{statistics.activeCompetitions}</p>
                                <p className="text-xs text-gray-500 mt-1">Total: {statistics.totalCompetitions}</p>
                            </div>
                            <div className="p-4 bg-blue-100 rounded-2xl">
                                <Trophy className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Total inscriptions</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{statistics.totalRegistrations}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {statistics.totalRegistrations > 0
                                        ? `${Math.round((statistics.confirmedRegistrations / statistics.totalRegistrations) * 100)}% confirmées`
                                        : 'Aucune inscription'
                                    }
                                </p>
                            </div>
                            <div className="p-4 bg-green-100 rounded-2xl">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Confirmées</p>
                                <p className="text-3xl font-bold text-purple-600 mt-2">{statistics.confirmedRegistrations}</p>
                                <p className="text-xs text-gray-500 mt-1">{statistics.pendingRegistrations} en attente</p>
                            </div>
                            <div className="p-4 bg-purple-100 rounded-2xl">
                                <Medal className="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Prochaine compétition</p>
                                <p className="text-3xl font-bold text-orange-600 mt-2">{getNextCompetitionDays()}</p>
                                <p className="text-xs text-gray-500 mt-1">jours restants</p>
                            </div>
                            <div className="p-4 bg-orange-100 rounded-2xl">
                                <Calendar className="w-8 h-8 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Competitions List */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Trophy className="w-7 h-7 mr-3 text-blue-600" />
                            Compétitions disponibles
                        </h2>
                    </div>
                    <p className="text-gray-600 mb-6">Liste des compétitions ouvertes aux inscriptions</p>

                    {filteredCompetitions.length === 0 ? (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune compétition</h3>
                            <p className="text-gray-600 mb-6">Commencez par créer votre première compétition.</p>
                            <Button
                                onClick={navigateToCreate}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto"
                            >
                                <Trophy className="w-5 h-5" />
                                <span>Nouvelle compétition</span>
                            </Button>
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
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
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
                                                <p className="mt-2 text-sm text-gray-600">
                                                    {competition.description}
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
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
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <Users className="w-7 h-7 mr-3 text-green-600" />
                                Inscriptions récentes
                            </h2>
                            <p className="text-gray-600 mt-2">Liste des dernières inscriptions aux compétitions</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                <Download className="h-4 w-4 mr-1" />
                                Exporter
                            </Button>
                        </div>
                    </div>

                    {filteredRegistrations.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune inscription</h3>
                            <p className="text-gray-600">Aucune inscription trouvée.</p>
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
                                                <div className="text-sm text-gray-500">
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
                                                >
                                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
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
                                                >
                                                    <XCircle className="h-5 w-5 text-red-600" />
                                                </Button>
                                                {/* Removed Edit and Delete buttons */}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
