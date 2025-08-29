import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Edit, Info, BookOpen, File, Video, FileText, PlayCircle, MoreVertical } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
    file_path?: string;
}

interface Formation {
    id: number;
    title: string;
    description: string;
}

interface Props {
    module: Module;
    formation: Formation;
    formationId: number;
}

export default function ModuleEdit({ module, formation, formationId }: Props) {
    const [form, setForm] = useState({
        title: module.title,
        description: module.description,
        duration: module.duration,
        order: module.order,
        file: module.file_path || null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [existingFile, setExistingFile] = useState<string | null>(module.file_path || null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Breadcrumbs
    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Formations', href: '/admin/formations' },
        { title: 'Modules', href: `/admin/formations/${formationId}/modules` },
        { title: `Modifier`, href: '#' },
    ];

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: field === 'order' ? Number(value) : String(value)
        }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setErrors(prev => ({ ...prev, file: '' }));

        if (selectedFile) {
            if (selectedFile.type.startsWith('video/')) {
                setPreview(URL.createObjectURL(selectedFile));
            } else if (selectedFile.type === 'application/pdf') {
                setPreview(null); // PDFs can't be previewed easily
            }
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('duration', String(form.duration));
        formData.append('order', String(form.order));

        if (file) {
            formData.append('file', file);
        }

        router.post(`/admin/modules/${module.id}?_method=PUT`, formData, {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier le module" />

            <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg self-start">
                                <Edit className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Modifier le module</h1>
                                <p className="text-muted-foreground mt-2 text-lg">Éditez les informations du module "{module.title}"</p>
                            </div>
                        </div>
                        <Link
                            href={`/admin/formations/${formationId}/modules`}
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour aux modules</span>
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

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre du module *</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
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
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
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
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors resize-none"
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
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="1"
                                        min={1}
                                        required
                                    />
                                    {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Fichier de support</label>
                                    
                                    {/* Fichier actuel */}
                                    {existingFile && (
                                        <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    {existingFile.endsWith('.pdf') ? (
                                                        <FileText className="w-8 h-8 text-red-500" />
                                                    ) : (
                                                        <PlayCircle className="w-8 h-8 text-green-500" />
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-foreground">Fichier actuel</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {existingFile.split('/').pop()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <a
                                                    href={`/storage/${existingFile}`}
                                                    target="_blank"
                                                    className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                >
                                                    {existingFile.endsWith('.pdf') ? (
                                                        <>
                                                            <FileText className="w-4 h-4" />
                                                            Voir PDF
                                                        </>
                                                    ) : (
                                                        <>
                                                            <PlayCircle className="w-4 h-4" />
                                                            Lire vidéo
                                                        </>
                                                    )}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept=".pdf,video/*,.mp4,.avi,.mov"
                                        onChange={handleFileChange}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {existingFile ? 'Sélectionnez un nouveau fichier pour remplacer l\'actuel' : 'Formats acceptés: PDF, MP4, AVI, MOV • Taille max: 100MB'}
                                    </p>
                                    {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-5 h-5" />
                                        {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                                    </button>
                                    <Link
                                        href={`/admin/formations/${formationId}/modules`}
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
                        {/* Informations du module */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-600" />
                                Informations du module
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">ID Module:</span>
                                    <span className="font-medium text-foreground">#{module.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Formation:</span>
                                    <span className="font-medium text-foreground">{formation.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ordre actuel:</span>
                                    <span className="font-medium text-foreground">{module.order}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Fichier actuel:</span>
                                    <span className="font-medium text-foreground">
                                        {existingFile ? '✓' : 'Aucun'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions rapides */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Edit className="w-5 h-5 text-blue-600" />
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
                                <Link
                                    href={`/admin/formations/${formationId}`}
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Voir la formation
                                </Link>
                            </div>
                        </div>

                        {/* Conseils */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800 p-6">
                            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-4">💡 Conseils de modification</h3>
                            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                                <li>• Vérifiez l'ordre des modules après modification</li>
                                <li>• Testez les nouveaux fichiers avant sauvegarde</li>
                                <li>• Gardez une cohérence dans les durées</li>
                                <li>• Prévisualisez le contenu après modification</li>
                                <li>• Sauvegardez régulièrement vos changements</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
