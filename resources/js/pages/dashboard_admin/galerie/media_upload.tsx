import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Upload, ImageIcon, ArrowLeft, CheckCircle, AlertCircle, Video, FileText, Plus, Camera } from 'lucide-react';

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
                    <img src={preview} alt="Preview" className="mx-auto mb-4 max-w-xs max-h-48 object-cover rounded-xl border-2 border-gray-200" />
                )}
                {fileType === 'video' && (
                    <video src={preview} controls className="mx-auto mb-4 max-w-xs max-h-48 rounded-xl border-2 border-gray-200" />
                )}
                <div className="text-sm font-medium text-gray-900 mb-2">{formData.file?.name}</div>
                <div className="text-xs text-gray-500">{formData.file && formatFileSize(formData.file.size)}</div>
                <p className="text-sm text-blue-600 mt-2">Cliquez pour changer le fichier</p>
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
            
            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Upload Médias</h1>
                                <p className="text-gray-600 mt-2 text-lg">Ajoutez une nouvelle image ou vidéo à la galerie</p>
                            </div>
                        </div>
                        <Link
                            href="/media"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour à la galerie</span>
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
                            <h2 className="text-2xl font-bold text-gray-900">Nouveau fichier média</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Titre */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Titre du fichier *</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le titre du fichier"
                                    disabled={isUploading}
                                    className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
                                />
                                {errors.title && <ErrorMessage error={errors.title} />}
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Description *</label>
                                <textarea
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez le fichier..."
                                    disabled={isUploading}
                                    className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none ${errors.detail ? 'border-red-500' : 'border-gray-200'}`}
                                    rows={4}
                                />
                                {errors.detail && <ErrorMessage error={errors.detail} />}
                            </div>

                            {/* Upload de fichier */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Fichier *</label>
                                <div className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                                    errors.file ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
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
                                                <p className="text-lg font-semibold text-gray-700 mb-2">
                                                    Sélectionnez un fichier
                                                </p>
                                                <p className="text-sm text-gray-500 mb-4">Cliquez pour choisir un fichier</p>
                                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold pointer-events-none">
                                                    Parcourir
                                                </div>
                                                <p className="text-xs text-gray-400 mt-4">
                                                    Formats: JPG, JPEG, PNG, GIF, MP4, AVI, MOV, WMV (Max: 50MB)
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && <ErrorMessage error={errors.file} />}
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-4 pt-8 border-t border-gray-200">
                                <button 
                                    type="submit" 
                                    disabled={isUploading}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 disabled:opacity-50"
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
                                    href="/media"
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
