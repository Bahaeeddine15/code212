import { Head, Link, usePage } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
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

  return (
    <AppSidebarLayout breadcrumbs={[
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Médiathèque', href: '/media' },
      { title: media.title, href: `/media/${media.id}` }
    ]}>
      <Head title={media.title} />
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-5xl">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold">{media.title}</h1>
          <Button variant="outline" asChild><Link href="/media">← Retour</Link></Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center max-h-[70vh]">
              {media.full_url && (
                isVideo ? (
                  <video src={media.full_url} controls className="max-h-[70vh] w-auto" />
                ) : (
                  <img src={media.full_url} alt={media.title} className="max-h-[70vh] w-auto object-contain" />
                )
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2"><CardTitle>Détails</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>{media.detail}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle>Fichier</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2 text-gray-600">
              <p><strong>Nom original:</strong> {media.original_name}</p>
              <p><strong>Extension:</strong> {media.file_extension?.toUpperCase()}</p>
              <p><strong>Taille:</strong> {media.file_size}</p>
              <p><strong>Dossier:</strong> {media.folder}</p>
              {media.full_url && !isVideo && (
                <div>
                  <a href={media.full_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">Ouvrir dans un nouvel onglet</a>
                </div>
              )}
              {media.full_url && isVideo && (
                <div>
                  <a href={media.full_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">Télécharger / Ouvrir</a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
