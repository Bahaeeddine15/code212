import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Folder, Image as ImageIcon, Video, RefreshCw, Images } from 'lucide-react';

interface MediaFile {
  id: number;
  title: string;
  file_path: string;
  original_name: string;
  created_at: string;
  folder: string;
  file_extension?: string;
  full_url?: string;
}

interface PageProps {
  mediaByFolder: Record<string, MediaFile[]>;
}

const headerBreadcrumbs = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
  { title: "Galerie Media", href: "/media", isActive: true },
];

export default function Media({ mediaByFolder }: PageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [loading, setLoading] = useState(false);

  const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');
  const getMediaType = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (!ext) return 'Image';
    const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
    return videoExts.includes(ext) ? 'Vidéo' : 'Image';
  };

  // Filter and sort media
  const filteredMediaByFolder: typeof mediaByFolder = {};
  Object.entries(mediaByFolder).forEach(([folder, files]) => {
    let filtered = files.filter(file =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.original_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filtered = filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    if (filtered.length > 0) filteredMediaByFolder[folder] = filtered;
  });

  const totalMedia = Object.values(mediaByFolder).reduce((sum, files) => sum + files.length, 0);
  const totalFiltered = Object.values(filteredMediaByFolder).reduce((sum, files) => sum + files.length, 0);

  return (
    <>
      <Head title="Médiathèque" />
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="overflow-x-hidden overflow-y-auto h-screen bg-white">
            <AppSidebarHeader breadcrumbs={headerBreadcrumbs} />
            <div className="px-6 py-6 space-y-6">
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                    <Images className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Galerie Médias</h1>
                    <p className="text-gray-600 mt-2 text-lg">Images et vidéos accessibles</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Rechercher un média..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Réinitialiser
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'date' ? 'default' : 'outline'}
                    onClick={() => setSortBy('date')}
                  >
                    Trier par date
                  </Button>
                  <Button
                    variant={sortBy === 'name' ? 'default' : 'outline'}
                    onClick={() => setSortBy('name')}
                  >
                    Trier par nom
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-500">
                {totalFiltered} médias affichés sur {totalMedia}
              </div>

              {/* Media by folder */}
              {Object.keys(filteredMediaByFolder).length === 0 ? (
                <div className="text-gray-500 text-center py-12">Aucun média trouvé.</div>
              ) : (
                Object.entries(filteredMediaByFolder).map(([folder, files]) => (
                  <Card key={folder} className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Folder className="w-5 h-5" />
                        {folder}
                        <span className="text-xs text-gray-400 ml-2">({files.length})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {files.map(file => (
                          <div key={file.id} className="border rounded-lg p-3 bg-gray-50 flex flex-col items-center">
                            <div className="mb-2">
                              {getMediaType(file.file_path) === 'Vidéo' ? (
                                <Video className="w-10 h-10 text-blue-400" />
                              ) : (
                                <ImageIcon className="w-10 h-10 text-blue-400" />
                              )}
                            </div>
                            <div className="font-semibold text-gray-800 text-center">{file.title}</div>
                            <div className="text-xs text-gray-500 mb-1">{file.original_name}</div>
                            <div className="text-xs text-gray-400 mb-2">{formatDate(file.created_at)}</div>
                            <a
                              href={getImageUrl(file.file_path)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs"
                            >
                              Voir le fichier
                            </a>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </AppContent>
        </div>
      </AppShell>
      <Footer />
    </>
  );
}