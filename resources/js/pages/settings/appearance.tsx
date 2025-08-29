import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppearanceTabs from '@/components/common/appearance-tabs';
import HeadingSmall from '@/components/common/heading-small';
import { type BreadcrumbItem } from '@/types';
import { User, Palette, Lock, Menu } from 'lucide-react';
import { useState } from 'react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Appearance Settings", isActive: true },
];

export default function Appearance() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
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
                                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                                
                                {/* Settings Navigation */}
                                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-[#1e2939] rounded-lg border border-gray-200 dark:border-[#364153]">
                                    <Link href="/settings/profile">
                                        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#364153] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1e2939]">
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button variant="default" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                                        <Palette className="w-4 h-4" />
                                        Appearance
                                    </Button>
                                    <Link href="/settings/password">
                                        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-[#364153] border-gray-300 dark:border-[#364153] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1e2939]">
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
            
            <Footer />
        </>
    );
}
