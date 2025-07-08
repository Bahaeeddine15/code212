import React, { useState, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
    Upload,
    Images,
    Video,
    File,
    ImageIcon,
    X,
    AlertCircle,
    CheckCircle,
    ArrowLeft
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Galerie médias',
        href: '/media',
    },
    {
        title: 'Upload médias',
        href: '/media/create',
    },
];

// Types
interface UploadProgress {
    file: File;
    progress: number;
    status: 'uploading' | 'success' | 'error';
    message?: string;
}

export default function MediaUpload() {
    // États pour la gestion des uploads
    const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // Références pour les inputs de fichier
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fonction pour formater la taille des fichiers
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Fonction pour déterminer le type de fichier
    const getFileType = (file: File): 'image' | 'video' | 'document' => {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        return 'document';
    };

    // Fonction pour valider les fichiers
    const validateFile = (file: File): { valid: boolean; message?: string } => {
        const maxSize = 50 * 1024 * 1024; // 50MB

        if (file.size > maxSize) {
            return { valid: false, message: 'Le fichier dépasse la taille maximale de 50MB' };
        }

        return { valid: true };
    };

    // Fonction pour uploader un fichier avec Inertia
    const uploadFile = async (file: File): Promise<void> => {
        const validation = validateFile(file);
        if (!validation.valid) {
            throw new Error(validation.message);
        }

        const formData = new FormData();
        formData.append('file', file);

        return new Promise((resolve, reject) => {
            // Simuler le progress (Inertia ne supporte pas le progress upload nativement)
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(prev =>
                    prev.map(item =>
                        item.file === file
                            ? { ...item, progress: Math.min(progress, 90) }
                            : item
                    )
                );

                if (progress >= 90) {
                    clearInterval(interval);
                }
            }, 100);

            // Utiliser Inertia pour l'upload
            router.post('/media', formData, {
                onSuccess: () => {
                    clearInterval(interval);
                    setUploadProgress(prev =>
                        prev.map(item =>
                            item.file === file
                                ? { ...item, status: 'success', progress: 100, message: 'Upload réussi' }
                                : item
                        )
                    );
                    resolve();
                },
                onError: (errors) => {
                    clearInterval(interval);
                    const errorMessage = Object.values(errors)[0] as string || 'Erreur lors de l\'upload';
                    setUploadProgress(prev =>
                        prev.map(item =>
                            item.file === file
                                ? { ...item, status: 'error', message: errorMessage }
                                : item
                        )
                    );
                    reject(new Error(errorMessage));
                },
                preserveState: true,
                preserveScroll: true,
            });
        });
    };

    // Fonction pour traiter les fichiers sélectionnés
    const handleFiles = async (files: FileList) => {
        const fileArray = Array.from(files);

        // Initialiser le progress pour chaque fichier
        const initialProgress = fileArray.map(file => ({
            file,
            progress: 0,
            status: 'uploading' as const
        }));

        setUploadProgress(prev => [...prev, ...initialProgress]);

        // Uploader chaque fichier
        for (const file of fileArray) {
            try {
                await uploadFile(file);
            } catch (error) {
                console.error(`Erreur lors de l'upload de ${file.name}:`, error);
            }
        }

        // Nettoyer après 5 secondes
        setTimeout(() => {
            setUploadProgress(prev =>
                prev.filter(item => !fileArray.includes(item.file))
            );
        }, 5000);
    };

    // Fonction pour gérer la sélection de fichiers
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
        // Reset l'input
        event.target.value = '';
    };

    // Gestion du drag & drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload médias" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">

                {/* En-tête */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Upload Médias</h1>
                            <p className="text-emerald-100">Ajoutez vos photos, vidéos et documents</p>
                        </div>
                        <Link
                            href="/media"
                            className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour à la galerie</span>
                        </Link>
                    </div>
                </div>

                {/* Input caché pour upload */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {/* Zone d'upload principale */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${
                            isDragging
                                ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                Déposez vos fichiers ici
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                ou cliquez pour sélectionner des fichiers
                            </p>
                            <div className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium inline-block">
                                Choisir des fichiers
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                Formats supportés: JPG, PNG, GIF, MP4, AVI, PDF, DOC, TXT (Max: 50MB par fichier)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress des uploads */}
                {uploadProgress.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Progression des uploads
                        </h3>
                        <div className="space-y-3">
                            {uploadProgress.map((item, index) => (
                                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                {getFileType(item.file) === 'image' && <ImageIcon className="w-5 h-5 text-blue-600" />}
                                                {getFileType(item.file) === 'video' && <Video className="w-5 h-5 text-red-600" />}
                                                {getFileType(item.file) === 'document' && <File className="w-5 h-5 text-gray-600" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                                                    {item.file.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {formatFileSize(item.file.size)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {item.status === 'uploading' && (
                                                <div className="text-blue-600 text-sm">{item.progress}%</div>
                                            )}
                                            {item.status === 'success' && (
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            )}
                                            {item.status === 'error' && (
                                                <AlertCircle className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                item.status === 'success' ? 'bg-green-600' :
                                                item.status === 'error' ? 'bg-red-600' :
                                                'bg-blue-600'
                                            }`}
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    </div>

                                    {item.message && (
                                        <div className={`text-xs ${
                                            item.status === 'success' ? 'text-green-600' :
                                            item.status === 'error' ? 'text-red-600' :
                                            'text-gray-600'
                                        }`}>
                                            {item.message}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
