import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
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
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des articles',
        href: '/admin/articles',
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
        status: 'draft' as 'draft' | 'published' | 'archived',
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

        router.post('/admin/articles', data, {
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

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl lg:rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl lg:rounded-2xl shadow-lg">
                                <Plus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Créer un nouvel article</h1>
                                <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">Rédigez et publiez votre article</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/articles"
                            className="bg-card dark:bg-card text-primary hover:bg-blue-50 dark:bg-blue-900/20 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl flex items-center justify-center sm:justify-start space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200 w-full sm:w-auto"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Retour aux articles</span>
                        </Link>
                    </div>
                </div>

                {/* Create Form */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {/* Main Form */}
                    <div className="xl:col-span-2 order-1 xl:order-1">
                        <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                                <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl">
                                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Nouvel article</h2>
                            </div>
                                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                    {/* Title */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label htmlFor="title" className="text-sm font-semibold text-foreground">Titre de l'article *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Saisissez le titre de votre article..."
                                            required
                                            className={`px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${errors.title ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.title && (
                                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Excerpt */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label htmlFor="excerpt" className="text-sm font-semibold text-foreground">Résumé *</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={formData.excerpt}
                                            onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                            placeholder="Rédigez un résumé de votre article (sera affiché dans la liste des articles)..."
                                            rows={3}
                                            required
                                            className={`px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none text-sm sm:text-base ${errors.excerpt ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.excerpt && (
                                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.excerpt}</p>
                                        )}
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Le résumé apparaîtra sur les cartes d'articles et dans les aperçus.
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label htmlFor="content" className="text-sm font-semibold text-foreground">Contenu de l'article *</Label>
                                        <Textarea
                                            id="content"
                                            value={formData.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            placeholder="Rédigez le contenu complet de votre article..."
                                            rows={12}
                                            required
                                            className={`px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none text-sm sm:text-base ${errors.content ? 'border-red-500' : 'border-border'}`}
                                        />
                                        {errors.content && (
                                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.content}</p>
                                        )}
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Vous pouvez utiliser des sauts de ligne pour séparer les paragraphes.
                                        </p>
                                    </div>

                                    {/* Images Upload */}
                                    <div className="space-y-2">
                                        <Label htmlFor="images" className="text-sm font-semibold text-foreground">Images (max 5)</Label>
                                        <Input
                                            id="images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            disabled={formData.images.length >= 5}
                                            className="px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                        />
                                        {formData.images.length > 0 && (
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                {formData.images.map((img, idx) => (
                                                    <div key={idx} className="relative group">
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            alt={`preview-${idx}`}
                                                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(idx)}
                                                            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-card dark:bg-card rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                            title="Supprimer"
                                                        >
                                                            <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {imageError && (
                                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">{imageError}</p>
                                        )}
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Vous pouvez ajouter jusqu'à 5 images.
                                        </p>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto order-1"
                                        >
                                            <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                            {isSubmitting ? 'Création en cours...' : 'Créer l\'article'}
                                        </Button>
                                        <Link href="/admin/articles" className="w-full sm:w-auto order-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="border-2 border-gray-300 text-foreground hover:bg-background px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base w-full"
                                            >
                                                Annuler
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                        </div>
                    </div>

                    {/* Sidebar with Settings */}
                    <div className="xl:col-span-1 order-2 xl:order-2">
                        <div className="space-y-4 sm:space-y-6">
                            {/* Article Settings */}
                            <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Paramètres de l'article</h3>
                                <div className="space-y-3 sm:space-y-4">
                                    {/* Category */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label htmlFor="category" className="text-sm font-semibold text-foreground">Catégorie *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => handleInputChange('category', value)}
                                        >
                                            <SelectTrigger className={`px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${errors.category ? 'border-red-500' : 'border-border'}`}>
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
                                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label htmlFor="status" className="text-sm font-semibold text-foreground">Statut de publication</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value: 'draft' | 'published' | 'archived') =>
                                                handleInputChange('status', value)
                                            }
                                        >
                                            <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-lg sm:rounded-xl bg-card dark:bg-card text-foreground focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Brouillon</SelectItem>
                                                <SelectItem value="published">Publié</SelectItem>
                                                <SelectItem value="archived">Archivé</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="text-xs sm:text-sm text-muted-foreground mt-2">
                                            {formData.status === 'draft' && 'L\'article sera sauvegardé comme brouillon'}
                                            {formData.status === 'published' && 'L\'article sera publié immédiatement'}
                                            {formData.status === 'archived' && 'L\'article sera archivé'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl lg:rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700 p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-blue-800 dark:text-blue-200 mb-3 sm:mb-4">
                                    💡 Conseils de rédaction
                                </h3>
                                <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 space-y-2">
                                    <ul className="space-y-1 sm:space-y-2">
                                        <li>• Utilisez un titre accrocheur et descriptif</li>
                                        <li>• Rédigez un résumé engageant pour attirer les lecteurs</li>
                                        <li>• Structurez votre contenu avec des paragraphes clairs</li>
                                        <li>• Choisissez la bonne catégorie pour votre article</li>
                                        <li>• Sauvegardez d'abord en brouillon pour réviser</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
