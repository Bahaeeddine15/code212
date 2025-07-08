import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className={cn(
                                    "h-12 rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg border-0",
                                    "bg-indigo-600 hover:bg-indigo-700 text-white"
                                )}
                            >
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full">
                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5 flex-shrink-0" />}
                                    <span className="font-medium truncate">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
