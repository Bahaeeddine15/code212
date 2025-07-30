import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Image, 
    Video, 
    FileText, 
    Download, 
    Upload, 
    Search,
    Filter,
    Eye,
    Edit3,
    Trash2,
    Plus,
    Folder,
    Calendar,
    User,
    Monitor,
    Camera,
    Film,
    HardDrive
} from 'lucide-react';

// Interface pour les fichiers médias
interface MediaFile {
    id: number;
    name: string;
    type: 'image' | 'video' | 'document';
    url: string;
    thumbnail: string;
    size: string;
    uploadDate: string;
    uploader: string;
    downloads: number;
    category: string;
    description: string;
}

// Composant pour les cartes de médias
const MediaCard = ({ 
    media,
    onEdit,
    onDelete,
    onView,
    onDownload
}: {
    media: MediaFile;
    onEdit: (media: MediaFile) => void;
    onDelete: (media: MediaFile) => void;
    onView: (media: MediaFile) => void;
    onDownload: (media: MediaFile) => void;
}) => {
    const { name, type, thumbnail, size, uploadDate, uploader, downloads, category, description } = media;
    
    const getTypeIcon = () => {
        switch (type) {
            case 'image':
                return <Image className="w-12 h-12 text-white opacity-90" />;
            case 'video':
                return <Video className="w-12 h-12 text-white opacity-90" />;
            case 'document':
                return <FileText className="w-12 h-12 text-white opacity-90" />;
            default:
                return <FileText className="w-12 h-12 text-white opacity-90" />;
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case 'image':
                return 'from-pink-500 via-purple-500 to-indigo-500';
            case 'video':
                return 'from-red-500 via-orange-500 to-yellow-500';
            case 'document':
                return 'from-blue-500 via-cyan-500 to-teal-500';
            default:
                return 'from-gray-500 via-gray-600 to-gray-700';
        }
    };

    const getTypeBadgeColor = () => {
        switch (type) {
            case 'image':
                return 'bg-pink-100 text-pink-800';
            case 'video':
                return 'bg-red-100 text-red-800';
            case 'document':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className={`h-32 bg-gradient-to-br ${getTypeColor()} flex items-center justify-center -m-6 mb-6 rounded-t-lg`}>
                {getTypeIcon()}
            </div>
            
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{name}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getTypeBadgeColor()}`}>
                            {type}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <HardDrive className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{uploader}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{new Date(uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{downloads} téléch.</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{category}</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Folder className="w-4 h-4" />
                        <span>Médias</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                    <button 
                        onClick={() => onView(media)}
                        className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition-colors"
                    >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Voir
                    </button>
                    <button 
                        onClick={() => onDownload(media)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                    >
                        <Download className="w-4 h-4 inline mr-1" />
                        Téléch.
                    </button>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => onEdit(media)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onDelete(media)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Mock data pour les médias
const mockMediaFiles: MediaFile[] = [
    {
        id: 1,
        name: "presentation-ia-2024.pdf",
        type: "document",
        url: "/storage/documents/presentation-ia-2024.pdf",
        thumbnail: "/storage/thumbnails/presentation-ia-2024.jpg",
        size: "2.3 MB",
        uploadDate: "2024-02-15",
        uploader: "Dr. Ahmed Benali",
        downloads: 156,
        category: "Présentations",
        description: "Présentation complète sur l'intelligence artificielle et ses applications en 2024"
    },
    {
        id: 2,
        name: "formation-react-intro.mp4",
        type: "video",
        url: "/storage/videos/formation-react-intro.mp4",
        thumbnail: "/storage/thumbnails/formation-react-intro.jpg",
        size: "45.7 MB",
        uploadDate: "2024-02-12",
        uploader: "Sarah Dubois",
        downloads: 89,
        category: "Formations",
        description: "Vidéo d'introduction à React pour débutants - 1ère partie"
    },
    {
        id: 3,
        name: "logo-code212.png",
        type: "image",
        url: "/storage/images/logo-code212.png",
        thumbnail: "/storage/thumbnails/logo-code212.jpg",
        size: "125 KB",
        uploadDate: "2024-02-10",
        uploader: "Marc Johnson",
        downloads: 234,
        category: "Graphiques",
        description: "Logo officiel de Code212 en haute résolution"
    },
    {
        id: 4,
        name: "guide-installation-nodejs.pdf",
        type: "document",
        url: "/storage/documents/guide-installation-nodejs.pdf",
        thumbnail: "/storage/thumbnails/guide-installation-nodejs.jpg",
        size: "1.8 MB",
        uploadDate: "2024-02-08",
        uploader: "Lisa Chen",
        downloads: 167,
        category: "Documentation",
        description: "Guide complet d'installation de Node.js sur différents systèmes d'exploitation"
    },
    {
        id: 5,
        name: "demo-machine-learning.mp4",
        type: "video",
        url: "/storage/videos/demo-machine-learning.mp4",
        thumbnail: "/storage/thumbnails/demo-machine-learning.jpg",
        size: "67.2 MB",
        uploadDate: "2024-02-05",
        uploader: "Dr. Ahmed Benali",
        downloads: 145,
        category: "Démonstrations",
        description: "Démonstration pratique d'un modèle de machine learning en action"
    },
    {
        id: 6,
        name: "banniere-hackathon-2024.jpg",
        type: "image",
        url: "/storage/images/banniere-hackathon-2024.jpg",
        thumbnail: "/storage/thumbnails/banniere-hackathon-2024.jpg",
        size: "890 KB",
        uploadDate: "2024-02-01",
        uploader: "Jean Martin",
        downloads: 78,
        category: "Événements",
        description: "Bannière promotionnelle pour le hackathon IA 2024"
    }
];

// Composant principal
const Media: React.FC = () => {
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Filtrer les médias
    const filteredMediaFiles = mediaFiles.filter(media => {
        const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            media.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            media.uploader.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || media.type === filterType;
        return matchesSearch && matchesFilter;
    });

    // Handlers pour les actions
    const handleUploadMedia = () => {
        setShowUploadModal(true);
    };

    const handleEditMedia = (media: MediaFile) => {
        setSelectedMedia(media);
        setShowEditModal(true);
    };

    const handleDeleteMedia = (media: MediaFile) => {
        setSelectedMedia(media);
        setShowDeleteModal(true);
    };

    const handleViewMedia = (media: MediaFile) => {
        setSelectedMedia(media);
        console.log('Voir média:', media);
    };

    const handleDownloadMedia = (media: MediaFile) => {
        console.log('Télécharger média:', media);
        // Incrémenter le compteur de téléchargements
        setMediaFiles(prev => prev.map(m => 
            m.id === media.id ? { ...m, downloads: m.downloads + 1 } : m
        ));
    };

    const confirmDelete = () => {
        if (selectedMedia) {
            setMediaFiles(mediaFiles.filter(m => m.id !== selectedMedia.id));
            setShowDeleteModal(false);
            setSelectedMedia(null);
        }
    };

    // Statistiques
    const totalFiles = mediaFiles.length;
    const totalImages = mediaFiles.filter(m => m.type === 'image').length;
    const totalVideos = mediaFiles.filter(m => m.type === 'video').length;
    const totalDocuments = mediaFiles.filter(m => m.type === 'document').length;
    const totalDownloads = mediaFiles.reduce((sum, m) => sum + m.downloads, 0);

    // Calculer la taille totale
    const totalSize = mediaFiles.reduce((sum, m) => {
        const sizeNum = parseFloat(m.size.replace(/[^0-9.]/g, ''));
        const sizeUnit = m.size.includes('MB') ? 1024 : 1;
        return sum + (sizeNum * sizeUnit);
    }, 0);

    return (
        <AppLayout>
            <Head title="Gestion des Médias" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Gestion des Médias</h1>
                        <p className="text-gray-600">Gérez vos images, vidéos et documents</p>
                    </div>
                    <button
                        onClick={handleUploadMedia}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Upload className="w-5 h-5" />
                        <span>Uploader un fichier</span>
                    </button>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Folder className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Fichiers</p>
                                <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-pink-100 rounded-lg">
                                <Image className="w-6 h-6 text-pink-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Images</p>
                                <p className="text-2xl font-bold text-gray-900">{totalImages}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Video className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Vidéos</p>
                                <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Documents</p>
                                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Download className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Téléchargements</p>
                                <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres et recherche */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher des fichiers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">Tous les types</option>
                                    <option value="image">Images</option>
                                    <option value="video">Vidéos</option>
                                    <option value="document">Documents</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Liste des médias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMediaFiles.map((media) => (
                        <MediaCard
                            key={media.id}
                            media={media}
                            onEdit={handleEditMedia}
                            onDelete={handleDeleteMedia}
                            onView={handleViewMedia}
                            onDownload={handleDownloadMedia}
                        />
                    ))}
                </div>

                {filteredMediaFiles.length === 0 && (
                    <div className="text-center py-12">
                        <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun fichier trouvé</h3>
                        <p className="text-gray-600">Aucun fichier ne correspond à vos critères de recherche.</p>
                    </div>
                )}
            </div>

            {/* Modal de suppression */}
            {showDeleteModal && selectedMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
                        <p className="text-gray-600 mb-6">
                            Êtes-vous sûr de vouloir supprimer le fichier "{selectedMedia.name}" ? Cette action est irréversible.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Media;
