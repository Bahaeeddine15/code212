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
    // Catégories disponibles (alignées avec la page Étudiant)
    const CATEGORIES = [
        'Cybersécurité',
        'DevOps & Cloud',
        'Intelligence Artificielle',
        'Entrepreneuriat Tech',
        'Design & UX',
        'Développement Web',
        'Événement Spécial',
        'Data Science',
        'Mobile Development',
    ];
    const [form, setForm] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        maxAttendees: '',
    category: 'Développement Web',
    type: 'Conférence',
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

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Ajouter un événement</h1>
                                <p className="text-gray-600 mt-2 text-lg">Créez un nouvel événement pour votre communauté</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/events"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour aux événements</span>
                        </Link>
                    </div>
                </div>

                {/* Formulaire */}
                <div className="max-w-4xl mx-auto w-full">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Plus className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Nouvel événement</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Titre */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Titre de l'événement *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => handleChange('title', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Nom de votre événement..."
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Catégorie */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Catégorie *</label>
                                    <select
                                        value={form.category}
                                        onChange={e => handleChange('category', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                                </div>

                                {/* Type */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Type *</label>
                                    <select
                                        value={form.type}
                                        onChange={e => handleChange('type', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    >
                                        <option value="Conférence">Conférence</option>
                                        <option value="Séminaire">Séminaire</option>
                                        <option value="Workshop">Workshop</option>
                                    </select>
                                    {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                                </div>

                                {/* Date de début */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Date de début *</label>
                                    <input
                                        type="date"
                                        value={form.start_date}
                                        onChange={e => handleChange('start_date', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.start_date ? 'border-red-500' : 'border-gray-200'}`}
                                        required
                                    />
                                    {errors.start_date && <p className="text-sm text-red-600">{errors.start_date}</p>}
                                </div>

                                {/* Date de fin */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Date de fin *</label>
                                    <input
                                        type="date"
                                        value={form.end_date}
                                        onChange={e => handleChange('end_date', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.end_date ? 'border-red-500' : 'border-gray-200'}`}
                                        required
                                    />
                                    {errors.end_date && <p className="text-sm text-red-600">{errors.end_date}</p>}
                                </div>

                                {/* Lieu */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Lieu *</label>
                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={e => handleChange('location', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.location ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Adresse ou nom du lieu..."
                                        required
                                    />
                                    {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                                </div>

                                {/* Nombre max de participants */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Nombre max de participants *</label>
                                    <input
                                        type="number"
                                        value={form.maxAttendees}
                                        onChange={e => handleChange('maxAttendees', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.maxAttendees ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Ex: 50"
                                        min={1}
                                        required
                                    />
                                    {errors.maxAttendees && <p className="text-sm text-red-600">{errors.maxAttendees}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Description *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => handleChange('description', e.target.value)}
                                    className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Décrivez votre événement en détail..."
                                    rows={5}
                                    required
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-4 pt-8 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{isSubmitting ? 'Création en cours...' : 'Créer l\'événement'}</span>
                                </button>
                                <Link
                                    href="/admin/events"
                                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
                                >
                                    Annuler
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
