import AppLayout from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Check, X } from 'lucide-react';
import Reservations from './reservation_index';

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

const getResourceTypeLabel = (resourceType: string): string => {
    return resourceType === 'pc' ? 'Post PC (2ème étage zone coding)' : 'Local';
};

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

export default function ReservationShow() {
    const { reservation } = usePage<{ reservation: Reservation }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Gestion des réservations',
            href: '/admin/reservations',
        },
        {
            title: `Détails réservation`,
            isActive: true,
        },
    ];

    const getStatus = () => {
        switch (reservation.status) {
            case 'pending':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 rounded-full"><AlertCircle className="w-4 h-4" />En attente</span>;
            case 'approved':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 rounded-full"><CheckCircle className="w-4 h-4" />Approuvée</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 rounded-full"><XCircle className="w-4 h-4" />Rejetée</span>;
        }
    };

    const handleApprove = () => {
        if (confirm('Êtes-vous sûr de vouloir approuver cette réservation ?')) {
            router.patch(`/admin/reservations/${reservation.id}/approve`);
        }
    };

    const handleReject = () => {
        if (confirm('Êtes-vous sûr de vouloir rejeter cette réservation ?')) {
            router.patch(`/admin/reservations/${reservation.id}/reject`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Détails réservation #${reservation.id}`} />
            <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-6">
                <Link href="/admin/reservations" className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-purple-600 mb-4 sm:mb-6 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    Retour à la liste
                </Link>
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Détails de la réservation</h1>
                        <div className="self-start">
                            {getStatus()}
                        </div>
                    </div>
                    
                    {/* Toutes les informations dans un seul div */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 space-y-6">
                        {/* Informations étudiant */}
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                                Informations étudiant
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                <div className="flex items-center space-x-2 text-sm sm:text-base text-foreground">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                                    <span className="font-medium">Nom:</span>
                                    <span className="truncate">{reservation.nom}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm sm:text-base text-foreground">
                                    <span className="font-medium">Prénom:</span>
                                    <span className="truncate">{reservation.prenom}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm sm:text-base text-foreground">
                                    <span className="font-medium">Numéro Apogée:</span>
                                    <span>{reservation.num_apogee}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm sm:text-base text-foreground">
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                                    <span className="font-medium">Email:</span>
                                    <span className="truncate">{reservation.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm sm:text-base text-foreground">
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                                    <span className="font-medium">Téléphone:</span>
                                    <span>{reservation.telephone || '--'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Détails réservation */}
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                                Détails réservation
                            </h2>
                            <div className="flex items-center space-x-2 text-sm sm:text-base text-foreground">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                                <span className="font-medium">Date de réservation:</span>
                                <span>{reservation.date_reservation ? new Date(reservation.date_reservation).toLocaleDateString('fr-FR') : '--'}</span>
                            </div>
                        </div>

                        {/* Informations techniques */}
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Informations techniques</h2>
                            <div className="space-y-3">
                                <div className="text-sm sm:text-base text-foreground">
                                    <span className="font-medium text-muted-foreground">Ressource:</span>
                                    <span className="ml-2">
                                        {reservation.resource_type 
                                            ? getResourceTypeLabel(reservation.resource_type)
                                            : '--'
                                        }
                                    </span>
                                </div>
                                {reservation.resource_type === 'local' && (
                                    <div className="text-sm sm:text-base text-foreground">
                                        <span className="font-medium text-muted-foreground">Types de locaux:</span>
                                        <div className="ml-2 mt-1 flex flex-wrap gap-2">
                                            {Array.isArray(reservation.location_type)
                                                ? reservation.location_type.map((loc, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {getLocationLabel(loc)}
                                                    </span>
                                                ))
                                                : typeof reservation.location_type === 'string'
                                                    ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {getLocationLabel(reservation.location_type)}
                                                    </span>
                                                    : <span className="text-gray-500">--</span>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Description</h2>
                            <div className="text-sm sm:text-base text-foreground bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 border">
                                {reservation.description || 'Aucune description fournie'}
                            </div>
                        </div>

                        {/* Historique */}
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                                Historique
                            </h2>
                            <div className="space-y-3">
                                <div className="text-sm sm:text-base text-foreground">
                                    <span className="font-medium text-muted-foreground">Soumise le:</span>
                                    <span className="ml-2">{reservation.created_at ? new Date(reservation.created_at).toLocaleString('fr-FR') : '--'}</span>
                                </div>
                                {reservation.updated_at && reservation.created_at && 
                                 new Date(reservation.updated_at).getTime() !== new Date(reservation.created_at).getTime() && (
                                    <div className="text-sm sm:text-base text-foreground">
                                        <span className="font-medium text-muted-foreground">Modifiée le:</span>
                                        <span className="ml-2">{new Date(reservation.updated_at).toLocaleString('fr-FR')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    {reservation.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-border">
                            <button
                                onClick={handleReject}
                                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm sm:text-base font-medium min-h-[44px] order-2 sm:order-1"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Rejeter</span>
                            </button>
                            <button
                                onClick={handleApprove}
                                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base font-medium min-h-[44px] order-1 sm:order-2"
                            >
                                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Approuver</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
