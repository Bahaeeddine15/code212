import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    // Couleurs pour chaque élément - Dashboard en vert, les autres en bleu
    const getItemColor = (index: number) => {
        if (index === 0) {
            // Dashboard en vert
            return 'bg-emerald-500 hover:bg-emerald-600 text-white';
        }
        // Tous les autres en bleu
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    };
    
    return (
        <SidebarGroup className="px-0 py-0 h-full">
            <SidebarMenu className="space-y-2 overflow-hidden">
                {items.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                            asChild 
                            isActive={page.url.startsWith(item.href)} 
                            tooltip={{ children: item.title }}
                            className={cn(
                                "h-12 rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg border-0",
                                getItemColor(index),
                                "data-[active=true]:scale-105 data-[active=true]:shadow-lg data-[active=true]:ring-2 data-[active=true]:ring-white data-[active=true]:ring-opacity-20"
                            )}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3 w-full">
                                {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                                <span className="font-medium truncate">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
