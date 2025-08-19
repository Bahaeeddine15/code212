import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContentAdmin } from '@/components/user-menu-content-admin';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                    className={cn(
                        "flex items-center w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg border-0",
                        "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white"
                    )}
                >
                    <UserInfo user={auth.user} />
                    <ChevronsUpDown className="ml-auto size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 rounded-lg"
                align="end"
                side={isMobile ? 'bottom' : 'bottom'}
            >
                {'guard' in auth && auth.guard === 'admin'
                    ? <UserMenuContentAdmin user={auth.user} />
                    : <UserMenuContent user={auth.user} />
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
