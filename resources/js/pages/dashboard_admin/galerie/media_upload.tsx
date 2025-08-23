import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Upload, ImageIcon, ArrowLeft, CheckCircle, AlertCircle, Video, FileText, Plus, Camera } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Galerie médias', href: '/admin/media' },
    { title: 'Upload médias', href: '/admin/media/create' },
];

export default function MediaUpload() {
    const [formData, setFormData] = useState({ title: '', detail: '', file: null as File | null, folder: '' });
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const getFileType = (file: File): 'image' | 'video' | 'other' => {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        return 'other';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, file }));
            const fileType = getFileType(file);

            if (fileType === 'image') {
                const reader = new FileReader();
                reader.onload = (e) => setPreview(e.target?.result as string);
                reader.readAsDataURL(file);
            } else if (fileType === 'video') {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }

            if (errors.file) setErrors(prev => ({ ...prev, file: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
        if (!formData.detail.trim()) newErrors.detail = 'La description est requise';
        if (!formData.folder.trim()) newErrors.folder = 'Le dossier est requis';
        if (!formData.file) newErrors.file = 'Un fichier est requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsUploading(true);
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('detail', formData.detail);
        submitData.append('file', formData.file!);
        submitData.append('folder', formData.folder);

        router.post('/admin/media', submitData, {
            forceFormData: true,
            onSuccess: () => {
                setIsUploading(false);
                setFormData({ title: '', detail: '', file: null, folder: '' });
                setPreview(null);
                setErrors({});
                router.visit('/admin/media');
            },
            onError: (errors) => {
                setIsUploading(false);
                setErrors(errors);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const FilePreview = () => {
        if (!formData.file || !preview) return null;
        const fileType = getFileType(formData.file);

        return (
            <div className="text-center">
                {fileType === 'image' && (
                    <img src={preview} alt="Preview" className="mx-auto mb-4 max-w-xs max-h-48 object-cover rounded-xl border-2 border-border" />
                )}
                {fileType === 'video' && (
                    <video src={preview} controls className="mx-auto mb-4 max-w-xs max-h-48 rounded-xl border-2 border-border" />
                )}
                <div className="text-sm font-medium text-foreground mb-2">{formData.file?.name}</div>
                <div className="text-xs text-muted-foreground">{formData.file && formatFileSize(formData.file.size)}</div>
                <p className="text-sm text-primary mt-2">Cliquez pour changer le fichier</p>
            </div>
        );
    };

    const FileIcon = () => {
        if (!formData.file) return <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />;
        const fileType = getFileType(formData.file);
        const iconClass = "w-12 h-12 mx-auto mb-4";

        if (fileType === 'image') return <ImageIcon className={`${iconClass} text-blue-500`} />;
        if (fileType === 'video') return <Video className={`${iconClass} text-red-500`} />;
        return <FileText className={`${iconClass} text-muted-foreground`} />;
    };

    const ErrorMessage = ({ error }: { error: string }) => (
        <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload médias" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Upload Médias</h1>
                                <p className="text-muted-foreground mt-2 text-lg">Ajoutez une nouvelle image ou vidéo à la galerie</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/media"
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-700"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour à la galerie</span>
                        </Link>
                    </div>
                </div>

                {/* Layout organisé avec sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section principale - Formulaire */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                    <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-bold text-foreground">Informations du média</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Titre du fichier *</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Photo événement 2024"
                                            disabled={isUploading}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                        {errors.title && <ErrorMessage error={errors.title} />}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Dossier *</label>
                                        <input
                                            type="text"
                                            name="folder"
                                            value={formData.folder}
                                            onChange={handleInputChange}
                                            placeholder="Ex: evenements-2024"
                                            disabled={isUploading}
                                            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors"
                                            required
                                        />
                                        {errors.folder && <ErrorMessage error={errors.folder} />}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                                    <textarea
                                        name="detail"
                                        value={formData.detail}
                                        onChange={handleInputChange}
                                        placeholder="Décrivez le contenu de ce fichier..."
                                        disabled={isUploading}
                                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        rows={4}
                                    />
                                    {errors.detail && <ErrorMessage error={errors.detail} />}
                                </div>

                                {/* Zone d'upload */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Fichier à uploader *</label>
                                    <div className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                                        errors.file ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-border hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                                    }`}>
                                        <input
                                            type="file"
                                            accept="image/*,video/mp4,video/avi,video/mov,video/wmv,.jpeg,.jpg,.png,.gif,.mp4,.avi,.mov,.wmv"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-input"
                                            disabled={isUploading}
                                        />
                                        <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center justify-center">
                                            {preview && formData.file ? (
                                                <FilePreview />
                                            ) : (
                                                <div className="text-center">
                                                    <FileIcon />
                                                    <p className="text-lg font-semibold text-foreground mb-2">
                                                        Glissez votre fichier ici
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mb-4">ou cliquez pour sélectionner</p>
                                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold pointer-events-none">
                                                        Choisir un fichier
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-4">
                                                        JPG, JPEG, PNG, GIF, MP4, AVI, MOV, WMV • Max 50MB
                                                    </p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    {errors.file && <ErrorMessage error={errors.file} />}
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isUploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Upload en cours...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                <span>Uploader le fichier</span>
                                            </>
                                        )}
                                    </button>
                                    <Link
                                        href="/admin/media"
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
                                    href="/admin/media"
                                    className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Retour à la galerie
                                </Link>
                            </div>
                        </div>

                        {/* Conseils pour l'upload */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl shadow-lg border border-green-200 dark:border-green-800 p-6">
                            <h3 className="font-bold text-green-800 dark:text-green-400 mb-4">💡 Conseils pour vos médias</h3>
                            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                                <li>• Utilisez des noms explicites</li>
                                <li>• Organisez par dossiers thématiques</li>
                                <li>• Optimisez la taille des images</li>
                                <li>• Ajoutez des descriptions détaillées</li>
                                <li>• Vérifiez les droits d'usage</li>
                            </ul>
                        </div>

                        {/* Formats supportés */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-blue-600" />
                                Formats supportés
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Images</span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded">JPG, PNG, GIF</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Vidéos</span>
                                    <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 px-2 py-1 rounded">MP4, AVI, MOV</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Taille max</span>
                                    <span className="font-medium text-foreground">50 MB</span>
                                </div>
                            </div>
                        </div>           
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}