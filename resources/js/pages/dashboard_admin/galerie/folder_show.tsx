import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, Link, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Edit3, Search, Trash2, Play } from 'lucide-react';

interface MediaFile {
    id: number;
    title: string;
    file_path: string;
    created_at: string;
    video_qualities?: string;
}

interface FolderShowProps {
    folder: string;
    files: MediaFile[];
}

const getMediaType = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (!ext) return 'Image';
    const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'wmv', 'flv'];
    return videoExts.includes(ext) ? 'Vidéo' : 'Image';
};

const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
const getStreamUrl = (mediaId: number) => `/admin/media/${mediaId}/stream`;

export default function FolderShow(props: FolderShowProps) {
    const { folder, files } = props;
    const [search, setSearch] = useState('');

    const filteredFiles = files.filter(file =>
        file.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteFolder = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer tout ce dossier et son contenu ?')) {
            router.delete(`/admin/media/folder/${folder}`);
        }
    };

    const handleDeleteMedia = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
            router.delete(`/admin/media/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title={`Dossier : ${folder}`} />
            <div className="max-w-6xl mx-auto py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-6">
                <Link href="/admin/media" className="text-sm sm:text-base text-primary hover:underline mb-4 sm:mb-6 inline-flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <span>&larr; Retour à la galerie</span>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words min-w-0">
                        Dossier : {folder}
                    </h1>
                    <button
                        onClick={handleDeleteFolder}
                        className="p-2 sm:p-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900 transition-colors self-start sm:self-center"
                        title="Supprimer le dossier"
                    >
                        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                    </button>
                </div>

                {/* Search bar */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <Input
                        type="text"
                        placeholder="Rechercher un média dans ce dossier..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full sm:max-w-md text-sm sm:text-base"
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                    {filteredFiles.map(file => {
                        const isVideo = getMediaType(file.file_path) === 'Vidéo';
                        
                        return (
                            <div
                                key={file.id}
                                className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                {/* Media Preview */}
                                <Link href={`/admin/media/${file.id}`} className="block relative group">
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
                                        {isVideo ? (
                                            <>
                                                {/* Video thumbnail */}
                                                <video
                                                    src={getStreamUrl(file.id)}
                                                    className="w-full h-full object-cover"
                                                    preload="metadata"
                                                    muted
                                                    onLoadedMetadata={(e) => {
                                                        // Seek to 1 second to get a better thumbnail
                                                        const video = e.target as HTMLVideoElement;
                                                        video.currentTime = 1;
                                                    }}
                                                />
                                                
                                                {/* Video play overlay */}
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-white/90 rounded-full p-2 sm:p-3 lg:p-4 shadow-lg">
                                                        <Play className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-gray-900 ml-1" fill="currentColor" />
                                                    </div>
                                                </div>
                                                
                                                {/* Video duration indicator (if available) */}
                                                <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black/70 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                                                    Vidéo
                                                </div>
                                            </>
                                        ) : (
                                            <img
                                                src={getImageUrl(file.file_path)}
                                                alt={file.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                </Link>

                                {/* Media Info */}
                                <div className="p-2 sm:p-3 lg:p-4">
                                    <Link href={`/admin/media/${file.id}`} className="block">
                                        <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2 hover:text-primary transition-colors" title={file.title}>
                                            {file.title}
                                        </h3>
                                    </Link>
                                    
                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                                            isVideo 
                                                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' 
                                                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                                        }`}>
                                            {isVideo ? (
                                                <span className="flex items-center gap-0.5 sm:gap-1">
                                                    <Play className="w-2 h-2 sm:w-3 sm:h-3" />
                                                    <span className="hidden sm:inline">Vidéo</span>
                                                    <span className="sm:hidden">Vid</span>
                                                </span>
                                            ) : (
                                                <span className="hidden sm:inline">Image</span>
                                            )}
                                        </span>
                                        <span className="text-xs text-muted-foreground hidden sm:inline">
                                            {new Date(file.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>

                                    {/* Video quality info */}
                                    {isVideo && file.video_qualities && (
                                        <div className="mb-2 sm:mb-3">
                                            <div className="flex flex-wrap gap-1">
                                                {JSON.parse(file.video_qualities).length > 0 && (
                                                    <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                                        <span className="hidden sm:inline">{Object.keys(JSON.parse(file.video_qualities)).length} qualités</span>
                                                        <span className="sm:hidden">HD</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-1 sm:gap-2 justify-center">
                                        <Link
                                            href={`/admin/media/${file.id}/edit`}
                                            className="flex-1 p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center"
                                            title="Modifier"
                                        >
                                            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteMedia(file.id)}
                                            className="flex-1 p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredFiles.length === 0 && (
                    <div className="text-center text-muted-foreground py-8 sm:py-12">
                        <div className="flex flex-col items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-base sm:text-lg font-medium mb-2">Aucun média trouvé</p>
                                <p className="text-xs sm:text-sm">
                                    {search ? 'Essayez de modifier votre recherche.' : 'Ce dossier est vide.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}