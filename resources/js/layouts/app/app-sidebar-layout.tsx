import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import Footer from '@/components/layout/footer';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex gap-6 p-6 min-h-[calc(100vh-theme(spacing.16))] flex-1">
                {/* Sidebar statique */}
                <div className="w-72 flex-shrink-0">
                    <div className="h-full">
                        <AppSidebar />
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="flex-1 min-w-0">
                    <AppContent variant="sidebar" className="overflow-x-hidden">
                        {children}
                    </AppContent>
                </div>
            </div>
        </div>
    );
}
