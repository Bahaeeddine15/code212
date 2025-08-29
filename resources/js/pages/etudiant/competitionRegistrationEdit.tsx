import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Trophy, Clock, Menu } from "lucide-react";
import { useState } from "react";

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
}

interface Registration {
    id: number;
    participant_name: string;
    email: string;
    phone: string;
    category: string;
    notes: string;
    status: string;
}

interface Props {
    competition: Competition;
    registration: Registration;
}

export default function CompetitionRegistrationEdit({ competition, registration }: Props) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const { data, setData, put, processing, errors } = useForm({
        participant_name: registration.participant_name,
        email: registration.email,
        phone: registration.phone,
        category: registration.category,
        notes: registration.notes || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Compétitions", href: "/competition" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/competition/${competition.id}/registration/${registration.id}`, {
            onSuccess: () => {
                // Redirection sera gérée par le contrôleur
            }
        });
    };

    const availableSpots = competition.maxParticipants - competition.registrations;

    return (
        <>
            <Head title={`Modifier l'inscription - ${competition.title}`} />
            
            {/* Custom Dashboard Header */}
            <DashboardHeader breadcrumbs={breadcrumbs} />
            
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
                    
                    <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#101828] lg:ml-0">
                        <div className="p-4 lg:p-6 font-sans">
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
                            
                            <div className="container mx-auto max-w-4xl">
                                {/* Header */}
                                <div className="mb-8">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 font-sans">
                                        Modifier votre inscription
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Modifiez les détails de votre inscription à la compétition
                                    </p>
                                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Competition Info Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-6 bg-white dark:bg-[#1e2939] border-gray-200 dark:border-gray-600">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        <Badge className={`${competition.status === 'Ouvert' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                                            {competition.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl text-gray-900 dark:text-white">{competition.title}</CardTitle>
                                    <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
                                        {competition.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span>Date: {new Date(competition.date).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>Limite: {new Date(competition.deadline).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span>{competition.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Users className="w-4 h-4 mr-2" />
                                            <span>{competition.registrations}/{competition.maxParticipants} participants</span>
                                        </div>
                                        {availableSpots > 0 && (
                                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-3 rounded-lg">
                                                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                                                    {availableSpots} place{availableSpots > 1 ? 's' : ''} restante{availableSpots > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        )}
                                        {registration.status !== 'En attente' && (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 rounded-lg">
                                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                                    <strong>Statut de votre inscription:</strong> {registration.status}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Edit Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-white dark:bg-[#1e2939] border-gray-200 dark:border-gray-600">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">Modifier vos informations</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">
                                        Toutes les informations marquées d'un * sont obligatoires
                                    </CardDescription>
                                    {registration.status === 'Confirmé' && (
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                                            <p className="text-sm text-yellow-800 dark:text-yellow-300">
                                                ⚠️ Votre inscription est confirmée. Les modifications peuvent nécessiter une nouvelle validation.
                                            </p>
                                        </div>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Grid for form fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="participant_name" className="text-gray-900 dark:text-white">Nom complet *</Label>
                                                <Input
                                                    id="participant_name"
                                                    type="text"
                                                    value={data.participant_name}
                                                    onChange={(e) => setData('participant_name', e.target.value)}
                                                    required
                                                    className="mt-1 bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                                />
                                                {errors.participant_name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.participant_name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="email" className="text-gray-900 dark:text-white">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    className="mt-1 bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="phone" className="text-gray-900 dark:text-white">Téléphone *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    required
                                                    className="mt-1 bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="category" className="text-gray-900 dark:text-white">Catégorie</Label>
                                                <Input
                                                    id="category"
                                                    type="text"
                                                    value={data.category}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    className="mt-1 bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="notes" className="text-gray-900 dark:text-white">Notes supplémentaires</Label>
                                            <Textarea
                                                id="notes"
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="Informations supplémentaires, niveau d'expérience, etc."
                                                className="mt-1 bg-white dark:bg-[#364153] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                                rows={3}
                                            />
                                            {errors.notes && (
                                                <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                            )}
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                                            <Button 
                                                type="submit" 
                                                disabled={processing}
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                {processing ? 'Mise à jour...' : '✏️ Mettre à jour l\'inscription'}
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#364153]"
                                            >
                                                🔙 Annuler
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Information importante</h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Vous pouvez modifier votre inscription tant qu'elle n'a pas été définitivement confirmée. 
                            Les modifications peuvent nécessiter une nouvelle validation de la part des organisateurs.
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
