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
    Search
} from 'lucide-react';

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
                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
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
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'cancelled':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Calendar className="w-5 h-5 text-blue-600" />;
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                </div>
                {getStatusBadge()}
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                        {fmtDate(event.date)}
                        {event.endDate && !sameDay(event.date, event.endDate) && (
                            <> - {fmtDate(event.endDate)}</>
                        )}
                    </span>
                    <Clock className="w-4 h-4 ml-3" />
                    <span>
                        {fmtTime(event.date)}
                        {event.endDate && (
                            <> - {fmtTime(event.endDate)}</>
                        )}
                    </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}/{event.maxAttendees}</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Inscription</span>
                    <span className="font-medium text-gray-800">
                    { (typeof event.attendees === 'number' && typeof event.maxAttendees === 'number' && event.maxAttendees !== 0)
                        ? Math.round((event.attendees / event.maxAttendees) * 100) + '%'
                        : '0%' }
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">{event.category}</span>
                <div className="flex space-x-2">
                    <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                        <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => onDelete(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {(event.status === 'upcoming' || event.status === 'ongoing') && (
                        <button
                            onClick={() => onMarkCompleted(event.id)}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded-xl hover:bg-green-700 transition-all duration-200 font-medium"
                        >
                            Marquer terminé
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
            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestion des Événements</h1>
                                <p className="text-gray-600 mt-2 text-lg">Organisez et gérez vos événements</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddEvent}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Nouvel événement</span>
                        </button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Total événements</p>
                                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-purple-100 rounded-2xl">
                                <Calendar className="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">À venir</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.upcoming}</p>
                            </div>
                            <div className="p-4 bg-blue-100 rounded-2xl">
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Participants</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.participants}</p>
                            </div>
                            <div className="p-4 bg-green-100 rounded-2xl">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Terminés</p>
                                <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.completed}</p>
                            </div>
                            <div className="p-4 bg-emerald-100 rounded-2xl">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un événement..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40"
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
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40"
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
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Calendar className="w-7 h-7 mr-3 text-purple-600" />
                            Événements ({filteredEvents.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="text-center py-12">
                            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun événement trouvé</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre premier événement'}
                            </p>
                            <button
                                onClick={handleAddEvent}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
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
