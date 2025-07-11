import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, ImageIcon, ArrowLeft, CheckCircle, AlertCircle, Video, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Galerie médias', href: '/media' },
    { title: 'Upload médias', href: '/media/create' },
];

export default function MediaUpload() {
    const [formData, setFormData] = useState({ title: '', detail: '', file: null as File | null });
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
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

        router.post('/media', submitData, {
            onSuccess: () => {
                setIsUploading(false);
                setFormData({ title: '', detail: '', file: null });
                setPreview(null);
                setErrors({});
                router.visit('/media');
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
            <Head title="Upload médias" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">

                {/* Header */}
                <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-3xl font-bold mb-2 text-white">Upload Médias</CardTitle>
                                <p className="text-emerald-100">Ajoutez une nouvelle image ou vidéo à la galerie</p>
                            </div>
                            <Button asChild variant="secondary">
                                <Link href="/media">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Retour à la galerie
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Upload Form */}
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Title Field */}
                            <div>
                                <Label htmlFor="title">Titre du fichier *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le titre du fichier"
                                    disabled={isUploading}
                                    className={errors.title ? 'border-red-500' : ''}
                                />
                                {errors.title && <ErrorMessage error={errors.title} />}
                            </div>

                            {/* Detail Field */}
                            <div>
                                <Label htmlFor="detail">Description *</Label>
                                <Textarea
                                    id="detail"
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez le fichier..."
                                    disabled={isUploading}
                                    className={errors.detail ? 'border-red-500' : ''}
                                    rows={4}
                                />
                                {errors.detail && <ErrorMessage error={errors.detail} />}
                            </div>

                            {/* File Input */}
                            <div>
                                <Label>Fichier *</Label>
                                <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                                    errors.file ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
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
                                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Sélectionnez un fichier
                                                </p>
                                                <p className="text-sm text-gray-500 mb-4">Cliquez pour choisir un fichier</p>
                                                <Button type="button" className="pointer-events-none">
                                                    Parcourir
                                                </Button>
                                                <p className="text-xs text-gray-400 mt-4">
                                                    Formats: JPG, JPEG, PNG, GIF, MP4, AVI, MOV, WMV (Max: 50MB)
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && <ErrorMessage error={errors.file} />}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6">
                                <Button type="submit" disabled={isUploading} className="flex items-center space-x-2">
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
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
