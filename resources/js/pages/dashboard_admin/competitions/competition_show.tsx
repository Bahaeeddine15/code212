import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem } from '@/types';
import {
    ArrowLeft,
    Edit,
    Trash2, // Make sure this is imported
    Calendar,
    MapPin,
    Users,
    Clock,
    Trophy,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    ChevronLeft,
    ChevronRight
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
    type: 'individual' | 'group'; // Add this line
}

interface Registration {
    id: number;
    participant_name: string;
    email: string;
    phone: string;
    status: 'En attente' | 'Confirmé' | 'Refusé';
    registered_at: string;
    group_name?: string;
    group_members?: string;
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
        isActive: true,
    },
];

export default function CompetitionShow({ competition, registrations }: CompetitionShowProps) {
    // Search and pagination states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and search registrations
    const filteredRegistrations = useMemo(() => {
        return registrations.filter(registration => {
            const matchesSearch = registration.participant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  registration.phone.includes(searchTerm);
            
            const matchesStatus = statusFilter === 'all' || registration.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }, [registrations, searchTerm, statusFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);

    // Reset to page 1 when search/filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

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
            'En attente': { icon: AlertCircle, className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800' },
            'Confirmé': { icon: CheckCircle, className: 'bg-green-100 dark:bg-green-900 text-green-800' },
            'Refusé': { icon: XCircle, className: 'bg-red-100 dark:bg-red-900 text-red-800' }
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

    const formatRegistrationDate = (dateString: string) => {
        if (!dateString) return 'Date inconnue';
        
        try {
            // Handle different date formats that might come from the backend
            let date;
            
            // If it's already a valid date string
            if (dateString.includes('T') || dateString.includes('Z')) {
                // ISO format (2024-01-01T00:00:00.000Z)
                date = new Date(dateString);
            } else if (dateString.includes('-')) {
                // Date format (2024-01-01)
                date = new Date(dateString + 'T00:00:00');
            } else {
                // Try parsing as-is
                date = new Date(dateString);
            }
            
            // Check if date is valid
            if (isNaN(date.getTime())) {
                console.warn('Invalid date:', dateString);
                return 'Date invalide';
            }
            
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Date parsing error:', error, 'for date:', dateString);
            return 'Date invalide';
        }
    };

    // Pagination component
    const PaginationControls = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                    Affichage de {startIndex + 1} à {Math.min(endIndex, filteredRegistrations.length)} sur {filteredRegistrations.length} inscriptions
                </div>
                
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Précédent
                    </Button>
                    
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    size="sm"
                                    className="w-8 h-8"
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        );
    };

    const handleDeleteRegistration = (registrationId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette inscription ? Cette action est irréversible.')) {
            router.delete(`/admin/competition-registrations/${registrationId}`, {
                onSuccess: () => {
                    // The page will automatically refresh with updated data
                },
                onError: (errors) => {
                    console.error('Erreur lors de la suppression:', errors);
                    alert('Une erreur est survenue lors de la suppression de l\'inscription.');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Compétition: ${competition.title}`} />

            {/* Fixed Header with Actions */}
            <div className="sticky top-0 z-10 bg-card dark:bg-card/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-border dark:border-gray-700 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 max-w-6xl mx-auto">
                    <Link
                        href="/admin/competitions"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Retour aux compétitions</span>
                        <span className="sm:hidden">Retour</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Link href={`/admin/competitions/${competition.id}/edit`} className="w-full sm:w-auto">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm">
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Modifier
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 border-red-200 w-full sm:w-auto text-sm"
                        >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Competition Content */}
            <div className="min-h-screen bg-background dark:bg-gray-900 py-4 sm:py-6 lg:py-8">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                    {/* Competition Header */}
                    <div className="bg-card dark:bg-card dark:bg-gray-800 shadow-xl rounded-xl lg:rounded-2xl overflow-hidden mb-6 sm:mb-8">
                        <header className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 border-b border-border dark:border-gray-700">
                            {/* Status & Category */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200 text-xs sm:text-sm px-2 sm:px-3 py-1"
                                    >
                                        {competition.category}
                                    </Badge>
                                    {getStatusBadge()}
                                    {/* Add competition type badge */}
                                    <Badge
                                        variant="outline"
                                        className={`text-xs sm:text-sm px-2 sm:px-3 py-1 ${competition.type === 'group' 
                                            ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 border-purple-200"
                                            : "bg-green-50 dark:bg-green-900/20 text-green-700 border-green-200"
                                        }`}
                                    >
                                        {competition.type === 'group' ? (
                                            <>
                                                <Users className="w-3 h-3 mr-1" />
                                                En équipe
                                            </>
                                        ) : (
                                            <>
                                                <User className="w-3 h-3 mr-1" />
                                                Individuel
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground dark:text-white leading-tight mb-4 sm:mb-6">
                                {competition.title}
                            </h1>

                            {/* Competition Meta */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-muted-foreground dark:text-gray-400">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date de la compétition</p>
                                        <p className="font-semibold text-foreground dark:text-white">
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
                                        <p className="text-sm text-muted-foreground">Lieu</p>
                                        <p className="font-semibold text-foreground dark:text-white">{competition.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Participants</p>
                                        <p className="font-semibold text-foreground dark:text-white">
                                            {competition.registrations}/{competition.maxParticipants}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date limite</p>
                                        <p className="font-semibold text-foreground dark:text-white">
                                            {new Date(competition.deadline).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Description */}
                        {competition.description && (
                            <div className="px-8 py-6">
                                <h3 className="text-lg font-semibold text-foreground dark:text-white mb-4">Description</h3>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p className="text-foreground dark:text-gray-300 leading-relaxed text-lg">
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
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{confirmedRegistrations}</div>
                                <p className="text-xs text-muted-foreground">
                                    {registrations.length > 0 ? ((confirmedRegistrations / registrations.length) * 100).toFixed(0) : 0}% du total
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingRegistrations}</div>
                                <p className="text-xs text-muted-foreground">Nécessitent une action</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Registrations List with Search and Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Liste des inscriptions ({filteredRegistrations.length})
                            </CardTitle>
                            
                            {/* Search and Filter Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Rechercher par nom, email ou téléphone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Tous les statuts</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Confirmé">Confirmé</option>
                                    <option value="Refusé">Refusé</option>
                                </select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {paginatedRegistrations.length > 0 ? (
                                <div className="space-y-4">
                                    {paginatedRegistrations.map((registration) => (
                                        <div
                                            key={registration.id}
                                            className="flex items-center justify-between p-4 border border-border dark:border-gray-700 rounded-lg hover:bg-background dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <h4 className="font-semibold text-foreground dark:text-white">
                                                            {registration.group_name ? (
                                                                <>
                                                                    {registration.group_name}
                                                                    <span className="text-sm text-muted-foreground ml-2">
                                                                        (Contact: {registration.participant_name})
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                registration.participant_name
                                                            )}
                                                        </h4>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <span>{registration.email}</span>
                                                            <span>{registration.phone}</span>
                                                            <span>
                                                                Inscrit le {formatRegistrationDate(registration.registered_at)}
                                                            </span>
                                                        </div>
                                                        
                                                        {/* Show group members if it's a group competition */}
                                                        {registration.group_members && (
                                                            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Users className="w-4 h-4 text-gray-600" />
                                                                    <strong className="text-gray-900 dark:text-gray-100">Membres de l'équipe:</strong>
                                                                </div>
                                                                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono text-xs bg-white dark:bg-gray-700 p-2 rounded border">
                                                                    {registration.group_members}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getRegistrationStatusBadge(registration.status)}
                                                {registration.status === 'En attente' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                            onClick={() => router.patch(`/admin/competition-registrations/${registration.id}/approve`)}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" /> 
                                                            Valider
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 dark:text-red-400 border-red-200 hover:bg-red-50"
                                                            onClick={() => router.patch(`/admin/competition-registrations/${registration.id}/reject`)}
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" /> 
                                                            Refuser
                                                        </Button>
                                                    </>
                                                )}
                                                {registration.status === 'Confirmé' && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 dark:text-red-400 border-red-200 hover:bg-red-50"
                                                        onClick={() => router.patch(`/admin/competition-registrations/${registration.id}/reject`)}
                                                    >
                                                        <XCircle className="w-4 h-4 mr-1" /> 
                                                        Annuler
                                                    </Button>
                                                )}
                                                {registration.status === 'Refusé' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                            onClick={() => router.patch(`/admin/competition-registrations/${registration.id}/approve`)}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" /> 
                                                            Réactiver
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                                                            onClick={() => handleDeleteRegistration(registration.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" /> 
                                                            Supprimer
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <PaginationControls />
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg">
                                        {searchTerm || statusFilter !== 'all' 
                                            ? 'Aucun résultat trouvé'
                                            : 'Aucune inscription pour le moment'
                                        }
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {searchTerm || statusFilter !== 'all'
                                            ? 'Essayez de modifier vos critères de recherche'
                                            : 'Les inscriptions apparaîtront ici une fois soumises'
                                        }
                                    </p>
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
