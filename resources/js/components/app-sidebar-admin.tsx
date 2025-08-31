import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    FileText,
    Calendar,
    Images,
    GraduationCap,
    Trophy,
    Building2,
    Club
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des articles',
        href: '/admin/articles',
        icon: FileText,
    },
    {
        title: 'Gestion des événements',
        href: '/admin/events',
        icon: Calendar,
    },
    {
        title: 'Gestion des réservations',
        href: '/admin/reservations',
        icon: Building2,
    },
    {
        title: 'Galerie médias',
        href: '/admin/media',
        icon: Images,
    },
    {
        title: 'Formations/Certifications',
        href: '/admin/formations',
        icon: GraduationCap,
    },
    {
        title: 'Inscription compétitions',
        href: '/admin/competitions',
        icon: Trophy,
    },
    {
        title: 'Gestion des clubs',
        href: '/admin/clubs',
        icon: Club,
    },
];

const footerNavItems: NavItem[] = [
];

export function AppSidebarAdmin() {
    return (
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden h-full flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
                </div>

                <div className="space-y-4 flex-1">
                    <NavMain items={mainNavItems} />
                </div>

                <div className="mt-8 pt-6 border-t border-border flex-shrink-0">
                    <NavFooter items={footerNavItems} />
                    <div className="mt-4">
                        <NavUser />
                    </div>
                </div>
            </div>
        </div>
    );
}
