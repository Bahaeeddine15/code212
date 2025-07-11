import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function MediaIndex({ media: initialMedia }: { media: MediaFile[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');

    const handleEdit = (media: MediaFile) => {
        router.visit(`/media/${media.id}/edit`);
    };
    const handleDelete = (id: number) => confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?') && router.delete(`/media/${id}`);
    const handleView = (media: MediaFile) => router.visit(`/media/${media.id}`);
    const handleDownload = (media: MediaFile) => window.location.href = `/media/${media.id}/download`;

    const filteredAndSortedMedia = initialMedia
        .filter(media => media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        media.original_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (sortBy === 'name') return a.title.localeCompare(b.title);
            return 0;
        });

    const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) => (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
                    </div>
                    <div className={`p-3 ${color.replace('text-', 'bg-').replace('-600', '-50')} dark:${color.replace('text-', 'bg-').replace('-600', '-900/20')} rounded-full`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const MediaCard = ({ media }: { media: MediaFile }) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 rounded-lg">
                            <AvatarImage
                                src={getImageUrl(media.file_path)}
                                alt={media.title}
                                className="object-cover cursor-pointer"
                                onClick={() => handleView(media)}
                            />
                            <AvatarFallback className="rounded-lg bg-indigo-600 text-white">IMG</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-medium cursor-pointer hover:text-blue-600" onClick={() => handleView(media)}>
                                {media.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Image</span>
                                <span>{formatDate(media.created_at)}</span>
                                <span title={media.original_name}>
                                    {media.original_name.length > 20 ? media.original_name.substring(0, 20) + '...' : media.original_name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {[
                                { icon: Eye, label: 'Voir', action: () => handleView(media) },
                                { icon: Download, label: 'Télécharger', action: () => handleDownload(media) },
                                { icon: Edit3, label: 'Modifier', action: () => handleEdit(media) },
                                { icon: Trash2, label: 'Supprimer', action: () => handleDelete(media.id), className: 'text-red-600' },
                            ].map(({ icon: Icon, label, action, className }) => (
                                <DropdownMenuItem key={label} onClick={action} className={className}>
                                    <Icon className="mr-2 h-4 w-4" />
                                    {label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galerie médias" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">

                {/* Header */}
                <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-3xl font-bold mb-2 text-white">Galerie Médias</CardTitle>
                                <p className="text-emerald-100">Gérez vos images et vidéos</p>
                            </div>
                            <Button asChild variant="secondary">
                                <Link href="/media/create">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard title="Total médias" value={initialMedia.length} icon={Images} color="text-emerald-600" />
                    <StatCard title="Résultats filtrés" value={filteredAndSortedMedia.length} icon={Search} color="text-blue-600" />
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher un média..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Plus récent</SelectItem>
                                    <SelectItem value="name">Nom A-Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Media Gallery */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Images className="w-6 h-6 mr-2 text-emerald-600" />
                            Médias ({filteredAndSortedMedia.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {filteredAndSortedMedia.length > 0 ? (
                                filteredAndSortedMedia.map((media) => <MediaCard key={media.id} media={media} />)
                            ) : (
                                <div className="text-center py-12">
                                    <Images className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <h3 className="text-lg font-medium mb-2">Aucun média trouvé</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {initialMedia.length === 0 ? "Commencez par ajouter des médias à votre galerie" : "Aucun média ne correspond à votre recherche"}
                                    </p>
                                    {initialMedia.length === 0 && (
                                        <Button asChild>
                                            <Link href="/media/create">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Ajouter un média
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
