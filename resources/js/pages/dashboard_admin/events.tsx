import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
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
    Filter,
    CalendarDays,
    MapPin as LocationIcon
} from 'lucide-react';
import { ModernCard, PageHeader, ModernButton, ModernInput } from '@/components/ui/modern-components';

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
    onEdit,
    onDelete,
}: {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (event: Event) => void;
}) => {
    const { title, description, date, time, location, attendees, maxAttendees, status, category } = event;
    
    const getStatusColor = () => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
            case 'ongoing':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            case 'completed':
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
            case 'cancelled':
                return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'upcoming':
                return <Clock className="w-4 h-4" />;
            case 'ongoing':
                return <CheckCircle className="w-4 h-4" />;
            case 'completed':
                return <CheckCircle className="w-4 h-4" />;
            case 'cancelled':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getThemeByStatus = () => {
        switch (status) {
            case 'upcoming': return 'primary';
            case 'ongoing': return 'success';
            case 'completed': return 'secondary';
            case 'cancelled': return 'danger';
            default: return 'primary';
        }
    };

    return (
        <ModernCard theme={getThemeByStatus() as any} className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center -m-6 mb-6">
                <Calendar className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
            </div>
            
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground">{title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${getStatusColor()}`}>
                            {getStatusIcon()}
                            <span className="ml-1 capitalize">{status}</span>
                        </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm col-span-2">
                        <LocationIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{location}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Participants</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{attendees}/{maxAttendees}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                            style={{ width: `${(attendees / maxAttendees) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold rounded-full">{category}</span>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onEdit(event)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDelete(event)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ModernCard>
    );
};

// Mock data pour les événements
const mockEvents: Event[] = [
    {
        id: 1,
        title: "Conférence Intelligence Artificielle",
        description: "Découvrez les dernières innovations en IA et leurs applications pratiques dans le monde professionnel.",
        date: "2024-02-15",
        time: "14:00",
        location: "Amphithéâtre CODE212",
        attendees: 45,
        maxAttendees: 60,
        status: "upcoming",
        category: "IA"
    },
    {
        id: 2,
        title: "Workshop Développement React",
        description: "Atelier pratique sur React.js avec création d'applications modernes et responsives.",
        date: "2024-02-10",
        time: "09:00",
        location: "Salle de formation A",
        attendees: 28,
        maxAttendees: 30,
        status: "ongoing",
        category: "Développement"
    },
    {
        id: 3,
        title: "Hackathon Code212",
        description: "Compétition de programmation de 24h pour résoudre des défis technologiques innovants.",
        date: "2024-01-20",
        time: "10:00",
        location: "Campus principal",
        attendees: 120,
        maxAttendees: 120,
        status: "completed",
        category: "Compétition"
    },
    {
        id: 4,
        title: "Séminaire Cybersécurité",
        description: "Formation sur les meilleures pratiques de sécurité informatique et protection des données.",
        date: "2024-02-25",
        time: "13:30",
        location: "Salle de conférence B",
        attendees: 0,
        maxAttendees: 40,
        status: "cancelled",
        category: "Sécurité"
    }
];

export default function Events() {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Fonctions de gestion
    const handleEventEdit = (event: Event) => {
        console.log('Éditer événement:', event);
        // Ici vous pourriez rediriger vers une page d'édition
        router.visit(`/dashboard_admin/event_edit/${event.id}`);
    };

    const handleEventDelete = (event: Event) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            setEvents(prev => prev.filter(e => e.id !== event.id));
        }
    };

    // Filtrage des événements
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Statistiques
    const stats = {
        total: events.length,
        upcoming: events.filter(e => e.status === 'upcoming').length,
        ongoing: events.filter(e => e.status === 'ongoing').length,
        completed: events.filter(e => e.status === 'completed').length,
        totalAttendees: events.reduce((sum, e) => sum + e.attendees, 0)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des événements" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">
                
                {/* Header moderne */}
                <PageHeader
                    title="Gestion des événements"
                    description="Organisez et suivez vos événements et activités"
                    icon={Calendar}
                    theme="primary"
                    actions={
                        <ModernButton
                            theme="primary"
                            icon={Plus}
                            onClick={() => router.visit('/dashboard_admin/event_create')}
                        >
                            Nouvel événement
                        </ModernButton>
                    }
                />

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <ModernCard theme="primary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Total événements</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="info">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">À venir</p>
                                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">{stats.upcoming}</p>
                            </div>
                            <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-2xl">
                                <Clock className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="success">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">En cours</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.ongoing}</p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="secondary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Terminés</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.completed}</p>
                            </div>
                            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                                <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="warning">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Participants</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.totalAttendees}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                <Users className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </ModernCard>
                </div>

                {/* Filtres et recherche */}
                <ModernCard theme="primary">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un événement..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="upcoming">À venir</option>
                                <option value="ongoing">En cours</option>
                                <option value="completed">Terminés</option>
                                <option value="cancelled">Annulés</option>
                            </select>
                        </div>
                    </div>
                </ModernCard>

                {/* Liste des événements */}
                <ModernCard theme="primary">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground flex items-center">
                            <Calendar className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" />
                            Événements ({filteredEvents.length})
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <EventCard 
                                key={event.id} 
                                event={event}
                                onEdit={handleEventEdit}
                                onDelete={handleEventDelete}
                            />
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-12">
                            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Aucun événement trouvé</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par créer votre premier événement'}
                            </p>
                            <ModernButton
                                theme="primary"
                                icon={Plus}
                                onClick={() => router.visit('/dashboard_admin/event_create')}
                            >
                                Créer un événement
                            </ModernButton>
                        </div>
                    )}
                </ModernCard>
            </div>
        </AppLayout>
    );
}
