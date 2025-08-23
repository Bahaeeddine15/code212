import React, { useRef, useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit3, Trash2, Download, Eye, Calendar, User, FileText, Image } from 'lucide-react';

// Add the quality type definition
type QualityType = 'original' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';

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
    qualities: Record<string, string>;
    streamUrl: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Galerie médias', href: '/admin/media' },
    { title: 'Aperçu média', href: '#' },
];

export default function MediaShow({ media, qualities, streamUrl }: MediaShowProps) {
    const [currentQuality, setCurrentQuality] = useState<QualityType>('original');
    const videoRef = useRef<HTMLVideoElement>(null);
    
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

    const handleEdit = () => router.visit(`/admin/media/${media.id}/edit`);
    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
            router.delete(`/admin/media/${media.id}`, {
                onSuccess: () => router.visit('/admin/media')
            });
        }
    };
    const handleDownload = () => window.location.href = `/admin/media/${media.id}/download`;
    const handleViewFull = () => window.open(getImageUrl(media.file_path), '_blank');

    const changeVideoQuality = (quality: QualityType) => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const wasPlaying = !videoRef.current.paused;
            
            setCurrentQuality(quality);
            
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.currentTime = currentTime;
                    if (wasPlaying) {
                        videoRef.current.play().catch(console.error);
                    }
                }
            }, 100);
        }
    };

    const getQualityLabel = (quality: QualityType): string => {
        const labels: Record<QualityType, string> = {
            'original': 'Originale',
            '144p': '144p (Ultra low)',
            '240p': '240p (Low)',
            '360p': '360p (SD)',
            '480p': '480p (SD)',
            '720p': '720p (HD)',
            '1080p': '1080p (Full HD)'
        };
        return labels[quality];
    };

    const getQualityColor = (quality: QualityType): string => {
        const colors: Record<QualityType, string> = {
            'original': 'bg-purple-600',
            '144p': 'bg-red-600',
            '240p': 'bg-orange-600',
            '360p': 'bg-yellow-600',
            '480p': 'bg-green-600',
            '720p': 'bg-blue-600',
            '1080p': 'bg-indigo-600'
        };
        return colors[quality];
    };

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
                                    <Link href="/admin/media">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Retour
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Enhanced Media Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center">
                                        <Image className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                        Aperçu du média
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="flex items-center">
                                            {fileType === 'image' && <Image className="w-3 h-3 mr-1" />}
                                            {fileType === 'video' && <FileText className="w-3 h-3 mr-1" />}
                                            {fileType === 'other' && <FileText className="w-3 h-3 mr-1" />}
                                            {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
                                        </Badge>
                                        {fileType === 'video' && (
                                            <Badge className={`${getQualityColor(currentQuality)} text-white`}>
                                                {getQualityLabel(currentQuality)}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-background dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[400px] relative">
                                    {fileType === 'image' ? (
                                        <img
                                            src={getImageUrl(media.file_path)}
                                            alt={media.title}
                                            className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                                            onClick={handleViewFull}
                                        />
                                    ) : fileType === 'video' ? (
                                        <>
                                            <video
                                                ref={videoRef}
                                                src={currentQuality === 'original' ? streamUrl : qualities[currentQuality]}
                                                controls
                                                controlsList="nodownload"
                                                className="max-w-full max-h-[500px] rounded-lg shadow-lg"
                                                style={{ background: "#000" }}
                                                preload="metadata"
                                            />
                                            
                                            {/* Enhanced Status Indicator */}
                                            <div className="absolute bottom-4 left-4">
                                                <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-3 py-2 text-white text-xs flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                        <span>Streaming actif</span>
                                                    </div>
                                                    <div className="w-px h-4 bg-white/20"></div>
                                                    <span>{Object.keys(qualities).length + 1} qualités</span>
                                                </div>
                                            </div>

                                            {/* Quality Info Panel */}
                                            {currentQuality !== 'original' && (
                                                <div className="absolute top-4 left-4">
                                                    <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-3 py-2 text-white text-xs">
                                                        <div className="flex items-center gap-1">
                                                            <div className={`w-2 h-2 ${getQualityColor(currentQuality)} rounded-full`}></div>
                                                            <span>Lecture en {getQualityLabel(currentQuality)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center p-8">
                                            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                            <p className="text-lg font-medium text-muted-foreground dark:text-gray-400 mb-2">
                                                Aperçu non disponible
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Ce type de fichier ne peut pas être prévisualisé
                                            </p>
                                            <Button onClick={handleDownload} variant="outline">
                                                <Download className="w-4 h-4 mr-2" />
                                                Télécharger le fichier
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Quality Grid (below video for videos) */}
                                {fileType === 'video' && (
                                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                        <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">
                                            Qualités disponibles:
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                                            <button
                                                onClick={() => changeVideoQuality('original')}
                                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                                    currentQuality === 'original'
                                                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border'
                                                }`}
                                            >
                                                Originale
                                            </button>
                                            {/* Show all qualities in proper order with type casting */}
                                            {(['144p', '240p', '360p', '480p', '720p', '1080p'] as QualityType[])
                                                .filter(quality => qualities[quality]) // Only show if quality exists
                                                .map(quality => (
                                                    <button
                                                        key={quality}
                                                        onClick={() => changeVideoQuality(quality)}
                                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                                            currentQuality === quality
                                                                ? `${getQualityColor(quality)} text-white shadow-lg scale-105`
                                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border'
                                                        }`}
                                                    >
                                                        {quality.toUpperCase()}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Enhanced Media Information */}
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

                        {/* Enhanced Video Quality Info */}
                        {fileType === 'video' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Informations vidéo
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Qualité actuelle</label>
                                        <div className={`mt-1 px-3 py-2 rounded-lg ${getQualityColor(currentQuality)} text-white text-sm font-medium`}>
                                            {getQualityLabel(currentQuality)}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Qualités disponibles</label>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                                                Originale
                                            </span>
                                            {(['144p', '240p', '360p', '480p', '720p', '1080p'] as QualityType[])
                                                .filter(quality => qualities[quality])
                                                .map(quality => (
                                                    <span 
                                                        key={quality}
                                                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                                                    >
                                                        {quality}
                                                    </span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Streaming</label>
                                        <div className="mt-1 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-green-600 dark:text-green-400">Actif</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* File Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations du fichier</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Nom original</label>
                                    <p className="text-sm font-medium bg-background dark:bg-gray-800 p-2 rounded mt-1">
                                        {media.original_name}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Slug</label>
                                    <p className="text-sm font-medium bg-background dark:bg-gray-800 p-2 rounded mt-1">
                                        {media.slug}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Chemin</label>
                                    <p className="text-sm font-mono bg-background dark:bg-gray-800 p-2 rounded mt-1 break-all">
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
                                    <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Description</label>
                                    <p className="text-sm bg-background dark:bg-gray-800 p-3 rounded mt-1 leading-relaxed">
                                        {media.detail}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Créé le</p>
                                            <p className="text-sm font-medium">{formatDate(media.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Modifié le</p>
                                            <p className="text-sm font-medium">{formatDate(media.updated_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">ID utilisateur</p>
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