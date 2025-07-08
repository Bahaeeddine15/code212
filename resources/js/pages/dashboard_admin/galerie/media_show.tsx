import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeft,
    Edit3,
    Image as ImageIcon,
    Video,
    File,
    Download,
    Trash2,
    Calendar,
    HardDrive,
    Eye,
    Users,
    Tag,
    Folder,
    Info
} from 'lucide-react';

// Types
interface MediaFile {
    id: number;
    type: 'image' | 'video' | 'document';
    name: string;
    title?: string;
    description?: string;
    alt_text?: string;
    size: string;
    date: string;
    views: number;
    url: string;
    sizeBytes: number;
    tags?: string[];
    category?: string;
    status: 'active' | 'archived' | 'private';
    fileName: string;
    fullPath: string;
    filepath: string;
    mime_type: string;
    formatted_size: string;
}

interface MediaShowProps {
    media: MediaFile;
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
    {
        title: 'Voir le média',
        href: '#',
    },
];

export default function MediaShow({ media }: MediaShowProps) {
    const [imageError, setImageError] = useState(false);

    // Add debugging for the URL
    console.log('Media URL:', media.url);
    console.log('Media filepath:', media.filepath);

    // Function to get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'private':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'archived':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Function to get type icon
    const getTypeIcon = () => {
        switch (media.type) {
            case 'image':
                return <ImageIcon className="w-6 h-6 text-blue-600" />;
            case 'video':
                return <Video className="w-6 h-6 text-red-600" />;
            default:
                return <File className="w-6 h-6 text-gray-600" />;
        }
    };

    // Function to handle download
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = media.url;
        link.download = media.name || media.title || 'download';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to handle delete
    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.')) {
            router.delete(`/media/${media.id}`, {
                onSuccess: () => {
                    router.visit('/media');
                },
                onError: (errors) => {
                    alert('Erreur lors de la suppression: ' + JSON.stringify(errors));
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Voir ${media.name || media.title}`} />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.visit('/media')}
                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                title="Retour à la galerie"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {media.title || media.name}
                                </h1>
                                <p className="text-emerald-100">
                                    Détails du fichier multimédia
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => router.visit(`/media/${media.id}/edit`)}
                                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
                                title="Modifier"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>Modifier</span>
                            </button>
                            <button
                                onClick={handleDownload}
                                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
                                title="Télécharger"
                            >
                                <Download className="w-4 h-4" />
                                <span>Télécharger</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content - Media preview */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                                <Eye className="w-6 h-6 mr-2 text-emerald-600" />
                                Aperçu du fichier
                            </h2>

                            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-8 min-h-[400px]">
                                {media.type === 'image' && !imageError ? (
                                    <img
                                        src={media.url}
                                        alt={media.alt_text || media.title || media.name}
                                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                                        onError={(e) => {
                                            console.error('Image failed to load:', media.url);
                                            setImageError(true);
                                        }}
                                        onLoad={() => {
                                            console.log('Image loaded successfully:', media.url);
                                        }}
                                    />
                                ) : media.type === 'video' ? (
                                    <video
                                        controls
                                        className="max-w-full max-h-full rounded-lg shadow-lg"
                                        onError={(e) => {
                                            console.error('Video failed to load:', media.url);
                                        }}
                                    >
                                        <source src={media.url} type={media.mime_type} />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-4">
                                            {getTypeIcon()}
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                                            {media.name || media.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {media.type === 'document' ? 'Document' : 'Fichier'} - {media.size || media.formatted_size}
                                        </p>
                                        <button
                                            onClick={handleDownload}
                                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 mx-auto"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Télécharger pour voir</span>
                                        </button>
                                    </div>
                                )}

                                {/* Show error message if image failed to load */}
                                {media.type === 'image' && imageError && (
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                                            Image non disponible
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {media.name || media.title}
                                        </p>
                                        <p className="text-sm text-red-600 mb-4">
                                            URL: {media.url}
                                        </p>
                                        <button
                                            onClick={handleDownload}
                                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 mx-auto"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Télécharger</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {media.description && (
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {media.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Information and actions */}
                    <div className="space-y-6">
                        {/* File Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <Info className="w-5 h-5 mr-2 text-emerald-600" />
                                Informations
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                                    <div className="flex items-center space-x-2">
                                        {getTypeIcon()}
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100 capitalize">
                                            {media.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Statut:</span>
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(media.status)}`}>
                                        {media.status === 'active' ? 'Actif' :
                                         media.status === 'private' ? 'Privé' : 'Archivé'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Taille:</span>
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        {media.size || media.formatted_size}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Date d'ajout:</span>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                            {media.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Vues:</span>
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                            {media.views || 0}
                                        </span>
                                    </div>
                                </div>

                                {media.category && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Catégorie:</span>
                                        <div className="flex items-center space-x-1">
                                            <Folder className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                                {media.category}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Type MIME:</span>
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        {media.mime_type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {media.tags && media.tags.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                    <Tag className="w-5 h-5 mr-2 text-emerald-600" />
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {media.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full border border-emerald-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <HardDrive className="w-5 h-5 mr-2 text-emerald-600" />
                                Détails techniques
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Nom du fichier:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100 break-all">
                                        {media.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Chemin:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100 break-all text-xs">
                                        {media.filepath}
                                    </span>
                                </div>
                                {media.alt_text && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Texte alternatif:</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-100">
                                            {media.alt_text}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                                Actions
                            </h3>

                            <div className="space-y-3">
                                <button
                                    onClick={() => router.visit(`/media/${media.id}/edit`)}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Modifier</span>
                                </button>

                                <button
                                    onClick={handleDownload}
                                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Télécharger</span>
                                </button>

                                <button
                                    onClick={() => router.visit('/media')}
                                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Retour à la galerie</span>
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Supprimer</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
