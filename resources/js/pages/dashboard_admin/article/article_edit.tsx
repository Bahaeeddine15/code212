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

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/admin/articles/${article.id}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à l'article
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Modifier l'article
                    </h1>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Modifier l'article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Titre</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Titre de l'article"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Catégorie</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                    >
                                        <SelectTrigger>
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
                                <Label htmlFor="excerpt">Résumé</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                    placeholder="Résumé de l'article"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Contenu</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Contenu complet de l'article"
                                    rows={12}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Statut</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: 'draft' | 'published' | 'archived') =>
                                        setFormData(prev => ({ ...prev, status: value }))
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
                            </div>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {existingImages.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={`/storage/${img}`}
                                                alt={`existing-${idx}`}
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(idx)}
                                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                title="Supprimer"
                                            >
                                                <X className="w-4 h-4 text-red-600" />
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
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewImage(idx)}
                                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                                title="Supprimer"
                                            >
                                                <X className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Image Upload Input */}
                            <div className="space-y-2">
                                <Label htmlFor="images">Ajouter des images (max 5)</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    disabled={existingImages.length + newImages.length >= 5}
                                />
                                <p className="text-sm text-gray-500">
                                    Vous pouvez ajouter jusqu'à 5 images au total.
                                </p>
                                {imageError && (
                                    <p className="text-sm text-red-600">{imageError}</p>
                                )}
                            </div>

                            <div className="flex gap-4 pt-6">
                                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                                <Link href={`/admin/articles/${article.id}`}>
                                    <Button type="button" variant="outline">
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
