import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
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
    Camera
} from 'lucide-react';
import { ModernCard, PageHeader, ModernButton } from '@/components/ui/modern-components';

// Types
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestion des médias',
        href: '/media',
    },
];

// Composant pour les cartes de médias
const MediaCard = ({ 
    media,
    onView,
    onEdit,
    onDelete,
    onDownload
}: {
    media: MediaFile;
    onView: (media: MediaFile) => void;
    onEdit: (media: MediaFile) => void;
    onDelete: (media: MediaFile) => void;
    onDownload: (media: MediaFile) => void;
}) => {
    const { name, type, thumbnail, size, uploadDate, uploader, downloads, category } = media;
    
    const getTypeIcon = () => {
        switch (type) {
            case 'image':
                return <Image className="w-6 h-6 text-green-600 dark:text-green-400" />;
            case 'video':
                return <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
            case 'document':
                return <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
            default:
                return <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />;
        }
    };

    const getThemeByType = () => {
        switch (type) {
            case 'image': return 'success';
            case 'video': return 'primary';
            case 'document': return 'secondary';
            default: return 'info';
        }
    };

    return (
        <ModernCard theme={getThemeByType() as any} className="overflow-hidden group">
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden mb-4 -m-6 mx-0 mt-0">
                {type === 'image' ? (
                    <img 
                        src={thumbnail} 
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        {getTypeIcon()}
                        <div className="ml-2 text-lg font-semibold text-muted-foreground">
                            {type.toUpperCase()}
                        </div>
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-lg">
                        {size}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    {getTypeIcon()}
                </div>
            </div>
            
            <div className="space-y-4 p-6 -mx-6 -mb-6">
                <div>
                    <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2">{name}</h3>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold rounded-full">
                        {category}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{uploadDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{uploader}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">{downloads} téléchargements</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onView(media)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                            title="Voir"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDownload(media)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200"
                            title="Télécharger"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onEdit(media)}
                            className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all duration-200"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onDelete(media)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ModernCard>
    );
};

// Mock data pour les médias
const mockMediaFiles: MediaFile[] = [
    {
        id: 1,
        name: "Présentation IA 2024.pdf",
        type: "document",
        url: "/documents/presentation-ia-2024.pdf",
        thumbnail: "/images/doc-thumbnail.jpg",
        size: "2.3 MB",
        uploadDate: "2024-02-15",
        uploader: "Prof. Ahmed",
        downloads: 145,
        category: "Cours",
        description: "Présentation complète sur l'intelligence artificielle moderne"
    },
    {
        id: 2,
        name: "Code 212 Logo HD.png",
        type: "image",
        url: "/images/code212-logo-hd.png",
        thumbnail: "/images/code212-logo-hd.png",
        size: "834 KB",
        uploadDate: "2024-02-14",
        uploader: "Admin",
        downloads: 89,
        category: "Branding",
        description: "Logo officiel haute définition de Code 212"
    },
    {
        id: 3,
        name: "Tutoriel React.mp4",
        type: "video",
        url: "/videos/tutoriel-react.mp4",
        thumbnail: "/images/video-thumbnail.jpg",
        size: "156 MB",
        uploadDate: "2024-02-13",
        uploader: "Prof. Sarah",
        downloads: 267,
        category: "Tutoriels",
        description: "Tutoriel complet pour débuter avec React.js"
    },
    {
        id: 4,
        name: "Galerie Hackathon 2024.zip",
        type: "document",
        url: "/files/galerie-hackathon-2024.zip",
        thumbnail: "/images/archive-thumbnail.jpg",
        size: "45 MB",
        uploadDate: "2024-02-12",
        uploader: "Événements",
        downloads: 78,
        category: "Événements",
        description: "Photos et vidéos du hackathon 2024"
    },
    {
        id: 5,
        name: "Bannière Web Dev.jpg",
        type: "image",
        url: "/images/banniere-web-dev.jpg",
        thumbnail: "/images/banniere-web-dev.jpg",
        size: "1.2 MB",
        uploadDate: "2024-02-11",
        uploader: "Design Team",
        downloads: 56,
        category: "Marketing",
        description: "Bannière promotionnelle pour les formations web"
    },
    {
        id: 6,
        name: "Conférence Cybersécurité.mp4",
        type: "video",
        url: "/videos/conference-cybersecurite.mp4",
        thumbnail: "/images/cyber-thumbnail.jpg",
        size: "234 MB",
        uploadDate: "2024-02-10",
        uploader: "Prof. Karim",
        downloads: 189,
        category: "Conférences",
        description: "Enregistrement de la conférence sur la cybersécurité"
    }
];

export default function Media() {
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // Fonctions de gestion
    const handleMediaView = (media: MediaFile) => {
        window.open(media.url, '_blank');
    };

    const handleMediaEdit = (media: MediaFile) => {
        console.log('Éditer média:', media);
        router.visit(`/dashboard_admin/media_edit/${media.id}`);
    };

    const handleMediaDelete = (media: MediaFile) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
            setMediaFiles(prev => prev.filter(m => m.id !== media.id));
        }
    };

    const handleMediaDownload = (media: MediaFile) => {
        // Simuler le téléchargement
        const link = document.createElement('a');
        link.href = media.url;
        link.download = media.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Incrémenter le compteur
        setMediaFiles(prev => prev.map(m => 
            m.id === media.id ? { ...m, downloads: m.downloads + 1 } : m
        ));
    };

    // Filtrage des médias
    const filteredMedia = mediaFiles.filter(media => {
        const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             media.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || media.type === filterType;
        const matchesCategory = filterCategory === 'all' || media.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
    });

    // Statistiques
    const stats = {
        total: mediaFiles.length,
        images: mediaFiles.filter(m => m.type === 'image').length,
        videos: mediaFiles.filter(m => m.type === 'video').length,
        documents: mediaFiles.filter(m => m.type === 'document').length,
        totalDownloads: mediaFiles.reduce((sum, m) => sum + m.downloads, 0)
    };

    // Catégories uniques
    const categories = Array.from(new Set(mediaFiles.map(m => m.category)));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des médias" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">
                
                {/* Header moderne */}
                <PageHeader
                    title="Gestion des médias"
                    description="Organisez et gérez vos fichiers multimédias"
                    icon={Monitor}
                    theme="info"
                    actions={
                        <ModernButton
                            theme="info"
                            icon={Upload}
                            onClick={() => router.visit('/dashboard_admin/media_upload')}
                        >
                            Télécharger un fichier
                        </ModernButton>
                    }
                />

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <ModernCard theme="info">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Total fichiers</p>
                                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-2xl">
                                <Folder className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="success">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Images</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.images}</p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                                <Image className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="primary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Vidéos</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.videos}</p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                                <Video className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="secondary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Documents</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.documents}</p>
                            </div>
                            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl">
                                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </ModernCard>
                    
                    <ModernCard theme="warning">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Téléchargements</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.totalDownloads}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
                                <Download className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </ModernCard>
                </div>

                {/* Filtres et recherche */}
                <ModernCard theme="info">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un fichier..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-cyan-500 transition-all duration-200"
                            >
                                <option value="all">Tous les types</option>
                                <option value="image">Images</option>
                                <option value="video">Vidéos</option>
                                <option value="document">Documents</option>
                            </select>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-cyan-500 transition-all duration-200"
                            >
                                <option value="all">Toutes les catégories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </ModernCard>

                {/* Liste des médias */}
                <ModernCard theme="info">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground flex items-center">
                            <Camera className="w-7 h-7 mr-3 text-cyan-600 dark:text-cyan-400" />
                            Médiathèque ({filteredMedia.length})
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMedia.map((media) => (
                            <MediaCard 
                                key={media.id} 
                                media={media}
                                onView={handleMediaView}
                                onEdit={handleMediaEdit}
                                onDelete={handleMediaDelete}
                                onDownload={handleMediaDownload}
                            />
                        ))}
                    </div>

                    {filteredMedia.length === 0 && (
                        <div className="text-center py-12">
                            <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Aucun fichier trouvé</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm ? 'Modifiez vos critères de recherche' : 'Commencez par télécharger vos premiers fichiers'}
                            </p>
                            <ModernButton
                                theme="info"
                                icon={Upload}
                                onClick={() => router.visit('/dashboard_admin/media_upload')}
                            >
                                Télécharger un fichier
                            </ModernButton>
                        </div>
                    )}
                </ModernCard>
            </div>
        </AppLayout>
    );
}
