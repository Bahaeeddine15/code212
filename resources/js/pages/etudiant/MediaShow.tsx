import React, { useRef, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppContent } from '@/components/layout/app-content';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface PageProps { 
  media: MediaItem;
  qualities: Record<string, string>;
  streamUrl: string;
  [key:string]: any;
}

type QualityType = 'original' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';

export default function MediaShow() {
  const { props } = usePage<PageProps>();
  const { media, qualities, streamUrl } = props;
  const [currentQuality, setCurrentQuality] = useState<QualityType>('original');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isVideo = media.file_extension ? ['mp4','mov','avi','wmv','flv','webm'].includes(media.file_extension.toLowerCase()) : false;

  // Create breadcrumbs for the header component
  const headerBreadcrumbs = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Galerie Médias", isActive: true },
    ];

  const getQualityLabel = (quality: QualityType): string => {
    const labels: Record<QualityType, string> = {
      'original': 'Originale',
      '144p': '144p (Ultra low)',
      '240p': '240p (Low)', 
      '360p': '360p (SD)',
      '480p': '480p (SD)',
      '720p': '720p (HD)',
      '1080p': '1080p (Full HD)'
    };
    return labels[quality] || quality;
  };

  const getQualityColor = (quality: QualityType): string => {
    const colors: Record<QualityType, string> = {
      'original': 'bg-purple-600',
      '144p': 'bg-red-600',
      '240p': 'bg-orange-600', 
      '360p': 'bg-yellow-600',
      '480p': 'bg-green-600',
      '720p': 'bg-blue-600',
      '1080p': 'bg-indigo-600'
    };
    return colors[quality] || 'bg-gray-600';
  };

  const changeVideoQuality = (quality: QualityType) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;
      
      setCurrentQuality(quality);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            videoRef.current.play().catch(console.error);
          }
        }
      }, 100);
    }
  };

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
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{media.title}</h1>
                  {isVideo && (
                    <Badge className={`${getQualityColor(currentQuality)} text-white`}>
                      {getQualityLabel(currentQuality)}
                    </Badge>
                  )}
                </div>
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
                  <div className="w-full bg-black rounded-lg overflow-hidden flex items-center justify-center max-h-[70vh] relative">
                    {isVideo ? (
                      <>
                        <video 
                          ref={videoRef}
                          src={currentQuality === 'original' ? streamUrl : qualities[currentQuality]}
                          controls 
                          className="max-h-[70vh] w-auto"
                          preload="metadata"
                        />
                        
                        {/* Streaming Status */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-3 py-2 text-white text-xs flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span>Streaming actif</span>
                            </div>
                            <div className="w-px h-4 bg-white/20"></div>
                            <span>{Object.keys(qualities).length + 1} qualités</span>
                          </div>
                        </div>

                        {/* Quality indicator */}
                        {currentQuality !== 'original' && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 px-3 py-2 text-white text-xs">
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 ${getQualityColor(currentQuality)} rounded-full`}></div>
                                <span>Lecture en {getQualityLabel(currentQuality)}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      media.full_url && (
                        <img 
                          src={media.full_url} 
                          alt={media.title} 
                          className="max-h-[70vh] w-auto object-contain" 
                        />
                      )
                    )}
                  </div>
                  
                  {/* Quality Selector for Videos */}
                  {isVideo && (Object.keys(qualities).length > 0 || streamUrl) && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-3 text-gray-700">
                        Qualités disponibles:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        <button
                          onClick={() => changeVideoQuality('original')}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            currentQuality === 'original'
                              ? 'bg-purple-600 text-white shadow-lg scale-105'
                              : 'bg-white text-gray-700 hover:bg-purple-50 border'
                          }`}
                        >
                          Originale
                        </button>
                        {Object.keys(qualities)
                          .sort((a, b) => {
                            const order = ['144p', '240p', '360p', '480p', '720p', '1080p'];
                            return order.indexOf(a) - order.indexOf(b);
                          })
                          .map(quality => (
                            <button
                              key={quality}
                              onClick={() => changeVideoQuality(quality as QualityType)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                currentQuality === quality
                                  ? `${getQualityColor(quality as QualityType)} text-white shadow-lg scale-105`
                                  : 'bg-white text-gray-700 hover:bg-gray-50 border'
                              }`}
                            >
                              {quality.toUpperCase()}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2"><CardTitle>Détails</CardTitle></CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-600">
                    <p>{media.detail || 'Aucune description disponible.'}</p>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  {/* Video Quality Info */}
                  {isVideo && (Object.keys(qualities).length > 0 || streamUrl) && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Informations vidéo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Qualité actuelle</label>
                          <div className={`mt-1 px-3 py-2 rounded-lg ${getQualityColor(currentQuality)} text-white text-sm font-medium`}>
                            {getQualityLabel(currentQuality)}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Qualités disponibles</label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                              Originale
                            </span>
                            {Object.keys(qualities).map(quality => (
                              <span 
                                key={quality}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                              >
                                {quality}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Streaming</label>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-600">Actif</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
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
            </div>
          </AppContent>
        </div>
      </AppShell>
      
      {/* Footer */}
      <Footer />
    </>
  );
}