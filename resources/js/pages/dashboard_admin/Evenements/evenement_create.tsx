import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Calendar, Plus } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des événements',
        href: '/admin/events',
    },
    {
        title: 'Nouvel événement',
        href: '#',
    },
];

export default function EventCreate() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        maxAttendees: '',
        category: 'Développement Web',  // Changed default
        type: 'Conférence',             // This will be the old category values
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post('/admin/events', form, {
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
            <Head title="Ajouter un événement" />

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl lg:rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg">
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Ajouter un événement</h1>
                                <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">Créez un nouvel événement pour votre communauté</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/events"
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700 text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Retour aux événements</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>
                </div>

                {/* Layout organisé avec sidebar */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {/* Section principale - Formulaire */}
                    <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                        {/* Informations principales */}
                        <div className="bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg sm:rounded-xl">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-foreground">Détails de l'événement</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* First row - Title and Category */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre de l'événement *</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            placeholder="Ex: Conférence Cybersécurité 2024"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Catégorie *</label>
                                        <select
                                            value={form.category}
                                            onChange={e => handleChange('category', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:light] text-sm sm:text-base"
                                        >
                                            <option value="Développement Web" className="bg-card text-foreground">Développement Web</option>
                                            <option value="Design & UX" className="bg-card text-foreground">Design & UX</option>
                                            <option value="Événement Spécial" className="bg-card text-foreground">Événement Spécial</option>
                                            <option value="DevOps & Cloud" className="bg-card text-foreground">DevOps & Cloud</option>
                                            <option value="Data Science" className="bg-card text-foreground">Data Science</option>
                                            <option value="Mobile Development" className="bg-card text-foreground">Mobile Development</option>
                                            <option value="Intelligence Artificielle" className="bg-card text-foreground">Intelligence Artificielle</option>
                                            <option value="Entrepreneuriat Tech" className="bg-card text-foreground">Entrepreneuriat Tech</option>
                                            <option value="Cybersécurité" className="bg-card text-foreground">Cybersécurité</option>
                                            <option value="Hackathon" className="bg-card text-foreground">Hackathon</option>
                                        </select>
                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                    </div>
                                </div>

                                {/* Second row - Type d'événement (full width) */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Type d'événement *</label>
                                    <select
                                        value={form.type}
                                        onChange={e => handleChange('type', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:light] text-sm sm:text-base"
                                    >
                                        <option value="Conférence" className="bg-card text-foreground">Conférence</option>
                                        <option value="Workshop" className="bg-card text-foreground">Workshop</option>
                                        <option value="Séminaire" className="bg-card text-foreground">Séminaire</option>
                                        <option value="Formation" className="bg-card text-foreground">Formation</option>
                                        <option value="Networking" className="bg-card text-foreground">Networking</option>
                                        <option value="Webinaire" className="bg-card text-foreground">Webinaire</option>
                                        <option value="Table Ronde" className="bg-card text-foreground">Table Ronde</option>
                                        <option value="Présentation" className="bg-card text-foreground">Présentation</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                                        placeholder="Décrivez votre événement, les sujets abordés, les intervenants..."
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                {/* Date and Time */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Date et heure de début *</label>
                                        <input
                                            type="datetime-local"
                                            value={form.start_date}
                                            onChange={e => handleChange('start_date', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            style={{
                                                colorScheme: 'light'
                                            }}
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
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            style={{
                                                colorScheme: 'light'
                                            }}
                                            required
                                        />
                                        {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                                    </div>
                                </div>

                                {/* Location and Max Attendees */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Lieu *</label>
                                        <input
                                            type="text"
                                            value={form.location}
                                            onChange={e => handleChange('location', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            placeholder="Ex: Auditorium de l'école, Salle 205"
                                            required
                                        />
                                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Places disponibles *</label>
                                        <input
                                            type="number"
                                            value={form.maxAttendees}
                                            onChange={e => handleChange('maxAttendees', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                                            placeholder="Ex: 100"
                                            min={1}
                                            required
                                        />
                                        {errors.maxAttendees && <p className="text-red-500 text-sm mt-1">{errors.maxAttendees}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                        {isSubmitting ? 'Création...' : 'Créer l\'événement'}
                                    </button>
                                    <Link
                                        href="/admin/events"
                                        className="px-4 sm:px-6 py-2 sm:py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        Annuler
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Conseils et actions */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Actions rapides */}
                        <div className="bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                            <h3 className="font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                Actions rapides
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <Link
                                    href="/admin/events"
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-3 sm:px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Retour aux événements
                                </Link>
                            </div>
                        </div>

                        {/* Conseils */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl lg:rounded-2xl shadow-lg border border-blue-200 dark:border-blue-800 p-4 sm:p-6">
                            <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-3 sm:mb-4 text-sm sm:text-base">💡 Conseils pour un événement réussi</h3>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                                <li>• Planifiez au moins 2 semaines à l'avance</li>
                                <li>• Vérifiez la disponibilité de la salle</li>
                                <li>• Préparez un programme détaillé</li>
                                <li>• Communiquez tôt sur l'événement</li>
                                <li>• Prévoyez du matériel de secours</li>
                            </ul>
                        </div>

                        {/* Types d'événements populaires */}
                        <div className="bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                            <h3 className="font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">📊 Types d'événements populaires</h3>
                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Conférences</span>
                                    <span className="font-medium text-foreground">45%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Workshops</span>
                                    <span className="font-medium text-foreground">30%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Networking</span>
                                    <span className="font-medium text-foreground">25%</span>
                                </div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl lg:rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800 p-4 sm:p-6">
                            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-3 sm:mb-4 text-sm sm:text-base">✅ Checklist avant publication</h3>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                                <li>• Titre attractif et descriptif</li>
                                <li>• Date et heure correctes</li>
                                <li>• Lieu accessible et précis</li>
                                <li>• Description complète</li>
                                <li>• Nombre de places réaliste</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
