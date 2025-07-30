import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
    studentPhone: string;
    studentId: string;
    roomName: string;
    roomId: number;
    capacity: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    purpose: string;
    description: string;
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
        href: '/dashboard',
    },
    {
        title: 'Gestion des réservations',
        href: '/reservations',
    },
];

// Composant pour les cartes de réservation
const ReservationCard = ({ 
    reservation,
    onApprove,
    onReject,
    onViewDetails
}: {
    reservation: Reservation;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
    onViewDetails: (reservation: Reservation) => void;
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

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{reservation.roomName}</h3>
                        <p className="text-sm text-gray-600">Par {reservation.studentName}</p>
                    </div>
                </div>
                {getStatusBadge()}
            </div>
            
            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(reservation.date).toLocaleDateString('fr-FR')}</span>
                    <Clock className="w-4 h-4 ml-3" />
                    <span>{reservation.timeStart} - {reservation.timeEnd}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Capacité: {reservation.capacity} personnes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>ID Étudiant: {reservation.studentId}</span>
                </div>
            </div>
            
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Objectif:</p>
                <p className="text-sm font-medium text-gray-800">{reservation.purpose}</p>
            </div>
            
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Soumise le {new Date(reservation.submittedAt).toLocaleDateString('fr-FR')} à {new Date(reservation.submittedAt).toLocaleTimeString('fr-FR')}
                </p>
            </div>
            
            <div className="flex items-center justify-between">
                <button 
                    onClick={() => onViewDetails(reservation)}
                    className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    <span>Détails</span>
                </button>
                
                {reservation.status === 'pending' && (
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onReject(reservation.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            <span>Rejeter</span>
                        </button>
                        <button 
                            onClick={() => onApprove(reservation.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            <span>Approuver</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
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

    // État pour la gestion des réservations (données d'exemple)
    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: 1,
            studentName: 'Ahmed Benali',
            studentEmail: 'ahmed.benali@etudiant.ma',
            studentPhone: '+212 6 12 34 56 78',
            studentId: 'ET2023001',
            roomName: 'Salle A101',
            roomId: 1,
            capacity: 30,
            date: '2025-01-15',
            timeStart: '14:00',
            timeEnd: '16:00',
            purpose: 'Présentation de projet',
            description: 'Présentation finale du projet de fin d\'études en informatique',
            status: 'pending',
            submittedAt: '2025-01-10T10:30:00'
        },
        {
            id: 2,
            studentName: 'Fatima Zahra',
            studentEmail: 'fatima.zahra@etudiant.ma',
            studentPhone: '+212 6 87 65 43 21',
            studentId: 'ET2023002',
            roomName: 'Lab Informatique C301',
            roomId: 3,
            capacity: 25,
            date: '2025-01-12',
            timeStart: '09:00',
            timeEnd: '12:00',
            purpose: 'TP Programmation',
            description: 'Travaux pratiques de programmation web avec une équipe de 20 étudiants',
            status: 'approved',
            submittedAt: '2025-01-08T15:45:00',
            processedAt: '2025-01-09T09:15:00',
            processedBy: 'Admin'
        },
        {
            id: 3,
            studentName: 'Omar Alami',
            studentEmail: 'omar.alami@etudiant.ma',
            studentPhone: '+212 6 11 22 33 44',
            studentId: 'ET2023003',
            roomName: 'Salle B205',
            roomId: 2,
            capacity: 50,
            date: '2025-01-20',
            timeStart: '10:00',
            timeEnd: '12:00',
            purpose: 'Conférence étudiante',
            description: 'Organisation d\'une conférence sur l\'intelligence artificielle',
            status: 'pending',
            submittedAt: '2025-01-11T14:20:00'
        },
        {
            id: 4,
            studentName: 'Yasmine Idrissi',
            studentEmail: 'yasmine.idrissi@etudiant.ma',
            studentPhone: '+212 6 55 44 33 22',
            studentId: 'ET2023004',
            roomName: 'Salle Réunion D102',
            roomId: 4,
            capacity: 15,
            date: '2025-01-18',
            timeStart: '15:00',
            timeEnd: '17:00',
            purpose: 'Réunion club étudiant',
            description: 'Réunion mensuelle du club de robotique',
            status: 'rejected',
            submittedAt: '2025-01-09T11:10:00',
            processedAt: '2025-01-10T16:30:00',
            processedBy: 'Admin'
        }
    ]);

    // États pour les filtres et modal
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRoom, setFilterRoom] = useState('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

    // Fonctions de gestion
    const handleApprove = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir approuver cette réservation ?')) {
            setReservations(reservations.map(reservation => 
                reservation.id === id ? { 
                    ...reservation, 
                    status: 'approved' as const,
                    processedAt: new Date().toISOString(),
                    processedBy: 'Admin'
                } : reservation
            ));
        }
    };

    const handleReject = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir rejeter cette réservation ?')) {
            setReservations(reservations.map(reservation => 
                reservation.id === id ? { 
                    ...reservation, 
                    status: 'rejected' as const,
                    processedAt: new Date().toISOString(),
                    processedBy: 'Admin'
                } : reservation
            ));
        }
    };

    const handleViewDetails = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setShowDetailsModal(true);
    };

    // Filtrage des réservations
    const filteredReservations = reservations.filter(reservation => {
        const matchesSearch = reservation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             reservation.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             reservation.purpose.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
        const matchesRoom = filterRoom === 'all' || reservation.roomId.toString() === filterRoom;
        
        return matchesSearch && matchesStatus && matchesRoom;
    });

    // Calcul des statistiques
    const stats = {
        total: reservations.length,
        pending: reservations.filter(r => r.status === 'pending').length,
        approved: reservations.filter(r => r.status === 'approved').length,
        rejected: reservations.filter(r => r.status === 'rejected').length
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des réservations" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                
                {/* En-tête */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des Réservations</h1>
                            <p className="text-gray-600">Traitement des demandes de réservation de salles</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total demandes</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-full">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">En attente</p>
                                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-full">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Approuvées</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Rejetées</p>
                                <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-full">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher par étudiant, salle ou objectif..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select 
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="pending">En attente</option>
                                <option value="approved">Approuvées</option>
                                <option value="rejected">Rejetées</option>
                            </select>
                            <select 
                                value={filterRoom}
                                onChange={(e) => setFilterRoom(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <Building2 className="w-6 h-6 mr-2 text-blue-600" />
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
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                    
                    {filteredReservations.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Aucune réservation trouvée
                        </div>
                    )}
                </div>

                {/* Modal de détails */}
                {showDetailsModal && selectedReservation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Détails de la réservation
                                </h3>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Informations étudiant */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Informations étudiant</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Nom complet</p>
                                            <p className="font-medium">{selectedReservation.studentName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">ID Étudiant</p>
                                            <p className="font-medium">{selectedReservation.studentId}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-medium">{selectedReservation.studentEmail}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Téléphone</p>
                                            <p className="font-medium">{selectedReservation.studentPhone}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Informations réservation */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Détails de la réservation</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Salle</p>
                                            <p className="font-medium">{selectedReservation.roomName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Capacité</p>
                                            <p className="font-medium">{selectedReservation.capacity} personnes</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date</p>
                                            <p className="font-medium">{new Date(selectedReservation.date).toLocaleDateString('fr-FR')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Horaire</p>
                                            <p className="font-medium">{selectedReservation.timeStart} - {selectedReservation.timeEnd}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Objectif et description */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Objectif</h4>
                                    <p className="font-medium text-gray-700">{selectedReservation.purpose}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Description</h4>
                                    <p className="text-gray-700">{selectedReservation.description}</p>
                                </div>
                                
                                {/* Statut et traitement */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Statut</h4>
                                    <div className="flex items-center space-x-3 mb-3">
                                        {selectedReservation.status === 'pending' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                                        {selectedReservation.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                        {selectedReservation.status === 'rejected' && <XCircle className="w-5 h-5 text-red-600" />}
                                        <span className="font-medium">
                                            {selectedReservation.status === 'pending' && 'En attente de traitement'}
                                            {selectedReservation.status === 'approved' && 'Réservation approuvée'}
                                            {selectedReservation.status === 'rejected' && 'Réservation rejetée'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Soumise le {new Date(selectedReservation.submittedAt).toLocaleDateString('fr-FR')} à {new Date(selectedReservation.submittedAt).toLocaleTimeString('fr-FR')}
                                    </p>
                                    {selectedReservation.processedAt && (
                                        <p className="text-sm text-gray-600">
                                            Traitée le {new Date(selectedReservation.processedAt).toLocaleDateString('fr-FR')} à {new Date(selectedReservation.processedAt).toLocaleTimeString('fr-FR')} par {selectedReservation.processedBy}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Actions */}
                                {selectedReservation.status === 'pending' && (
                                    <div className="flex justify-end space-x-3 pt-4 border-t">
                                        <button
                                            onClick={() => {
                                                handleReject(selectedReservation.id);
                                                setShowDetailsModal(false);
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Rejeter</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleApprove(selectedReservation.id);
                                                setShowDetailsModal(false);
                                            }}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>Approuver</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
