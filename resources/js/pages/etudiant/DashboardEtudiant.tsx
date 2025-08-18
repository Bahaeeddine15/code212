import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { ScrollText, Medal, CalendarDays, ClipboardCheck, Trophy, Calendar } from "lucide-react";
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';

interface Stats {
  total_formations: number;
  total_reservations: number;
  reservations_en_attente: number;
  reservations_approuvees: number;
  total_competitions: number;
  total_events: number;
}

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

interface User {
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

interface Props {
  stats: Stats;
  formations: Formation[];
  events: Event[];
  user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
];

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Dashboard", isActive: true },
];

const mockData = {
  formations: [
    {
      id: 1,
      nom: "React Avancé",
      niveau: "Intermédiaire",
      enCours: true,
      progression: 60,
    },
    {
      id: 2,
      nom: "Laravel API",
      niveau: "Avancé",
      enCours: false,
      progression: 100,
    },
    {
      id: 3,
      nom: "TypeScript",
      niveau: "Avancé",
      enCours: true,
      progression: 17,
    },
  ],
  certificats: [
    { id: 1, title: "Python Essentials" },
    { id: 2, title: "JavaScript Basics" },
  ],
};

export default function Dashboard({ stats, formations, events, user }: Props) {
  // Générer l'URL de l'avatar avec les initiales de l'utilisateur
  const getAvatarUrl = (user: User) => {
    if (user.avatar_url) {
      return user.avatar_url;
    }
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a2b6c&color=fff&size=64&bold=true`;
  };

  const {
    certificats,
  } = mockData;

  return (
    <>
      <Head title="Dashboard Étudiant">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="overflow-x-hidden overflow-y-auto h-screen bg-white font-[Poppins]">
            <div className="p-6">
              <div className="flex flex-col gap-6 text-gray-900 dark:text-white">
              <div className="space-y-4">
          {/* Header Profile Section */}
          <div className="flex gap-6">
            {/* Left Card - Avatar */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex-shrink-0">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#c5027f] to-[#8b5cf6] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    CODE
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
              </div>
            </div>

            {/* Right Card - User Information */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex-1">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600">
                    University
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-900 font-medium">
                      {user.ecole || 'UNIVERSITÉ CADI AYYAD DE MARRAKECH'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600">
                    Center
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-900 font-medium">
                      CODE212 - BIBLIOTHÈQUE UNIVERSITAIRE
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600">
                    Email
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-900 font-medium">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-5 gap-3">
            <Card className="bg-white border-l-4 border-l-[#c5027f] shadow hover:shadow-lg transition-all duration-300">
              <CardContent className="p-2">
                <div className="flex items-center justify-between pl-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockData.certificats.length}</p>
                    <p className="text-xs text-gray-600">Certificats</p>
                  </div>
                  <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center pr-3">
                    <Medal className="h-8 w-8 text-[#c5027f]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-[#6366f1] shadow hover:shadow-lg transition-all duration-300">
              <CardContent className="p-2">
                <div className="flex items-center justify-between pl-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_formations}</p>
                    <p className="text-xs text-gray-600">Formations</p>
                  </div>
                  <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center pr-3">
                    <ScrollText className="h-8 w-8 text-[#6366f1]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-[#ff8500] shadow hover:shadow-lg transition-all duration-300">
              <CardContent className="p-2">
                <div className="flex items-center justify-between pl-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_reservations}</p>
                    <p className="text-xs text-gray-600">Réservations</p>
                  </div>
                  <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center pr-3">
                    <ClipboardCheck className="h-8 w-8 text-[#ff8500]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-[#e11d48] shadow hover:shadow-lg transition-all duration-300">
              <CardContent className="p-2">
                <div className="flex items-center justify-between pl-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_competitions || 0}</p>
                    <p className="text-xs text-gray-600">Compétitions</p>
                  </div>
                  <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center pr-3">
                    <Trophy className="h-8 w-8 text-[#e11d48]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-[#2cd3a3] shadow hover:shadow-lg transition-all duration-300">
              <CardContent className="p-2">
                <div className="flex items-center justify-between pl-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_events || 0}</p>
                    <p className="text-xs text-gray-600">Événements</p>
                  </div>
                  <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center pr-3">
                    <Calendar className="h-8 w-8 text-[#2cd3a3]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 🧠 Première ligne : infos essentielles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formations en cours */}
          <Card className="bg-white dark:bg-[#121214] transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#081f44] dark:text-white text-lg font-semibold">
                Formations en cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formations.length > 0 ? formations.slice(0, 5).map((formation) => (
                <div
                  key={formation.id}
                  className="p-3 bg-[#f8f9fa] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer group border-r-4 border-r-[#ff8500]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#081f44] dark:text-white text-sm group-hover:text-[#ff8500] transition-colors">
                      {formation.titre}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {formation.niveau}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {formation.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#ff8500] rounded-full"></div>
                    <span className="text-xs text-gray-500">{formation.category}</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">Aucune formation disponible</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Événements */}
          <Card className="bg-white dark:bg-[#121214] transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#081f44] dark:text-white text-lg font-semibold">
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.length > 0 ? events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-[#f8f9fa] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer group border-r-4 border-r-[#6366f1]"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#081f44] dark:text-white text-sm group-hover:text-[#6366f1] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
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
                    <span className="text-xs text-gray-500">{event.category}</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">Aucun événement à venir</p>
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
      
      {/* Footer */}
      <Footer />
    </>
  );
}
