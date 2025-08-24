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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Folder, Image as ImageIcon, Video, RefreshCw, Images, ArrowRight, Play, Menu } from 'lucide-react';

interface MediaFile {
  id: number;
  title: string;
  file_path: string;
  original_name: string;
  created_at: string;
  folder: string;
  file_extension?: string;
  full_url?: string;
  video_qualities?: string;
}

interface PageProps {
  mediaByFolder: Record<string, MediaFile[]>;
}

const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Galerie Médias", isActive: true },
];

export default function Media({ mediaByFolder }: PageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [folderSearch, setFolderSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getImageUrl = (filePath: string) => `/storage/${filePath.replace(/^\/+/, '')}`;
  const getStreamUrl = (mediaId: number) => `/media/${mediaId}/stream`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');
  const getMediaType = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (!ext) return 'Image';
    const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'wmv', 'flv'];
    return videoExts.includes(ext) ? 'Vidéo' : 'Image';
  };

  const MediaCard = ({ media }: { media: MediaFile }) => {
    const isVideo = getMediaType(media.file_path) === 'Vidéo';
    
    return (
      <Card className="hover:shadow-md transition-shadow group">
        <CardContent className="p-4">
          <Link href={`/media/${media.id}`}>
            <div className="flex flex-col items-center cursor-pointer">
              <div className="relative w-24 h-24 mb-2">
                {isVideo ? (
                  <>
                    <video
                      className="w-full h-full rounded-lg object-cover bg-gray-100"
                      src={getStreamUrl(media.id)}
                      muted
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        // Seek to 1 second for better thumbnail
                        const video = e.target as HTMLVideoElement;
                        video.currentTime = 1;
                      }}
                    />
                    {/* Video play overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="bg-white/90 rounded-full p-2 shadow-lg">
                        <Play className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    {/* Video badge */}
                    <div className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded">
                      <Play className="w-2 h-2" />
                    </div>
                  </>
                ) : (
                  <img
                    src={media.full_url || getImageUrl(media.file_path)}
                    alt={media.title}
                    className="w-full h-full rounded-lg object-cover bg-gray-100"
                    style={{ userSelect: 'none' }}
                    onContextMenu={e => e.preventDefault()}
                  />
                )}
              </div>
              <h3 className="font-medium text-center truncate w-full" title={media.title}>
                {media.title}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                  isVideo ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                  {getMediaType(media.file_path)}
                </span>
                <span>{formatDate(media.created_at)}</span>
              </div>
              {/* Quality indicator for videos */}
              {isVideo && media.video_qualities && (
                <div className="mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {JSON.parse(media.video_qualities).length > 0 
                      ? `${Object.keys(JSON.parse(media.video_qualities)).length + 1} qualités`
                      : 'Streaming'
                    }
                  </span>
                </div>
              )}
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  };

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
            <div className="px-4 lg:px-6 py-6 space-y-6">
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
              
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Galerie Médias</h1>
                <p className="text-gray-600">Images et vidéos accessibles</p>
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
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'name')}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date (plus récent d'abord)</SelectItem>
                      <SelectItem value="name">Nom (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
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
                    const displayedMedia = filteredMedia.slice(0, 4);
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