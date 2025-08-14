import AppLayout from '@/layouts/app-layout';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reservations',
        href: '/reservations',
    },
];

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Réservations", isActive: true },
];

interface Reservation {
    id: number;
    nom: string;
    prenom: string;
    num_apogee: string;
    email: string;
    description: string;
    date_reservation: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;
}

interface DashboardProps {
    existingReservation?: Reservation | null;
    lastProcessedReservation?: Reservation | null;
    userEmail?: string;
    showNotification?: boolean;
}

export default function Dashboard({ existingReservation, lastProcessedReservation, userEmail, showNotification }: DashboardProps) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const [showSuccess, setShowSuccess] = useState(false);
    const [notificationDismissed, setNotificationDismissed] = useState(!showNotification);
    
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        prenom: '',
        num_apogee: '',
        email: userEmail || '',
        description: '',
        date_reservation: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    }, [flash]);

    const dismissNotification = async () => {
        if (lastProcessedReservation) {
            try {
                await fetch('/reservations/dismiss-notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    body: JSON.stringify({
                        reservation_id: lastProcessedReservation.id
                    })
                });
                setNotificationDismissed(true);
            } catch (error) {
                console.error('Erreur lors de la fermeture de la notification:', error);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reservations', {
            onSuccess: () => {
                // Reset form after successful submission
                setData({
                    nom: '',
                    prenom: '',
                    num_apogee: '',
                    email: '',
                    description: '',
                    date_reservation: '',
                });
            }
        });
    };

    return (
        <>
            <Head title="Réservations">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            {/* Custom Dashboard Header */}
            <DashboardHeader breadcrumbs={headerBreadcrumbs} />
            
            <AppLayout>
            <div className="p-6">
                {/* Message de succès */}
                {showSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {flash?.success}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification de statut de réservation */}
                {lastProcessedReservation && !notificationDismissed && (
                    <div className={`mb-6 border rounded-lg p-4 ${
                        lastProcessedReservation.status === 'approved' 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                    }`}>
                        <div className="flex justify-between items-start">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    {lastProcessedReservation.status === 'approved' ? (
                                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm8.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <h3 className={`text-sm font-medium ${
                                        lastProcessedReservation.status === 'approved' 
                                            ? 'text-green-800' 
                                            : 'text-red-800'
                                    }`}>
                                        {lastProcessedReservation.status === 'approved' 
                                            ? '🎉 Réservation Approuvée !' 
                                            : '❌ Réservation Rejetée'
                                        }
                                    </h3>
                                    <div className={`mt-2 text-sm ${
                                        lastProcessedReservation.status === 'approved' 
                                            ? 'text-green-700' 
                                            : 'text-red-700'
                                    }`}>
                                        <p>
                                            Votre réservation du{' '}
                                            <strong>
                                                {new Date(lastProcessedReservation.date_reservation).toLocaleDateString('fr-FR')}
                                            </strong>
                                            {' '}a été{' '}
                                            <strong>
                                                {lastProcessedReservation.status === 'approved' ? 'approuvée' : 'rejetée'}
                                            </strong>
                                            .
                                        </p>
                                        {lastProcessedReservation.status === 'approved' && (
                                            <p className="mt-1">Un email de confirmation vous a été envoyé.</p>
                                        )}
                                        {lastProcessedReservation.status === 'rejected' && (
                                            <p className="mt-1">Vous pouvez soumettre une nouvelle demande de réservation.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={dismissNotification}
                                className={`inline-flex ${
                                    lastProcessedReservation.status === 'approved' 
                                        ? 'text-green-400 hover:text-green-500' 
                                        : 'text-red-400 hover:text-red-500'
                                }`}
                            >
                                <span className="sr-only">Fermer</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {existingReservation ? 'Votre Réservation en Cours' : 'Nouvelle Réservation'}
                    </h1>
                    <p className="text-gray-600">
                        {existingReservation 
                            ? 'Votre réservation est en cours de traitement' 
                            : 'Remplissez le formulaire pour effectuer une réservation'
                        }
                    </p>
                </div>

                {/* Affichage conditionnel */}
                {existingReservation ? (
                    // Affichage des détails de la réservation existante
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Détails de votre réservation</h2>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    existingReservation.status === 'pending' 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : existingReservation.status === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {existingReservation.status === 'pending' && '🟡 En attente'}
                                    {existingReservation.status === 'approved' && '🟢 Approuvée'}
                                    {existingReservation.status === 'rejected' && '🔴 Rejetée'}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{existingReservation.nom}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{existingReservation.prenom}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Apogée</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{existingReservation.num_apogee}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{existingReservation.email}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de réservation</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">
                                        {new Date(existingReservation.date_reservation).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de demande</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">
                                        {new Date(existingReservation.created_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <p className="text-gray-900 bg-gray-50 p-3 rounded whitespace-pre-wrap">{existingReservation.description}</p>
                            </div>
                            
                            {/* Boutons d'action pour les réservations en attente */}
                            {existingReservation.status === 'pending' && (
                                <div className="mt-6 border-t pt-6">
                                    <div className="flex gap-3">
                                        <Button 
                                            onClick={() => router.get(route('reservations.edit', existingReservation.id))}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            ✏️ Modifier
                                        </Button>
                                        <Button 
                                            onClick={() => {
                                                if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
                                                    router.delete(route('reservations.destroy', existingReservation.id));
                                                }
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            🗑️ Supprimer
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            {existingReservation.status === 'pending' && (
                                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">Réservation en cours de traitement</h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>Votre réservation est en cours de traitement. Vous pouvez la modifier ou la supprimer tant qu'elle n'a pas été traitée.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Formulaire de nouvelle réservation

                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nom */}
                        <div>
                            <Label htmlFor="nom">Nom *</Label>
                            <Input
                                id="nom"
                                type="text"
                                value={data.nom}
                                onChange={(e) => setData('nom', e.target.value)}
                                placeholder="Votre nom"
                                required
                            />
                            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                        </div>

                        {/* Prénom */}
                        <div>
                            <Label htmlFor="prenom">Prénom *</Label>
                            <Input
                                id="prenom"
                                type="text"
                                value={data.prenom}
                                onChange={(e) => setData('prenom', e.target.value)}
                                placeholder="Votre prénom"
                                required
                            />
                            {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
                        </div>

                        {/* Numéro Apogée */}
                        <div>
                            <Label htmlFor="num_apogee">Numéro Apogée *</Label>
                            <Input
                                id="num_apogee"
                                type="text"
                                value={data.num_apogee}
                                onChange={(e) => setData('num_apogee', e.target.value)}
                                placeholder="Ex: 12345678"
                                required
                            />
                            {errors.num_apogee && <p className="text-red-500 text-sm mt-1">{errors.num_apogee}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="votre.email@exemple.com"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Date de réservation */}
                        <div>
                            <Label htmlFor="date_reservation">Date de réservation *</Label>
                            <Input
                                id="date_reservation"
                                type="date"
                                value={data.date_reservation}
                                onChange={(e) => setData('date_reservation', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                            {errors.date_reservation && <p className="text-red-500 text-sm mt-1">{errors.date_reservation}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">Description de la réservation *</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Décrivez votre demande de réservation..."
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Bouton Submit */}
                        <div className="flex justify-end">
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                            >
                                {processing ? 'Envoi en cours...' : 'Envoyer la réservation'}
                            </Button>
                        </div>
                    </form>
                </div>
                )}

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    
                </div>
                
            </div>
            </AppLayout>
            
            {/* Footer */}
            <Footer />
        </>
    );
}