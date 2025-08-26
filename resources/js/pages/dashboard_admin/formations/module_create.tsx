import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Plus, Info, BookOpen } from 'lucide-react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

// Accept formations as a prop from Inertia page
interface Props {
    formationId: number;
    formations: Formation[];
}

interface Formation {
    id: number;
    title: string;
}

export default function ModuleCreate({ formationId, formations = [] }: Props) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        duration: '',
        order: 1,
        file: null as File | null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log('Formation ID:', formationId);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Formations', href: '/admin/formations' },
        { title: 'Modules', href: `/admin/formations/${formationId}/modules` },
        { title: 'Nouveau module', href: '#' },
    ];

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formationId) {
            setErrors({ formationId: 'Formation ID manquant.' });
            return;
        }
        
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('duration', form.duration);
        formData.append('order', form.order.toString());
        if (form.file) formData.append('file', form.file);

        // ✅ Fix: Use the correct route with formation ID
        router.post(`/admin/formations/${formationId}/modules`, formData, {
            forceFormData: true,
            onError: (err) => {
                setErrors(err);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
                router.visit(`/admin/formations/${formationId}/modules`);
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, file: e.target.files?.[0] || null }));
        setErrors(prev => ({ ...prev, file: '' }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nouveau module" />

            <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg self-start">
                                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Ajouter un module</h1>
                                <p className="text-muted-foreground mt-1 sm:mt-2 text-base sm:text-lg">Créez un nouveau module de formation</p>
                            </div>
                        </div>
                        <Link
                            href={`/admin/formations/${formationId}/modules`}
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700 self-start lg:self-auto text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Retour aux modules</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>
                </div>

                {/* Layout organisé avec sidebar */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                    {/* Section principale - Formulaire */}
                    <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                        {/* Informations principales */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-bold text-foreground">Détails du module</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre du module *</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Introduction aux réseaux"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Durée *</label>
                                        <input
                                            type="text"
                                            value={form.duration}
                                            onChange={e => handleChange('duration', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: 2 heures"
                                            required
                                        />
                                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        placeholder="Décrivez le contenu du module, les concepts abordés..."
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Ordre d'affichage *</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={e => handleChange('order', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="1"
                                        min={1}
                                        required
                                    />
                                    {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Fichier de support</label>
                                    <input
                                        type="file"
                                        accept=".pdf,video/*,.mp4,.avi,.mov"
                                        onChange={handleFileChange}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">Formats acceptés: PDF, MP4, AVI, MOV • Taille max: 100MB</p>
                                    {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
                                    >
                                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                        {isSubmitting ? 'Création...' : 'Créer le module'}
                                    </button>
                                    <Link
                                        href={`/admin/formations/${formationId}/modules`}
                                        className="px-4 sm:px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
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
                                    href={`/admin/formations/${formationId}/modules`}
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Retour aux modules
                                </Link>
                            </div>
                        </div>

                        {/* Informations */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-600" />
                                Informations
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Formation ID:</span>
                                    <span className="font-medium text-foreground">#{formationId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Type de fichier:</span>
                                    <span className="font-medium text-foreground">PDF/Vidéo</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Taille max:</span>
                                    <span className="font-medium text-foreground">100MB</span>
                                </div>
                            </div>
                        </div>

                        {/* Conseils */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800 p-6">
                            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-4">💡 Conseils de création</h3>
                            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                                <li>• Choisissez un titre clair et descriptif</li>
                                <li>• Respectez l'ordre logique des modules</li>
                                <li>• Optimisez vos fichiers pour le web</li>
                                <li>• Testez le contenu avant publication</li>
                                <li>• Adaptez la durée au contenu réel</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
