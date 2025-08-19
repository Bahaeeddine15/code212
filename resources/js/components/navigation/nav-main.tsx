import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-4 py-2">
            <SidebarGroupLabel className="text-black ml-6 font-extrabold mb-4 text-xl text-center font-[Poppins]">CODE212-UCA</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                            asChild 
                            isActive={page.url.startsWith(item.href)} 
                            tooltip={{ children: item.title }}
                            className="rounded-2xl h-12 px-6 text-white font-medium transition-all duration-300 bg-[#4f39f6] hover:bg-[#41e296]/80 hover:text-[#3a2b6a] data-[active=true]:bg-[#41e296] data-[active=true]:text-[#3a2b6a] data-[active=true]:font-semibold"
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3 w-full">
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
