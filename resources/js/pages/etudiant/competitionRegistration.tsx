import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, Users, Trophy, Menu } from 'lucide-react';
import { useState } from 'react';

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
    type: string; // 'individual' or 'group'
}

interface CompetitionRegistrationPageProps {
    competition: Competition;
}

export default function CompetitionRegistrationPage({ competition }: CompetitionRegistrationPageProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        participant_name: '',
        email: '',
        phone: '',
        club: '',
        category: competition.category,
        notes: '',
        group_name: '',
        group_members: '',
    });

    // Create breadcrumbs for the header component
    const headerBreadcrumbs = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Compétitions", isActive: true },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/competition/${competition.id}/register`, {
            onSuccess: () => {
                // Rediriger vers la page des compétitions avec un message de succès
            }
        });
    };

    const remainingSpots = competition.maxParticipants - competition.registrations;

    return (
        <>
            <Head title={`Inscription - ${competition.title}`} />
            
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
                    
                    <AppContent variant="sidebar" className="flex-1 bg-white lg:ml-0">
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
                                <div className="mb-8">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-sans">
                                        Inscription - {competition.title}
                                    </h1>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                            {competition.type === 'group' ? 'Compétition en équipe' : 'Compétition individuelle'}
                                        </Badge>
                                        <Badge variant="outline">
                                            {competition.category}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-600">
                                        {competition.type === 'group' 
                                            ? 'Inscrivez votre équipe à cette compétition' 
                                            : 'Inscrivez-vous à cette compétition'
                                        }
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Informations de la compétition */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        <Badge className="bg-green-500 text-white">
                                            {competition.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl">{competition.title}</CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {competition.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
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
                                        {remainingSpots > 0 && (
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <p className="text-sm text-green-700 font-medium">
                                                    {remainingSpots} place{remainingSpots > 1 ? 's' : ''} restante{remainingSpots > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Formulaire d'inscription */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Formulaire d'inscription</CardTitle>
                                    <CardDescription>
                                        Toutes les informations marquées d'un * sont obligatoires
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="participant_name">
                                                    {competition.type === 'individual' ? 'Nom complet *' : 'Nom du capitaine/contact *'}
                                                </Label>
                                                <Input
                                                    id="participant_name"
                                                    type="text"
                                                    value={data.participant_name}
                                                    onChange={(e) => setData('participant_name', e.target.value)}
                                                    required
                                                    className="mt-1"
                                                />
                                                {errors.participant_name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.participant_name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    className="mt-1"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="phone">Téléphone *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    required
                                                    className="mt-1"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="club">Club/Organisation</Label>
                                                <Input
                                                    id="club"
                                                    type="text"
                                                    value={data.club}
                                                    onChange={(e) => setData('club', e.target.value)}
                                                    className="mt-1"
                                                />
                                                {errors.club && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.club}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="category">Catégorie</Label>
                                            <Input
                                                id="category"
                                                type="text"
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className="mt-1"
                                                readOnly
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="notes">Notes supplémentaires</Label>
                                            <Textarea
                                                id="notes"
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="Informations supplémentaires, niveau d'expérience, etc."
                                                className="mt-1"
                                                rows={3}
                                            />
                                            {errors.notes && (
                                                <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                            )}
                                        </div>

                                        {competition.type === 'group' ? (
                                            <>
                                                {/* Group Name */}
                                                <div>
                                                    <Label htmlFor="group_name">Nom de l'équipe *</Label>
                                                    <Input
                                                        id="group_name"
                                                        type="text"
                                                        value={data.group_name}
                                                        onChange={(e) => setData('group_name', e.target.value)}
                                                        placeholder="Nom de votre équipe"
                                                        className="mt-1"
                                                        required
                                                    />
                                                    {errors.group_name && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.group_name}</p>
                                                    )}
                                                </div>

                                                {/* Group Members */}
                                                <div>
                                                    <Label htmlFor="group_members">Membres de l'équipe *</Label>
                                                    <Textarea
                                                        id="group_members"
                                                        value={data.group_members}
                                                        onChange={(e) => setData('group_members', e.target.value)}
                                                        placeholder="Listez tous les membres de l'équipe (nom, prénom, rôle)&#10;Exemple:&#10;- Jean Dupont (Capitaine)&#10;- Marie Martin (Développeuse)&#10;- Pierre Bernard (Designer)"
                                                        className="mt-1"
                                                        rows={6}
                                                        required
                                                    />
                                                    {errors.group_members && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.group_members}</p>
                                                    )}
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Listez tous les membres de votre équipe avec leurs rôles
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <Label htmlFor="participant_name">Nom du participant *</Label>
                                                <Input
                                                    id="participant_name"
                                                    type="text"
                                                    value={data.participant_name}
                                                    onChange={(e) => setData('participant_name', e.target.value)}
                                                    placeholder="Votre nom et prénom"
                                                    className="mt-1"
                                                    required
                                                />
                                                {errors.participant_name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.participant_name}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-4">
                                            <Button
                                                type="submit"
                                                disabled={processing || remainingSpots <= 0}
                                                className="flex-1"
                                            >
                                                {processing ? 'Inscription en cours...' : 'S\'inscrire'}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                            >
                                                Annuler
                                            </Button>
                                        </div>

                                        {remainingSpots <= 0 && (
                                            <div className="bg-red-50 p-3 rounded-lg">
                                                <p className="text-sm text-red-700">
                                                    Cette compétition est complète. Aucune place disponible.
                                                </p>
                                            </div>
                                        )}
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
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
