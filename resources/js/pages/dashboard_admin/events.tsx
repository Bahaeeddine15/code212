import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
    X,
    Save
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
    onDelete,
    onMarkCompleted
}: {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (id: number) => void;
    onMarkCompleted: (id: number) => void;
}) => {
    const getStatusBadge = () => {
        switch (event.status) {
            case 'upcoming':
                return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">À venir</span>;
            case 'ongoing':
                return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">En cours</span>;
            case 'completed':
                return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Terminé</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Annulé</span>;
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
                    <span className="font-medium text-gray-800 dark:text-gray-100">{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
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
                    <button 
                        onClick={() => onEdit(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onDelete(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {event.status === 'upcoming' && (
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

export default function Events() {
    // État pour la gestion des événements
    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: 'Conférence IA & Innovation',
            description: 'Découvrez les dernières avancées en intelligence artificielle',
            date: '2025-01-15',
            time: '14:00 - 17:00',
            location: 'Amphi Central - Université',
            attendees: 85,
            maxAttendees: 100,
            status: 'upcoming',
            category: 'Conférence'
        },
        {
            id: 2,
            title: 'Workshop Développement Web',
            description: 'Atelier pratique sur React et Laravel',
            date: '2025-01-12',
            time: '09:00 - 16:00',
            location: 'Salle TP Informatique',
            attendees: 24,
            maxAttendees: 30,
            status: 'ongoing',
            category: 'Workshop'
        },
        {
            id: 3,
            title: 'Hackathon 2025',
            description: '48h de développement intensif',
            date: '2025-01-08',
            time: '48h non-stop',
            location: 'Campus Innovation',
            attendees: 120,
            maxAttendees: 120,
            status: 'completed',
            category: 'Compétition'
        },
        {
            id: 4,
            title: 'Séminaire Cybersécurité',
            description: 'Sécurisation des systèmes d\'information',
            date: '2025-01-20',
            time: '10:00 - 12:00',
            location: 'Salle de Conférence B',
            attendees: 0,
            maxAttendees: 50,
            status: 'cancelled',
            category: 'Séminaire'
        }
    ]);

    // États pour les formulaires et filtres
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    // Formulaire d'événement
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxAttendees: '',
        category: 'Conférence'
    });

    // Fonctions de gestion
    const handleAddEvent = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            maxAttendees: '',
            category: 'Conférence'
        });
        setShowModal(true);
    };

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            maxAttendees: event.maxAttendees.toString(),
            category: event.category
        });
        setShowModal(true);
    };

    const handleSaveEvent = () => {
        if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location || !formData.maxAttendees) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const newEvent: Event = {
            id: editingEvent ? editingEvent.id : Date.now(),
            title: formData.title,
            description: formData.description,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            attendees: editingEvent ? editingEvent.attendees : 0,
            maxAttendees: parseInt(formData.maxAttendees),
            status: editingEvent ? editingEvent.status : 'upcoming',
            category: formData.category
        };

        if (editingEvent) {
            setEvents(events.map(event => event.id === editingEvent.id ? newEvent : event));
        } else {
            setEvents([...events, newEvent]);
        }

        setShowModal(false);
        setEditingEvent(null);
    };

    const handleDeleteEvent = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            setEvents(events.filter(event => event.id !== id));
        }
    };

    const handleMarkCompleted = (id: number) => {
        if (confirm('Marquer cet événement comme terminé ?')) {
            setEvents(events.map(event => 
                event.id === id ? { ...event, status: 'completed' as const } : event
            ));
        }
    };

    // Filtrage des événements
    const filteredEvents = events.filter((event: Event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
        
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Statistiques
    const stats = {
        total: events.length,
        upcoming: events.filter(e => e.status === 'upcoming').length,
        participants: events.reduce((sum, e) => sum + e.attendees, 0),
        completed: events.filter(e => e.status === 'completed').length
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredEvents.map((event) => (
                            <EventCard 
                                key={event.id} 
                                event={event}
                                onEdit={handleEditEvent}
                                onDelete={handleDeleteEvent}
                                onMarkCompleted={handleMarkCompleted}
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
                </div>

                {/* Modal pour ajouter/modifier un événement */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    {editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Titre
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="Titre de l'événement"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="Description de l'événement"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Heure
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.time}
                                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            placeholder="Ex: 14:00 - 17:00"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Lieu
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="Lieu de l'événement"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre max de participants
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.maxAttendees}
                                            onChange={(e) => setFormData({...formData, maxAttendees: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            min="1"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Catégorie
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        >
                                            <option value="Conférence">Conférence</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Séminaire">Séminaire</option>
                                            <option value="Compétition">Compétition</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleSaveEvent}
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{editingEvent ? 'Modifier' : 'Ajouter'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Events;
