import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface MainHeaderProps {
    breadcrumbs?: { title: string; href?: string }[];
}

export function MainHeader({ breadcrumbs = [] }: MainHeaderProps) {
    return (
        <header className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
            <div className="px-3 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-8">
                <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
                    {/* Section gauche - Dashboard et breadcrumbs */}
                    <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1 lg:flex-none">
                        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white truncate">Dashboard</h1>
                        
                        {breadcrumbs.length > 0 && (
                            <nav className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm min-w-0">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <div key={index} className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                        {breadcrumb.href ? (
                                            <Link 
                                                href={breadcrumb.href}
                                                className="text-gray-300 hover:text-white transition-colors truncate"
                                            >
                                                {breadcrumb.title}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-300 truncate">{breadcrumb.title}</span>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Section centrale - Logo CODE212 */}
                    <div className="hidden md:flex items-center justify-center order-2 lg:order-none">
                        <div className="text-center">
                            <img 
                                src="/logo/Logo.png" 
                                alt="CODE212 Logo" 
                                className="h-10 md:h-12 lg:h-16 w-auto object-contain filter brightness-110 drop-shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Section droite - Robot */}
                    <div className="flex items-center order-3 lg:order-none flex-shrink-0">
                        <div className="relative">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                                <img 
                                    src="/logo/robot.png" 
                                    alt="Robot" 
                                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain filter brightness-110 drop-shadow-lg"
                                />
                            </div>
                            {/* Petit robot supplémentaire comme dans l'image */}
                            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1">
                                <img 
                                    src="/logo/robot.png" 
                                    alt="Small Robot" 
                                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 object-contain opacity-90 filter brightness-110 drop-shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Breadcrumbs mobile - en dessous sur mobile */}
                {breadcrumbs.length > 0 && (
                    <div className="sm:hidden mt-2 pt-2 border-t border-gray-600">
                        <nav className="flex items-center space-x-1 text-xs overflow-x-auto">
                            {breadcrumbs.map((breadcrumb, index) => (
                                <div key={index} className="flex items-center space-x-1 flex-shrink-0">
                                    <ChevronRight className="w-3 h-3 text-gray-400" />
                                    {breadcrumb.href ? (
                                        <Link 
                                            href={breadcrumb.href}
                                            className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                                        >
                                            {breadcrumb.title}
                                        </Link>
                                    ) : (
                                        <span className="text-gray-300 whitespace-nowrap">{breadcrumb.title}</span>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
