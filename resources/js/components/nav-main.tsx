import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
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
        <nav className="space-y-4">
            {items.map((item, index) => (
                <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 border-0",
                        // Couleur par défaut : bleu avec support dark mode
                        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white",
                        // Couleur active : vert avec support dark mode
                        isActive(item.href) && "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
                    )}
                >
                    {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                    <span className="font-medium truncate">{item.title}</span>
                </Link>
            ))}
        </nav>
    );
}
