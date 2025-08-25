import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, ImageIcon, ArrowLeft, CheckCircle, AlertCircle, Video, FileText, Save, Trash2 } from 'lucide-react';

interface MediaFile {
    id: number;
    title: string;
    slug: string;
    detail: string;
    file_path: string;
    original_name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    folder: string; // Added folder property
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Galerie médias', href: '/admin/media' },
    { title: 'Éditer média', href: '#' },
];

export default function MediaEdit({ media }: { media: MediaFile }) {
    const [formData, setFormData] = useState({
        title: media.title,
        detail: media.detail,
        file: null as File | null,
        folder: media.folder || '',
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        if (!formData.folder.trim()) newErrors.folder = 'Le nom du dossier est requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('detail', formData.detail);
        submitData.append('folder', formData.folder);
        submitData.append('_method', 'PUT');

        if (formData.file) {
            submitData.append('file', formData.file);
        }

        router.post(`/admin/media/${media.id}`, submitData, {
            forceFormData: true,
            onSuccess: () => {
                setIsSubmitting(false);
                router.visit('/admin/media');
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors);
            }
        });
    };

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
            router.delete(`/admin/media/${media.id}`, {
                onSuccess: () => router.visit('/admin/media'),
            });
        }
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
                    <img src={preview} alt="Preview" className="mx-auto mb-3 sm:mb-4 max-w-xs max-h-32 sm:max-h-48 object-cover rounded-lg border border-border" />
                )}
                {fileType === 'video' && (
                    <video src={preview} controls className="mx-auto mb-3 sm:mb-4 max-w-xs max-h-32 sm:max-h-48 rounded-lg border border-border" />
                )}
                <div className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mb-1 sm:mb-2 break-all">{formData.file?.name}</div>
                <div className="text-xs text-muted-foreground">{formData.file && formatFileSize(formData.file.size)}</div>
                <p className="text-xs sm:text-sm text-emerald-600 mt-2">Cliquez pour changer le fichier</p>
            </div>
        );
    };

    const FileIcon = () => {
        if (!formData.file) return <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />;
        const fileType = getFileType(formData.file);
        const iconClass = "w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4";

        if (fileType === 'image') return <ImageIcon className={`${iconClass} text-blue-500`} />;
        if (fileType === 'video') return <Video className={`${iconClass} text-red-500`} />;
        return <FileText className={`${iconClass} text-muted-foreground`} />;
    };

    const ErrorMessage = ({ error }: { error: string }) => (
        <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-xs sm:text-sm">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {error}
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Éditer: ${media.title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 rounded-xl p-3 sm:p-4 lg:p-6 overflow-x-auto">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                            href="/admin/media"
                            className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground hover:text-emerald-600 transition-colors font-medium p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        >
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Retour à la galerie</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>
                    <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-foreground dark:text-gray-100 break-words">
                        Éditer le média
                    </h1>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader className="p-3 sm:p-4 lg:p-6">
                        <CardTitle className="text-sm sm:text-base lg:text-lg">Modifier le média</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs sm:text-sm lg:text-base">Titre du fichier *</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Entrez le titre du fichier"
                                        disabled={isSubmitting}
                                        className={`text-xs sm:text-sm lg:text-base px-3 sm:px-4 py-2 sm:py-3 ${errors.title ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.title && <ErrorMessage error={errors.title} />}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="folder" className="text-xs sm:text-sm lg:text-base">Nom du dossier *</Label>
                                    <Input
                                        id="folder"
                                        name="folder"
                                        value={formData.folder}
                                        onChange={handleInputChange}
                                        placeholder="Ex: evenements-2024"
                                        disabled={isSubmitting}
                                        className={`text-xs sm:text-sm lg:text-base px-3 sm:px-4 py-2 sm:py-3 ${errors.folder ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.folder && <ErrorMessage error={errors.folder} />}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="detail" className="text-xs sm:text-sm lg:text-base">Description *</Label>
                                <Textarea
                                    id="detail"
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez le fichier..."
                                    disabled={isSubmitting}
                                    className={`text-xs sm:text-sm lg:text-base px-3 sm:px-4 py-2 sm:py-3 ${errors.detail ? 'border-red-500' : ''}`}
                                    rows={4}
                                    required
                                />
                                {errors.detail && <ErrorMessage error={errors.detail} />}
                            </div>

                            {/* File Input */}
                            <div>
                                <Label className="text-xs sm:text-sm lg:text-base">Remplacer le fichier (optionnel)</Label>
                                <div className={`border-2 border-dashed rounded-lg p-3 sm:p-4 lg:p-6 transition-colors ${
                                    errors.file ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                    <input
                                        type="file"
                                        accept="image/*,video/mp4,video/avi,video/mov,video/wmv,.jpeg,.jpg,.png,.gif,.mp4,.avi,.mov,.wmv"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-input"
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center justify-center">
                                        {preview && formData.file ? (
                                            <FilePreview />
                                        ) : (
                                            <div className="text-center">
                                                <FileIcon />
                                                <p className="text-sm sm:text-base lg:text-lg font-medium text-foreground dark:text-gray-300 mb-2">
                                                    Remplacer le fichier
                                                </p>
                                                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Cliquez pour choisir un nouveau fichier</p>
                                                <Button type="button" variant="outline" className="pointer-events-none text-xs sm:text-sm">
                                                    Parcourir
                                                </Button>
                                                <p className="text-xs text-gray-400 mt-3 sm:mt-4">
                                                    Laissez vide pour conserver le fichier actuel
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && <ErrorMessage error={errors.file} />}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                                <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm lg:text-base order-1 min-h-[44px] sm:min-h-[48px]">
                                    <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                                <Button type="button" variant="destructive" onClick={handleDelete} className="text-xs sm:text-sm lg:text-base order-3 sm:order-2 min-h-[44px] sm:min-h-[48px]">
                                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Supprimer
                                </Button>
                                <Link href="/admin/media" className="order-2 sm:order-3">
                                    <Button type="button" variant="outline" className="w-full text-xs sm:text-sm lg:text-base min-h-[44px] sm:min-h-[48px]">
                                        Annuler
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
