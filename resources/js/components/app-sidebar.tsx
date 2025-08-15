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
    Building2
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des articles',
        href: '/articles',
        icon: FileText,
    },
    {
        title: 'Gestion des événements',
        href: '/events',
        icon: Calendar,
    },
    {
        title: 'Gestion des réservations',
        href: '/reservations',
        icon: Building2,
    },
    {
        title: 'Galerie médias',
        href: '/media',
        icon: Images,
    },
    {
        title: 'Formations/Certifications',
        href: '/formations',
        icon: GraduationCap,
    },
    {
        title: 'Inscription compétitions',
        href: '/competitions',
        icon: Trophy,
    },
];

const footerNavItems: NavItem[] = [
];

export function AppSidebar() {
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
