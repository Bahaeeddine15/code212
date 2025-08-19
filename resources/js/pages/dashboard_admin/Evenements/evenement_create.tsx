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
        category: 'Conférence',
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

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Ajouter un événement</h1>
                                <p className="text-muted-foreground mt-2 text-lg">Créez un nouvel événement pour votre communauté</p>
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
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:dark]"
                                        >
                                            <option value="Conférence" className="bg-card text-foreground">Conférence</option>
                                            <option value="Workshop" className="bg-card text-foreground">Workshop</option>
                                            <option value="Séminaire" className="bg-card text-foreground">Séminaire</option>
                                            <option value="Formation" className="bg-card text-foreground">Formation</option>
                                            <option value="Networking" className="bg-card text-foreground">Networking</option>
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
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:dark]"
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
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:dark]"
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
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: 100"
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
                                        {isSubmitting ? 'Création...' : 'Créer l\'événement'}
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

                    {/* Sidebar - Conseils et actions */}
                    <div className="space-y-6">
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
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-800 p-6">
                            <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-4">💡 Conseils pour un événement réussi</h3>
                            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                                <li>• Planifiez au moins 2 semaines à l'avance</li>
                                <li>• Vérifiez la disponibilité de la salle</li>
                                <li>• Préparez un programme détaillé</li>
                                <li>• Communiquez tôt sur l'événement</li>
                                <li>• Prévoyez du matériel de secours</li>
                            </ul>
                        </div>

                        {/* Types d'événements populaires */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4">📊 Types d'événements populaires</h3>
                            <div className="space-y-3 text-sm">
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
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800 p-6">
                            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-4">✅ Checklist avant publication</h3>
                            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
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
