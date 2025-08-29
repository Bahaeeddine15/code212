import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import HeadingSmall from '@/components/common/heading-small';
import InputError from '@/components/forms/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Palette, Lock, GraduationCap, Mail, Menu } from 'lucide-react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Profile Settings", isActive: true },
];

type EtudiantProfileForm = {
    name: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    // Assuming your auth.user contains etudiant data
    const etudiant = auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm<Required<EtudiantProfileForm>>({
        name: etudiant.name || '',
    });

    // ✅ Sync form data with latest etudiant data whenever it changes
    useEffect(() => {
        setData({
            name: etudiant.name || '',
        });
    }, [etudiant.name]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Use the existing working route instead of etudiant.profile.update
        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // ✅ Reset form to latest server data after successful update
                reset();
            },
        });
    };

    return (
        <>
            <Head>
                <title>Profil Étudiant</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            {/* Custom Dashboard Header */}
            <DashboardHeader breadcrumbs={headerBreadcrumbs} />
            
            <AppShell variant="sidebar">
                <div className="flex w-full min-h-screen">
                    {/* Mobile Backdrop */}
                    {isMobileOpen && (
                        <div 
                            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsMobileOpen(false)}
                        />
                    )}
                    
                    {/* Sidebar with mobile state */}
                    <div className={`
                        fixed lg:relative inset-y-0 left-0 z-40 w-64 lg:w-auto
                        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                        lg:translate-x-0 transition-transform duration-300 ease-in-out
                    `}>
                        <AppSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
                    </div>
                    
                    <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#101828] font-[Poppins] lg:ml-0">
                        <div className="p-4 lg:p-6">
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                                    className="p-3 bg-[#4f39f6] text-white rounded-lg shadow-lg hover:bg-[#3a2b75] transition-colors flex items-center gap-2"
                                >
                                    <Menu className="w-5 h-5" />
                                    <span className="text-sm font-medium">Menu</span>
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                <HeadingSmall 
                                    title="Informations du profil étudiant" 
                                    description="Mettez à jour votre nom" 
                                />

                                {/* Settings Navigation */}
                                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-[#1e2939] rounded-lg border border-gray-200 dark:border-[#364153]">
                                    <Button variant="default" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                                        <User className="w-4 h-4" />
                                        Profil
                                    </Button>
                                    <Link href="/settings/appearance">
                                        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#364153] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1e2939]">
                                            <Palette className="w-4 h-4" />
                                            Apparence
                                        </Button>
                                    </Link>
                                    <Link href="/settings/password">
                                        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#364153] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1e2939]">
                                            <Lock className="w-4 h-4" />
                                            Mot de passe
                                        </Button>
                                    </Link>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-gray-900 dark:text-white">Nom complet</Label>
                                        <Input
                                            id="name"
                                            className="mt-1 block w-full bg-white dark:bg-[#1e2939] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            autoComplete="name"
                                            placeholder="Votre nom complet"
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    {/* Display email as read-only */}
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            Adresse email
                                        </Label>
                                        <div className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#364153] border border-gray-200 dark:border-[#364153] rounded-md text-sm text-gray-700 dark:text-gray-300">
                                            {etudiant.email || 'Non spécifiée'}
                                        </div>
                                        <p className="text-xs text-muted-foreground dark:text-gray-400">
                                            L'adresse email ne peut pas être modifiée. Contactez l'administration si nécessaire.
                                        </p>
                                    </div>

                                    {/* Display école as read-only */}
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                                            <GraduationCap className="w-4 h-4" />
                                            École
                                        </Label>
                                        <div className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#364153] border border-gray-200 dark:border-[#364153] rounded-md text-sm text-gray-700 dark:text-gray-300">
                                            {etudiant.ecole || 'Non spécifiée'}
                                        </div>
                                        <p className="text-xs text-muted-foreground dark:text-gray-400">
                                            L'école ne peut pas être modifiée. Contactez l'administration si nécessaire.
                                        </p>
                                    </div>

                                    {mustVerifyEmail && etudiant.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Votre adresse email n'est pas vérifiée.{' '}
                                                <Link
                                                    href={route('verification.send')}
                                                    method="post"
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Cliquez ici pour renvoyer l'email de vérification.
                                                </Link>
                                            </p>

                                            {status === 'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    Un nouveau lien de vérification a été envoyé à votre adresse email.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing} className="bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600">✅ Enregistré</p>
                                        </Transition>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </AppContent>
                </div>
            </AppShell>
            
            <Footer />
        </>
    );
}