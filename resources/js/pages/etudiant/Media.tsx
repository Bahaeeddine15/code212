import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Folder, Images, Search, ChevronRight } from 'lucide-react';
import DashboardHeader from "@/components/layout/dashboard-header";

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

  // Compute stats from grouped data
  const totalMedia = Object.values(mediaByFolder).reduce((sum, files) => sum + files.length, 0);
  const totalFiltered = Object.entries(mediaByFolder).reduce((sum, [_, files]) => {
    return sum + files.filter(file =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.original_name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;
  }, 0);

  return (
    <div>
      {/* 3. Render the header at the top */}
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      <AppShell variant="sidebar">
        <Head title="Galerie Media" />
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

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Total médias</p>
                      <p className="text-3xl font-bold mt-2 text-emerald-600">{totalMedia}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-100">
                      <Images className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Résultats filtrés</p>
                      <p className="text-3xl font-bold mt-2 text-blue-600">{totalFiltered}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-100">
                      <Search className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Rechercher un média..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Rechercher un dossier..."
                      value={folderSearch}
                      onChange={e => setFolderSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Media Gallery grouped by folder */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Images className="w-7 h-7 mr-3 text-emerald-600" />
                    Médias par dossier
                  </h2>
                </div>

                <div className="space-y-8">
                  {Object.entries(mediaByFolder)
                    .filter(([folder]) =>
                      folder.toLowerCase().includes(folderSearch.toLowerCase())
                    )
                    .map(([folder, files]) => {
                      // Filter and sort inside each folder
                      const filteredFiles = files
                        .filter(file =>
                          file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          file.original_name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .sort((a, b) => {
                          if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                          if (sortBy === 'name') return a.title.localeCompare(b.title);
                          return 0;
                        });

                      if (filteredFiles.length === 0) return null;
                      return (
                        <div key={folder} className="border border-gray-200 rounded-xl overflow-hidden mb-8">
                          {/* Folder header is now clickable */}
                          <Link
                            href={route('media.folder', { folder })}
                            className="block bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200 hover:bg-blue-100 transition"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Folder className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{folder}</h3>
                                <p className="text-sm text-gray-600">{filteredFiles.length} média(s)</p>
                              </div>
                            </div>
                          </Link>
                          {/* Media grid */}
                          <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {filteredFiles.map(file => (
                                <MediaCard key={file.id} media={file} />
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </AppContent>
        </div>
      </AppShell>
    </div>
  );
}
