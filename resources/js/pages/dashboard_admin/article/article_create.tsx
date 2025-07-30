import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestion des articles',
        href: '/articles',
    },
    {
        title: 'Nouvel article',
        href: '#',
    },
];

export default function ArticleCreate() {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        status: 'draft' as const,
        images: [] as File[]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [imageError, setImageError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);

        // Combine current and new files, but only keep the first 5
        const combined = [...formData.images, ...files].slice(0, 5);

        // If user tried to add more than 5, show error
        if (formData.images.length + files.length > 5) {
            setImageError('Vous pouvez ajouter jusqu\'à 5 images maximum. Seules les 5 premières seront conservées.');
        } else {
            setImageError('');
        }

        setFormData(prev => ({
            ...prev,
            images: combined
        }));
        setErrors(prev => ({ ...prev, images: '' }));
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // Use FormData for file uploads
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'images') {
                (value as File[]).forEach((file, idx) => data.append(`images[${idx}]`, file));
            } else {
                data.append(key, value as string);
            }
        });

        router.post('/articles', data, {
            onSuccess: () => {
                setIsSubmitting(false);
                // Will redirect to articles list automatically
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors);
            }
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un nouvel article" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/articles"
                            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour aux articles
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Créer un nouvel article
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Rédigez et publiez votre article
                        </p>
                    </div>
                </div>

                {/* Create Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Nouvel article
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Titre de l'article *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Saisissez le titre de votre article..."
                                            required
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Excerpt */}
                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Résumé *</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={formData.excerpt}
                                            onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                            placeholder="Rédigez un résumé de votre article (sera affiché dans la liste des articles)..."
                                            rows={3}
                                            required
                                            className={errors.excerpt ? 'border-red-500' : ''}
                                        />
                                        {errors.excerpt && (
                                            <p className="text-sm text-red-600">{errors.excerpt}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Le résumé apparaîtra sur les cartes d'articles et dans les aperçus.
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <Label htmlFor="content">Contenu de l'article *</Label>
                                        <Textarea
                                            id="content"
                                            value={formData.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            placeholder="Rédigez le contenu complet de votre article..."
                                            rows={15}
                                            required
                                            className={errors.content ? 'border-red-500' : ''}
                                        />
                                        {errors.content && (
                                            <p className="text-sm text-red-600">{errors.content}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Vous pouvez utiliser des sauts de ligne pour séparer les paragraphes.
                                        </p>
                                    </div>

                                    {/* Images Upload */}
                                    <div className="space-y-2">
                                        <Label htmlFor="images">Images (max 5)</Label>
                                        <Input
                                            id="images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            disabled={formData.images.length >= 5}
                                        />
                                        {formData.images.length > 0 && (
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                {formData.images.map((img, idx) => (
                                                    <div key={idx} className="relative group">
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            alt={`preview-${idx}`}
                                                            className="w-16 h-16 object-cover rounded border"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(idx)}
                                                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                            title="Supprimer"
                                                        >
                                                            <X className="w-4 h-4 text-red-600" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {imageError && (
                                            <p className="text-sm text-red-600">{imageError}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Vous pouvez ajouter jusqu'à 5 images.
                                        </p>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex gap-4 pt-6 border-t">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isSubmitting ? 'Création en cours...' : 'Créer l\'article'}
                                        </Button>
                                        <Link href="/articles">
                                            <Button type="button" variant="outline">
                                                Annuler
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar with Settings */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Article Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Paramètres de l'article</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Catégorie *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => handleInputChange('category', value)}
                                        >
                                            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Choisir une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="actualite">Actualité</SelectItem>
                                                <SelectItem value="information">Information</SelectItem>
                                                <SelectItem value="guide">Guide</SelectItem>
                                                <SelectItem value="evenement">Événement</SelectItem>
                                                <SelectItem value="annonce">Annonce</SelectItem>
                                                <SelectItem value="ressource">Ressource</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-sm text-red-600">{errors.category}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Statut de publication</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value: 'draft' | 'published' | 'archived') =>
                                                handleInputChange('status', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Brouillon</SelectItem>
                                                <SelectItem value="published">Publié</SelectItem>
                                                <SelectItem value="archived">Archivé</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="text-sm text-gray-500">
                                            {formData.status === 'draft' && 'L\'article sera sauvegardé comme brouillon'}
                                            {formData.status === 'published' && 'L\'article sera publié immédiatement'}
                                            {formData.status === 'archived' && 'L\'article sera archivé'}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tips Card */}
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
                                <CardHeader>
                                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                                        💡 Conseils de rédaction
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                                    <ul className="space-y-2">
                                        <li>• Utilisez un titre accrocheur et descriptif</li>
                                        <li>• Rédigez un résumé engageant pour attirer les lecteurs</li>
                                        <li>• Structurez votre contenu avec des paragraphes clairs</li>
                                        <li>• Choisissez la bonne catégorie pour votre article</li>
                                        <li>• Sauvegardez d'abord en brouillon pour réviser</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
