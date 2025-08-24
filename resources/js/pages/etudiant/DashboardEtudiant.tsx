import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ScrollText, Medal, ClipboardCheck, Trophy, Calendar, Menu, LayoutGrid, FileText, Folder } from "lucide-react";
import { type BreadcrumbItem, type NavItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { NavFooter } from '@/components/navigation/nav-footer';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
import { useState } from 'react';

interface Formation {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: string;
  photo: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  location: string;
  category: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  ecole?: string;
  telephone?: string;
  ville?: string;
  student_id?: string;
  departement?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

interface Stats {
  student_reservations: number;
  total_formations: number;
  reservations_en_attente?: number;
  reservations_approuvees?: number;
  total_competitions?: number;
  total_events?: number;
}

interface Props {
  stats: Stats;
  formations: Formation[];
  events: Event[];
  student: Student;
}

const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Dashboard", isActive: true },
];

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Formations',
    href: '/formations',
    icon: ScrollText,
  },
  {
    title: 'Certificats',
    href: '/certificats',
    icon: Medal,
  },
  {
    title: 'Réservations',
    href: '/reservations',
    icon: ClipboardCheck,
  },
  {
    title: 'Événements',
    href:'/events',
    icon: Calendar,
  },
  {
    title: 'Compétitions',
    href:'/competition',
    icon: Trophy,
  },
  {
    title: 'Articles',
    href:'/articles',
    icon: FileText
  },
  {
    title: 'Galerie Multimedia',
    href:'/media',
    icon: FileText
  }
];

const footerNavItems: NavItem[] = [];

