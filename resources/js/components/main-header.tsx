import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface MainHeaderProps {
    breadcrumbs?: { title: string; href?: string }[];
}

export function MainHeader({ breadcrumbs = [] }: MainHeaderProps) {
    return (
        <header className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
            <div className="px-12 py-8">
                <div className="flex items-center justify-between">
                    {/* Section gauche - Dashboard et breadcrumbs */}
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
                        
                        {breadcrumbs.length > 0 && (
                            <nav className="flex items-center space-x-2 text-sm">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                        {breadcrumb.href ? (
                                            <Link 
                                                href={breadcrumb.href}
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                {breadcrumb.title}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-300">{breadcrumb.title}</span>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Section centrale - Logo CODE212 (Mobile and Small screens) */}
                    <div className="flex items-center justify-center md:hidden">
                        <div className="text-center">
                            <img 
                                src="/logo/Logo.png" 
                                alt="CODE212 Logo" 
                                className="h-12 sm:h-14 w-auto object-contain filter brightness-110 drop-shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Section droite - Logo for iPad/Tablet mode (replaces robot) */}
                    <div className="hidden md:flex lg:hidden items-center justify-end">
                        <div className="text-center">
                            <img 
                                src="/logo/Logo.png" 
                                alt="CODE212 Logo" 
                                className="h-14 md:h-16 w-auto object-contain filter brightness-110 drop-shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Section centrale - Logo CODE212 (Desktop lg+) */}
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="text-center">
                            <img 
                                src="/logo/Logo.png" 
                                alt="CODE212 Logo" 
                                className="h-16 w-auto object-contain filter brightness-110 drop-shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Section droite - Robot (Desktop only, hidden on iPad) */}
                    <div className="hidden lg:flex items-center">
                        <div className="relative">
                            <div className="w-16 h-16 flex items-center justify-center">
                                <img 
                                    src="/logo/robot.png" 
                                    alt="Robot" 
                                    className="w-14 h-14 object-contain filter brightness-110 drop-shadow-lg"
                                />
                            </div>
                            {/* Petit robot supplémentaire comme dans l'image */}
                            <div className="absolute -top-1 -right-1">
                                <img 
                                    src="/logo/robot.png" 
                                    alt="Small Robot" 
                                    className="w-7 h-7 object-contain opacity-90 filter brightness-110 drop-shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
