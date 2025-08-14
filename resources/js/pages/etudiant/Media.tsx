import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout';
import DashboardHeader from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Folder, Image as ImageIcon, Video, RefreshCw } from 'lucide-react';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Galerie Multimédia", isActive: true },
];

interface MediaItem {
  id: number;
  title: string;
  slug: string;
  detail: string | null;
  file_path: string;
  original_name: string | null;
  folder: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  full_url?: string | null;
  file_size?: string | null;
  file_extension?: string | null;
  type?: string;
}

interface FolderOption {
  value: string;
  label: string;
  type: string;
}

interface PageProps {
  medias: {
    data: MediaItem[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
  folders: FolderOption[];
  [key: string]: unknown; // Add index signature to satisfy Inertia PageProps constraint
}

export default function Media() {
  const { props } = usePage<PageProps>();
  const { medias, folders } = props;
  const videoExts = ['mp4','mov','avi','wmv','flv','webm'];

  const [search, setSearch] = React.useState('');
  const [folder, setFolder] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState<'all'|'images'|'videos'>('all');
  const [loading, setLoading] = React.useState(false);
  const initial = (medias.data || []); // on garde tout, filtrage plus bas
  const [items, setItems] = React.useState<MediaItem[]>(initial);

  React.useEffect(() => {
    applyTypeFilter(medias.data || []);
  }, [medias.data, typeFilter]);

  const applyTypeFilter = (list: MediaItem[]) => {
    let filtered = list;
    if (typeFilter === 'images') {
      filtered = list.filter(m => !m.file_extension || !videoExts.includes((m.file_extension||'').toLowerCase()));
    } else if (typeFilter === 'videos') {
      filtered = list.filter(m => m.file_extension && videoExts.includes(m.file_extension.toLowerCase()));
    }
    setItems(filtered);
  };

  const load = (params: Record<string, any> = {}) => {
    setLoading(true);
    const query = new URLSearchParams({ folder, search, ...params }).toString();
    fetch(`/media/filter?${query}`)
      .then(r => r.json())
      .then(data => {
        applyTypeFilter(data.medias.data);
      })
      .finally(() => setLoading(false));
  };

  const mediaIcon = (m: MediaItem) => <ImageIcon className="w-6 h-6" />; // always image icon now

  return (
    <AppSidebarLayout breadcrumbs={[
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Médiathèque', href: '/media' }
    ]}>
      <Head title="Médiathèque" />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Médiathèque</h1>
            <p className="text-gray-600">Images et vidéos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => load()} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Rafraîchir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2"><Folder className="w-4 h-4" /> Dossiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <select
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="all">Tous</option>
                  {folders.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                <Input
                  placeholder="Recherche..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button type="button" variant={typeFilter==='all'?'default':'outline'} size="sm" onClick={() => setTypeFilter('all')}>Tous</Button>
                  <Button type="button" variant={typeFilter==='images'?'default':'outline'} size="sm" onClick={() => setTypeFilter('images')}>Images</Button>
                  <Button type="button" variant={typeFilter==='videos'?'default':'outline'} size="sm" onClick={() => setTypeFilter('videos')}>Vidéos</Button>
                </div>
                <Button onClick={() => load()} disabled={loading} className="w-full mt-2">Filtrer</Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3">
            {loading ? (
              <div className="py-20 text-center text-gray-500">Chargement...</div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center text-gray-500">Aucun média trouvé</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(m => (
                  <Card key={m.id} className="overflow-hidden group cursor-pointer" onClick={() => window.location.href = `/media/${m.id}` }>
                    <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      {m.full_url ? (
                        m.file_extension && ['mp4','mov','avi','wmv','flv','webm'].includes(m.file_extension.toLowerCase()) ? (
                          <video src={m.full_url} controls className="w-full h-full object-cover" />
                        ) : (
                          <img src={m.full_url} alt={m.title} className="w-full h-full object-cover" />
                        )
                      ) : (
                        <div className="text-gray-400">{mediaIcon(m)}</div>
                      )}
                    </div>
                    <CardContent className="p-3 space-y-1">
                      <h3 className="font-semibold text-sm line-clamp-1" title={m.title}>{m.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px]">{m.detail}</p>
                      <div className="flex justify-between text-[10px] text-gray-500">
                        <span>{m.file_extension?.toUpperCase()}</span>
                        <span>{m.file_size}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
