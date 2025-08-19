import AppLayout from '@/layouts/app-layout-admin';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Check, X } from 'lucide-react';

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
    resource_type?: string;
    location_type?: string;
    room_details?: string;
}

export default function ReservationShow() {
    const { reservation } = usePage<{ reservation: Reservation }>().props;

    const getStatus = () => {
        switch (reservation.status) {
            case 'pending':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"><AlertCircle className="w-4 h-4" />En attente</span>;
            case 'approved':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"><CheckCircle className="w-4 h-4" />Approuvée</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"><XCircle className="w-4 h-4" />Rejetée</span>;
        }
    };

    // Add approve/reject handlers
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
        <AppLayout>
            <Head title={`Détails réservation #${reservation.id}`} />
            <div className="max-w-2xl mx-auto py-10 px-4">
                <Link href="/admin/reservations" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la liste
                </Link>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Détails de la réservation</h1>
                        {getStatus()}
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Informations étudiant</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><User className="inline w-4 h-4 mr-1" />{reservation.studentName}</div>
                                <div><Mail className="inline w-4 h-4 mr-1" />{reservation.studentEmail}</div>
                                {reservation.studentPhone && (
                                    <div><Phone className="inline w-4 h-4 mr-1" />{reservation.studentPhone}</div>
                                )}
                                <div>ID Étudiant: {reservation.studentId}</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Détails réservation</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Calendar className="inline w-4 h-4 mr-1" />{reservation.date ? new Date(reservation.date).toLocaleDateString('fr-FR') : 'Date non spécifiée'}</div>
                                <div>
                                    <strong>Type de ressource:</strong> {
                                        reservation.resource_type === 'pc' ? '💻 Poste (PC)' : 
                                        reservation.resource_type === 'local' ? '🏢 Local' : 
                                        reservation.resource_type || 'Non spécifié'
                                    }
                                </div>
                                {reservation.resource_type === 'local' && (
                                    <div>
                                        <strong>Type de local:</strong> {
                                            reservation.location_type === 'salle_conference' ? '🎤 Salle de conférence' :
                                            reservation.location_type === 'salle_reunion' ? '📋 Salle de réunion' :
                                            reservation.location_type || 'Non spécifié'
                                        }
                                    </div>
                                )}
                                {reservation.resource_type === 'local' && reservation.location_type === 'salle_reunion' && reservation.room_details && (
                                    <div>
                                        <strong>Étage:</strong> {
                                            reservation.room_details === '1er_etage' ? '🔼 1er étage' :
                                            reservation.room_details === '2eme_etage' ? '🔼 2ème étage' :
                                            reservation.room_details === '3eme_etage' ? '🔼 3ème étage' :
                                            reservation.room_details
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        {reservation.description && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                                <div>{reservation.description}</div>
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Soumise le</h2>
                            <div>{reservation.submittedAt ? new Date(reservation.submittedAt).toLocaleString('fr-FR') : 'Date inconnue'}</div>
                        </div>
                        {reservation.processedAt && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Traitée le</h2>
                                <div>
                                    {new Date(reservation.processedAt).toLocaleString('fr-FR')}
                                    {reservation.processedBy && ` par ${reservation.processedBy}`}
                                </div>
                            </div>
                        )}
                        {/* Approve/Reject buttons if pending */}
                        {reservation.status === 'pending' && (
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Rejeter</span>
                                </button>
                                <button
                                    onClick={handleApprove}
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
        </AppLayout>
    );
}
