import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';
import { Images, Search, Download, Trash2, Edit3, Eye, Plus, MoreHorizontal, Folder, ChevronRight } from 'lucide-react';

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
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Galerie médias', href: '/admin/media' },
];

export default function MediaIndex({ mediaByFolder }: { mediaByFolder: Record<string, MediaFile[]> }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [folderSearch, setFolderSearch] = useState('');

    const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');

    const handleEdit = (media: MediaFile) => {
        router.visit(`/admin/media/${media.id}/edit`);
    };
    const handleDelete = (id: number) => confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?') && router.delete(`/admin/media/${id}`);
    const handleView = (media: MediaFile) => router.visit(`/admin/media/${media.id}`);
    const handleDownload = (media: MediaFile) => window.location.href = `/admin/media/${media.id}/download`;

    // Helper to determine media type (returns 'Image' or 'Vidéo')
    const getMediaType = (filePath: string) => {
        const ext = filePath.split('.').pop()?.toLowerCase();
        if (!ext) return 'Image';
        const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
        return videoExts.includes(ext) ? 'Vidéo' : 'Image';
    };

    const MediaCard = ({ media }: { media: MediaFile }) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col items-center">
                    {getMediaType(media.file_path) === 'Vidéo' ? (
                        <video
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg object-contain bg-muted cursor-pointer mb-2"
                            src={getImageUrl(media.file_path)}
                            muted
                            controls={false}
                            onClick={() => handleView(media)}
                        />
                    ) : (
                        <img
                            src={getImageUrl(media.file_path)}
                            alt={media.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg object-contain bg-muted cursor-pointer mb-2"
                            onClick={() => handleView(media)}
                        />
                    )}
                    <h3 className="font-medium text-center truncate w-full text-xs sm:text-sm" title={media.title}>
                        {media.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mt-2 text-xs text-muted-foreground">
                        <span className={`px-2 py-1 rounded-full text-xs ${getMediaType(media.file_path) === 'Vidéo' ? 'bg-red-100 dark:bg-red-900 text-red-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800'}`}>
                            {getMediaType(media.file_path)}
                        </span>
                        <span className="text-xs truncate hidden sm:inline">{formatDate(media.created_at)}</span>
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
            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">

                {/* Header moderne */}
                <PageHeader
                    title="Galerie Médias"
                    description="Gérez vos images et vidéos"
                    icon={Images}
                    theme="primary"
                    actions={
                        <Link href="/admin/media/create">
                            <ModernButton theme="primary" icon={Plus}>
                                <span className="hidden sm:inline">Ajouter</span>
                                <span className="sm:hidden">+</span>
                            </ModernButton>
                        </Link>
                    }
                />

                {/* Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total médias</p>
                                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-emerald-600">{totalMedia}</p>
                            </div>
                            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-100">
                                <Images className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Résultats filtrés</p>
                                <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-blue-600 dark:text-blue-400">{totalFiltered}</p>
                            </div>
                            <div className="p-3 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                            <Input
                                type="text"
                                placeholder="Rechercher un média..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-sm sm:text-base text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl bg-card dark:bg-card text-sm sm:text-base text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 w-full sm:w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Plus récent</SelectItem>
                                <SelectItem value="name">Nom A-Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Folder filter */}
                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <Input
                            type="text"
                            placeholder="Rechercher un dossier..."
                            value={folderSearch}
                            onChange={e => setFolderSearch(e.target.value)}
                            className="w-full sm:max-w-xs text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Media Gallery grouped by folder */}
                <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center">
                            <Images className="w-5 h-5 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-emerald-600" />
                            <span className="hidden sm:inline">Médias par dossier</span>
                            <span className="sm:hidden">Médias</span>
                        </h2>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
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
                                    <div key={folder} className="border border-border rounded-xl overflow-hidden">
                                        {/* Clickable folder header */}
                                        <Link
                                            href={`/admin/media/folder/${folder}`}
                                            className="block bg-muted/30 hover:bg-muted/50 dark:bg-muted/20 dark:hover:bg-muted/30 transition-all duration-200 p-4 sm:p-6 border-b border-border"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                                                        <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="text-base sm:text-xl font-bold text-foreground truncate">{folder}</h3>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">{filteredFiles.length} média(s)</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                                            </div>
                                        </Link>

                                        {/* Media grid */}
                                        <div className="p-4 sm:p-6">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                                                {filteredFiles.slice(0, 4).map(file => (
                                                    <MediaCard key={file.id} media={file} />
                                                ))}
                                            </div>
                                            {filteredFiles.length > 4 && (
                                                <div className="flex justify-center mt-3 sm:mt-4">
                                                    <Link
                                                        href={`/admin/media/folder/${folder}`}
                                                        className="text-xs sm:text-sm text-primary hover:underline font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                                    >
                                                        <span className="hidden sm:inline">Voir plus de médias dans ce dossier</span>
                                                        <span className="sm:hidden">Voir plus</span>
                                                        <span className="ml-1">&rarr;</span>
                                                    </Link>
                                                </div>
                                            )}
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
