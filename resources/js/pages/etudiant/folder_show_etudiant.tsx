import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";

interface MediaFile {
    id: number;
    title: string;
    file_path: string;
    created_at: string;
}

interface FolderShowProps {
    folder: string;
    files: MediaFile[];
}

const getMediaType = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (!ext) return 'Image';
    const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
    return videoExts.includes(ext) ? 'Vidéo' : 'Image';
};

const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;

export default function FolderShow(props: FolderShowProps) {
    const { folder, files } = props;
    const [search, setSearch] = useState('');

    // Create breadcrumbs for the header component
    const headerBreadcrumbs = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Galerie Médias", isActive: true },
    ];

    const filteredFiles = files.filter(file =>
        file.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Head>
                <title>{`Médiathèque - Dossier : ${folder}`}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            {/* Custom Dashboard Header */}
            <DashboardHeader breadcrumbs={headerBreadcrumbs} />
            
            <AppShell variant="sidebar">
                <div className="flex w-full min-h-screen">
                    <AppSidebar />
                    <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
                        <div className="px-6 py-6 space-y-6">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dossier : {folder}</h1>
                                <p className="text-gray-600">Retrouvez tous les médias de ce dossier</p>
                            </div>

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {filteredFiles.map(file => (
                                    <Link key={file.id} href={`/media/${file.id}`}>
                                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 flex flex-col items-center hover:shadow-xl transition-shadow group cursor-pointer">
                                            {getMediaType(file.file_path) === 'Vidéo' ? (
                                                <video
                                                    src={getImageUrl(file.file_path)}
                                                    className="w-full h-48 object-contain rounded-lg bg-gray-100 mb-2 group-hover:ring-2 group-hover:ring-blue-400 transition"
                                                    muted
                                                />
                                            ) : (
                                                <img
                                                    src={getImageUrl(file.file_path)}
                                                    alt={file.title}
                                                    className="w-full h-48 object-contain rounded-lg bg-gray-100 mb-2 group-hover:ring-2 group_hover:ring-blue-400 transition"
                                                    style={{ userSelect: 'none' }}
                                                    onContextMenu={e => e.preventDefault()}
                                                />
                                            )}
                                            <div className="font-medium text-center truncate w-full mt-1" title={file.title}>
                                                {file.title}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                <span className={`px-2 py-1 rounded-full ${getMediaType(file.file_path) === 'Vidéo' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {getMediaType(file.file_path)}
                                                </span>
                                                <span>{new Date(file.created_at).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {filteredFiles.length === 0 && (
                                <div className="text-center text-gray-500 py-12">
                                    Aucun média trouvé dans ce dossier.
                                </div>
                            )}
                        </div>
                    </AppContent>
                </div>
            </AppShell>
            
            {/* Footer */}
            <Footer />
        </>
    );
}