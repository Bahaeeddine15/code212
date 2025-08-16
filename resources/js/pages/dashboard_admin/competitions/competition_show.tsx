import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbItem } from '@/types';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    MapPin,
    Users,
    Clock,
    Trophy,
    User,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

// Types
interface Competition {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    maxParticipants: number;
    deadline: string;
    description?: string;
    status: 'Ouvert' | 'Complet' | 'Fermé';
    registrations: number;
    created_at: string;
    updated_at: string;
}

interface Registration {
    id: number;
    participant_name: string;
    email: string;
    phone: string;
    status: 'En attente' | 'Confirmé' | 'Refusé';
    registered_at: string;
}

interface CompetitionShowProps {
    competition: Competition;
    registrations: Registration[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Compétitions',
        href: '/admin/competitions',
    },
    {
        title: 'Détails de la compétition',
        href: '#',
    },
];

export default function CompetitionShow({ competition, registrations }: CompetitionShowProps) {
    const getStatusBadge = () => {
        const statusConfig = {
            'Ouvert': { label: 'Ouvert', className: 'bg-green-500 text-white' },
            'Complet': { label: 'Complet', className: 'bg-orange-500 text-white' },
            'Fermé': { label: 'Fermé', className: 'bg-red-500 text-white' }
        };

        const config = statusConfig[competition.status];
        return (
            <Badge className={config.className}>
                {config.label}
            </Badge>
        );
    };

    const getRegistrationStatusBadge = (status: string) => {
        const statusConfig = {
            'En attente': { icon: AlertCircle, className: 'bg-yellow-100 text-yellow-800' },
            'Confirmé': { icon: CheckCircle, className: 'bg-green-100 text-green-800' },
            'Refusé': { icon: XCircle, className: 'bg-red-100 text-red-800' }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;

        return (
            <Badge variant="outline" className={config.className}>
                <Icon className="w-3 h-3 mr-1" />
                {status}
            </Badge>
        );
    };

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette compétition ? Cette action est irréversible.')) {
            router.delete(`/admin/competitions/${competition.id}`, {
                onSuccess: () => {
                    router.visit('/admin/competitions');
                }
            });
        }
    };

    const confirmedRegistrations = registrations.filter(r => r.status === 'Confirmé').length;
    const pendingRegistrations = registrations.filter(r => r.status === 'En attente').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Compétition: ${competition.title}`} />

            {/* Fixed Header with Actions */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <Link
                        href="/admin/competitions"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour aux compétitions
                    </Link>

                    <div className="flex gap-3">
                        <Link href={`/admin/competitions/${competition.id}/edit`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 border-red-200"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Competition Content */}
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Competition Header */}
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden mb-8">
                        <header className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                            {/* Status & Category */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1"
                                    >
                                        {competition.category}
                                    </Badge>
                                    {getStatusBadge()}
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                                {competition.title}
                            </h1>

                            {/* Competition Meta */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date de la compétition</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(competition.date).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Lieu</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{competition.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Participants</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {competition.registrations}/{competition.maxParticipants}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date limite</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(competition.deadline).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Description */}
                        {competition.description && (
                            <div className="px-8 py-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                        {competition.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total des inscriptions</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{registrations.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    {((registrations.length / competition.maxParticipants) * 100).toFixed(0)}% de la capacité
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Inscriptions confirmées</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{confirmedRegistrations}</div>
                                <p className="text-xs text-muted-foreground">
                                    {registrations.length > 0 ? ((confirmedRegistrations / registrations.length) * 100).toFixed(0) : 0}% du total
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{pendingRegistrations}</div>
                                <p className="text-xs text-muted-foreground">Nécessitent une action</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Registrations List */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Liste des inscriptions ({registrations.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {registrations.length > 0 ? (
                                <div className="space-y-4">
                                    {registrations.map((registration) => (
                                        <div
                                            key={registration.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {registration.participant_name}
                                                        </h4>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            <span>{registration.email}</span>
                                                            <span>{registration.phone}</span>
                                                            <span>
                                                                Inscrit le {new Date(registration.registered_at).toLocaleDateString('fr-FR')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getRegistrationStatusBadge(registration.status)}
                                                {registration.status === 'En attente' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700"
                                                            onClick={() => router.patch(`/admin/competition-registrations/${registration.id}/approve`)}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Valider
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 border-red-200 hover:text-red-700"
                                                            onClick={() => router.patch(`/admin/competition-registrations/${registration.id}/reject`)}
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" /> Refuser
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">Aucune inscription pour le moment</p>
                                    <p className="text-gray-400 text-sm">Les inscriptions apparaîtront ici une fois soumises</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Competition Info Footer */}
                    <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                    <p>Compétition créée le {new Date(competition.created_at).toLocaleDateString('fr-FR')}</p>
                                    {competition.updated_at !== competition.created_at && (
                                        <p>Dernière modification le {new Date(competition.updated_at).toLocaleDateString('fr-FR')}</p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Link href={`/admin/competitions/${competition.id}/edit`}>
                                        <Button size="sm" variant="outline" className="border-blue-200">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Modifier
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
