import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MediaItem {
  id: number;
  title: string;
  detail: string | null;
  file_path: string;
  original_name: string | null;
  folder: string | null;
  full_url?: string | null;
  file_size?: string | null;
  file_extension?: string | null;
}

interface PageProps { media: MediaItem; [key:string]: any }

export default function MediaShow() {
  const { props } = usePage<PageProps>();
  const { media } = props;
  const isVideo = media.file_extension ? ['mp4','mov','avi','wmv','flv','webm'].includes(media.file_extension.toLowerCase()) : false;

  // Create breadcrumbs for the header component
  const headerBreadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Galerie Médias", isActive: true },
  ];

  return (
    <>
      <Head>
        <title>{media.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
            <div className="px-6 py-6 space-y-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{media.title}</h1>
                <p className="text-gray-600">{media.detail || 'Détails du média'}</p>
              </div>

              <div className="flex justify-between items-center flex-wrap gap-4">
                <div></div>
                <div className="flex gap-2">
                {media.folder && (
                  <Button variant="outline" asChild>
                    <Link href={`/media/folder/${media.folder}`}>
                      ← Dossier {media.folder}
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="/media">← Médiathèque</Link>
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center max-h-[70vh]">
                  {media.full_url && (
                    isVideo ? (
                      <video src={media.full_url} controls className="max-h-[70vh] w-auto" />
                    ) : (
                      <img 
                        src={media.full_url} 
                        alt={media.title} 
                        className="max-h-[70vh] w-auto object-contain" 
                      />
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2"><CardTitle>Détails</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <p>{media.detail || 'Aucune description disponible.'}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle>Informations du fichier</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2 text-gray-600">
                  <p><strong>Nom original:</strong> {media.original_name || 'N/A'}</p>
                  <p><strong>Extension:</strong> {media.file_extension?.toUpperCase() || 'N/A'}</p>
                  <p><strong>Taille:</strong> {media.file_size || 'N/A'}</p>
                  {media.folder && (
                    <p>
                      <strong>Dossier:</strong> 
                      <Link 
                        href={`/media/folder/${media.folder}`} 
                        className="text-blue-600 hover:underline ml-1"
                      >
                        {media.folder}
                      </Link>
                    </p>
                  )}
                </CardContent>
              </Card>
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
