import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import Footer from '@/components/layout/footer';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <div className="flex w-full min-h-screen">
                <AppSidebar />
                <AppContent
                    variant="sidebar"
                    className="overflow-x-hidden overflow-y-auto h-screen flex-1"
                >
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <div className="flex-1">
                        {children}
                    </div>
                </AppContent>
            </div>
        </AppShell>
    );
}
