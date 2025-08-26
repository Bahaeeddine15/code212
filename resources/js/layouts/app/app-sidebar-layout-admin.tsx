import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarAdmin } from '@/components/app-sidebar-admin';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AppSidebarLayoutAdmin({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <MainHeader breadcrumbs={breadcrumbs} />
            
            {/* Bouton menu mobile */}
            <div className="lg:hidden p-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <div className="flex gap-3 lg:gap-6 p-3 lg:p-6 min-h-[calc(100vh-theme(spacing.16))] flex-1 relative">
                {/* Overlay pour mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar responsive */}
                <div className={`
                    fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
                    w-72 lg:w-72 flex-shrink-0
                    transform transition-transform duration-300 ease-in-out lg:transform-none
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="h-full bg-background lg:bg-transparent flex flex-col">
                        {/* Bouton fermer sur mobile */}
                        <div className="lg:hidden flex justify-end p-4 flex-shrink-0">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
                                aria-label="Fermer le menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {/* Sidebar avec scroll */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden">
                            <AppSidebarAdmin />
                        </div>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="flex-1 min-w-0">
                    <AppContent variant="sidebar" className="overflow-x-hidden">
                        {children}
                    </AppContent>
                </div>
            </div>
            <MainFooter />
        </div>
    );
}
