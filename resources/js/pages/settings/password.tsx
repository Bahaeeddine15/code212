import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import InputError from '@/components/forms/input-error';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import HeadingSmall from '@/components/common/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Palette, Lock, Menu } from 'lucide-react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Password Settings", isActive: true },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Head>
                <title>Password Settings</title>
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
                                <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                                {/* Settings Navigation */}
                                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-[#1e2939] rounded-lg border border-gray-200 dark:border-[#364153]">
                                    <Link href="/settings/profile">
                                        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#364153] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1e2939]">
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Link href="/settings/appearance">
                                        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#364153] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1e2939]">
                                            <Palette className="w-4 h-4" />
                                            Appearance
                                        </Button>
                                    </Link>
                                    <Button variant="default" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                                        <Lock className="w-4 h-4" />
                                        Password
                                    </Button>
                                </div>

                                <form onSubmit={updatePassword} className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="current_password" className="text-gray-900 dark:text-white">Current password</Label>

                                        <Input
                                            id="current_password"
                                            ref={currentPasswordInput}
                                            value={data.current_password}
                                            onChange={(e) => setData('current_password', e.target.value)}
                                            type="password"
                                            className="mt-1 block w-full bg-white dark:bg-[#1e2939] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                            autoComplete="current-password"
                                            placeholder="Current password"
                                        />

                                        <InputError message={errors.current_password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="text-gray-900 dark:text-white">New password</Label>

                                        <Input
                                            id="password"
                                            ref={passwordInput}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            type="password"
                                            className="mt-1 block w-full bg-white dark:bg-[#1e2939] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                            autoComplete="new-password"
                                            placeholder="New password"
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation" className="text-gray-900 dark:text-white">Confirm password</Label>

                                        <Input
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            type="password"
                                            className="mt-1 block w-full bg-white dark:bg-[#1e2939] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                            autoComplete="new-password"
                                            placeholder="Confirm password"
                                        />

                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing} className="bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">Save password</Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600 dark:text-gray-300">Saved</p>
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
