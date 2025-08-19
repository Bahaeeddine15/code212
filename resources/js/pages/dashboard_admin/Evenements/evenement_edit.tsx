import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Calendar, Edit, Plus, Info, Users, Clock } from 'lucide-react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    maxAttendees: number;
    category: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface Props {
    event: Event;
}

export default function EventEdit({ event }: Props) {
    const [form, setForm] = useState({
        title: event.title ?? '',
        description: event.description ?? '',
        start_date: event.start_date ?? '',
        end_date: event.end_date ?? '',
        location: event.location ?? '',
        maxAttendees: event.maxAttendees?.toString() ?? '',
        category: event.category ?? '',
        status: event.status ?? 'upcoming',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Gestion des événements', href: '/admin/events' },
        { title: 'Modifier événement', href: '#' },
    ];

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.put(`/admin/events/${event.id}`, { ...form, max_attendees: parseInt(form.maxAttendees) }, {
            onError: (err) => {
                setErrors(err);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
                router.visit('/admin/events');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier l'événement" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Edit className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Modifier l'événement</h1>
                                <p className="text-muted-foreground mt-2 text-lg">Modifiez "{event.title}"</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/events"
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour aux événements</span>
                        </Link>
                    </div>
                </div>

                {/* Layout organisé avec sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section principale - Formulaire */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Informations principales */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-bold text-foreground">Détails de l'événement</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre de l'événement *</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Conférence Tech 2024"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Catégorie *</label>
                                        <select
                                            value={form.category}
                                            onChange={e => handleChange('category', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        >
                                            <option value="Conférence">Conférence</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Séminaire">Séminaire</option>
                                            <option value="Formation">Formation</option>
                                            <option value="Networking">Networking</option>
                                        </select>
                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        placeholder="Décrivez votre événement, les sujets abordés, les intervenants..."
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Date et heure de début *</label>
                                        <input
                                            type="datetime-local"
                                            value={form.start_date}
                                            onChange={e => handleChange('start_date', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            required
                                        />
                                        {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Date et heure de fin *</label>
                                        <input
                                            type="datetime-local"
                                            value={form.end_date}
                                            onChange={e => handleChange('end_date', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            required
                                        />
                                        {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Lieu *</label>
                                        <input
                                            type="text"
                                            value={form.location}
                                            onChange={e => handleChange('location', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Auditorium A, Campus Universitaire"
                                            required
                                        />
                                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Nombre max de participants *</label>
                                        <input
                                            type="number"
                                            value={form.maxAttendees}
                                            onChange={e => handleChange('maxAttendees', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="100"
                                            min={1}
                                            required
                                        />
                                        {errors.maxAttendees && <p className="text-red-500 text-sm mt-1">{errors.maxAttendees}</p>}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-5 h-5" />
                                        {isSubmitting ? 'Modification...' : 'Modifier l\'événement'}
                                    </button>
                                    <Link
                                        href="/admin/events"
                                        className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                                    >
                                        Annuler
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Informations et conseils */}
                    <div className="space-y-6">
                        {/* Statut actuel */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-600" />
                                Informations actuelles
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Statut:</span>
                                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                                        event.status === 'ongoing' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                        event.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' :
                                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                    }`}>
                                        {event.status === 'upcoming' ? 'À venir' :
                                         event.status === 'ongoing' ? 'En cours' :
                                         event.status === 'completed' ? 'Terminé' : 'Annulé'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Capacité:</span>
                                    <span className="font-medium text-foreground">{event.maxAttendees} participants</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Lieu:</span>
                                    <span className="font-medium text-foreground text-right max-w-32 truncate">{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions rapides */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-blue-600" />
                                Actions rapides
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/admin/events"
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Retour aux événements
                                </Link>
                            </div>
                        </div>

                        {/* Conseils */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800 p-6">
                            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-4">💡 Conseils de modification</h3>
                            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                                <li>• Vérifiez les réservations existantes avant modification</li>
                                <li>• Notifiez les participants en cas de changement majeur</li>
                                <li>• Adaptez la capacité selon le nouveau lieu</li>
                                <li>• Validez les nouvelles dates avec les intervenants</li>
                                <li>• Mettez à jour les supports de communication</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
