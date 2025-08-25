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
import { ArrowLeft, Save, X } from 'lucide-react';

// Types pour l'article
interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    status: 'published' | 'draft' | 'archived';
    category: string;
    views: number;
    images?: string[];
    created_at: string;
    updated_at: string;
}

interface ArticleEditProps {
    article: Article;
}

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
        title: 'Modifier l\'article',
        href: '#',
    },
];

export default function ArticleEdit({ article }: ArticleEditProps) {
    const [formData, setFormData] = useState({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        status: article.status
    });

    const [existingImages, setExistingImages] = useState<string[]>(article.images || []);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageError, setImageError] = useState('');

    const handleRemoveExistingImage = (idx: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleRemoveNewImage = (idx: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);

        const canAdd = 5 - existingImages.length - newImages.length;
        const filesToAdd = files.slice(0, canAdd);

        if (existingImages.length + newImages.length + files.length > 5) {
            setImageError('Vous pouvez ajouter jusqu\'à 5 images maximum. Seules les 5 premières seront conservées.');
        } else {
            setImageError('');
        }

        setNewImages(prev => [...prev, ...filesToAdd].slice(0, 5 - existingImages.length));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        newImages.forEach((file, idx) => data.append(`images[${idx}]`, file));
        data.append('existing_images', JSON.stringify(existingImages));

        router.post(`/admin/articles/${article.id}?_method=PUT`, data, {
            onSuccess: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false)
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Modifier: ${article.title}`} />

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 rounded-xl p-3 sm:p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground dark:text-gray-100">
                        Modifier l'article
                    </h1>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                            href={`/admin/articles/${article.id}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 transition-colors font-medium text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Retour à l'article</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>
                </div>

                {/* Edit Form */}
                <Card className="rounded-xl lg:rounded-2xl">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl">Modifier l'article</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-semibold">Titre</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Titre de l'article"
                                        required
                                        className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-semibold">Catégorie</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                    >
                                        <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base">
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="actualite">Actualité</SelectItem>
                                            <SelectItem value="information">Information</SelectItem>
                                            <SelectItem value="guide">Guide</SelectItem>
                                            <SelectItem value="evenement">Événement</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt" className="text-sm font-semibold">Résumé</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                    placeholder="Résumé de l'article"
                                    rows={3}
                                    required
                                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-sm font-semibold">Contenu</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Contenu complet de l'article"
                                    rows={10}
                                    required
                                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-semibold">Statut</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: 'draft' | 'published' | 'archived') =>
                                        setFormData(prev => ({ ...prev, status: value }))
                                    }
                                >
                                    <SelectTrigger className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Brouillon</SelectItem>
                                        <SelectItem value="published">Publié</SelectItem>
                                        <SelectItem value="archived">Archivé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {existingImages.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={`/storage/${img}`}
                                                alt={`existing-${idx}`}
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(idx)}
                                                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-card dark:bg-card rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                title="Supprimer"
                                            >
                                                <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* New Images */}
                            {newImages.length > 0 && (
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {newImages.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt={`new-${idx}`}
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewImage(idx)}
                                                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-card dark:bg-card rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                title="Supprimer"
                                            >
                                                <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Image Upload Input */}
                            <div className="space-y-2">
                                <Label htmlFor="images" className="text-sm font-semibold">Ajouter des images (max 5)</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    disabled={existingImages.length + newImages.length >= 5}
                                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base"
                                />
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Vous pouvez ajouter jusqu'à 5 images au total.
                                </p>
                                {imageError && (
                                    <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">{imageError}</p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl w-full sm:w-auto">
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                                <Link href={`/admin/articles/${article.id}`} className="w-full sm:w-auto">
                                    <Button type="button" variant="outline" className="px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl w-full">
                                        Annuler
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
