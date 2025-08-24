import { NavFooter } from '@/components/navigation/nav-footer';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
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
        title: 'Réservations',
        href: '/reservations',
        icon: ClipboardCheck,
    },
    {
        title: 'Événements',
        href:'/events',
        icon: Calendar,
    },
    {
        title: 'Compétitions',
        href:'/competition',
        icon: Trophy,
    },
    {
        title: 'Articles',
        href:'/articles',
        icon: FileText
    },
    {
        title: 'Galerie Multimedia',
        href:'/media',
        icon: FileText
    }
    

];


const footerNavItems: NavItem[] = [
   
];

interface AppSidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export function AppSidebar({ isMobileOpen, setIsMobileOpen }: AppSidebarProps = {}) {
    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
                {/* Mobile Close Button */}
                {setIsMobileOpen && (
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <h1 className="text-xl font-bold text-foreground">CODE212-UCA</h1>
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="p-1 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Desktop Title */}
                <div className={`text-center mb-8 ${setIsMobileOpen ? 'hidden lg:block' : ''}`}>
                    <h1 className="text-xl font-bold text-foreground">CODE212-UCA</h1>
                </div>

                <div className="space-y-4 flex-1">
                    <NavMain 
                        items={mainNavItems} 
                        onItemClick={setIsMobileOpen ? () => setIsMobileOpen(false) : undefined}
                    />
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
