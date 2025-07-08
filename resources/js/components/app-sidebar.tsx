import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    FileText, 
    Calendar, 
    Images, 
    GraduationCap, 
    Trophy
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
    // Repository et Documentation supprimés
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-none">
            <div className="bg-slate-800 dark:bg-slate-900 h-full rounded-lg p-4 flex flex-col">
                <SidebarHeader className="bg-transparent p-0 mb-6 flex-shrink-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="hover:bg-slate-700 text-white">
                                <Link href="/dashboard" prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent className="bg-transparent px-0 flex-1 overflow-hidden">
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                <SidebarFooter className="bg-transparent p-0 flex-shrink-0 space-y-2">
                    <NavFooter items={footerNavItems} />
                    <NavUser />
                </SidebarFooter>
            </div>
        </Sidebar>
    );
}
