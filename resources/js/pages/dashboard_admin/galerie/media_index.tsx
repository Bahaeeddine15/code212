import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Images, Search, Download, Trash2, Edit3, Eye, Plus, MoreHorizontal } from 'lucide-react';

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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Galerie médias', href: '/media' },
];

export default function MediaIndex({ mediaByFolder }: { mediaByFolder: Record<string, MediaFile[]> }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [folderSearch, setFolderSearch] = useState('');

    const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');

    const handleEdit = (media: MediaFile) => {
        router.visit(`/media/${media.id}/edit`);
    };
    const handleDelete = (id: number) => confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?') && router.delete(`/media/${id}`);
    const handleView = (media: MediaFile) => router.visit(`/media/${media.id}`);
    const handleDownload = (media: MediaFile) => window.location.href = `/media/${media.id}/download`;

    // Helper to determine media type (returns 'Image' or 'Vidéo')
    const getMediaType = (filePath: string) => {
        const ext = filePath.split('.').pop()?.toLowerCase();
        if (!ext) return 'Image';
        const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
        return videoExts.includes(ext) ? 'Vidéo' : 'Image';
    };

    const MediaCard = ({ media }: { media: MediaFile }) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex flex-col items-center">
                    {getMediaType(media.file_path) === 'Vidéo' ? (
                        <video
                            className="w-24 h-24 rounded-lg object-contain bg-gray-100 cursor-pointer mb-2"
                            src={getImageUrl(media.file_path)}
                            muted
                            controls={false}
                            onClick={() => handleView(media)}
                        />
                    ) : (
                        <img
                            src={getImageUrl(media.file_path)}
                            alt={media.title}
                            className="w-24 h-24 rounded-lg object-contain bg-gray-100 cursor-pointer mb-2"
                            onClick={() => handleView(media)}
                        />
                    )}
                    <h3 className="font-medium text-center truncate w-full" title={media.title}>
                        {media.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className={`px-2 py-1 rounded-full ${getMediaType(media.file_path) === 'Vidéo' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                            {getMediaType(media.file_path)}
                        </span>
                        <span>{formatDate(media.created_at)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Compute stats from grouped data
    const totalMedia = Object.values(mediaByFolder).reduce((sum, files) => sum + files.length, 0);
    const totalFiltered = Object.entries(mediaByFolder).reduce((sum, [_, files]) => {
        return sum + files.filter(file =>
            file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.original_name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length;
    }, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galerie médias" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">

                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <Images className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Galerie Médias</h1>
                                <p className="text-gray-600 mt-2 text-lg">Gérez vos images et vidéos</p>
                            </div>
                        </div>
                        <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                            <Link href="/media/create">
                                <Plus className="w-5 h-5" />
                                <span>Ajouter</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Total médias</p>
                                <p className="text-3xl font-bold mt-2 text-emerald-600">{totalMedia}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-emerald-100">
                                <Images className="w-8 h-8 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Résultats filtrés</p>
                                <p className="text-3xl font-bold mt-2 text-blue-600">{totalFiltered}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-blue-100">
                                <Search className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Rechercher un média..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Plus récent</SelectItem>
                                <SelectItem value="name">Nom A-Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Folder filter */}
                    <div className="mt-4 flex items-center gap-3">
                        <Search className="w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Rechercher un dossier..."
                            value={folderSearch}
                            onChange={e => setFolderSearch(e.target.value)}
                            className="w-full max-w-xs"
                        />
                    </div>
                </div>

                {/* Media Gallery grouped by folder */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Images className="w-7 h-7 mr-3 text-emerald-600" />
                            Médias par dossier
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {Object.entries(mediaByFolder)
                            .filter(([folder]) =>
                                folder.toLowerCase().includes(folderSearch.toLowerCase())
                            )
                            .map(([folder, files]) => {
                                // Filter and sort inside each folder
                                const filteredFiles = files
                                    .filter(file =>
                                        file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        file.original_name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => {
                                        if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                                        if (sortBy === 'name') return a.title.localeCompare(b.title);
                                        return 0;
                                    });

                                if (filteredFiles.length === 0) return null;
                                return (
                                    <div key={folder}>
                                        <h2 className="text-xl font-bold mb-4">
                                            <Link
                                                href={route('media.folder', { folder })}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {folder}
                                            </Link>
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {filteredFiles.map(file => (
                                                <MediaCard key={file.id} media={file} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
