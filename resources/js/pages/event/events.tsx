import AppLayout from '@/layouts/app-layout';
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
    time: string;
    location: string;
    attendees: number;
    maxAttendees: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    category: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestion des événements',
        href: '/events',
    },
];

// Composant pour les cartes d'événements
const EventCard = ({ 
    event,
    onDelete,
    onMarkCompleted,
    onStatusChange, // ✅ Add this prop
}: {
    event: Event;
    onDelete: (id: number) => void;
    onMarkCompleted: (id: number) => void;
    onStatusChange: (id: number, newStatus: Event['status']) => void; // ✅ Add this prop type
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

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                    </div>
                </div>
                {getStatusBadge()}
            </div>
            
            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-3" />
                    <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}/{event.maxAttendees} participants</span>
                </div>
            </div>
            
            <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Inscription</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                    { (typeof event.attendees === 'number' && typeof event.maxAttendees === 'number' && event.maxAttendees !== 0)
                        ? Math.round((event.attendees / event.maxAttendees) * 100) + '%'
                        : '0%' }
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{event.category}</span>
                <div className="flex space-x-2">
                    <Link
                        href={`/dashboard_admin/event_edit/${event.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => onDelete(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {(event.status === 'upcoming' || event.status === 'ongoing') && (
                        <button 
                            onClick={() => onMarkCompleted(event.id)}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
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
        router.visit('/events/create');
    };

    const handleDeleteEvent = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            router.delete(`/events/${id}`, {
                onSuccess: () => router.reload(),
            });
        }
    };
    const handleStatusChange = (id: number, newStatus: Event['status']) => {
        router.patch(`/events/${id}/status`, { status: newStatus }, {
            onSuccess: () => router.reload(),
        });
    };

    const handleMarkCompleted = (id: number) => {
        router.patch(`/events/${id}/status`, { status: 'completed' }, {
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
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* En-tête avec actions */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Gestion des Événements</h1>
                            <p className="text-purple-100">Organisez et gérez vos événements</p>
                        </div>
                        <button 
                            onClick={handleAddEvent}
                            className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Nouvel événement</span>
                        </button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total événements</p>
                                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">À venir</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.upcoming}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Participants</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">{stats.participants}</p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Terminés</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.completed}</p>
                            </div>
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un événement..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select 
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                                <option value="all">Toutes les catégories</option>
                                <option value="Conférence">Conférence</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Séminaire">Séminaire</option>
                                <option value="Compétition">Compétition</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des événements */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-purple-600" />
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
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            Aucun événement trouvé
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Events;