export default function Dashboard({ stats, formations, events, student }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Avatar URL generator
  const getAvatarUrl = (user: Student) => {
    if (user.avatar_url) {
      return user.avatar_url;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a2b6c&color=fff&size=64&bold=true`;
  };

  return (
    <>
      <Head title="Dashboard Étudiant">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          {/* Mobile Backdrop */}
          {isMobileOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
          
          {/* Sidebar with mobile state */}
          <div className={`
            fixed lg:relative inset-y-0 left-0 z-40 w-64 lg:w-auto
            transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 transition-transform duration-300 ease-in-out
          `}>
            <div className="bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                {/* Mobile Close Button */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                  <h1 className="text-xl font-bold text-foreground">CODE212-UCA</h1>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  >
                    ✕
                  </button>
                </div>

                {/* Desktop Title */}
                <div className="hidden lg:block text-center mb-8">
                  <h1 className="text-xl font-bold text-foreground">CODE212-UCA</h1>
                </div>

                <div className="space-y-4 flex-1">
                  <NavMain items={mainNavItems} />
                </div>

                <div className="mt-8 pt-6 border-t border-border flex-shrink-0">
                  <NavFooter items={footerNavItems} />
                  <div className="mt-4">
                    <NavUser />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#140C2C] font-[Poppins] lg:ml-0">
            <div className="p-4 lg:p-6 pt-6">
              {/* Mobile Menu Button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="p-3 bg-[#4f39f6] text-white rounded-lg shadow-lg hover:bg-[#3a2b75] transition-colors flex items-center gap-2"
                >
                  <Menu className="w-5 h-5" />
                  <span className="text-sm font-medium">Menu</span>
                </button>
              </div>
              
              <div className="flex flex-col gap-4 lg:gap-6 text-gray-900 dark:text-white">
                <div className="space-y-4">
                  {/* Profile Section */}
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Avatar Card */}
                    <div className="bg-white dark:bg-[#0c142c] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-[#140C2C] flex-shrink-0">
                      <div className="text-center">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#c5027f] to-[#8b5cf6] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg lg:text-xl">
                            CODE
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base lg:text-lg">{student.name}</h3>
                      </div>
                    </div>
                    {/* Info Card */}
                    <div className="bg-white dark:bg-[#0c142c] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-[#140C2C] flex-1">
                      <div className="space-y-4 lg:space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-24 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-0">
                            Université
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-gray-900 dark:text-white font-medium">
                              {student.ecole || 'UNIVERSITÉ CADI AYYAD DE MARRAKECH'}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-24 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-0">
                            Centre
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-gray-900 dark:text-white font-medium">
                              CODE212 - BIBLIOTHÈQUE UNIVERSITAIRE
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="w-full sm:w-24 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-0">
                            Email
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-gray-900 dark:text-white font-medium break-all">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-3">
                    {/* Certificats (mocked for now) */}
                    <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] border-l-4 border-l-[#c5027f] dark:border-l-[#c5027f] shadow hover:shadow-lg transition-all duration-300">
                      <CardContent className="px-2 lg:px-3 py-2 lg:py-1 pt-2">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                          <div className="flex-1 text-center lg:text-left">
                            <p className="text-lg lg:text-lg font-bold text-gray-900 dark:text-white">0</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Mes certificats</p>
                          </div>
                          <div className="flex-shrink-0 flex justify-center lg:block">
                            <Medal className="h-4 w-4 lg:h-5 lg:w-5 text-[#c5027f]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Formations */}
                    <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] border-l-4 border-l-[#6366f1] dark:border-l-[#6366f1] shadow hover:shadow-lg transition-all duration-300">
                      <CardContent className="px-2 lg:px-3 py-2 lg:py-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                          <div className="flex-1 text-center lg:text-left">
                            <p className="text-lg lg:text-lg font-bold text-gray-900 dark:text-white">{stats.total_formations || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Mes formations</p>
                          </div>
                          <div className="flex-shrink-0 flex justify-center lg:block">
                            <ScrollText className="h-4 w-4 lg:h-5 lg:w-5 text-[#6366f1]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Mes réservations */}
                    <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] border-l-4 border-l-[#ff8500] dark:border-l-[#ff8500] shadow hover:shadow-lg transition-all duration-300">
                      <CardContent className="px-2 lg:px-3 py-2 lg:py-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                          <div className="flex-1 text-center lg:text-left">
                            <p className="text-lg lg:text-lg font-bold text-gray-900 dark:text-white">{stats.student_reservations || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Mes réservations</p>
                          </div>
                          <div className="flex-shrink-0 flex justify-center lg:block">
                            <ClipboardCheck className="h-4 w-4 lg:h-5 lg:w-5 text-[#ff8500]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Compétitions */}
                    <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] border-l-4 border-l-[#e11d48] dark:border-l-[#e11d48] shadow hover:shadow-lg transition-all duration-300">
                      <CardContent className="px-2 lg:px-3 py-2 lg:py-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                          <div className="flex-1 text-center lg:text-left">
                            <p className="text-lg lg:text-lg font-bold text-gray-900 dark:text-white">{stats.total_competitions || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Mes compétitions</p>
                          </div>
                          <div className="flex-shrink-0 flex justify-center lg:block">
                            <Trophy className="h-4 w-4 lg:h-5 lg:w-5 text-[#e11d48]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Événements */}
                    <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] border-l-4 border-l-[#2cd3a3] dark:border-l-[#2cd3a3] shadow hover:shadow-lg transition-all duration-300">
                      <CardContent className="px-2 lg:px-3 py-2 lg:py-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                          <div className="flex-1 text-center lg:text-left">
                            <p className="text-lg lg:text-lg font-bold text-gray-900 dark:text-white">{stats.total_events || 0}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Mes événements</p>
                          </div>
                          <div className="flex-shrink-0 flex justify-center lg:block">
                            <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-[#2cd3a3]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Formations en cours */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-[#081f44] dark:text-white text-lg font-semibold">
                        Formations en cours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {formations.length > 0 ? formations.slice(0, 5).map((formation) => (
                        <div
                          key={formation.id}
                          className="p-3 bg-[#f8f9fa] dark:bg-[#061020] rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#0a1628] transition-all duration-200 cursor-pointer group border-r-4 border-r-[#ff8500]"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-[#081f44] dark:text-white text-sm group-hover:text-[#ff8500] transition-colors">
                              {formation.titre}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-[#140C2C] px-2 py-1 rounded">
                              {formation.niveau}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {formation.description}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#ff8500] rounded-full"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{formation.category}</span>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Aucune formation disponible</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Événements */}
                  <Card className="bg-white dark:bg-[#0c142c] border border-gray-100 dark:border-[#140C2C] transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-[#081f44] dark:text-white text-lg font-semibold">
                        Événements à venir
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {events.length > 0 ? events.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 bg-[#f8f9fa] dark:bg-[#061020] rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#0a1628] transition-all duration-200 cursor-pointer group border-r-4 border-r-[#6366f1]"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full mt-2"></div>
                            <div className="flex-1">
                              <h3 className="font-medium text-[#081f44] dark:text-white text-sm group-hover:text-[#6366f1] transition-colors">
                                {event.title}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(event.start_date).toLocaleDateString('fr-FR', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })} • {event.location}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 ml-3.5">
                            {event.description}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{event.category}</span>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Aucun événement à venir</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </AppContent>
        </div>
      </AppShell>
      <Footer />
    </>
  );
}