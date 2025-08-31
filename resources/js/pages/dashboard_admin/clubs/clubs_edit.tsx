import React, { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/forms/input-error';
import { PageHeader, ModernButton } from '@/components/ui/modern-components';
import { Users, Save } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

interface Club {
    id: number;
    name: string;
    logo?: string | null;
    phone: string;
    email: string;
    responsible: string;
    school: string;
}

interface ClubsEditProps {
    club: Club;
    schools: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Gestion des clubs', href: '/admin/clubs' },
    { title: 'Modifier le club', href: '#' },
];

export default function ClubsEdit({ club, schools }: ClubsEditProps) {
    const fileInput = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: club.name || '',
        logo: null as File | null,
        phone: club.phone || '',
        email: club.email || '',
        responsible: club.responsible || '',
        school: club.school || '',
        _method: 'put',
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('logo', e.target.files?.[0] ?? null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/clubs/${club.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Modifier le club : ${club.name}`} />

            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-background min-h-screen">
                <PageHeader
                    title={`Modifier le club : ${club.name}`}
                    description="Modifiez les informations du club"
                    icon={Users}
                    theme="primary"
                />

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-card rounded-xl shadow-lg border border-border p-6 space-y-6">
                    <div>
                        <Label htmlFor="name">Nom du club</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div>
                        <Label htmlFor="logo">Logo du club</Label>
                        <Input
                            id="logo"
                            type="file"
                            accept="image/*"
                            ref={fileInput}
                            onChange={handleLogoChange}
                        />
                        {club.logo && (
                            <img
                                src={`/storage/${club.logo}`}
                                alt={club.name}
                                className="w-20 h-20 rounded-full object-cover mt-2 border"
                            />
                        )}
                        <InputError message={errors.logo} />
                    </div>
                    <div>
                        <Label htmlFor="phone">Numéro de téléphone</Label>
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <Label htmlFor="responsible">Nom du responsable</Label>
                        <Input
                            id="responsible"
                            value={data.responsible}
                            onChange={e => setData('responsible', e.target.value)}
                        />
                        <InputError message={errors.responsible} />
                    </div>
                    <div>
                        <Label htmlFor="school">École / Université</Label>
                        <select
                            id="school"
                            value={data.school}
                            onChange={e => setData('school', e.target.value)}
                            className="w-full border rounded px-2 py-2 bg-background"
                        >
                            <option value="">Sélectionnez...</option>
                            {Object.entries(schools).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        <InputError message={errors.school} />
                    </div>
                    <div className="flex justify-end">
                        <ModernButton
                            theme="primary"
                            icon={Save}
                            type="submit"
                            disabled={processing}
                        >
                            Enregistrer les modifications
                        </ModernButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}