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

// Types
interface Reservation {
    id: number;
    studentName: string;
    studentEmail: string;
    studentPhone?: string;
    studentId?: string;
    roomName?: string;
    roomId?: number;
    capacity?: number;
    date?: string;
    timeStart?: string;
    timeEnd?: string;
    purpose?: string;
    description?: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    processedAt?: string;
    processedBy?: string;
}

interface Room {
    id: number;
    name: string;
    capacity: number;
    type: string;
    equipment: string[];
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
                return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">En attente</span>;
            case 'approved':
                return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Approuvée</span>;
            case 'rejected':
                return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Rejetée</span>;
        }
    };

    const getStatusIcon = () => {
        switch (reservation.status) {
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'approved':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-600" />;
        }
    };

    // Make the whole card clickable
    return (
        <Link
            href={`/admin/reservations/${reservation.id}`}
            className="block bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{reservation.roomName || 'Salle inconnue'}</h3>
                        <p className="text-sm text-gray-600">Par {reservation.studentName || 'Inconnu'}</p>
                    </div>
                </div>
                {getStatusBadge()}
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{reservation.date ? new Date(reservation.date).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
                    <Clock className="w-4 h-4 ml-3" />
                    <span>{reservation.timeStart || '--'} - {reservation.timeEnd || '--'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Capacité: {reservation.capacity ?? '--'} personnes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>ID Étudiant: {reservation.studentId || '--'}</span>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Objectif:</p>
                <p className="text-sm font-medium text-gray-800">{reservation.purpose || '--'}</p>
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Soumise le {reservation.submittedAt ? new Date(reservation.submittedAt).toLocaleDateString('fr-FR') : '--'} à {reservation.submittedAt ? new Date(reservation.submittedAt).toLocaleTimeString('fr-FR') : '--'}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>Détails</span>
                </span>
                {reservation.status === 'pending' && (
                    <div className="flex space-x-2">
                        <button
                            onClick={e => { e.preventDefault(); onReject(reservation.id); }}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            <span>Rejeter</span>
                        </button>
                        <button
                            onClick={e => { e.preventDefault(); onApprove(reservation.id); }}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            <span>Approuver</span>
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default function Reservations() {
    // Données des salles disponibles (exemples)
    const [rooms] = useState<Room[]>([
        { id: 1, name: 'Salle A101', capacity: 30, type: 'Cours', equipment: ['Projecteur', 'Tableau blanc'] },
        { id: 2, name: 'Salle B205', capacity: 50, type: 'Amphithéâtre', equipment: ['Projecteur', 'Micro', 'Système audio'] },
        { id: 3, name: 'Lab Informatique C301', capacity: 25, type: 'Laboratoire', equipment: ['PC', 'Projecteur', 'Réseau'] },
        { id: 4, name: 'Salle Réunion D102', capacity: 15, type: 'Réunion', equipment: ['Écran TV', 'Visioconférence'] }
    ]);

    const { reservations = [] } = usePage().props as any;
    const [localReservations, setLocalReservations] = useState<Reservation[]>(reservations);

    // États pour les filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRoom, setFilterRoom] = useState('all');

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
        const matchesSearch = (reservation.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (reservation.roomName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (reservation.purpose || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
        const matchesRoom = filterRoom === 'all' || (reservation.roomId && reservation.roomId.toString() === filterRoom);

        return matchesSearch && matchesStatus && matchesRoom;
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
            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">

                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations</h1>
                                <p className="text-gray-600 mt-2 text-lg">Traitement des demandes de réservation de salles</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Total réservations</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-blue-100 rounded-2xl">
                                <Building2 className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">En attente</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 rounded-2xl">
                                <AlertCircle className="w-8 h-8 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Approuvées</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
                            </div>
                            <div className="p-4 bg-green-100 rounded-2xl">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Rejetées</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
                            </div>
                            <div className="p-4 bg-red-100 rounded-2xl">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, salle ou objet..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="pending">En attente</option>
                                <option value="approved">Approuvée</option>
                                <option value="rejected">Rejetée</option>
                            </select>
                            <select
                                value={filterRoom}
                                onChange={(e) => setFilterRoom(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40"
                            >
                                <option value="all">Toutes les salles</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id.toString()}>{room.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des réservations */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Building2 className="w-7 h-7 mr-3 text-blue-600" />
                            Demandes de réservation ({filteredReservations.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        <div className="text-center py-12">
                            <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune réservation trouvée</h3>
                            <p className="text-gray-600">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Aucune demande de réservation en attente'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
