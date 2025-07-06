import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { 
    Images, 
    Upload, 
    Search, 
    Filter,
    Image as ImageIcon,
    Video,
    File,
    Download,
    Trash2,
    Edit3,
    Eye,
    FolderPlus,
    Grid3X3,
    List,
    X,
    Save,
    AlertCircle
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
                return <ImageIcon className="w-12 h-12 text-blue-600" />;
            case 'video':
                return <Video className="w-12 h-12 text-red-600" />;
            default:
                return <File className="w-12 h-12 text-gray-600" />;
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
                        <div className="flex-shrink-0">
                            {getIcon()}
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-100">{media.title}</h3>
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
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDownload(media)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onEdit(media)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDelete(media.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative">
                {getIcon()}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <button 
                            onClick={() => onView(media)}
                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                        >
                            <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                        <button 
                            onClick={() => onDownload(media)}
                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                        >
                            <Download className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{media.title}</h3>
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
                        >
                            <Edit3 className="w-3 h-3" />
                        </button>
                        <button 
                            onClick={() => onDelete(media.id)}
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Media() {
    // États pour la gestion des médias
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
        {
            id: 1,
            type: 'image',
            title: 'conference-ai-2025.jpg',
            size: '2.4 MB',
            date: '5 Jan 2025',
            views: 247,
            url: '#',
            sizeBytes: 2400000
        },
        {
            id: 2,
            type: 'video',
            title: 'workshop-react.mp4',
            size: '156 MB',
            date: '3 Jan 2025',
            views: 89,
            url: '#',
            sizeBytes: 156000000
        },
        {
            id: 3,
            type: 'image',
            title: 'hackathon-winners.png',
            size: '1.8 MB',
            date: '2 Jan 2025',
            views: 156,
            url: '#',
            sizeBytes: 1800000
        },
        {
            id: 4,
            type: 'document',
            title: 'programme-formation.pdf',
            size: '850 KB',
            date: '1 Jan 2025',
            views: 67,
            url: '#',
            sizeBytes: 850000
        },
        {
            id: 5,
            type: 'image',
            title: 'campus-panorama.jpg',
            size: '3.2 MB',
            date: '30 Déc 2024',
            views: 312,
            url: '#',
            sizeBytes: 3200000
        },
        {
            id: 6,
            type: 'video',
            title: 'presentation-projet.mp4',
            size: '89 MB',
            date: '28 Déc 2024',
            views: 124,
            url: '#',
            sizeBytes: 89000000
        }
    ]);

    // États pour les filtres et recherche
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all');
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // États pour les modals
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);
    const [viewingMedia, setViewingMedia] = useState<MediaFile | null>(null);

    // Références pour les inputs de fichier
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    // Formulaire d'édition
    const [editFormData, setEditFormData] = useState({
        title: '',
        type: 'image' as 'image' | 'video' | 'document'
    });

    // Formulaire nouveau dossier
    const [newFolderData, setNewFolderData] = useState({
        name: '',
        description: ''
    });

    // Fonctions de gestion
    const handleUpload = (type: 'image' | 'video' | 'document') => {
        switch (type) {
            case 'image':
                imageInputRef.current?.click();
                break;
            case 'video':
                videoInputRef.current?.click();
                break;
            case 'document':
                documentInputRef.current?.click();
                break;
        }
    };

    const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video' | 'document'
    ) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            for (const file of Array.from(files)) {
                const formData = new FormData();
                formData.append('media', file);

                try {
                    // Using Inertia's router.post instead of fetch
                    router.post('/media', formData, {
                        forceFormData: true,
                        preserveScroll: true,
                        onSuccess: (response) => {
                            console.log('Upload successful:', response);
                            // The media will be available in the response props
                            // You might want to refresh the media list here
                            window.location.reload(); // Simple refresh for now
                        },
                        onError: (errors) => {
                            console.error('Upload failed:', errors);
                            alert('Erreur lors de l\'upload: ' + (errors.media || 'Erreur inconnue'));
                        }
                    });
                } catch (error) {
                    console.error('Upload error:', error);
                    alert('Erreur lors de l\'upload');
                }
            }
        }
        
        // Reset the input
        event.target.value = '';
    };


    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleEdit = (media: MediaFile) => {
        setEditingMedia(media);
        setEditFormData({
            title: media.title,
            type: media.type
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        if (editingMedia && editFormData.title.trim()) {
            setMediaFiles(prev => prev.map(media => 
                media.id === editingMedia.id 
                    ? { ...media, title: editFormData.title, type: editFormData.type }
                    : media
            ));
            setShowEditModal(false);
            setEditingMedia(null);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
            setMediaFiles(prev => prev.filter(media => media.id !== id));
        }
    };

    const handleView = (media: MediaFile) => {
        setViewingMedia(media);
        setShowViewModal(true);
        // Incrémenter les vues
        setMediaFiles(prev => prev.map(m => 
            m.id === media.id ? { ...m, views: m.views + 1 } : m
        ));
    };

    const handleCreateFolder = () => {
        if (newFolderData.name.trim()) {
            // Logique pour créer un nouveau dossier
            console.log('Création du dossier:', newFolderData);
            // Ici vous pourriez ajouter la logique pour créer le dossier
            setNewFolderData({ name: '', description: '' });
            setShowNewFolderModal(false);
        }
    };

    const handleDownload = (media: MediaFile) => {
        // Simulation du téléchargement
        const link = document.createElement('a');
        link.href = media.url;
        link.download = media.title;
        link.click();
    };

    // Filtrage et tri
    const filteredAndSortedMedia = mediaFiles
        .filter(media => {
            const matchesSearch = media.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || media.type === filterType;
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'name':
                    return a.title.localeCompare(b.title);
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

    const storageUsed = (stats.totalSize / (10 * 1024 * 1024 * 1024)) * 100; // 10GB max

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galerie médias" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                
                {/* Inputs cachés pour upload */}
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e, 'image')}
                    className="hidden"
                    name="media"
                    id="image-upload"
                />
                <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => handleFileSelect(e, 'video')}
                    className="hidden"
                    name="media"
                    id="video-upload"
                />
                <input
                    ref={documentInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    multiple
                    onChange={(e) => handleFileSelect(e, 'document')}
                    className="hidden"
                    name="media"
                    id="document-upload"
                />

                {/* En-tête avec actions */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Galerie Médias</h1>
                            <p className="text-emerald-100">Gérez vos photos, vidéos et documents</p>
                        </div>
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => setShowNewFolderModal(true)}
                                className="bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                            >
                                <FolderPlus className="w-5 h-5" />
                                <span>Nouveau dossier</span>
                            </button>
                            <button 
                                onClick={() => setShowUploadModal(true)}
                                className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 font-medium"
                            >
                                <Upload className="w-5 h-5" />
                                <span>Uploader</span>
                            </button>
                        </div>
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

                {/* Zone d'upload rapide */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                        <div className="text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                Déposez vos fichiers ici
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                ou cliquez pour sélectionner des fichiers
                            </p>
                            <div className="flex items-center justify-center space-x-4">
                                <button 
                                    onClick={() => handleUpload('image')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Choisir des images
                                </button>
                                <button 
                                    onClick={() => handleUpload('video')}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Choisir des vidéos
                                </button>
                                <button 
                                    onClick={() => handleUpload('document')}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Choisir des documents
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Formats supportés: JPG, PNG, MP4, PDF, DOC (Max: 50MB)
                            </p>
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
                        {filteredAndSortedMedia.map((media) => (
                            <MediaCard 
                                key={media.id} 
                                media={media}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onView={handleView}
                                onDownload={handleDownload}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                    
                    {filteredAndSortedMedia.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            Aucun fichier trouvé
                        </div>
                    )}
                </div>

                {/* Stockage */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Utilisation du stockage
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Stockage utilisé</span>
                            <span className="text-sm font-bold text-emerald-600">{formatFileSize(stats.totalSize)} / 10 GB</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-sm" 
                                style={{ width: `${Math.min(storageUsed, 100)}%` }}
                            ></div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">
                                    {formatFileSize(mediaFiles.filter(m => m.type === 'image').reduce((sum, m) => sum + m.sizeBytes, 0))}
                                </div>
                                <div className="text-xs text-gray-500">Images</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-red-600">
                                    {formatFileSize(mediaFiles.filter(m => m.type === 'video').reduce((sum, m) => sum + m.sizeBytes, 0))}
                                </div>
                                <div className="text-xs text-gray-500">Vidéos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-purple-600">
                                    {formatFileSize(mediaFiles.filter(m => m.type === 'document').reduce((sum, m) => sum + m.sizeBytes, 0))}
                                </div>
                                <div className="text-xs text-gray-500">Documents</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal d'upload */}
                {showUploadModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    Uploader des fichiers
                                </h3>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <button 
                                    onClick={() => { handleUpload('image'); setShowUploadModal(false); }}
                                    className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    <ImageIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <div className="text-blue-600 font-medium">Images</div>
                                    <div className="text-sm text-gray-500">JPG, PNG, GIF</div>
                                </button>
                                
                                <button 
                                    onClick={() => { handleUpload('video'); setShowUploadModal(false); }}
                                    className="w-full p-4 border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <Video className="w-8 h-8 text-red-600 mx-auto mb-2" />
                                    <div className="text-red-600 font-medium">Vidéos</div>
                                    <div className="text-sm text-gray-500">MP4, AVI, MOV</div>
                                </button>
                                
                                <button 
                                    onClick={() => { handleUpload('document'); setShowUploadModal(false); }}
                                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <File className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                    <div className="text-gray-600 font-medium">Documents</div>
                                    <div className="text-sm text-gray-500">PDF, DOC, TXT</div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal d'édition */}
                {showEditModal && editingMedia && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    Modifier le fichier
                                </h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nom du fichier
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.title}
                                        onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Type
                                    </label>
                                    <select
                                        value={editFormData.type}
                                        onChange={(e) => setEditFormData({...editFormData, type: e.target.value as 'image' | 'video' | 'document'})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Vidéo</option>
                                        <option value="document">Document</option>
                                    </select>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Sauvegarder</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de visualisation */}
                {showViewModal && viewingMedia && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    {viewingMedia.title}
                                </h3>
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 mb-4">
                                    {viewingMedia.type === 'image' && (
                                        <ImageIcon className="w-24 h-24 text-blue-600 mx-auto" />
                                    )}
                                    {viewingMedia.type === 'video' && (
                                        <Video className="w-24 h-24 text-red-600 mx-auto" />
                                    )}
                                    {viewingMedia.type === 'document' && (
                                        <File className="w-24 h-24 text-gray-600 mx-auto" />
                                    )}
                                </div>
                                
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div>Type: {viewingMedia.type}</div>
                                    <div>Taille: {viewingMedia.size}</div>
                                    <div>Date: {viewingMedia.date}</div>
                                    <div>Vues: {viewingMedia.views}</div>
                                </div>
                                
                                <div className="flex justify-center space-x-4 mt-6">
                                    <button
                                        onClick={() => handleDownload(viewingMedia)}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Télécharger</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowViewModal(false);
                                            handleEdit(viewingMedia);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span>Modifier</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal nouveau dossier */}
                {showNewFolderModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    Nouveau dossier
                                </h3>
                                <button
                                    onClick={() => setShowNewFolderModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nom du dossier
                                    </label>
                                    <input
                                        type="text"
                                        value={newFolderData.name}
                                        onChange={(e) => setNewFolderData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-gray-100"
                                        placeholder="Entrez le nom du dossier"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description (optionnel)
                                    </label>
                                    <textarea
                                        value={newFolderData.description}
                                        onChange={(e) => setNewFolderData(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-gray-100"
                                        placeholder="Description du dossier"
                                        rows={3}
                                    />
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowNewFolderModal(false)}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleCreateFolder}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                                    >
                                        <FolderPlus className="w-4 h-4" />
                                        <span>Créer</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
