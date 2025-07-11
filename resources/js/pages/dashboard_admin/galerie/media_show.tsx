import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit3, Trash2, Download, Eye, Calendar, User, FileText, Image } from 'lucide-react';

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
}

interface MediaShowProps {
    media: MediaFile;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Galerie médias', href: '/media' },
    { title: 'Aperçu média', href: '#' },
];

export default function MediaShow({ media }: MediaShowProps) {
    const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const getFileType = (filePath: string): 'image' | 'video' | 'other' => {
        const extension = filePath.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'image';
        if (['mp4', 'avi', 'mov', 'wmv'].includes(extension || '')) return 'video';
        return 'other';
    };

    const getFileSize = async (url: string) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentLength = response.headers.get('content-length');
            if (contentLength) {
                const bytes = parseInt(contentLength);
                return formatFileSize(bytes);
            }
        } catch (error) {
            console.error('Error getting file size:', error);
        }
        return 'Taille inconnue';
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleEdit = () => router.visit(`/media/${media.id}/edit`);
    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
            router.delete(`/media/${media.id}`, {
                onSuccess: () => router.visit('/media')
            });
        }
    };
    const handleDownload = () => window.location.href = `/media/${media.id}/download`;
    const handleViewFull = () => window.open(getImageUrl(media.file_path), '_blank');

    const fileType = getFileType(media.file_path);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Aperçu: ${media.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">

                {/* Header */}
                <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-3xl font-bold mb-2 text-white">{media.title}</CardTitle>
                                <p className="text-blue-100">Aperçu détaillé du média</p>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="secondary" onClick={handleViewFull}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Voir en grand
                                </Button>
                                <Button variant="secondary" onClick={handleDownload}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Télécharger
                                </Button>
                                <Button asChild variant="secondary">
                                    <Link href="/media">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Retour
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Media Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center">
                                        <Image className="w-5 h-5 mr-2 text-blue-600" />
                                        Aperçu du média
                                    </CardTitle>
                                    <Badge variant="secondary" className="flex items-center">
                                        {fileType === 'image' && <Image className="w-3 h-3 mr-1" />}
                                        {fileType === 'video' && <FileText className="w-3 h-3 mr-1" />}
                                        {fileType === 'other' && <FileText className="w-3 h-3 mr-1" />}
                                        {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
                                    {fileType === 'image' ? (
                                        <img
                                            src={getImageUrl(media.file_path)}
                                            alt={media.title}
                                            className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                                            onClick={handleViewFull}
                                        />
                                    ) : fileType === 'video' ? (
                                        <video
                                            src={getImageUrl(media.file_path)}
                                            controls
                                            className="max-w-full max-h-[500px] rounded-lg shadow-lg"
                                        />
                                    ) : (
                                        <div className="text-center p-8">
                                            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                                                Aperçu non disponible
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Ce type de fichier ne peut pas être prévisualisé
                                            </p>
                                            <Button onClick={handleDownload} variant="outline">
                                                <Download className="w-4 h-4 mr-2" />
                                                Télécharger le fichier
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Media Information */}
                    <div className="space-y-6">
                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button onClick={handleEdit} className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Modifier
                                </Button>
                                <Button onClick={handleDelete} variant="destructive" className="w-full">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                </Button>
                                <Button onClick={handleDownload} variant="outline" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    Télécharger
                                </Button>
                            </CardContent>
                        </Card>

                        {/* File Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations du fichier</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nom original</label>
                                    <p className="text-sm font-medium bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1">
                                        {media.original_name}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Slug</label>
                                    <p className="text-sm font-medium bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1">
                                        {media.slug}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Chemin</label>
                                    <p className="text-sm font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1 break-all">
                                        {media.file_path}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Détails</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                                    <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded mt-1 leading-relaxed">
                                        {media.detail}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Créé le</p>
                                            <p className="text-sm font-medium">{formatDate(media.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Modifié le</p>
                                            <p className="text-sm font-medium">{formatDate(media.updated_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">ID utilisateur</p>
                                            <p className="text-sm font-medium">{media.user_id}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
