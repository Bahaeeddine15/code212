import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Edit, Plus, Info, GraduationCap } from 'lucide-react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface Formation {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    category: string;
    link?: string;
    thumbnail?: string;
    language?: string; // <-- add this
}

interface Props {
    formation: Formation;
}

export default function FormationEdit({ formation }: Props) {
    const [form, setForm] = useState({
        title: formation.title,
        description: formation.description,
        level: formation.level,
        duration: formation.duration,
        category: formation.category,
        link: formation.link || '',
        status: 'published' as 'published' | 'draft',
        thumbnail: null as File | null,
        language: formation.language || '', // <-- add this
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(formation.thumbnail ? `/storage/${formation.thumbnail}` : null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Gestion des formations', href: '/admin/formations' },
        { title: 'Modifier formation', href: '#' },
    ];

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
        if (field === 'thumbnail' && value) {
            setPreview(URL.createObjectURL(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('level', form.level);
        formData.append('duration', form.duration);
        formData.append('category', form.category);
        formData.append('link', form.link);
        formData.append('status', form.status);
        if (form.thumbnail) {
            formData.append('thumbnail', form.thumbnail);
        }
        formData.append('language', form.language);
        router.post(`/admin/formations/${formation.id}?_method=PUT`, formData, {
            forceFormData: true,
            onError: (err) => {
                setErrors(err);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier la formation" />

            <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg self-start">
                                <Edit className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Modifier la formation</h1>
                                <p className="text-muted-foreground mt-1 sm:mt-2 text-base sm:text-lg line-clamp-1">Modifiez "{formation.title}"</p>
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
                                <h2 className="text-lg sm:text-xl font-bold text-foreground">Détails de la formation</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre de la formation *</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Certification Cisco CCNA"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Niveau *</label>
                                        <select
                                            value={form.level}
                                            onChange={e => handleChange('level', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            required
                                        >
                                            <option value="">Sélectionner un niveau</option>
                                            <option value="Débutant">Débutant</option>
                                            <option value="Intermédiaire">Intermédiaire</option>
                                            <option value="Avancé">Avancé</option>
                                        </select>
                                        {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        placeholder="Décrivez le contenu et les objectifs de la formation..."
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Durée (en heures) *</label>
                                        <input
                                            type="number"
                                            value={form.duration}
                                            onChange={e => handleChange('duration', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="40"
                                            min={1}
                                            required
                                        />
                                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Catégorie *</label>
                                        <input
                                            type="text"
                                            value={form.category}
                                            onChange={e => handleChange('category', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ex: Réseaux, Sécurité, Développement"
                                            required
                                        />
                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Statut de publication</label>
                                        <select
                                        value={form.status}
                                        onChange={e => handleChange('status', e.target.value as 'published' | 'draft')}
                                        className="w-full bg-card border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground focus:border-blue-500 focus:outline-none transition-colors [color-scheme:dark]"
                                        >
                                        <option value="published" className="bg-card text-foreground">Publié</option>
                                        <option value="draft" className="bg-card text-foreground">Brouillon</option>
                                        </select>
                                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Lien externe (optionnel)</label>
                                    <input
                                        type="url"
                                        value={form.link}
                                        onChange={e => handleChange('link', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="https://www.cisco.com/certification/ccna"
                                    />
                                    {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Miniature (optionnelle)</label>
                                    {preview && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-foreground mb-2">Image actuelle :</p>
                                            <img src={preview} alt="Miniature" className="w-32 h-20 object-cover rounded-lg border-2 border-border" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => handleChange('thumbnail', e.target.files ? e.target.files[0] : null)}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">Formats acceptés: JPG, PNG, WebP • Taille recommandée: 400x250px</p>
                                    {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Langue</label>
                                    <input
                                        type="text"
                                        value={form.language}
                                        onChange={e => handleChange('language', e.target.value)}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="Ex: Français, Anglais"
                                        required
                                    />
                                    {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-5 h-5" />
                                        {isSubmitting ? 'Modification...' : 'Modifier la formation'}
                                    </button>
                                    <Link
                                        href="/admin/formations"
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
                        {/* Informations actuelles */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-600" />
                                Informations actuelles
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Niveau:</span>
                                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                                        formation.level === 'Débutant' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                        formation.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                    }`}>
                                        {formation.level}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Durée:</span>
                                    <span className="font-medium text-foreground">{formation.duration}h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Catégorie:</span>
                                    <span className="font-medium text-foreground text-right max-w-32 truncate">{formation.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Lien externe:</span>
                                    <span className="font-medium text-foreground">
                                        {formation.link ? '✅ Présent' : '❌ Aucun'}
                                    </span>
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
                                    href="/admin/formations"
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Retour aux formations
                                </Link>
                                {formation.link && (
                                    <a
                                        href={formation.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                    >
                                        🔗 Voir le lien externe
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Conseils */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800 p-6">
                            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-4">💡 Conseils de modification</h3>
                            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                                <li>• Vérifiez la cohérence niveau/durée</li>
                                <li>• Testez le lien externe s'il y en a un</li>
                                <li>• Optimisez la miniature pour un meilleur rendu</li>
                                <li>• Adaptez la description aux objectifs</li>
                                <li>• Validez les prérequis nécessaires</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
