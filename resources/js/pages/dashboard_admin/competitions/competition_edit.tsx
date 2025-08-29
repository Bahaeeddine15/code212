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
        isActive: true,
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
        type: competition.type || 'individual'
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

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 rounded-xl p-3 sm:p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 order-2 lg:order-1">
                        <Link
                            href={`/admin/competitions/${competition.id}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Retour à la compétition</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground dark:text-gray-100">
                            Modifier la compétition
                        </h1>
                        <p className="text-muted-foreground dark:text-gray-400 mt-1 text-sm sm:text-base">
                            Modifiez les informations de votre compétition
                        </p>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                    {/* Main Form */}
                    <div className="xl:col-span-2">
                        <Card className="rounded-xl lg:rounded-2xl">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl">
                                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Modifier la compétition
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm font-medium">Titre de la compétition *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Championnat National 2024"
                                            required
                                            className={`text-sm sm:text-base ${errors.title ? 'border-red-500' : ''}`}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Date and Deadline */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="date" className="text-sm font-medium">Date de la compétition *</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => handleInputChange('date', e.target.value)}
                                                required
                                                style={{
                                                    colorScheme: 'light'
                                                }}
                                                className={`text-sm sm:text-base ${errors.date ? 'border-red-500' : ''}`}
                                            />
                                            {errors.date && (
                                                <p className="text-sm text-red-600 dark:text-red-400">{errors.date}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="deadline" className="text-sm font-medium">Date limite d'inscription *</Label>
                                            <Input
                                                id="deadline"
                                                type="date"
                                                value={formData.deadline}
                                                onChange={(e) => handleInputChange('deadline', e.target.value)}
                                                required
                                                style={{
                                                    colorScheme: 'light'
                                                }}
                                                className={`text-sm sm:text-base ${errors.deadline ? 'border-red-500' : ''}`}
                                            />
                                            {errors.deadline && (
                                                <p className="text-sm text-red-600 dark:text-red-400">{errors.deadline}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-sm font-medium">Lieu de la compétition *</Label>
                                        <Input
                                            id="location"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            placeholder="Stade Olympique, Paris"
                                            required
                                            className={`text-sm sm:text-base ${errors.location ? 'border-red-500' : ''}`}
                                        />
                                        {errors.location && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.location}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Description détaillée de la compétition, règlement, prix..."
                                            rows={6}
                                            className={`text-sm sm:text-base resize-none ${errors.description ? 'border-red-500' : ''}`}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                        )}
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Décrivez les détails de la compétition, le règlement et les prix.
                                        </p>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto text-sm sm:text-base"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isSubmitting ? 'Mise à jour...' : 'Enregistrer les modifications'}
                                        </Button>
                                        <Link href={`/admin/competitions/${competition.id}`} className="w-full sm:w-auto">
                                            <Button type="button" variant="outline" className="w-full text-sm sm:text-base">
                                                Annuler
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar with Settings */}
                    <div className="xl:col-span-1">
                        <div className="space-y-4 sm:space-y-6">
                            {/* Competition Settings */}
                            <Card className="rounded-xl lg:rounded-2xl">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="text-base sm:text-lg">Paramètres de la compétition</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-sm font-medium">Catégorie *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => handleInputChange('category', value)}
                                        >
                                            <SelectTrigger className={`text-sm sm:text-base ${errors.category ? 'border-red-500' : ''}`}>
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
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                                        )}
                                    </div>

                                    {/* Type de compétition */}
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-sm font-medium">Type de compétition *</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value) => handleInputChange('type', value)}
                                        >
                                            <SelectTrigger className={`text-sm sm:text-base ${errors.type ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Choisir un type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="individual">Individuelle</SelectItem>
                                                <SelectItem value="group">En équipe</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.type}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            Choisissez si la compétition est individuelle ou par équipe.
                                        </p>
                                    </div>

                                    {/* Max Participants */}
                                    <div className="space-y-2">
                                        <Label htmlFor="maxParticipants">
                                            {formData.type === 'group' ? 'Nombre maximum d\'équipes' : 'Nombre maximum de participants'} *
                                        </Label>
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
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.maxParticipants}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            {formData.type === 'group' 
                                                ? 'Limitez le nombre d\'équipes pour cette compétition.'
                                                : 'Limitez le nombre de participants pour cette compétition.'
                                            }
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Competition Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Informations actuelles</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Statut:</span>
                                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                            competition.status === 'Ouvert' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                            competition.status === 'Complet' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                        }`}>
                                            {competition.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Inscriptions:</span>
                                        <span className="text-sm font-medium text-foreground">
                                            {competition.registrations}/{competition.maxParticipants}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Type:</span>
                                        <span className="text-sm font-medium text-foreground">
                                            {formData.type === 'individual' ? 'Individuelle' : 'En équipe'}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Actions rapides</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Link href={`/admin/competitions/${competition.id}`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Voir la compétition
                                            </Button>
                                        </Link>
                                        <Link href="/admin/competitions">
                                            <Button variant="ghost" className="w-full justify-start">
                                                Retour à la liste
                                            </Button>
                                        </Link>
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