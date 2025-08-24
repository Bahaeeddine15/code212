import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  title: string;
  href?: string;
  isActive?: boolean;
}

interface DashboardHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  subtitle?: string;
}

export default function DashboardHeader({ breadcrumbs = [], subtitle }: DashboardHeaderProps) {
  return (
    <header className="w-full bg-[#0c152e] px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 opacity-25 pointer-events-none select-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px'
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 lg:gap-10">
          {/* Left Section - Breadcrumbs */}
          <div className="flex items-center flex-wrap space-x-1 sm:space-x-2 text-sm sm:text-base md:text-lg min-w-0 font-semibold">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-300 flex-shrink-0" />
                )}
                {item.href && !item.isActive ? (
                  <a
                    href={item.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-xs"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span
                    className={`truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-xs ${
                      item.isActive
                        ? 'text-white font-extrabold text-lg sm:text-xl md:text-2xl'
                        : 'text-blue-200'
                    }`}
                  >
                    {item.title}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Center Section - Logo (Mobile and Small screens) */}
          <div className="flex justify-center flex-shrink-0 order-2 md:hidden mx-auto">
            <img 
              src="/cd212.png"
              alt="CODE'212 Logo"
              className="h-12 sm:h-14 w-auto object-contain"
              style={{ maxWidth: '200px' }}
            />
          </div>

          {/* Right Section - Logo for iPad/Tablet mode (replaces mascot) */}
          <div className="hidden md:flex lg:hidden justify-end flex-1">
            <img 
              src="/cd212.png"
              alt="CODE'212 Logo"
              className="h-16 md:h-18 w-auto object-contain"
              style={{ maxWidth: '200px' }}
            />
          </div>

          {/* Center Section - Logo for Desktop (lg+) */}
          <div className="hidden lg:flex justify-center flex-shrink-0 mx-auto lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <img 
              src="/cd212.png"
              alt="CODE'212 Logo"
              className="h-20 xl:h-24 w-auto object-contain"
              style={{ maxWidth: '200px' }}
            />
          </div>

          {/* Right Section - Robot Mascot (Desktop only, hidden on iPad) */}
          <div className="hidden lg:flex justify-end flex-1">
            <img 
              src="/all-robots.png"
              alt="CODE'212 Robot Mascots"
              className="h-20 xl:h-24 w-auto object-contain hover:scale-105 transition-transform duration-200"
              style={{ maxWidth: '120px' }}
            />
          </div>

          {/* Mobile Robot Mascot - Hidden on mobile as requested */}
          <div className="hidden">
            <img 
              src="/code212-robots.png"
              alt="CODE'212 Robot Mascots"
              className="h-10 sm:h-12 w-auto object-contain"
              style={{ maxWidth: '80px' }}
            />
          </div>
        </div>

        {/* Subtitle Section */}
        {subtitle && (
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-blue-200 text-base sm:text-lg md:text-xl font-medium">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}