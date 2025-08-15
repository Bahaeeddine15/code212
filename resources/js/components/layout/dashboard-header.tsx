import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  title: string;
  href?: string;
  isActive?: boolean;
}

interface DashboardHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export default function DashboardHeader({ breadcrumbs = [] }: DashboardHeaderProps) {
  return (
    <header className="w-full bg-[#0c152e] px-10 py-6 shadow-lg relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section - Breadcrumbs */}
        <div className="flex items-center space-x-3 text-base order-1 lg:order-1 lg:flex-1">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
              {item.href && !item.isActive ? (
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-base"
                >
                  {item.title}
                </a>
              ) : (
                <span
                  className={`${
                    item.isActive || index === breadcrumbs.length - 1
                      ? 'text-white font-bold text-lg'
                      : 'text-gray-300 text-base'
                  }`}
                >
                  {item.title}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Center Section - Logo - Absolutely centered */}
        <div className="flex justify-center order-2 lg:order-2 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <div className="flex items-center justify-center">
            <img 
              src="/cd212.png"
              alt="CODE'212 Logo"
              className="h-20 w-auto object-contain"
              style={{ maxWidth: '400px' }}
            />
          </div>
        </div>

        {/* Right Section - Robot Mascot */}
        <div className="hidden lg:flex justify-end order-3 lg:order-3 lg:flex-1">
          <div className="flex items-center justify-center">
            <img 
              src="/all-robots.png"
              alt="CODE'212 Robot Mascots"
              className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-200"
              style={{ maxWidth: '180px' }}
            />
          </div>
        </div>

        {/* Mobile Robot Mascot - Smaller version */}
        <div className="lg:hidden flex justify-end order-3">
          <div className="flex items-center justify-center ">
            <img 
              src="/code212-robots.png"
              alt="CODE'212 Robot Mascots"
              className="h-12 w-auto object-contain"
              style={{ maxWidth: '100px' }}
            />
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}
