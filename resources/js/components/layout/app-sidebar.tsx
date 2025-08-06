import { NavFooter } from '@/components/navigation/nav-footer';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid, ScrollText, Medal, ClipboardCheck, Calendar, Trophy, FileText} from 'lucide-react';
import AppLogo from './app-logo';



const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Formations',
        href: '/formations',
        icon: ScrollText,
    },
    {
        title: 'Certificats',
        href: '/certificats',
        icon: Medal,
    },
    {
        title: 'Reservations',
        href: '/reservations',
        icon: ClipboardCheck,
    },
    {
        title: 'Events',
        href:'/events',
        icon: Calendar,
    },
    {
        title: 'Compétition',
        href:'/competition',
        icon: Trophy,
    },
    {
        title: 'Article',
        href:'/articles',
        icon: FileText
    },
    {
        title: 'Media',
        href:'/media',
        icon: FileText
    }
    

];


const footerNavItems: NavItem[] = [
   
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="dark:bg-[#0A1F44] m-4 md:peer-data-[variant=inset]:ml-[calc(var(--sidebar-width)+2rem)] peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm">
            <SidebarContent className="bg-white pt-4 text-gray-800 rounded-xl shadow-2xl">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-white mt-3 rounded-xl shadow-2xl mx-2 mb-2">
               
                    <NavUser />
               
                
            </SidebarFooter>
        </Sidebar>
    );
}
