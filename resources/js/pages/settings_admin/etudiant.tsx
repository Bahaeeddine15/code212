import AppLayout from '@/layouts/app-layout-admin';
import SettingsLayout from '@/layouts/settings/layout_admin';
import { Button } from '@/components/ui/button';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gérer les étudiants',
        href: '/admin/settings/etudiants',
    },
];

export default function EtudiantList() {
    const { etudiants, flash } = usePage().props as { etudiants: any[], flash?: any };
    const [resettingId, setResettingId] = useState<number | null>(null);

    const handleReset = (id: number) => {
        setResettingId(id);
        router.post(
            `/admin/settings/etudiants/${id}/reset-password`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setResettingId(null),
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gérer les étudiants" />
            <SettingsLayout>
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Tous les étudiants</h2>
                    {flash?.success && (
                        <div className="p-2 bg-green-100 text-green-800 rounded">{flash.success}</div>
                    )}
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4 font-semibold">Nom</th>
                                    <th className="py-2 px-4 font-semibold">Email</th>
                                    <th className="py-2 px-4 font-semibold">Établissement</th>
                                    <th className="py-2 px-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {etudiants.map((etudiant) => (
                                    <tr key={etudiant.id} className="border-t">
                                        <td className="py-2 px-4">{etudiant.name}</td>
                                        <td className="py-2 px-4">{etudiant.email}</td>
                                        <td className="py-2 px-4">{etudiant.ecole}</td>
                                        <td className="py-2 px-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs"
                                                disabled={resettingId === etudiant.id}
                                                onClick={() => handleReset(etudiant.id)}
                                            >
                                                {resettingId === etudiant.id ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}