import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, GraduationCap, Plus } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des formations',
        href: '/admin/formations',
    },
    {
        title: 'Nouvelle formation',
        href: '#',
    },
];

export default function FormationCreate() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        level: '',
        duration: '',
        category: '',
        link: '',
        thumbnail: null as File | null, // <-- add this
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('level', form.level);
        formData.append('duration', form.duration);
        formData.append('category', form.category);
        formData.append('link', form.link);
        if (form.thumbnail) {
            formData.append('thumbnail', form.thumbnail);
        }
        router.post('/admin/formations', formData, {
            forceFormData: true,
            onError: err => setErrors(err),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nouvelle formation" />

            <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg self-start">
                                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Nouvelle formation</h1>
                                <p className="text-muted-foreground mt-1 sm:mt-2 text-base sm:text-lg">Créez une nouvelle formation pour vos étudiants</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/formations"
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700 self-start lg:self-auto text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Retour aux formations</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>
                </div>

                {/* Layout organisé avec sidebar */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                    {/* Section principale - Formulaire */}
                    <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                        {/* Informations principales */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-8">
                            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-foreground">Informations de la formation</h2>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Formation Cisco CCNA"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                                        <input
                                            type="text"
                                            value={form.category}
                                            onChange={e => handleChange('category', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Réseaux informatiques"
                                            required
                                        />
                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        rows={4}
                                        placeholder="Décrivez le contenu et les objectifs de la formation..."
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Niveau</label>
                                        <select
                                            value={form.level}
                                            onChange={e => handleChange('level', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:dark]"
                                            required
                                        >
                                            <option value="" className="bg-card text-foreground">Sélectionner un niveau</option>
                                            <option value="Débutant" className="bg-card text-foreground">Débutant</option>
                                            <option value="Intermédiaire" className="bg-card text-foreground">Intermédiaire</option>
                                            <option value="Avancé" className="bg-card text-foreground">Avancé</option>
                                        </select>
                                        {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Durée</label>
                                        <input
                                            type="text"
                                            value={form.duration}
                                            onChange={e => handleChange('duration', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: 40 heures, 5 jours"
                                            required
                                        />
                                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Lien externe (optionnel)</label>
                                    <input
                                        type="url"
                                        value={form.link}
                                        onChange={e => handleChange('link', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="https://www.cisco.com/..."
                                    />
                                    {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Image de couverture (optionnelle)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => handleChange('thumbnail', e.target.files ? e.target.files[0] : null)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                    />
                                    {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
                                    >
                                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                        {isSubmitting ? 'Création...' : 'Créer la formation'}
                                    </button>
                                    <Link
                                        href="/admin/formations"
                                        className="px-4 sm:px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
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
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                            <h3 className="font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                Actions rapides
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/admin/formations"
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 min-h-[40px]"
                                >
                                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Retour aux formations
                                </Link>
                            </div>
                        </div>

                        {/* Conseils */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl shadow-lg border border-green-200 dark:border-green-800 p-4 sm:p-6">
                            <h3 className="font-bold text-green-800 dark:text-green-400 mb-3 sm:mb-4 text-sm sm:text-base">💡 Conseils pour créer une formation</h3>
                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-green-700 dark:text-green-300">
                                <li>• Utilisez un titre descriptif et engageant</li>
                                <li>• Indiquez clairement les prérequis</li>
                                <li>• Précisez les objectifs d'apprentissage</li>
                                <li>• Ajoutez une image attrayante</li>
                                <li>• Mentionnez les certifications obtenues</li>
                            </ul>
                        </div>

                        {/* Statistiques */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                            <h3 className="font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">📊 Formations populaires</h3>
                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Réseaux</span>
                                    <span className="font-medium text-foreground">35%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Cybersécurité</span>
                                    <span className="font-medium text-foreground">28%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Cloud</span>
                                    <span className="font-medium text-foreground">23%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
