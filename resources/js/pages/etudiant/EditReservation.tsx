import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Menu } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Reservation {
    id: number;
    nom: string;
    prenom: string;
    num_apogee: string;
    email: string;
    telephone?: string;
    description: string;
    date_reservation: string;
    status: string;
    resource_type?: string;
    location_type?: string | string[];
    room_details?: string;
}

interface Props {
    reservation: Reservation;
    [key: string]: any;
}

export default function EditReservation({ reservation }: Props) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    // Create breadcrumbs for the header component
    const headerBreadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Réservations", href: "/reservations" },
    ];
    
    const { data, setData, put, processing, errors } = useForm({
        nom: reservation.nom,
        prenom: reservation.prenom,
        num_apogee: reservation.num_apogee,
        email: reservation.email,
        telephone: reservation.telephone || '',
        description: reservation.description,
        date_reservation: reservation.date_reservation,
        resource_type: reservation.resource_type || '',
        location_type: Array.isArray(reservation.location_type) 
            ? reservation.location_type 
            : reservation.location_type 
                ? [reservation.location_type] 
                : [] as string[],
        room_details: reservation.room_details || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('reservations.update', reservation.id));
    };

    return (
        <>
            <Head title="Modifier la réservation">
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
                            
                            <div className="max-w-2xl mx-auto">
                                <div className="mb-6">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Modifier votre réservation</h1>
                                    <p className="text-gray-600 dark:text-gray-300">Modifiez les détails de votre demande de réservation</p>
                                </div>

                    <Card className="bg-white dark:bg-[#1e2939] border-gray-200 dark:border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-white">Informations de la réservation</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300">
                                Réservation #{reservation.id} - Statut: {reservation.status === 'pending' ? 'En attente' : reservation.status}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nom" className="text-gray-900 dark:text-white">Nom *</Label>
                                        <Input
                                            id="nom"
                                            type="text"
                                            value={data.nom}
                                            onChange={(e) => setData('nom', e.target.value)}
                                            className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.nom ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="prenom" className="text-gray-900 dark:text-white">Prénom *</Label>
                                        <Input
                                            id="prenom"
                                            type="text"
                                            value={data.prenom}
                                            onChange={(e) => setData('prenom', e.target.value)}
                                            className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.prenom ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="num_apogee" className="text-gray-900 dark:text-white">Numéro Apogée *</Label>
                                        <Input
                                            id="num_apogee"
                                            type="text"
                                            value={data.num_apogee}
                                            onChange={(e) => setData('num_apogee', e.target.value)}
                                            className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.num_apogee ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.num_apogee && <p className="text-red-500 text-sm">{errors.num_apogee}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-900 dark:text-white">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="telephone" className="text-gray-900 dark:text-white">Numéro de téléphone</Label>
                                    <Input
                                        id="telephone"
                                        type="tel"
                                        value={data.telephone}
                                        onChange={(e) => setData('telephone', e.target.value)}
                                        className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.telephone ? 'border-red-500' : ''}`}
                                        placeholder="Ex: 06 12 34 56 78"
                                    />
                                    {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_reservation" className="text-gray-900 dark:text-white">Date de réservation souhaitée *</Label>
                                    <Input
                                        id="date_reservation"
                                        type="date"
                                        value={data.date_reservation}
                                        onChange={(e) => setData('date_reservation', e.target.value)}
                                        className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.date_reservation ? 'border-red-500' : ''}`}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                    {errors.date_reservation && <p className="text-red-500 text-sm">{errors.date_reservation}</p>}
                                </div>

                                {/* Type de ressource */}
                                <div className="space-y-2">
                                    <Label htmlFor="resource_type" className="text-gray-900 dark:text-white">Type de ressource *</Label>
                                    <select
                                        id="resource_type"
                                        value={data.resource_type}
                                        onChange={(e) => {
                                            setData('resource_type', e.target.value);
                                            if (e.target.value !== 'local') {
                                                setData('location_type', [] as string[]);
                                                setData('room_details', '');
                                            }
                                        }}
                                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#364153] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.resource_type ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                        required
                                    >
                                        <option value="">Sélectionnez le type de ressource</option>
                                        <option value="pc">Post PC (2ème étage zone coding)</option>
                                        <option value="local">Local</option>
                                    </select>
                                    {errors.resource_type && <p className="text-red-500 text-sm">{errors.resource_type}</p>}
                                </div>

                                {/* Options pour local */}
                                {data.resource_type === 'local' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="location_type" className="text-gray-900 dark:text-white">Type de local *</Label>
                                            <select
                                                id="location_type"
                                                value={data.location_type}
                                                onChange={(e) => {
                                                    setData('location_type', e.target.value);
                                                    setData('room_details', '');
                                                }}
                                                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#364153] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.location_type ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                                required
                                            >
                                                <option value="">Sélectionnez le type de local</option>
                                                <option value="salle_conference">Salle de conférence</option>
                                                <option value="salle_reunion">Salle de réunion</option>
                                            </select>
                                            {errors.location_type && <p className="text-red-500 text-sm">{errors.location_type}</p>}
                                        </div>

                                        {data.location_type === 'salle_reunion' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="room_details" className="text-gray-900 dark:text-white">Étage *</Label>
                                                <select
                                                    id="room_details"
                                                    value={data.room_details}
                                                    onChange={(e) => setData('room_details', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#364153] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.room_details ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                                    required
                                                >
                                                    <option value="">Sélectionnez l'étage</option>
                                                    <option value="1er_etage">1er étage</option>
                                                    <option value="2eme_etage">2ème étage</option>
                                                    <option value="3eme_etage">3ème étage</option>
                                                </select>
                                                {errors.room_details && <p className="text-red-500 text-sm">{errors.room_details}</p>}
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-900 dark:text-white">Description de votre demande *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={`bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.description ? 'border-red-500' : ''}`}
                                        placeholder="Décrivez votre demande de réservation..."
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Mise à jour...' : ' Mettre à jour'}
                                    </Button>
                                    
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Information importante</h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Vous ne pouvez modifier votre réservation que si elle est encore en attente. 
                            Une fois approuvée ou rejetée, elle ne peut plus être modifiée.
                        </p>
                    </div>
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
