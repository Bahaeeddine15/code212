import React, { useRef, useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit3, Trash2, Download, Calendar, User, FileText } from 'lucide-react';

type QualityType = 'original' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';

interface ModuleFile {
    id: number;
    original_name: string;
    path: string;
    mime_type: string;
    size: number;
    created_at: string;
    updated_at: string;
    qualities?: string | null;
    description?: string | null;
}

interface Props {
    file: ModuleFile;
    module: {
        id: number;
        title: string;
    };
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Formations', href: '/admin/formations' },
    { title: 'Vidéo du module', href: '#' },
];

export default function ModuleVideoAdmin({ file, module }: Props) {
    const qualities = file.qualities ? JSON.parse(file.qualities) : {};
    const [currentQuality, setCurrentQuality] = useState<QualityType>('original');
    const videoRef = useRef<HTMLVideoElement>(null);

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Vidéo: ${file.original_name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 rounded-xl p-3 sm:p-4 lg:p-6 overflow-x-auto">

                {/* Header */}
                <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-white break-words">{file.original_name}</CardTitle>
                                <p className="text-blue-100 text-sm sm:text-base">Aperçu détaillé de la vidéo du module</p>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                                <Button asChild variant="secondary" className="w-full sm:w-auto text-xs sm:text-sm">
                                    <Link href="/admin/formations">
                                        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Retour
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                    {/* Video Preview */}
                    <div className="xl:col-span-2">
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <CardTitle className="flex items-center text-base sm:text-lg">
                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                        Aperçu de la vidéo
                                    </CardTitle>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                        <Badge variant="secondary" className="flex items-center text-xs">
                                            <FileText className="w-3 h-3 mr-1" />
                                            Vidéo
                                        </Badge>
                                        <Badge className={`${getQualityColor(currentQuality)} text-white text-xs`}>
                                            {getQualityLabel(currentQuality)}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="bg-background dark:bg-gray-800 rounded-lg p-3 sm:p-4 flex items-center justify-center min-h-[300px] sm:min-h-[400px] relative">
                                    <video
                                        ref={videoRef}
                                        src={`/module-files/${file.id}/quality/${currentQuality}`}
                                        controls
                                        controlsList="nodownload"
                                        className="max-w-full max-h-[400px] sm:max-h-[500px] rounded-lg shadow-lg"
                                        style={{ background: "#000" }}
                                        preload="metadata"
                                    />
                                    {/* Status Indicator */}
                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                                        <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-2 sm:px-3 py-1 sm:py-2 text-white text-xs flex items-center gap-1 sm:gap-2">
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="hidden sm:inline">Streaming actif</span>
                                                <span className="sm:hidden">Live</span>
                                            </div>
                                            <div className="w-px h-3 sm:h-4 bg-white/20"></div>
                                            <span className="text-xs">{Object.keys(qualities).length + 1} qualités</span>
                                        </div>
                                    </div>
                                    {/* Quality Info Panel */}
                                    {currentQuality !== 'original' && (
                                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                            <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-2 sm:px-3 py-1 sm:py-2 text-white text-xs">
                                                <div className="flex items-center gap-1">
                                                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${getQualityColor(currentQuality)} rounded-full`}></div>
                                                    <span className="hidden sm:inline">Lecture en {getQualityLabel(currentQuality)}</span>
                                                    <span className="sm:hidden">{currentQuality}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Quality Grid */}
                                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <h4 className="font-medium text-xs sm:text-sm mb-2 sm:mb-3 text-gray-700 dark:text-gray-300">
                                        Qualités disponibles:
                                    </h4>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2">
                                        <button
                                            onClick={() => changeVideoQuality('original')}
                                            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-medium transition-all ${
                                                currentQuality === 'original'
                                                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border'
                                            }`}
                                        >
                                            <span className="hidden sm:inline">Originale</span>
                                            <span className="sm:hidden">Orig</span>
                                        </button>
                                        {(['144p', '240p', '360p', '480p', '720p', '1080p'] as QualityType[])
                                            .filter(quality => qualities[quality])
                                            .map(quality => (
                                                <button
                                                    key={quality}
                                                    onClick={() => changeVideoQuality(quality)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-medium transition-all ${
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
                            </CardContent>
                        </Card>
                    </div>

                    {/* Video Information */}
                    <div className="space-y-4 sm:space-y-6">

                        {/* Enhanced Video Quality Info */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="flex items-center text-base sm:text-lg">
                                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Informations vidéo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
                                <div>
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">Qualité actuelle</label>
                                    <div className={`mt-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg ${getQualityColor(currentQuality)} text-white text-xs sm:text-sm font-medium`}>
                                        {getQualityLabel(currentQuality)}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">Qualités disponibles</label>
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
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">Streaming</label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">Actif</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* File Information */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">Informations du fichier</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                                <div>
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-gray-400">Nom original</label>
                                    <p className="text-xs sm:text-sm font-medium bg-background dark:bg-gray-800 p-2 rounded mt-1 break-all">
                                        {file.original_name}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-gray-400">Chemin</label>
                                    <p className="text-xs font-mono bg-background dark:bg-gray-800 p-2 rounded mt-1 break-all">
                                        {file.path}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">Détails</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                                <div>
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-gray-400">Description</label>
                                    <p className="text-xs sm:text-sm bg-background dark:bg-gray-800 p-3 rounded mt-1 leading-relaxed break-words">
                                        {file.description || 'Aucune description.'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Créé le</p>
                                            <p className="text-xs sm:text-sm font-medium break-words">{formatDate(file.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Modifié le</p>
                                            <p className="text-xs sm:text-sm font-medium break-words">{formatDate(file.updated_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">ID du fichier</p>
                                            <p className="text-xs sm:text-sm font-medium">{file.id}</p>
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