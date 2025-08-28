import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Users, ArrowLeft, Clock, Menu } from 'lucide-react';
import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  description?: string;
  start_date: string | null; // ISO
  end_date: string | null;
  location: string;
  category: string;
  type?: string; // Add type field
  max_attendees: number;
  status: string;
  logo?: string | null;
  created_at?: string;
  updated_at?: string;
  registrations_count?: number;
  is_registered?: boolean;
  seats_left?: number | null;
}

interface Props { event: Event }

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Événements", href: "/events" },
  { title: "Détails", isActive: true },
];

export default function EventDetail({ event }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Dates uniquement, sans heures
  function fmt(d?: string | null){ return d ? new Date(d).toLocaleDateString('fr-FR', { dateStyle: 'medium' }) : '' }
  const badgeColors: Record<string,string> = {
    upcoming: 'bg-emerald-100 text-emerald-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-rose-100 text-rose-800',
  };
  return (
    <>
      <Head>
        <title>{`${event.title} - Événements`}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
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
            <AppSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
          </div>
          
          <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#101828] font-[Poppins] lg:ml-0">
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
              
              <div className="max-w-5xl mx-auto space-y-6">
                <Link href="/events">
                  <Button variant="outline" className="mb-2 bg-white dark:bg-[#1e2939] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#364153]">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour aux événements
                  </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="overflow-hidden bg-white dark:bg-[#1e2939] border-gray-200 dark:border-gray-600">
                      {event.logo && (
                        <div className="max-h-72 overflow-hidden flex items-center justify-center border-b dark:border-gray-600 p-2 bg-white dark:bg-[#1e2939]">
                          <img src={event.logo} alt={event.title} className="max-h-64 max-w-full object-contain" />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={badgeColors[event.status] || 'bg-slate-100 text-slate-800 dark:bg-slate-600 dark:text-slate-200'}>{event.status}</Badge>
                          <Badge variant="secondary" className="dark:bg-gray-600 dark:text-gray-200">{event.category}</Badge>
                          {event.type && (
                            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                              {event.type}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl lg:text-3xl text-gray-900 dark:text-white">{event.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mt-3">
                          <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> {fmt(event.start_date)} → {fmt(event.end_date)}</div>
                          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                          <div className="flex items-center gap-2"><Users className="w-4 h-4" />
                            {event.max_attendees ? (
                              <>
                                {event.registrations_count ?? 0}/{event.max_attendees} inscrits{typeof event.seats_left === 'number' ? ` · ${event.seats_left} places restantes` : ''}
                              </>
                            ) : (
                              'Capacité non limitée'
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {event.description ? (
                          <div className="prose max-w-none dark:prose-invert text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: event.description }} />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400">Aucune description fournie.</p>
                        )}

                        {/* Participate / Cancel actions */}
                        <div className="mt-6">
                          {event.status !== 'completed' && event.status !== 'cancelled' ? (
                            event.is_registered ? (
                              <button
                                onClick={() => router.delete(`/events/${event.id}/register`)}
                                className="px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                              >
                                Annuler ma participation
                              </button>
                            ) : (
                              <button
                                onClick={() => router.post(`/events/${event.id}/register`, {})}
                                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={typeof event.seats_left === 'number' && event.seats_left <= 0}
                              >
                                Participer à cet événement
                              </button>
                            )
                          ) : null}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <aside className="lg:col-span-1">
                    <Card className="bg-white dark:bg-[#1e2939] border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">Informations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex justify-between"><span>Catégorie</span><span className="font-medium">{event.category}</span></div>
                        {event.type && (
                          <div className="flex justify-between"><span>Type</span><span className="font-medium">{event.type}</span></div>
                        )}
                        <div className="flex justify-between"><span>Statut</span><span className="font-medium capitalize">{event.status}</span></div>
                        <div className="flex justify-between"><span>Lieu</span><span className="font-medium">{event.location}</span></div>
                        <div className="flex justify-between"><span>Places</span><span className="font-medium">{event.max_attendees ?? 'Illimité'}</span></div>
                      </CardContent>
                    </Card>
                  </aside>
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
