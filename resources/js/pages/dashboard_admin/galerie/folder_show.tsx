import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Edit3, Search, Trash2 } from 'lucide-react';

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

    const filteredFiles = files.filter(file =>
        file.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteFolder = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer tout ce dossier et son contenu ?')) {
            router.delete(route('media.folder.destroy', { folder }));
        }
    };

    const handleDeleteMedia = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
            router.delete(route('media.destroy', { media: id }));
        }
    };

    return (
        <AppLayout>
            <Head title={`Dossier : ${folder}`} />
            <div className="max-w-6xl mx-auto py-10 px-4">
                <Link href="/media" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Retour à la galerie</Link>
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
                    Dossier : {folder}
                    <button
                        onClick={handleDeleteFolder}
                        className="ml-2 p-2 rounded hover:bg-red-100"
                        title="Supprimer le dossier"
                    >
                        <Trash2 className="w-6 h-6 text-red-600" />
                    </button>
                </h1>

                {/* Search bar */}
                <div className="mb-8 flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Rechercher un média dans ce dossier..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full max-w-md"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredFiles.map(file => (
                        <div
                            key={file.id}
                            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
                        >
                            <Link href={route('media.show', { media: file.id })} className="w-full">
                                {getMediaType(file.file_path) === 'Vidéo' ? (
                                    <video
                                        src={getImageUrl(file.file_path)}
                                        controls
                                        className="w-full h-48 object-contain rounded-lg bg-gray-100 mb-2"
                                    />
                                ) : (
                                    <img
                                        src={getImageUrl(file.file_path)}
                                        alt={file.title}
                                        className="w-full h-48 object-contain rounded-lg bg-gray-100 mb-2"
                                    />
                                )}
                            </Link>
                            <div className="font-medium text-center truncate w-full" title={file.title}>{file.title}</div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <span className={`px-2 py-1 rounded-full ${getMediaType(file.file_path) === 'Vidéo' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {getMediaType(file.file_path)}
                                </span>
                                <span>{new Date(file.created_at).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Link
                                    href={route('media.edit', { media: file.id })}
                                    className="p-2 rounded hover:bg-blue-100"
                                    title="Modifier"
                                >
                                    <Edit3 className="w-5 h-5 text-blue-600" />
                                </Link>
                                <button
                                    onClick={() => handleDeleteMedia(file.id)}
                                    className="p-2 rounded hover:bg-red-100"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredFiles.length === 0 && (
                    <div className="text-center text-gray-500 py-12">Aucun média trouvé dans ce dossier.</div>
                )}
            </div>
        </AppLayout>
    );
}
