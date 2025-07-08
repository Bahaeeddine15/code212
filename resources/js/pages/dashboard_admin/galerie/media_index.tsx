import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import {
    Images,
    Search,
    Image as ImageIcon,
    Video,
    File,
    Download,
    Trash2,
    Edit3,
    Eye,
    Grid3X3,
    List,
    Plus
} from 'lucide-react';

// Types
interface MediaFile {
    id: number;
    type: 'image' | 'video' | 'document';
    title: string;
    size: string;
    date: string;
    views: number;
    url: string;
    sizeBytes: number;
    fileName: string;
    fullPath: string;
    name: string;
    filepath: string;
    mime_type: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Galerie médias',
        href: '/media',
    },
];

// Composant pour les cartes de médias
const MediaCard = ({
    media,
    onEdit,
    onDelete,
    onView,
    onDownload,
    viewMode = 'grid'
}: {
    media: MediaFile;
    onEdit: (media: MediaFile) => void;
    onDelete: (id: number) => void;
    onView: (media: MediaFile) => void;
    onDownload: (media: MediaFile) => void;
    viewMode?: 'grid' | 'list';
}) => {
    const getIcon = () => {
        switch (media.type) {
            case 'image':
                return (
                    <img
                        src={media.url}
                        alt={media.title}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => onView(media)}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 text-blue-600 flex items-center justify-center cursor-pointer"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                        }}
                    />
                );
            case 'video':
                return <Video className="w-12 h-12 text-red-600 cursor-pointer" onClick={() => onView(media)} />;
            default:
                return <File className="w-12 h-12 text-gray-600 cursor-pointer" onClick={() => onView(media)} />;
        }
    };

    const getTypeColor = () => {
        switch (media.type) {
            case 'image':
                return 'bg-blue-100 text-blue-800';
            case 'video':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeText = () => {
        switch (media.type) {
            case 'image':
                return 'Image';
            case 'video':
                return 'Vidéo';
            default:
                return 'Document';
        }
    };

    if (viewMode === 'list') {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16">
                            {getIcon()}
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-100 cursor-pointer hover:text-blue-600" onClick={() => onView(media)}>
                                {media.title || media.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor()}`}>
                                    {getTypeText()}
                                </span>
                                <span>{media.size}</span>
                                <span>{media.date}</span>
                                <span>{media.views} vues</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onView(media)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Voir"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDownload(media)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Télécharger"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onEdit(media)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                            title="Modifier"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(media.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Supprimer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                {media.type === 'image' ? (
                    <img
                        src={media.url}
                        alt={media.title || media.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onView(media)}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 text-blue-600 flex items-center justify-center cursor-pointer"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                        }}
                    />
                ) : (
                    getIcon()
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <button
                            onClick={() => onView(media)}
                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                            title="Voir"
                        >
                            <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                            onClick={() => onDownload(media)}
                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                            title="Télécharger"
                        >
                            <Download className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3
                        className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate cursor-pointer hover:text-blue-600"
                        onClick={() => onView(media)}
                        title={media.title || media.name}
                    >
                        {media.title || media.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor()}`}>
                        {getTypeText()}
                    </span>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>Taille: {media.size}</div>
                    <div>Ajouté: {media.date}</div>
                    <div>Vues: {media.views}</div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => onEdit(media)}
                            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                            title="Modifier"
                        >
                            <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => onDelete(media.id)}
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            title="Supprimer"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface Props {
    media: MediaFile[];
}

export default function Media({ media: initialMedia }: Props) {
    // États pour la gestion des médias
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMedia || []);
    const [loading, setLoading] = useState(false);

    // Update mediaFiles when props change
    useEffect(() => {
        setMediaFiles(initialMedia || []);
    }, [initialMedia]);

    // États pour les filtres et recherche
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all');
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleEdit = (media: MediaFile) => {
        // Navigate to edit page
        router.visit(`/media/${media.id}/edit`);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
            console.log('Attempting to delete media with ID:', id);

            router.delete(`/media/${id}`, {
                preserveState: false, // This will refresh the page data
                onStart: () => {
                    console.log('Delete request started');
                },
                onSuccess: (page) => {
                    console.log('Delete successful', page);
                    // The page will automatically refresh with new data
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                    alert('Erreur lors de la suppression: ' + JSON.stringify(errors));
                },
                onFinish: () => {
                    console.log('Delete request finished');
                }
            });
        }
    };

    const handleView = (media: MediaFile) => {
        // Navigate to show page
        router.visit(`/media/${media.id}`);
    };

    const handleDownload = (media: MediaFile) => {
        const link = document.createElement('a');
        link.href = media.url;
        link.download = media.fileName || media.name || media.title;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filtrage et tri
    const filteredAndSortedMedia = mediaFiles
        .filter(media => {
            const title = media.title || media.name || '';
            const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || media.type === filterType;
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'name':
                    const aTitle = a.title || a.name || '';
                    const bTitle = b.title || b.name || '';
                    return aTitle.localeCompare(bTitle);
                case 'size':
                    return b.sizeBytes - a.sizeBytes;
                default:
                    return 0;
            }
        });

    // Calcul des statistiques
    const stats = {
        total: mediaFiles.length,
        images: mediaFiles.filter(m => m.type === 'image').length,
        videos: mediaFiles.filter(m => m.type === 'video').length,
        documents: mediaFiles.filter(m => m.type === 'document').length,
        totalSize: mediaFiles.reduce((sum, m) => sum + m.sizeBytes, 0)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galerie médias" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">

                {/* En-tête avec actions */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Galerie Médias</h1>
                            <p className="text-emerald-100">Gérez vos photos, vidéos et documents</p>
                        </div>
                        <Link
                            href="/media/create"
                            className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Ajouter des médias</span>
                        </Link>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total fichiers</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                                <Images className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Images</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.images}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Vidéos</p>
                                <p className="text-2xl font-bold text-red-600 mt-1">{stats.videos}</p>
                            </div>
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
                                <Video className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Documents</p>
                                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.documents}</p>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                                <File className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un fichier..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as 'all' | 'image' | 'video' | 'document')}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                                <option value="all">Tous les types</option>
                                <option value="image">Images</option>
                                <option value="video">Vidéos</option>
                                <option value="document">Documents</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                                <option value="date">Date récente</option>
                                <option value="name">Nom A-Z</option>
                                <option value="size">Taille</option>
                            </select>
                            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'} rounded-l-lg`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'} rounded-r-lg`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Galerie de médias */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                            <Images className="w-6 h-6 mr-2 text-emerald-600" />
                            Fichiers ({filteredAndSortedMedia.length})
                        </h2>
                    </div>

                    <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4' : 'space-y-2'}>
                        {loading ? (
                            <div className="col-span-full text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des médias...</p>
                            </div>
                        ) : (
                            filteredAndSortedMedia.map((media) => (
                                <MediaCard
                                    key={media.id}
                                    media={media}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onView={handleView}
                                    onDownload={handleDownload}
                                    viewMode={viewMode}
                                />
                            ))
                        )}
                    </div>

                    {!loading && filteredAndSortedMedia.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Images className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Aucun fichier trouvé</p>
                            <p className="text-sm mt-2">Commencez par ajouter des médias à votre galerie</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
