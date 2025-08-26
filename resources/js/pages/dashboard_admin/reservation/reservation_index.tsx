import AppLayout from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react'; // <-- Add Link import
import { useState } from 'react';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Filter,
    Search,
    Check,
    X,
    AlertCircle,
    CheckCircle,
    XCircle,
    Eye,
    Building2,
    User,
    Phone,
    Mail
} from 'lucide-react';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';

// Fonction pour traduire les codes de localisation
const getLocationLabel = (locationCode: string): string => {
    const locationLabels: Record<string, string> = {
        'salle_concentration_3e': 'Salle de concentration (3ème étage)',
        'salle_formation_ja_rdc': 'Salle de formation IA',
        'salle_conference_rdc': 'Salle de conférence (RDC)',
        'zone_coding': 'Zone coding'
    };
    return locationLabels[locationCode] || locationCode;
};

// Types
interface Reservation {
    id: number;
    nom: string;
    prenom: string;
    num_apogee: string;
    email: string;
    telephone?: string;
    description: string;
    date_reservation: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;
    resource_type?: string;
    location_type?: string | string[];
    room_details?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des réservations',
        href: '/admin/reservations',
    },
];

// Composant pour les cartes de réservation
const ReservationCard = ({
    reservation,
    onApprove,
    onReject,
}: {
    reservation: Reservation;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}) => {
    const getStatusBadge = () => {
        switch (reservation.status) {
            case 'pending':
                return <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 rounded-full">En attente</span>;
            case 'approved':
                return <span className="px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full">Approuvée</span>;
            case 'rejected':
                return <span className="px-2 py-1 text-xs font-semibold bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-full">Rejetée</span>;
        }
    };

    const getStatusIcon = () => {
        switch (reservation.status) {
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
            case 'approved':
                return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
        }
    };

    return (
        <Link
            href={`/admin/reservations/${reservation.id}`}
            className="block bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                    {getStatusIcon()}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                            {reservation.resource_type === 'pc' 
                                ? 'Post PC (2ème étage zone coding)' 
                                : reservation.resource_type === 'local'
                                    ? 'Réservation Local'
                                    : 'Réservation'
                            }
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Par {reservation.nom} {reservation.prenom}</p>
                    </div>
                </div>
                <div className="self-start">
                    {getStatusBadge()}
                </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{reservation.date_reservation ? new Date(reservation.date_reservation).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>ID Étudiant: {reservation.num_apogee || '--'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Email: {reservation.email || '--'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Téléphone: {reservation.telephone || '--'}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="truncate">
                        <strong>Ressource:</strong> {
                            reservation.resource_type === 'pc' 
                                ? 'Post PC (2ème étage zone coding)' 
                                : reservation.resource_type === 'local'
                                    ? 'Local'
                                    : reservation.resource_type || '--'
                        }
                    </div>
                    {reservation.resource_type === 'local' && reservation.location_type && (
                        <div>
                            <strong>Lieu:</strong> {
                                Array.isArray(reservation.location_type)
                                    ? reservation.location_type.map(loc => getLocationLabel(loc)).join(', ')
                                    : typeof reservation.location_type === 'string' 
                                        ? getLocationLabel(reservation.location_type)
                                        : '--'
                            }
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Description:</p>
                <p className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">{reservation.description || '--'}</p>
            </div>

            <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                    Soumise le {reservation.created_at ? new Date(reservation.created_at).toLocaleDateString('fr-FR') : '--'} à {reservation.created_at ? new Date(reservation.created_at).toLocaleTimeString('fr-FR') : '--'}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <span className="flex items-center space-x-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-primary hover:bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors min-h-[32px] sm:min-h-[36px]">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Détails</span>
                </span>
                {reservation.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onReject(reservation.id);
                            }}
                            className="flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                        >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Rejeter</span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onApprove(reservation.id);
                            }}
                            className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                        >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Approuver</span>
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default function Reservations() {
    const { reservations = [] } = usePage().props as any;
    const [localReservations, setLocalReservations] = useState<Reservation[]>(reservations);

    // États pour les filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterResourceType, setFilterResourceType] = useState('all');

    // Fonctions de gestion
    const handleApprove = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir approuver cette réservation ?')) {
            setLocalReservations(prev =>
                prev.map(r => r.id === id ? { ...r, status: 'approved' } : r)
            );
            router.patch(`/admin/reservations/${id}/approve`);
        }
    };

    const handleReject = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir rejeter cette réservation ?')) {
            setLocalReservations(prev =>
                prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r)
            );
            router.patch(`/admin/reservations/${id}/reject`);
        }
    };

    // Filtrage des réservations
    const filteredReservations = localReservations.filter(reservation => {
        const matchesSearch =
            (reservation.nom?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (reservation.prenom?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (reservation.resource_type?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (reservation.description?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
        const matchesResourceType = filterResourceType === 'all' || reservation.resource_type === filterResourceType;

        return matchesSearch && matchesStatus && matchesResourceType;
    });

    // Calcul des statistiques
    const stats = {
        total: localReservations.length,
        pending: localReservations.filter(r => r.status === 'pending').length,
        approved: localReservations.filter(r => r.status === 'approved').length,
        rejected: localReservations.filter(r => r.status === 'rejected').length
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des réservations" />
            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">

                {/* Header moderne */}
                <PageHeader
                    title="Gestion des Réservations"
                    description="Traitement des demandes de réservation de salles"
                    icon={Building2}
                    theme="primary"
                />

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total réservations</p>
                                <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">{stats.total}</p>
                            </div>
                            <div className="p-3 lg:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">En attente</p>
                                <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1 sm:mt-2">{stats.pending}</p>
                            </div>
                            <div className="p-3 lg:p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Approuvées</p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">{stats.approved}</p>
                            </div>
                            <div className="p-3 lg:p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Rejetées</p>
                                <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mt-1 sm:mt-2">{stats.rejected}</p>
                            </div>
                            <div className="p-3 lg:p-4 bg-red-100 dark:bg-red-900 rounded-2xl">
                                <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
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
                                placeholder="Rechercher par nom, salle ou objet..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-sm sm:text-base text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-sm sm:text-base text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-full sm:w-40"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="pending">En attente</option>
                                <option value="approved">Approuvée</option>
                                <option value="rejected">Rejetée</option>
                            </select>
                            <select
                                value={filterResourceType}
                                onChange={(e) => setFilterResourceType(e.target.value)}
                                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-sm sm:text-base text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-full sm:w-40"
                            >
                                <option value="all">Toutes les ressources</option>
                                <option value="pc">Post PC</option>
                                <option value="local">Local</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des réservations */}
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center">
                            <Building2 className="w-5 h-5 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
                            <span className="hidden sm:inline">Demandes de réservation</span>
                            <span className="sm:hidden">Réservations</span>
                            <span className="text-sm sm:text-base ml-1 sm:ml-2">({filteredReservations.length})</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                        {filteredReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))}
                    </div>

                    {filteredReservations.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Aucune réservation trouvée</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Aucune demande de réservation en attente'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
