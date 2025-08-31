import React from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';
import { BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2, Users, Phone, Mail, School } from 'lucide-react';

interface Club {
    id: number;
    name: string;
    logo?: string | null;
    phone: string;
    email: string;
    responsible: string;
    school: string;
}

interface ClubsProps {
    clubs: Club[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des clubs',
        href: '/admin/clubs',
    },
];

const ClubCard = ({
    club,
    onEdit,
    onDelete
}: {
    club: Club;
    onEdit: (club: Club) => void;
    onDelete: (id: number) => void;
}) => {
    return (
        <div className="bg-card dark:bg-card rounded-xl lg:rounded-2xl shadow-lg border border-border p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
                {club.logo ? (
                    <img
                        src={`/storage/${club.logo}`}
                        alt={club.name}
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                        {club.name.charAt(0)}
                    </div>
                )}
                <div>
                    <h3 className="text-lg font-bold text-foreground">{club.name}</h3>
                    <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs mt-1">
                        <School className="inline w-4 h-4 mr-1" />
                        {club.school}
                    </Badge>
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Responsable : {club.responsible}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{club.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{club.email}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(club)}>
                    <Edit className="w-4 h-4 mr-1" /> Modifier
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(club.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                </Button>
            </div>
        </div>
    );
};

export default function Clubs({ clubs }: ClubsProps) {
    const handleEdit = (club: Club) => {
        router.visit(`/admin/clubs/${club.id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce club ?')) {
            router.delete(`/admin/clubs/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des clubs" />

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background">

                <PageHeader
                    title="Clubs"
                    description="Créez et gérez les clubs de l'établissement"
                    icon={Users}
                    theme="primary"
                    actions={
                        <Link href="/admin/clubs/create" className="w-full sm:w-auto">
                            <ModernButton theme="primary" icon={Plus} className="w-full sm:w-auto">
                                Nouveau club
                            </ModernButton>
                        </Link>
                    }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {clubs.length > 0 ? (
                        clubs.map((club) => (
                            <ClubCard
                                key={club.id}
                                club={club}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 sm:py-12 col-span-full">
                            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Aucun club trouvé</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                                Commencez par créer votre premier club
                            </p>
                            <Link href="/admin/clubs/create">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto text-sm sm:text-base">
                                    <Plus className="w-5 h-5" />
                                    <span>Créer un club</span>
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}