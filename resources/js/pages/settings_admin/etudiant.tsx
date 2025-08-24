import AppLayout from '@/layouts/app-layout-admin';
import SettingsLayout from '@/layouts/settings/layout_admin';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gérer les étudiants',
        href: '/admin/settings/etudiants',
    },
];

// ✅ Schools from registration form - organized by city
const SCHOOLS = [
    // Marrakech
    { value: 'FSSM', label: 'Faculté des Sciences Semlalia', city: 'Marrakech' },
    { value: 'FSJES Marrakech', label: 'FSJES Marrakech', city: 'Marrakech' },
    { value: 'FLSH Marrakech', label: 'FLSH Marrakech', city: 'Marrakech' },
    { value: 'FMPM', label: 'Faculté de Médecine', city: 'Marrakech' },
    { value: 'FLAM', label: 'Faculté de Langue Arabe', city: 'Marrakech' },
    { value: 'FSTG', label: 'FST Marrakech', city: 'Marrakech' },
    { value: 'ENSA Marrakech', label: 'ENSA Marrakech', city: 'Marrakech' },
    { value: 'ENCG', label: 'ENCG Marrakech', city: 'Marrakech' },
    { value: 'ENS', label: 'ENS Marrakech', city: 'Marrakech' },
    { value: 'PED', label: 'Pôle Études Doctorales', city: 'Marrakech' },
    
    // Safi
    { value: 'FPS', label: 'Faculté Polydisciplinaire de Safi', city: 'Safi' },
    { value: 'ENSA Safi', label: 'ENSA Safi', city: 'Safi' },
    { value: 'EST Safi', label: 'EST Safi', city: 'Safi' },
    
    // Essaouira
    { value: 'EST Essaouira', label: 'EST Essaouira', city: 'Essaouira' },
    
    // El Kelaâ
    { value: 'FSJESK', label: 'FSJES El Kelaâ', city: 'El Kelaâ' },
    { value: 'ESTK', label: 'EST El Kelaâ', city: 'El Kelaâ' },
];

// Group schools by city for better organization
const SCHOOLS_BY_CITY = SCHOOLS.reduce((acc, school) => {
    if (!acc[school.city]) {
        acc[school.city] = [];
    }
    acc[school.city].push(school);
    return acc;
}, {} as Record<string, typeof SCHOOLS>);

export default function EtudiantList() {
    const { etudiants, flash } = usePage().props as { etudiants: any[], flash?: any };
    const [resettingId, setResettingId] = useState<number | null>(null);
    const [updatingSchoolId, setUpdatingSchoolId] = useState<number | null>(null);

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

    const handleSchoolChange = (etudiantId: number, newSchool: string) => {
        setUpdatingSchoolId(etudiantId);
        router.patch(
            `/admin/settings/etudiants/${etudiantId}/update-school`,
            { ecole: newSchool },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingSchoolId(null),
                onSuccess: () => {
                    console.log('École mise à jour avec succès');
                },
                onError: (errors) => {
                    console.error('Erreur lors de la mise à jour:', errors);
                }
            }
        );
    };

    // Get display name for school
    const getSchoolDisplayName = (schoolValue: string) => {
        const school = SCHOOLS.find(s => s.value === schoolValue);
        return school ? school.label : schoolValue;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gérer les étudiants" />
            <SettingsLayout>
                <div className="bg-background min-h-screen space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-foreground">Tous les étudiants</h2>
                        <div className="text-sm text-muted-foreground">
                            Total: {etudiants.length} étudiant{etudiants.length > 1 ? 's' : ''}
                        </div>
                    </div>
                    
                    {flash?.success && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg">
                            <strong>Succès:</strong> {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg">
                            <strong>Erreur:</strong> {flash.error}
                        </div>
                    )}
                    
                    {/* ✅ Dark mode compatible table */}
                    <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
                        <table className="min-w-full bg-card dark:bg-card">
                            <thead>
                                <tr className="bg-muted/50 dark:bg-muted/50 border-b border-border">
                                    <th className="py-4 px-6 text-left font-semibold text-foreground">Nom</th>
                                    <th className="py-4 px-6 text-left font-semibold text-foreground">Email</th>
                                    <th className="py-4 px-6 text-left font-semibold text-foreground">Établissement</th>
                                    <th className="py-4 px-6 text-left font-semibold text-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {etudiants.map((etudiant) => (
                                    <tr key={etudiant.id} className="hover:bg-muted/30 dark:hover:bg-muted/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-foreground">{etudiant.name}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-muted-foreground">{etudiant.email}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Select
                                                value={etudiant.ecole || ''}
                                                onValueChange={(value) => handleSchoolChange(etudiant.id, value)}
                                                disabled={updatingSchoolId === etudiant.id}
                                            >
                                                <SelectTrigger className="w-64 h-9 bg-background dark:bg-background border-border">
                                                    <SelectValue placeholder="Choisir une école">
                                                        {updatingSchoolId === etudiant.id ? (
                                                            <span className="flex items-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                                <span className="text-sm text-muted-foreground">Mise à jour...</span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-foreground">
                                                                {etudiant.ecole ? getSchoolDisplayName(etudiant.ecole) : 'Non définie'}
                                                            </span>
                                                        )}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[320px] overflow-y-auto relative bg-popover dark:bg-popover border-border">
                                                    <div className="divide-y divide-border">
                                                        {Object.entries(SCHOOLS_BY_CITY).map(([city, schools]) => (
                                                            <div key={city} className="relative">
                                                                {/* ✅ Dark mode sticky city header */}
                                                                <div className="sticky top-0 z-10 bg-popover dark:bg-popover border-b border-border px-3 py-2 text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide shadow-sm">
                                                                    📍 {city}
                                                                </div>
                                                                {/* School options */}
                                                                <div className="bg-popover dark:bg-popover">
                                                                    {schools.map((school) => (
                                                                        <SelectItem 
                                                                            key={school.value} 
                                                                            value={school.value}
                                                                            className="pl-6 py-2 text-sm hover:bg-accent dark:hover:bg-accent focus:bg-accent dark:focus:bg-accent cursor-pointer"
                                                                        >
                                                                            <span className="block text-foreground">
                                                                                {school.label}
                                                                            </span>
                                                                        </SelectItem>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700"
                                                disabled={resettingId === etudiant.id}
                                                onClick={() => handleReset(etudiant.id)}
                                            >
                                                {resettingId === etudiant.id ? (
                                                    <span className="flex items-center gap-2">
                                                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Réinitialisation...</span>
                                                    </span>
                                                ) : (
                                                    'Réinitialiser le mot de passe'
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {etudiants.length === 0 && (
                        <div className="text-center py-12 bg-card dark:bg-card rounded-lg border border-border shadow-sm">
                            <div className="text-muted-foreground">
                                <p className="text-lg font-medium mb-2">Aucun étudiant trouvé</p>
                                <p className="text-sm">Les étudiants inscrits apparaîtront ici.</p>
                            </div>
                        </div>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}