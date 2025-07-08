import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import {
    ArrowLeft,
    Save,
    Upload,
    X,
    Image as ImageIcon,
    Video,
    File,
    Eye,
    Download,
    Trash2,
    AlertCircle,
    Info,
    HardDrive,
    CheckCircle
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
    filepath: string;
    mime_type: string;
    tags?: string[];
    category?: string;
    status?: 'active' | 'archived' | 'private';
    formatted_size: string;
}

interface MediaEditProps {
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
        title: 'Éditer média',
        href: '#',
    },
];

export default function MediaEdit({ media }: MediaEditProps) {
    // États du formulaire - initialisés avec les données existantes
    const [formData, setFormData] = useState({
        name: media.name || '',
        title: media.title || media.name || '',
        description: media.description || '',
        alt_text: media.alt_text || '',
        type: media.type || 'image' as 'image' | 'video' | 'document',
        tags: Array.isArray(media.tags) ? media.tags.join(', ') : (media.tags || ''),
        category: media.category || '',
        status: media.status || 'active' as 'active' | 'archived' | 'private'
    });

    // États pour la gestion des fichiers (optionnel pour remplacement)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(media.url);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Références
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Catégories prédéfinies
    const categories = [
        'Événements',
        'Formations',
        'Campus',
        'Étudiants',
        'Projets',
        'Conférences',
        'Partenaires',
        'Autre'
    ];

    // Fonction pour formater la taille des fichiers
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Fonction pour déterminer le type de fichier
    const getFileType = (file: File): 'image' | 'video' | 'document' => {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        return 'document';
    };

    // Validation du formulaire
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est requis';
        }

        if (selectedFile) {
            const maxSize = 50 * 1024 * 1024; // 50MB
            if (selectedFile.size > maxSize) {
                newErrors.file = 'Le fichier ne peut pas dépasser 50MB';
            }

            const allowedTypes = [
                // Images
                'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
                // Videos
                'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm',
                // Documents
                'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];

            if (!allowedTypes.includes(selectedFile.type)) {
                newErrors.file = 'Type de fichier non supporté';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion du changement de fichier (pour remplacement) - UPDATED
    const handleFileChange = (file: File) => {
        setSelectedFile(file);

        // Générer un aperçu pour les images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // For non-images, keep the original preview but mark that we have a new file
            setPreview(''); // This will show the file icon instead
        }

        // Auto-détecter le type de fichier
        const detectedType = getFileType(file);
        setFormData(prev => ({ ...prev, type: detectedType }));
    };

    // Gestion du drag & drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Préparer les données pour la mise à jour
            const formDataToSend = new FormData();

            // Ajouter les données du formulaire
            formDataToSend.append('name', formData.name);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('alt_text', formData.alt_text);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('tags', formData.tags);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('status', formData.status);
            formDataToSend.append('_method', 'PUT'); // Pour Laravel method spoofing

            // Ajouter le fichier si un nouveau fichier est sélectionné
            if (selectedFile) {
                formDataToSend.append('file', selectedFile);
            }

            // Utiliser Inertia pour envoyer la requête
            router.post(`/media/${media.id}`, formDataToSend, {
                forceFormData: true, // Force form data submission
                onSuccess: () => {
                    setShowSuccess(true);
                    setTimeout(() => {
                        // Use preserveState: false to ensure fresh data
                        router.visit('/media', {
                            preserveState: false,
                            preserveScroll: false
                        });
                    }, 1500);
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                    setErrors(errors);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });

        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            setErrors({ submit: 'Erreur lors de la mise à jour' });
            setIsSubmitting(false);
        }
    };

    // Gestion de la suppression
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

    // Icône selon le type
    const getTypeIcon = () => {
        switch (formData.type) {
            case 'image':
                return <ImageIcon className="w-8 h-8 text-blue-600" />;
            case 'video':
                return <Video className="w-8 h-8 text-red-600" />;
            default:
                return <File className="w-8 h-8 text-gray-600" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Éditer média" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* En-tête */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.visit('/media')}
                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Éditer le média</h1>
                                <p className="text-emerald-100">Modifiez les informations du fichier</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => router.visit(`/media/${media.id}`)}
                                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
                            >
                                <Eye className="w-4 h-4" />
                                <span>Voir</span>
                            </button>
                            <button
                                onClick={() => router.visit('/media')}
                                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>

                {/* Message de succès */}
                {showSuccess && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            <p className="text-green-700 dark:text-green-400">Média mis à jour avec succès!</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Colonne principale - Formulaire */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informations générales */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                                <Info className="w-6 h-6 mr-2 text-emerald-600" />
                                Informations générales
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nom du fichier *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                                            errors.name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="Nom du fichier"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Titre d'affichage
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="Titre pour l'affichage"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="Description du fichier (optionnel)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Texte alternatif
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.alt_text}
                                        onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="Texte alternatif pour l'accessibilité"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Décrit le contenu pour les lecteurs d'écran
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Type
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'image' | 'video' | 'document' }))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        >
                                            <option value="image">Image</option>
                                            <option value="video">Vidéo</option>
                                            <option value="document">Document</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Catégorie
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        >
                                            <option value="">Sélectionner une catégorie</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="tag1, tag2, tag3..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Séparez les tags par des virgules
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Statut
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'archived' | 'private' }))}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        <option value="active">Actif</option>
                                        <option value="private">Privé</option>
                                        <option value="archived">Archivé</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Zone de remplacement de fichier (optionnel) */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                                <Upload className="w-6 h-6 mr-2 text-emerald-600" />
                                Remplacer le fichier (optionnel)
                            </h2>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                    isDragOver
                                        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                        : errors.file
                                        ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                    className="hidden"
                                    accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
                                />

                                {selectedFile ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center">
                                            {getTypeIcon()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-gray-100">{selectedFile.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatFileSize(selectedFile.size)}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setPreview(media.url);
                                            }}
                                            className="text-red-600 hover:text-red-700 text-sm"
                                        >
                                            Annuler le remplacement
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                        <div>
                                            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                                Déposez un nouveau fichier ici
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                ou{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                                                >
                                                    cliquez pour sélectionner
                                                </button>
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Laissez vide pour conserver le fichier actuel
                                        </p>
                                    </div>
                                )}
                            </div>

                            {errors.file && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.file}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Colonne latérale - Aperçu et informations */}
                    <div className="space-y-6">
                        {/* Aperçu du fichier actuel */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <Eye className="w-5 h-5 mr-2 text-emerald-600" />
                                Aperçu
                            </h3>

                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                {selectedFile ? (
                                    // Show preview for new selected file
                                    selectedFile.type.startsWith('image/') ? (
                                        <img
                                            src={preview}
                                            alt={formData.name}
                                            className="max-w-full max-h-full object-contain rounded-lg"
                                        />
                                    ) : selectedFile.type.startsWith('video/') ? (
                                        <video
                                            src={preview}
                                            controls
                                            className="max-w-full max-h-full rounded-lg"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            {getTypeIcon()}
                                            <p className="text-sm text-gray-500 mt-2">Nouveau fichier: {selectedFile.name}</p>
                                        </div>
                                    )
                                ) : preview ? (
                                    // Show original file preview
                                    media.type === 'image' ? (
                                        <img
                                            src={preview}
                                            alt={media.name}
                                            className="max-w-full max-h-full object-contain rounded-lg"
                                        />
                                    ) : media.type === 'video' ? (
                                        <video
                                            src={preview}
                                            controls
                                            className="max-w-full max-h-full rounded-lg"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            {getTypeIcon()}
                                            <p className="text-sm text-gray-500 mt-2">Document original</p>
                                        </div>
                                    )
                                ) : (
                                    <div className="text-center">
                                        {getTypeIcon()}
                                        <p className="text-sm text-gray-500 mt-2">Aucun aperçu disponible</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Informations du fichier */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <HardDrive className="w-5 h-5 mr-2 text-emerald-600" />
                                Informations du fichier
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Nom actuel:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                        {media.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Taille:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                        {selectedFile ? formatFileSize(selectedFile.size) : media.formatted_size}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                        {selectedFile?.type || media.mime_type}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Ajouté le:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                        {media.date}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Vues:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                        {media.views || 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                                Actions
                            </h3>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>
                                        {isSubmitting ? 'Mise à jour...' : 'Sauvegarder les modifications'}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = media.url;
                                        link.download = media.name;
                                        link.target = '_blank';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Télécharger</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.visit('/media')}
                                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Annuler</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Supprimer le fichier</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Messages d'erreur globaux */}
                {errors.submit && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                            <p className="text-red-700 dark:text-red-400">{errors.submit}</p>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
