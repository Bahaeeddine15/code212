import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
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
                    <img src={preview} alt="Preview" className="mx-auto mb-4 max-w-xs max-h-48 object-cover rounded-lg border border-gray-200" />
                )}
                {fileType === 'video' && (
                    <video src={preview} controls className="mx-auto mb-4 max-w-xs max-h-48 rounded-lg border border-gray-200" />
                )}
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{formData.file?.name}</div>
                <div className="text-xs text-gray-500">{formData.file && formatFileSize(formData.file.size)}</div>
                <p className="text-sm text-emerald-600 mt-2">Cliquez pour changer le fichier</p>
            </div>
        );
    };

    const FileIcon = () => {
        if (!formData.file) return <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />;
        const fileType = getFileType(formData.file);
        const iconClass = "w-12 h-12 mx-auto mb-4";

        if (fileType === 'image') return <ImageIcon className={`${iconClass} text-blue-500`} />;
        if (fileType === 'video') return <Video className={`${iconClass} text-red-500`} />;
        return <FileText className={`${iconClass} text-gray-500`} />;
    };

    const ErrorMessage = ({ error }: { error: string }) => (
        <div className="flex items-center mt-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Éditer: ${media.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/media"
                            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la galerie
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Éditer le média
                    </h1>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Modifier le média</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Titre du fichier *</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Entrez le titre du fichier"
                                        disabled={isSubmitting}
                                        className={errors.title ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.title && <ErrorMessage error={errors.title} />}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="detail">Description *</Label>
                                    <Textarea
                                        id="detail"
                                        name="detail"
                                        value={formData.detail}
                                        onChange={handleInputChange}
                                        placeholder="Décrivez le fichier..."
                                        disabled={isSubmitting}
                                        className={errors.detail ? 'border-red-500' : ''}
                                        rows={4}
                                        required
                                    />
                                    {errors.detail && <ErrorMessage error={errors.detail} />}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="folder">Nom du dossier *</Label>
                                    <Input
                                        id="folder"
                                        name="folder"
                                        value={formData.folder}
                                        onChange={handleInputChange}
                                        placeholder="Nom du dossier"
                                        disabled={isSubmitting}
                                        className={errors.folder ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.folder && <ErrorMessage error={errors.folder} />}
                                </div>
                            </div>

                            {/* File Input */}
                            <div>
                                <Label>Remplacer le fichier (optionnel)</Label>
                                <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
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
                                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Remplacer le fichier
                                                </p>
                                                <p className="text-sm text-gray-500 mb-4">Cliquez pour choisir un nouveau fichier</p>
                                                <Button type="button" variant="outline" className="pointer-events-none">
                                                    Parcourir
                                                </Button>
                                                <p className="text-xs text-gray-400 mt-4">
                                                    Laissez vide pour conserver le fichier actuel
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && <ErrorMessage error={errors.file} />}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700">
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                                <Button type="button" variant="destructive" onClick={handleDelete}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                </Button>
                                <Link href="/admin/media">
                                    <Button type="button" variant="outline">
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
