import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Eye } from 'lucide-react';

interface Competition {
  id: number;
  title: string;
  description: string;
  date: string;
  deadline: string;
  location: string;
  category: string;
  maxParticipants: number;
  registrations: number;
  status: string;
  views: number;
}

interface Props { competition: Competition }

export default function CompetitionShow({ competition }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { href: '/dashboard', title: 'Dashboard Étudiant' },
    { href: '/competition', title: 'Compétitions' },
    { href: `/competition/${competition.id}`, title: competition.title }
  ];

  const remainingSpots = competition.maxParticipants - competition.registrations;
  const statusColors: Record<string,string> = { 'Ouvert': 'bg-green-500', 'Complet': 'bg-yellow-500', 'Fermé': 'bg-red-500' };

  return (
    <AppShell variant="sidebar">
      <Head title={`Compétition - ${competition.title}`} />
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <AppContent variant="sidebar" className="overflow-x-hidden overflow-y-auto h-screen bg-white">
          <AppSidebarHeader breadcrumbs={breadcrumbs} />
          <div className="container mx-auto p-6 max-w-4xl space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Badge className={`${statusColors[competition.status] || 'bg-gray-500'} text-white`}>{competition.status}</Badge>
                <Badge variant="outline">{competition.category}</Badge>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1"><Eye className="w-4 h-4" /> {competition.views} vues</div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{competition.title}</h1>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{competition.description}</p>

            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
                <CardDescription>Détails clés de la compétition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-700"><Calendar className="w-4 h-4 mr-2" /> Date: {new Date(competition.date).toLocaleDateString('fr-FR')}</div>
                  <div className="flex items-center text-gray-700"><Calendar className="w-4 h-4 mr-2" /> Limite: {new Date(competition.deadline).toLocaleDateString('fr-FR')}</div>
                  <div className="flex items-center text-gray-700"><MapPin className="w-4 h-4 mr-2" /> {competition.location}</div>
                  <div className="flex items-center text-gray-700"><Users className="w-4 h-4 mr-2" /> {competition.registrations}/{competition.maxParticipants} participants</div>
                  <div className="flex items-center text-gray-700 sm:col-span-2"><Eye className="w-4 h-4 mr-2" /> {competition.views} vues</div>
                </div>
                {remainingSpots > 0 && competition.status === 'Ouvert' && (
                  <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
                    {remainingSpots} place{remainingSpots>1?'s':''} restante{remainingSpots>1?'s':''}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4 flex-col sm:flex-row">
              {competition.status === 'Ouvert' ? (
                <Button asChild className="flex-1">
                  <Link href={`/competition/${competition.id}/register`}>S'inscrire</Link>
                </Button>
              ) : (
                <Button disabled className="flex-1">Inscriptions fermées</Button>
              )}
              <Button variant="outline" asChild className="flex-1">
                <Link href="/competition">← Retour</Link>
              </Button>
            </div>
          </div>
        </AppContent>
      </div>
    </AppShell>
  );
}
