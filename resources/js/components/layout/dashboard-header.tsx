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
    <header className="w-full bg-[#0c152e] px-6 sm:px-12 py-4 sm:py-6 relative overflow-hidden">
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
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-10">
          {/* Left Section - Breadcrumbs */}
          <div className="flex items-center flex-wrap space-x-2 text-base sm:text-lg min-w-0 font-semibold">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 flex-shrink-0" />
                )}
                {item.href && !item.isActive ? (
                  <a
                    href={item.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 truncate max-w-[180px] sm:max-w-xs"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span
                    className={`truncate max-w-[180px] sm:max-w-xs ${
                      item.isActive || index === breadcrumbs.length - 1
                        ? 'text-white font-extrabold text-xl sm:text-2xl'
                        : 'text-blue-200'
                    }`}
                  >
                    {item.title}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Center Section - Logo */}
          <div className="flex justify-center flex-shrink-0 order-2 md:order-none mx-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <img 
              src="/cd212.png"
              alt="CODE'212 Logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
              style={{ maxWidth: '240px' }}
            />
          </div>

          {/* Right Section - Robot Mascot */}
          <div className="hidden md:flex justify-end flex-1">
            <img 
              src="/all-robots.png"
              alt="CODE'212 Robot Mascots"
              className="h-18 md:h-24 w-auto object-contain hover:scale-105 transition-transform duration-200"
              style={{ maxWidth: '140px' }}
            />
          </div>

          {/* Mobile Robot Mascot - Smaller version */}
          <div className="md:hidden flex justify-end flex-1">
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
          <div className="mt-4 text-center">
            <p className="text-blue-200 text-lg sm:text-xl font-medium">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}