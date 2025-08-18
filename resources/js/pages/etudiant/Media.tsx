import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
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
  { title: "Dashboard", href: "/dashboard" },
  { title: "Media", isActive: true },
];

export default function Media({ mediaByFolder }: PageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [folderSearch, setFolderSearch] = useState('');
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

  const MediaCard = ({ media }: { media: MediaFile }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          {getMediaType(media.file_path) === 'Vidéo' ? (
            <video
              className="w-24 h-24 rounded-lg object-contain bg-gray-100 mb-2"
              src={media.full_url || getImageUrl(media.file_path)}
              muted
              controls={false}
            />
          ) : (
            <img
              src={media.full_url || getImageUrl(media.file_path)}
              alt={media.title}
              className="w-24 h-24 rounded-lg object-contain bg-gray-100 mb-2"
              style={{ userSelect: 'none' }}
              onContextMenu={e => e.preventDefault()}
            />
          )}
          <h3 className="font-medium text-center truncate w-full" title={media.title}>
            {media.title}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
            <span className={`px-2 py-1 rounded-full ${getMediaType(media.file_path) === 'Vidéo' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
              {getMediaType(media.file_path)}
            </span>
            <span>{formatDate(media.created_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const filteredAndSortedFolders = Object.entries(mediaByFolder)
    .filter(([folderName]) => 
      folderName.toLowerCase().includes(folderSearch.toLowerCase())
    )
    .sort(([a], [b]) => a.localeCompare(b));

  const getFilteredMediaInFolder = (media: MediaFile[]) => {
    const filtered = media.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.original_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return a.title.localeCompare(b.title);
    });
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
      <Head>
        <title>Médiathèque</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
      <Head title="Médiathèque" />
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="overflow-x-hidden overflow-y-auto h-screen bg-white font-[Poppins]">
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

              {/* Search and Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Rechercher dans les fichiers</label>
                  <Input
                    type="text"
                    placeholder="Rechercher un fichier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rechercher un dossier</label>
                  <Input
                    type="text"
                    placeholder="Rechercher un dossier..."
                    value={folderSearch}
                    onChange={(e) => setFolderSearch(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Trier par</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Date (plus récent d'abord)</option>
                    <option value="name">Nom (A-Z)</option>
                  </select>
                </div>
              </div>
              {/* Stats */}
              <div className="text-sm text-gray-500">
                {totalFiltered} médias affichés sur {totalMedia}
              </div>

              {/* Media Grid by Folders */}
              {filteredAndSortedFolders.length === 0 ? (
                <div className="text-center py-12">
                  <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun dossier trouvé</h3>
                  <p className="text-gray-500">Aucun dossier ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredAndSortedFolders.map(([folderName, media]) => {
                    const filteredMedia = getFilteredMediaInFolder(media);

                    if (filteredMedia.length === 0 && searchTerm) return null;

                    return (
                      <Card key={folderName}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Folder className="w-5 h-5 text-blue-600" />
                            <div>
                              <CardTitle className="text-lg">{folderName}</CardTitle>
                              <p className="text-sm text-gray-500">
                                {filteredMedia.length} fichier{filteredMedia.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {filteredMedia.length === 0 ? (
                            <div className="text-center py-8">
                              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">Aucun fichier dans ce dossier</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                              {filteredMedia.map((mediaFile) => (
                                <MediaCard key={mediaFile.id} media={mediaFile} />
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Media by folder (legacy or alternative view) */}
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
      
      {/* Footer */}
      <Footer />
    </>
  );
}