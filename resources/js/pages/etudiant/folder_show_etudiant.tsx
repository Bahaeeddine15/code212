import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { Search, Play, Image as ImageIcon, Video } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import DashboardHeader from "@/components/layout/dashboard-header";

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
const getStreamUrl = (mediaId: number) => `/media/${mediaId}/stream`;

export default function FolderShow(props: FolderShowProps) {
    const { folder, files } = props;
    const [search, setSearch] = useState('');

    const headerBreadcrumbs = [
        { title: "Dashboard Étudiant", href: "/dashboard" },
        { title: "Médiathèque", href: "/media" },
        { title: `Dossier : ${folder}`, isActive: true },
    ];
    const subtitle = "Retrouvez tous les médias de ce dossier.";

    const filteredFiles = files.filter(file =>
        file.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppShell variant="sidebar">
            <Head title={`Médiathèque - Dossier : ${folder}`} />
            <div className="flex w-full min-h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col min-h-screen bg-white">
                    <div className="pt-8">
                      <DashboardHeader breadcrumbs={headerBreadcrumbs} subtitle={subtitle} />
                    </div>
                    <AppContent variant="sidebar" className="bg-white">
                        <div className="max-w-6xl mx-auto px-4 py-10 mt-4">
                            {/* Navigation */}
                            <div className="mb-8 flex justify-between items-center">
                                <Link
                                    href="/media"
                                    className="text-blue-600 hover:underline font-medium text-base"
                                >
                                    ← Retour à la médiathèque
                                </Link>
                                <div className="text-sm text-gray-500">
                                    {filteredFiles.length} média{filteredFiles.length > 1 ? 's' : ''} dans ce dossier
                                </div>
                            </div>

                            {/* Search */}
                            <div className="mb-8 flex items-center gap-3">
                                <div className="relative w-full max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un média dans ce dossier..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                    />
                                </div>
                            </div>

                            {/* Media grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredFiles.map(file => {
                                    const isVideo = getMediaType(file.file_path) === 'Vidéo';
                                    
                                    return (
                                        <Link key={file.id} href={`/media/${file.id}`}>
                                            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer">
                                                {/* Media Preview */}
                                                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                                    {isVideo ? (
                                                        <>
                                                            <video
                                                                src={getStreamUrl(file.id)}
                                                                className="w-full h-full object-cover"
                                                                preload="metadata"
                                                                muted
                                                                onLoadedMetadata={(e) => {
                                                                    const video = e.target as HTMLVideoElement;
                                                                    video.currentTime = 1;
                                                                }}
                                                            />
                                                            {/* Video play overlay */}
                                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <div className="bg-white/90 rounded-full p-4 shadow-lg">
                                                                    <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                                                                </div>
                                                            </div>
                                                            {/* Video badge */}
                                                            <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                                                <Video className="w-3 h-3" />
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

                                                {/* Media Info */}
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-blue-600 transition-colors" title={file.title}>
                                                        {file.title}
                                                    </h3>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                                            isVideo 
                                                                ? 'bg-red-100 text-red-800' 
                                                                : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                                            {getMediaType(file.file_path)}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(file.created_at).toLocaleDateString('fr-FR')}
                                                        </span>
                                                    </div>

                                                    {/* Video quality info */}
                                                    {isVideo && file.video_qualities && (
                                                        <div className="mt-2">
                                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                                {JSON.parse(file.video_qualities).length > 0 
                                                                    ? `${Object.keys(JSON.parse(file.video_qualities)).length + 1} qualités`
                                                                    : 'Streaming'
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            
                            {filteredFiles.length === 0 && (
                                <div className="text-center text-gray-500 py-12">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Search className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium mb-2">Aucun média trouvé</p>
                                            <p className="text-sm">
                                                {search ? 'Essayez de modifier votre recherche.' : 'Ce dossier est vide.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </AppContent>
                </div>
            </div>
        </AppShell>
    );
}