import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Eye, Menu } from 'lucide-react';
import { useState } from 'react';

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
  type: string;
  my_registration?: {
    status: 'En attente' | 'Confirmé' | 'Refusé';
  };
}

interface Props { competition: Competition }

export default function CompetitionShow({ competition }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Create breadcrumbs for the header component
  const headerBreadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Compétitions", isActive: true },
  ];

  const remainingSpots = competition.maxParticipants - competition.registrations;
  const statusColors: Record<string,string> = { 'Ouvert': 'bg-green-500', 'Complet': 'bg-yellow-500', 'Fermé': 'bg-red-500' };

  return (
    <>
      <Head>
        <title>{`Compétition - ${competition.title}`}</title>
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
          
          <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins] lg:ml-0">
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
              
              <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{competition.title}</h1>
                <p className="text-gray-600">{competition.description}</p>
              </div>

              <div className="space-y-6">
                {/* Status and Category Badges */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Badge className={`${statusColors[competition.status] || 'bg-gray-500'} text-white`}>{competition.status}</Badge>
                    <Badge variant="outline">{competition.category}</Badge>
                    <Badge variant="outline" className="ml-2">
                      {competition.type === 'individual' ? 'Individuelle' : 'Par groupe'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1"><Eye className="w-4 h-4" /> {competition.views} vues</div>
                </div>

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

                {competition.my_registration && (
                  <Badge
                    className={
                      competition.my_registration.status === 'En attente'
                        ? 'bg-yellow-500 text-white'
                        : competition.my_registration.status === 'Confirmé'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }
                  >
                    {competition.my_registration.status === 'En attente'
                      ? 'En attente de validation'
                      : competition.my_registration.status === 'Confirmé'
                      ? 'Inscription acceptée'
                      : 'Inscription refusée'}
                  </Badge>
                )}

                <div className="flex gap-4 flex-col sm:flex-row">
                  {competition.status === 'Ouvert' && !competition.my_registration ? (
                    <Button asChild className="flex-1 bg-[#4f39f6] hover:bg-[#41e296] hover:text-[#3a2b75] text-white">
                      <Link href={`/competition/${competition.id}/register`}>S'inscrire</Link>
                    </Button>
                  ) : (
                    <Button disabled className="flex-1">
                      {competition.status === 'Ouvert'
                        ? "Vous avez déjà fait une demande"
                        : "Inscriptions fermées"}
                    </Button>
                  )}
                  <Button variant="outline" asChild className="flex-1 bg-white hover:bg-[#41e296] hover:text-[#3a2b75] border-gray-300">
                    <Link href="/competition">← Retour</Link>
                  </Button>
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
