import AppLayout from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Calendar,
    Plus,
    Edit3,
    Trash2,
    MapPin,
    Clock,
    Users,
    CheckCircle,
    AlertCircle,
    Search,
    UserCheck // Add this import for registration icon
} from 'lucide-react';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';

// Types
interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    endDate?: string;
    time?: string; // optional; we compute display from date/endDate
    location: string;
    attendees: number;
    maxAttendees: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    category: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des événements',
        href: '/admin/events',
    },
];

// Composant pour les cartes d'événements
const EventCard = ({
    event,
    onDelete,
    onMarkCompleted,
    onStatusChange,
}: {
    event: Event;
    onDelete: (id: number) => void;
    onMarkCompleted: (id: number) => void;
    onStatusChange: (id: number, newStatus: Event['status']) => void;
}) => {
    const getStatusBadge = () => {
        return (
            <select
                value={event.status}
                onChange={(e) => onStatusChange(event.id, e.target.value as Event['status'])}
                className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${
                        event.status === 'upcoming' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800' :
                        event.status === 'ongoing' ? 'bg-green-100 dark:bg-green-900 text-green-800' :
                        event.status === 'completed' ? 'bg-gray-100 text-foreground' :
                        'bg-red-100 dark:bg-red-900 text-red-800'
                    }
                    dark:bg-gray-700 dark:text-gray-100
                `}
            >
                <option value="upcoming">À venir</option>
                <option value="ongoing">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
            </select>
        );
    };

    const getStatusIcon = () => {
        switch (event.status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
            case 'cancelled':
                return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
            default:
                return <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
        }
    };

    // Helpers to format date/time from ISO strings
    const fmtDate = (iso?: string) => iso ? new Date(iso).toLocaleDateString('fr-FR', { dateStyle: 'medium' }) : '';
    const fmtTime = (iso?: string) => iso ? new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
    const sameDay = (a?: string, b?: string) => {
        if(!a || !b) return false;
        const d1 = new Date(a), d2 = new Date(b);
        return d1.getFullYear()===d2.getFullYear() && d1.getMonth()===d2.getMonth() && d1.getDate()===d2.getDate();
    };

    return (
        <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4">
                <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                    {getStatusIcon()}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{event.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">{event.description}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    {getStatusBadge()}
                </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                            {fmtDate(event.date)}
                            {event.endDate && !sameDay(event.date, event.endDate) && (
                                <> - {fmtDate(event.endDate)}</>
                            )}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>
                            {fmtTime(event.date)}
                            {event.endDate && (
                                <> - {fmtTime(event.endDate)}</>
                            )}
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{event.attendees}/{event.maxAttendees}</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                    <span className="text-muted-foreground">Inscription</span>
                    <span className="font-medium text-foreground">
                    { (typeof event.attendees === 'number' && typeof event.maxAttendees === 'number' && event.maxAttendees !== 0)
                        ? Math.round((event.attendees / event.maxAttendees) * 100) + '%'
                        : '0%' }
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium rounded-full self-start">{event.category}</span>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                    {/* Add View Registrations button */}
                    <Link
                        href={`/admin/events/${event.id}/registrations`}
                        className="p-1.5 sm:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg sm:rounded-xl transition-all duration-200"
                        title="Voir les inscriptions"
                    >
                        <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                    
                    <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-1.5 sm:p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg sm:rounded-xl transition-all duration-200"
                        title="Modifier"
                    >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                    
                    <button
                        onClick={() => onDelete(event.id)}
                        className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg sm:rounded-xl transition-all duration-200"
                        title="Supprimer"
                    >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    
                    {(event.status === 'upcoming' || event.status === 'ongoing') && (
                        <button
                            onClick={() => onMarkCompleted(event.id)}
                            className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs rounded-lg sm:rounded-xl hover:bg-green-700 transition-all duration-200 font-medium"
                        >
                            <span className="hidden sm:inline">Marquer terminé</span>
                            <span className="sm:hidden">Terminé</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


// Main Events page component
const Events = ({ events }: { events: Event[] }) => {
    // États pour les filtres
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // Fonctions de gestion
    const handleAddEvent = () => {
        router.visit('/admin/events/create');
    };

    const handleDeleteEvent = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            router.delete(`/admin/events/${id}`, {
                onSuccess: () => router.reload(),
            });
        }
    };
    const handleStatusChange = (id: number, newStatus: Event['status']) => {
        router.patch(`/admin/events/${id}/status`, { status: newStatus }, {
            onSuccess: () => router.reload(),
        });
    };

    const handleMarkCompleted = (id: number) => {
        router.patch(`/admin/events/${id}/status`, { status: 'completed' }, {
            onSuccess: () => router.reload(),
        });
    };

    // Filtrage des événements
    const filteredEvents = events.filter((event: Event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Calcul des statistiques
    const stats = {
        total: filteredEvents.length,
        upcoming: filteredEvents.filter((event: Event) => event.status === 'upcoming').length,
        participants: filteredEvents.reduce((sum: number, event: Event) => sum + event.attendees, 0),
        completed: filteredEvents.filter((event: Event) => event.status === 'completed').length
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des événements" />
            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">
                {/* Header moderne */}
                <PageHeader
                    title="Gestion des Événements"
                    description="Organisez et gérez vos événements"
                    icon={Calendar}
                    theme="primary"
                    actions={
                        <ModernButton theme="primary" icon={Plus} onClick={handleAddEvent}>
                            <span className="hidden sm:inline">Nouvel événement</span>
                            <span className="sm:hidden">Nouveau</span>
                        </ModernButton>
                    }
                />

                {/* Statistiques rapides */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-3 sm:p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total événements</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mt-1 sm:mt-2">{stats.total}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl self-end sm:self-auto">
                                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-3 sm:p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">À venir</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mt-1 sm:mt-2">{stats.upcoming}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl lg:rounded-2xl self-end sm:self-auto">
                                <Clock className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-3 sm:p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Participants</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">{stats.participants}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-green-100 dark:bg-green-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl self-end sm:self-auto">
                                <Users className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-3 sm:p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Terminés</p>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mt-1 sm:mt-2">{stats.completed}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl self-end sm:self-auto">
                                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un événement..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base sm:w-40"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="upcoming">À venir</option>
                                <option value="ongoing">En cours</option>
                                <option value="completed">Terminé</option>
                                <option value="cancelled">Annulé</option>
                            </select>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base sm:w-40"
                            >
                                <option value="all">Toutes les catégories</option>
                                <option value="Conférence">Conférence</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Séminaire">Séminaire</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des événements */}
                <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground flex items-center">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 text-purple-600" />
                            <span className="hidden sm:inline">Événements ({filteredEvents.length})</span>
                            <span className="sm:hidden">Événements ({filteredEvents.length})</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {filteredEvents.map((event: Event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onDelete={handleDeleteEvent}
                                onMarkCompleted={handleMarkCompleted}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Aucun événement trouvé</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre premier événement'}
                            </p>
                            <button
                                onClick={handleAddEvent}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto text-sm sm:text-base"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Créer un événement</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Events;
