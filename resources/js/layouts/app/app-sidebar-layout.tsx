import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarAdmin } from '@/components/app-sidebar-admin';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <MainHeader breadcrumbs={breadcrumbs} />
            <div className="flex gap-6 p-6 min-h-[calc(100vh-theme(spacing.16))] flex-1">
                {/* Sidebar statique */}
                <div className="w-72 flex-shrink-0">
                    <div className="h-full">
                        <AppSidebarAdmin />
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="flex-1 min-w-0">
                    <AppContent variant="sidebar" className="overflow-x-hidden">
                        {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
                        {children}
                    </AppContent>
                </div>
            </div>
            <MainFooter />
        </div>
    );
}
