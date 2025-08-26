import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ 
    items = [], 
    onItemClick 
}: { 
    items: NavItem[]; 
    onItemClick?: () => void; 
}) {
    const page = usePage();
    
    // Fonction pour déterminer si un élément est actif
    const isActive = (href: string) => {
        // Gestion spéciale pour les routes qui ont des conflits
        if (href === '/formations') {
            return page.url === '/formations' || page.url.startsWith('/formations/') || page.url.includes('formation');
        }
        if (href === '/competitions') {
            return page.url === '/competitions' || page.url.startsWith('/competitions/') || page.url.includes('competition');
        }
        // Pour les autres routes, utiliser la logique normale
        return page.url.startsWith(href);
    };
    
    return (
        <nav className="space-y-3">
            {items.map((item, index) => (
                <Link
                    key={item.title}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                        "flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 border-0",
                        // Dark mode: Default purple/blue for non-active items
                        "bg-[#4f39f6] hover:bg-[#5a47f7] text-white",
                        "dark:bg-[#4f39f6] dark:hover:bg-[#5a47f7] dark:text-white",
                        // Dark mode: Green for active item (Dashboard)
                        isActive(item.href) && "bg-[#41e296] text-[#1a1a1a] hover:bg-[#41e296]",
                        isActive(item.href) && "dark:bg-[#41e296] dark:text-[#1a1a1a] dark:hover:bg-[#41e296]"
                    )}
                >
                    {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                    <span className="font-medium truncate">{item.title}</span>
                </Link>
            ))}
        </nav>
    );
}
