import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Folder, Image as ImageIcon, Video, RefreshCw, Images, ArrowRight } from 'lucide-react';

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
        <Link href={`/media/${media.id}`}>
          <div className="flex flex-col items-center cursor-pointer">
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
        </Link>
      </CardContent>
    </Card>
  );

  // Filter folders first
  const filteredFolders = Object.entries(mediaByFolder)
    .filter(([folderName]) => 
      folderName.toLowerCase().includes(folderSearch.toLowerCase())
    )
    .sort(([a], [b]) => a.localeCompare(b));

  // Filter and sort media within each folder
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

  const totalMedia = Object.values(mediaByFolder).reduce((sum, files) => sum + files.length, 0);
  const totalFiltered = filteredFolders.reduce((sum, [, files]) => sum + getFilteredMediaInFolder(files).length, 0);

  return (
    <>
      <Head>
        <title>Médiathèque</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <Head title="Médiathèque" />
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
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

              {/* Reset Button */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFolderSearch('');
                    setSortBy('date');
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Réinitialiser
                </Button>
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-500">
                {totalFiltered} médias affichés sur {totalMedia}
              </div>

              {/* Single Media Grid by Folders */}
              {filteredFolders.length === 0 ? (
                <div className="text-center py-12">
                  <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun dossier trouvé</h3>
                  <p className="text-gray-500">Aucun dossier ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredFolders.map(([folderName, media]) => {
                    const filteredMedia = getFilteredMediaInFolder(media);
                    const displayedMedia = filteredMedia.slice(0, 4); // Only show first 4 images
                    const hasMoreMedia = filteredMedia.length > 4;

                    if (filteredMedia.length === 0 && searchTerm) return null;

                    return (
                      <Card key={folderName}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Folder className="w-5 h-5 text-blue-600" />
                              <div>
                                <Link href={`/media/folder/${folderName}`}>
                                  <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
                                    {folderName}
                                  </CardTitle>
                                </Link>
                                <p className="text-sm text-gray-500">
                                  {filteredMedia.length} fichier{filteredMedia.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <Link href={`/media/folder/${folderName}`}>
                              <Button variant="outline" size="sm">
                                Voir tout
                              </Button>
                            </Link>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {filteredMedia.length === 0 ? (
                            <div className="text-center py-8">
                              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">Aucun fichier dans ce dossier</p>
                            </div>
                          ) : (
                            <>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                {displayedMedia.map((mediaFile) => (
                                  <MediaCard key={mediaFile.id} media={mediaFile} />
                                ))}
                              </div>
                              
                              {/* Show "See More" link if there are more than 4 images */}
                              {hasMoreMedia && (
                                <div className="mt-4 text-center">
                                  <Link href={`/media/folder/${folderName}`}>
                                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                                      Voir {filteredMedia.length - 4} autres médias
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  </Link>
                                </div>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </AppContent>
        </div>
      </AppShell>
      
      <Footer />
    </>
  );
}