import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
import { BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Trophy, Plus, Users } from 'lucide-react';

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
        title: 'Nouvelle compétition',
        href: '#',
    },
];

export default function CompetitionCreate() {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        category: '',
        maxParticipants: '',
        deadline: '',
        description: '',
        type: 'individual' // Add this line
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post('/admin/competitions', formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                // Will redirect to competitions list automatically
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer une nouvelle compétition" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Nouvelle compétition</h1>
                                <p className="text-muted-foreground mt-2 text-lg">Organisez et gérez vos compétitions sportives</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/competitions"
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour aux compétitions</span>
                        </Link>
                    </div>
                </div>

                {/* Formulaire */}
                <div className="max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Formulaire principal */}
                        <div className="lg:col-span-2">
                            <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-8">
                                <div className="flex items-center space-x-3 mb-8">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">Détails de la compétition</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Titre */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground">Titre de la compétition *</label>
                                        <input
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Championnat National 2024"
                                            required
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.title && <p className="text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                                    </div>

                                    {/* Date et deadline */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-foreground">Date de la compétition *</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => handleInputChange('date', e.target.value)}
                                                required
                                                style={{
                                                    colorScheme: 'light'
                                                }}
                                                className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.date ? 'border-red-500' : 'border-border'}`}
                                            />
                                            {errors.date && <p className="text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-foreground">Date limite d'inscription *</label>
                                            <input
                                                type="date"
                                                value={formData.deadline}
                                                onChange={(e) => handleInputChange('deadline', e.target.value)}
                                                required
                                                style={{
                                                    colorScheme: 'light'
                                                }}
                                                className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.deadline ? 'border-red-500' : 'border-border'}`}
                                            />
                                            {errors.deadline && <p className="text-sm text-red-600 dark:text-red-400">{errors.deadline}</p>}
                                        </div>
                                    </div>

                                    {/* Lieu */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground">Lieu de la compétition *</label>
                                        <input
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            placeholder="Stade Olympique, Paris"
                                            required
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.location ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.location && <p className="text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Description détaillée de la compétition, règlement, prix..."
                                            rows={6}
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none ${errors.description ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.description && <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                                        <p className="text-sm text-muted-foreground">
                                            Décrivez les détails de la compétition, le règlement et les prix.
                                        </p>
                                    </div>

                                    {/* Boutons */}
                                    <div className="flex gap-4 pt-8 border-t border-border">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 disabled:opacity-50"
                                        >
                                            <Save className="w-5 h-5" />
                                            <span>{isSubmitting ? 'Création en cours...' : 'Créer la compétition'}</span>
                                        </button>
                                        <Link
                                            href="/admin/competitions"
                                            className="border-2 border-gray-300 text-foreground hover:bg-background px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
                                        >
                                            Annuler
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar avec paramètres */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Paramètres */}
                            <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-indigo-100 rounded-xl">
                                        <Users className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">Paramètres</h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Catégorie */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground">Catégorie *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.category ? 'border-red-500' : 'border-border'}`}
                                        >
                                            <option value="">Choisir une catégorie</option>
                                            <option value="Junior">Junior</option>
                                            <option value="Senior">Senior</option>
                                            <option value="Elite">Elite</option>
                                            <option value="Veteran">Vétéran</option>
                                            <option value="Open">Open</option>
                                        </select>
                                        {errors.category && <p className="text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
                                    </div>

                                    {/* Type de compétition - ADD THIS */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground">Type de compétition *</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.type ? 'border-red-500' : 'border-border'}`}
                                        >
                                            <option value="individual">Individuelle</option>
                                            <option value="group">En équipe</option>
                                        </select>
                                        {errors.type && <p className="text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
                                        <p className="text-sm text-muted-foreground">
                                            Choisissez si la compétition est individuelle ou par équipe.
                                        </p>
                                    </div>

                                    {/* Nombre max de participants */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground">Nombre maximum de participants *</label>
                                        <input
                                            type="number"
                                            value={formData.maxParticipants}
                                            onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                                            placeholder="50"
                                            min="1"
                                            required
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.maxParticipants ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.maxParticipants && <p className="text-sm text-red-600 dark:text-red-400">{errors.maxParticipants}</p>}
                                        <p className="text-sm text-muted-foreground">
                                            {formData.type === 'group' ? 'Nombre maximum d\'équipes' : 'Nombre maximum de participants individuels'}.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Conseils */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-6">
                                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                                    <span className="mr-2">💡</span>
                                    Conseils d'organisation
                                </h3>
                                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-3">
                                    <li className="flex items-start space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Définissez une date limite d'inscription appropriée</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Assurez-vous que le lieu peut accueillir tous les participants</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Préparez un règlement clair et détaillé</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Communiquez les prix et récompenses</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Planifiez les inscriptions à l'avance</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
