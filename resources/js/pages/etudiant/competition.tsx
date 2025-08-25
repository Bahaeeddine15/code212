import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Eye, CheckCircle, XCircle, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Compétitions", isActive: true },
];

interface Competition {
    id: number;
    title: string;
    description: string;
    date: string;
    deadline: string;
    location: string;
    category: string;
    maxParticipants: number;
    registrations: number;
    status: string;
    slug: string;
    views: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
    closed_by?: string;
    type: 'individual' | 'group'; // Ajout du type de compétition
    my_registration?: {
        id: number;
        status: 'En attente' | 'Confirmé' | 'Refusé';
        [key: string]: any;
    }; // Ajout de la propriété my_registration
}

interface CompetitionPageProps {
    competitions: Competition[];
    registrations: any[];
    statistics: {
        totalCompetitions: number;
        activeCompetitions: number;
        totalRegistrations: number;
        confirmedRegistrations: number;
        pendingRegistrations: number;
    };
}

interface FlashMessages {
    success?: string;
    error?: string;
}

const Notification = ({ type, message, onClose }: { type: 'success' | 'error', message: string, onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Disparait après 5 secondes

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
            <div className="flex items-start gap-3">
                {type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                    <p className="font-medium">
                        {type === 'success' ? 'Succès !' : 'Erreur !'}
                    </p>
                    <p className="text-sm mt-1">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default function CompetitionPage({ competitions, registrations, statistics }: CompetitionPageProps) {
    const { props } = usePage();
    const flash = props.flash as FlashMessages;
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setNotification({ type: 'success', message: flash.success });
        } else if (flash?.error) {
            setNotification({ type: 'error', message: flash.error });
        }
    }, [flash]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ouvert':
                return 'bg-green-500';
            case 'Complet':
                return 'bg-yellow-500';
            case 'Fermé':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <Head>
                <title>Compétitions</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
                    
                    <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins] lg:ml-0">
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
                            
                            {/* Notification */}
                            {notification && (
                                <Notification
                                    type={notification.type}
                                    message={notification.message}
                                    onClose={() => setNotification(null)}
                                />
                            )}
                        <div className="mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Compétitions</h1>
                            <p className="text-gray-600">Découvrez et participez aux compétitions de programmation</p>
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>Total Compétitions</CardDescription>
                                    <CardTitle className="text-2xl">{statistics.totalCompetitions}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>Compétitions Ouvertes</CardDescription>
                                    <CardTitle className="text-2xl text-green-600">{statistics.activeCompetitions}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>Total Inscriptions</CardDescription>
                                    <CardTitle className="text-2xl">{statistics.totalRegistrations}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>Inscriptions Confirmées</CardDescription>
                                    <CardTitle className="text-2xl text-blue-600">{statistics.confirmedRegistrations}</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Liste des compétitions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {competitions.map((competition) => (
                                <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge className={`${getStatusColor(competition.status)} text-white`}>
                                                {competition.status}
                                            </Badge>
                                            <Badge variant="outline">{competition.category}</Badge>
                                            <Badge variant="outline" className="ml-2">
                                              {competition.type === 'individual' ? 'Individuelle' : 'Par groupe'}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl">{competition.title}</CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            {competition.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Date: {new Date(competition.date).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Limite: {new Date(competition.deadline).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>{competition.location}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Users className="w-4 h-4 mr-2" />
                                                <span>{competition.registrations}/{competition.maxParticipants} participants</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Eye className="w-4 h-4 mr-2" />
                                                <span>{competition.views} vues</span>
                                            </div>
                                        </div>
                                        
                                        {/* Bouton Détails à l'intérieur de la carte */}
                                        <div className="mb-4">
                                            <Button variant="outline" size="sm" className="w-full" asChild>
                                                <Link href={`/competition/${competition.id}`}>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Voir les détails
                                                </Link>
                                            </Button>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            {competition.my_registration ? (
                                                <>
                                                    <Badge
                                                        className={
                                                            competition.my_registration.status === 'En attente'
                                                                ? 'bg-yellow-500 text-white'
                                                                : competition.my_registration.status === 'Confirmé'
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-red-600 text-white'
                                                        }
                                                    >
                                                        {competition.my_registration.status === 'En attente'
                                                            ? 'En attente de validation'
                                                            : competition.my_registration.status === 'Confirmé'
                                                            ? 'Inscription acceptée'
                                                            : 'Inscription refusée'}
                                                    </Badge>
                                                    {competition.my_registration.status !== 'Confirmé' && (
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/competition/${competition.id}/registration/${competition.my_registration.id}/edit`}>
                                                                ✏️ Modifier
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </>
                                            ) : competition.status === 'Ouvert' ? (
                                                <Button className="flex-1 bg-[#4f39f6] hover:bg-[#41e296] hover:text-[#3a2b75] text-white" asChild>
                                                    <Link href={`/competition/${competition.id}/register`}>
                                                        S'inscrire
                                                    </Link>
                                                </Button>
                                            ) : (
                                                <Button className="flex-1" disabled>
                                                    Fermé
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {competitions.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">Aucune compétition disponible pour le moment.</p>
                            </div>
                        )}
                        </div>
                    </AppContent>
                </div>
            </AppShell>
            
            {/* Footer */}
            <Footer />
        </>
    );
}
