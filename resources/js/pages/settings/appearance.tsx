import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppearanceTabs from '@/components/common/appearance-tabs';
import HeadingSmall from '@/components/common/heading-small';
import { type BreadcrumbItem } from '@/types';
import { User, Palette, Lock } from 'lucide-react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Appearance Settings", isActive: true },
];

export default function Appearance() {
    return (
        <>
            <Head>
                <title>Appearance Settings</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            {/* Custom Dashboard Header */}
            <DashboardHeader breadcrumbs={headerBreadcrumbs} />
            
            <AppShell variant="sidebar">
                <div className="flex w-full min-h-screen">
                    <AppSidebar />
                    <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
                        <div className="p-6">
                            <div className="space-y-6">
                                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                                
                                {/* Settings Navigation */}
                                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border">
                                    <Link href="/settings/profile">
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button variant="default" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                                        <Palette className="w-4 h-4" />
                                        Appearance
                                    </Button>
                                    <Link href="/settings/password">
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Password
                                        </Button>
                                    </Link>
                                </div>
                                
                                <AppearanceTabs />
                            </div>
                        </div>
                    </AppContent>
                </div>
            </AppShell>
        </>
    );
}
