import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Users, ArrowLeft, Clock } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description?: string;
  start_date: string | null; // ISO
  end_date: string | null;
  location: string;
  category: string;
  max_attendees: number;
  status: string;
  logo?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface Props { event: Event }

export default function EventDetail({ event }: Props) {
  function fmt(d?: string | null){ return d ? new Date(d).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : '' }
  function timeRange(a?: string|null, b?: string|null){
    if(!a || !b) return '';
    const s = new Date(a); const e = new Date(b);
    const opts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const sameDay = s.toDateString() === e.toDateString();
    return sameDay
      ? `${s.toLocaleTimeString('fr-FR', opts)} – ${e.toLocaleTimeString('fr-FR', opts)}`
      : `${fmt(a)} – ${fmt(b)}`;
  }
  const badgeColors: Record<string,string> = {
    upcoming: 'bg-emerald-100 text-emerald-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-rose-100 text-rose-800',
  };
  return (
    <AppShell variant="sidebar">
      <Head title={`${event.title} - Événements`} />
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden bg-white">
        <AppSidebarHeader 
          breadcrumbs={[
            { title: 'Dashboard Étudiant', href: '/dashboard' },
            { title: 'Événements', href: '/events' },
            { title: event.title, href: '' }
          ]}
        />

        <div className="p-6 space-y-6 max-w-5xl mx-auto">
          <Link href="/events">
            <Button variant="outline" className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux événements
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                {event.logo && (
                  <div className="max-h-72 overflow-hidden flex items-center justify-center border-b p-2 bg-white">
                    <img src={event.logo} alt={event.title} className="max-h-64 max-w-full object-contain" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={badgeColors[event.status] || 'bg-slate-100 text-slate-800'}>{event.status}</Badge>
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                  <CardTitle className="text-3xl">{event.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> {fmt(event.start_date)} → {fmt(event.end_date)}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {timeRange(event.start_date, event.end_date)}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Max {event.max_attendees}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  {event.description ? (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
                  ) : (
                    <p className="text-gray-600">Aucune description fournie.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <aside className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between"><span>Catégorie</span><span className="font-medium">{event.category}</span></div>
                  <div className="flex justify-between"><span>Statut</span><span className="font-medium capitalize">{event.status}</span></div>
                  <div className="flex justify-between"><span>Lieu</span><span className="font-medium">{event.location}</span></div>
                  <div className="flex justify-between"><span>Places</span><span className="font-medium">{event.max_attendees}</span></div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
