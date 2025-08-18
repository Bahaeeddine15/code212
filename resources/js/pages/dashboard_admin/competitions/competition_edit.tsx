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
import { ArrowLeft, Save, Trophy } from 'lucide-react';

// Types
interface Competition {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    maxParticipants: number;
    deadline: string;
    description?: string;
    status: 'Ouvert' | 'Complet' | 'Fermé';
    registrations: number;
    type: 'individual' | 'group';
}

interface CompetitionEditProps {
    competition: Competition;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Compétitions',
        href: '/admin/competitions',
    },
    {
        title: 'Modifier la compétition',
        href: '#',
    },
];

export default function CompetitionEdit({ competition }: CompetitionEditProps) {
    const [formData, setFormData] = useState({
        title: competition.title,
        date: competition.date,
        location: competition.location,
        category: competition.category,
        maxParticipants: competition.maxParticipants.toString(),
        deadline: competition.deadline,
        description: competition.description || '',
        type: competition.type, // instead of 'individual'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.put(`/admin/competitions/${competition.id}`, formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                // Will redirect to competitions list automatically
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Modifier: ${competition.title}`} />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/admin/competitions/${competition.id}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la compétition
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Modifier la compétition
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Modifiez les informations de votre compétition
                        </p>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5" />
                                    Modifier la compétition
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Titre de la compétition *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Championnat National 2024"
                                            required
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Date and Deadline */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date de la compétition *</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => handleInputChange('date', e.target.value)}
                                                required
                                                className={errors.date ? 'border-red-500' : ''}
                                            />
                                            {errors.date && (
                                                <p className="text-sm text-red-600">{errors.date}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="deadline">Date limite d'inscription *</Label>
                                            <Input
                                                id="deadline"
                                                type="date"
                                                value={formData.deadline}
                                                onChange={(e) => handleInputChange('deadline', e.target.value)}
                                                required
                                                className={errors.deadline ? 'border-red-500' : ''}
                                            />
                                            {errors.deadline && (
                                                <p className="text-sm text-red-600">{errors.deadline}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Lieu de la compétition *</Label>
                                        <Input
                                            id="location"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            placeholder="Stade Olympique, Paris"
                                            required
                                            className={errors.location ? 'border-red-500' : ''}
                                        />
                                        {errors.location && (
                                            <p className="text-sm text-red-600">{errors.location}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Description détaillée de la compétition, règlement, prix..."
                                            rows={6}
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-600">{errors.description}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Décrivez les détails de la compétition, le règlement et les prix.
                                        </p>
                                    </div>

                                    {/* Type of Competition */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-gray-700">Type de compétition *</label>
                                        <select
                                            value={formData.type}
                                            onChange={e => handleInputChange('type', e.target.value)}
                                            className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.type ? 'border-red-500' : 'border-gray-200'}`}
                                            required
                                        >
                                            <option value="individual">Individuelle</option>
                                            <option value="group">Par groupe</option>
                                        </select>
                                        {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex gap-4 pt-6 border-t">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isSubmitting ? 'Mise à jour...' : 'Enregistrer les modifications'}
                                        </Button>
                                        <Link href={`/admin/competitions/${competition.id}`}>
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
                            {/* Competition Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Paramètres de la compétition</CardTitle>
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
                                                <SelectItem value="Junior">Junior</SelectItem>
                                                <SelectItem value="Senior">Senior</SelectItem>
                                                <SelectItem value="Elite">Elite</SelectItem>
                                                <SelectItem value="Veteran">Vétéran</SelectItem>
                                                <SelectItem value="Open">Open</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-sm text-red-600">{errors.category}</p>
                                        )}
                                    </div>

                                    {/* Max Participants */}
                                    <div className="space-y-2">
                                        <Label htmlFor="maxParticipants">Nombre maximum de participants *</Label>
                                        <Input
                                            id="maxParticipants"
                                            type="number"
                                            value={formData.maxParticipants}
                                            onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                                            placeholder="50"
                                            min="1"
                                            required
                                            className={errors.maxParticipants ? 'border-red-500' : ''}
                                        />
                                        {errors.maxParticipants && (
                                            <p className="text-sm text-red-600">{errors.maxParticipants}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Limitez le nombre de participants pour cette compétition.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Competition Info */}
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
                                <CardHeader>
                                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                                        📊 Informations actuelles
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-blue-700 dark:text-blue-300 space-y-3">
                                    <div className="flex justify-between">
                                        <span>Inscriptions actuelles:</span>
                                        <span className="font-semibold">{competition.registrations}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Places restantes:</span>
                                        <span className="font-semibold">{competition.maxParticipants - competition.registrations}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Statut:</span>
                                        <span className="font-semibold">{competition.status}</span>
                                    </div>
                                    <div className="pt-2 border-t border-blue-200">
                                        <p className="text-xs">
                                            ⚠️ Attention: La modification du nombre maximum de participants peut affecter les inscriptions existantes.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
