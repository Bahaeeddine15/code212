import AppLayout from '@/layouts/app-layout';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        prenom: '',
        num_apogee: '',
        email: userEmail || '',
        telephone: '',
        description: '',
        date_reservation: '',
        resource_type: '',
        location_type: [] as string[],
        room_details: '',
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
                    telephone: '',
                    description: '',
                    date_reservation: '',
                    resource_type: '',
                    location_type: [] as string[],
                    room_details: '',
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
            
            <AppShell variant="sidebar">
                <div className="flex w-full min-h-screen">
                    {/* Mobile Backdrop */}
                    {isMobileOpen && (
                        <div 
                            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsMobileOpen(false)}
                        />
                    )}
                    
                    {/* Sidebar with mobile state */}
                    <div className={`
                        fixed lg:relative inset-y-0 left-0 z-40 w-64 lg:w-auto
                        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                        lg:translate-x-0 transition-transform duration-300 ease-in-out
                    `}>
                        <AppSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
                    </div>
                    
                    <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#101828] font-[Poppins] lg:ml-0">
                        <div className="p-4 lg:p-6 pt-6">
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                                    className="p-3 bg-[#4f39f6] text-white rounded-lg shadow-lg hover:bg-[#3a2b75] transition-colors flex items-center gap-2"
                                >
                                    <Menu className="w-5 h-5" />
                                    <span className="text-sm font-medium">Menu</span>
                                </button>
                            </div>
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
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {existingReservation ? 'Votre Réservation en Cours' : 'Nouvelle Réservation'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        {existingReservation 
                            ? 'Votre réservation est en cours de traitement' 
                            : 'Remplissez le formulaire pour effectuer une réservation'
                        }
                    </p>
                </div>

                {/* Affichage conditionnel */}
                {existingReservation ? (
                    // Affichage des détails de la réservation existante
                    <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e2939] rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Détails de votre réservation</h2>
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">{existingReservation.nom}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">{existingReservation.prenom}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numéro Apogée</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">{existingReservation.num_apogee}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">{existingReservation.email}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">{existingReservation.telephone || 'Non renseigné'}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de réservation</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">
                                        {new Date(existingReservation.date_reservation).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de demande</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">
                                        {new Date(existingReservation.created_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de ressource</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-2 rounded">
                                        {existingReservation.resource_type === 'pc' ? 'Poste (PC)' : 
                                         existingReservation.resource_type === 'local' ? 'Local' : 
                                         existingReservation.resource_type || 'Non spécifié'}
                                    </p>
                                </div>
                                
                                {existingReservation.resource_type === 'local' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de local</label>
                                        <p className="text-gray-900 bg-gray-50 p-2 rounded">
                                            {Array.isArray(existingReservation.location_type) 
                                                ? existingReservation.location_type.map(loc => {
                                                    switch(loc) {
                                                        case 'salle_concentration_3e': return 'Salle de concentration (3ème étage)';
                                                        case 'salle_formation_ja_rdc': return 'Salle de formation IA';
                                                        case 'salle_conference_rdc': return 'Salle de conférence (RDC)';
                                                        case 'zone_coding': return 'Zone coding';
                                                        default: return loc;
                                                    }
                                                }).join(', ')
                                                : typeof existingReservation.location_type === 'string'
                                                    ? existingReservation.location_type
                                                    : 'Non spécifié'
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-[#364153] p-3 rounded whitespace-pre-wrap">{existingReservation.description}</p>
                            </div>
                            
                            {/* Boutons d'action pour les réservations en attente */}
                            {existingReservation.status === 'pending' && (
                                <div className="mt-6 border-t pt-6">
                                    <div className="flex gap-3">
                                        <Button 
                                            onClick={() => router.get(route('reservations.edit', existingReservation.id))}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                             Modifier
                                        </Button>
                                        <Button 
                                            onClick={() => {
                                                if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
                                                    router.delete(route('reservations.destroy', existingReservation.id));
                                                }
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                             Supprimer
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            {existingReservation.status === 'pending' && (
                                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Réservation en cours de traitement</h3>
                                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
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

                <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e2939] rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nom */}
                        <div>
                            <Label htmlFor="nom" className="text-gray-900 dark:text-white">Nom *</Label>
                            <Input
                                id="nom"
                                type="text"
                                value={data.nom}
                                onChange={(e) => setData('nom', e.target.value)}
                                placeholder="Votre nom"
                                className="bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                        </div>

                        {/* Prénom */}
                        <div>
                            <Label htmlFor="prenom" className="text-gray-900 dark:text-white">Prénom *</Label>
                            <Input
                                id="prenom"
                                type="text"
                                value={data.prenom}
                                onChange={(e) => setData('prenom', e.target.value)}
                                placeholder="Votre prénom"
                                className="bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                            {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
                        </div>

                        {/* Numéro Apogée */}
                        <div>
                            <Label htmlFor="num_apogee" className="text-gray-900 dark:text-white">Numéro Apogée *</Label>
                            <Input
                                id="num_apogee"
                                type="text"
                                value={data.num_apogee}
                                onChange={(e) => setData('num_apogee', e.target.value)}
                                placeholder="Ex: 12345678"
                                className="bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                            {errors.num_apogee && <p className="text-red-500 text-sm mt-1">{errors.num_apogee}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-gray-900 dark:text-white">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="votre.email@exemple.com"
                                className="bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Téléphone */}
                        <div>
                            <Label htmlFor="telephone" className="text-gray-900 dark:text-white">Numéro de téléphone</Label>
                            <Input
                                id="telephone"
                                type="tel"
                                value={data.telephone}
                                onChange={(e) => setData('telephone', e.target.value)}
                                placeholder="Ex: 06 12 34 56 78"
                                className="bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
                        </div>

                        {/* Date de réservation */}
                        <div>
                            <Label htmlFor="date_reservation" className="text-gray-900 dark:text-white">Date de réservation *</Label>
                            <Input
                                id="date_reservation"
                                type="date"
                                value={data.date_reservation}
                                onChange={(e) => setData('date_reservation', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                required
                            />
                            {errors.date_reservation && <p className="text-red-500 text-sm mt-1">{errors.date_reservation}</p>}
                        </div>

                        {/* Type de ressource */}
                        <div>
                            <Label htmlFor="resource_type" className="text-gray-900 dark:text-white">Type de ressource *</Label>
                            <select
                                id="resource_type"
                                value={data.resource_type}
                                onChange={(e) => {
                                    setData('resource_type', e.target.value);
                                    // Reset location fields when resource type changes
                                    if (e.target.value !== 'local') {
                                        setData('location_type', [] as string[]);
                                        setData('room_details', '');
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#364153] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Sélectionnez le type de ressource</option>
                                <option value="pc">Post PC (2ème étage zone coding)</option>
                                <option value="local">Local</option>
                            </select>
                            {errors.resource_type && <p className="text-red-500 text-sm mt-1">{errors.resource_type}</p>}
                        </div>

                        {/* Options pour local */}
                        {data.resource_type === 'local' && (
                            <div>
                                <Label htmlFor="location_type">Type de local * (Sélections multiples possibles)</Label>
                                <div className="space-y-3 mt-2">
                                    {[
                                        { value: 'salle_concentration_3e', label: 'Salle de concentration (3ème étage)' },
                                        { value: 'salle_formation_ja_rdc', label: 'Salle de formation IA' },
                                        { value: 'salle_conference_rdc', label: 'Salle de conférence (RDC)' },
                                        { value: 'zone_coding', label: 'Zone coding' }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={data.location_type.includes(option.value)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setData('location_type', [...data.location_type, option.value]);
                                                    } else {
                                                        setData('location_type', data.location_type.filter(item => item !== option.value));
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.location_type && <p className="text-red-500 text-sm mt-1">{errors.location_type}</p>}
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 italic">
                                        <strong>Note :</strong> RDC signifie "Rez-de-chaussée"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <Label htmlFor="description" className="text-gray-900 dark:text-white">Description de la réservation *</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Décrivez votre demande de réservation..."
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#364153] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    </AppContent>
                </div>
            </AppShell>
            
            {/* Footer */}
            <Footer />
        </>
    );
}