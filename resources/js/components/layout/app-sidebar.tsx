import { NavFooter } from '@/components/navigation/nav-footer';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid, BookOpen, Award, CalendarSync, FileText } from 'lucide-react';
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
        icon: BookOpen,
    },
    {
        title: 'Certificats',
        href: '/certificats',
        icon: Award,
    },
    {
        title: 'Reservations',
        href: '/reservations',
        icon: CalendarSync,
    },
    {
        title: 'Events',
        href:'/events',
    },
    {
        title: 'Compétition',
        href:'/competition'
    },
    {
         title: 'Article',
        href:'/articles',
        icon: FileText
    }
];


const footerNavItems: NavItem[] = [
   
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="dark:bg-[#0A1F44]">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent  className="bg-[#3a2b6c] pt-2 text-white rounded-2xl shadow-2xl">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-[#3a2b6c] mt-3 rounded-2xl shadow-2xl">
               
                    <NavUser />
               
                
            </SidebarFooter>
        </Sidebar>
    );
}
