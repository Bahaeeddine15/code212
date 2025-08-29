import React, { useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Download, Play, Settings, Volume2, VolumeX, Maximize, Minimize, FileText, Calendar, User } from 'lucide-react';

type QualityType = 'original' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';

interface ModuleFile {
  id: number;
  original_name: string;
  type: string;
  mime_type: string;
  size: number;
}

interface VideoQuality {
  [key: string]: string; // e.g., "720p": "/path/to/720p.mp4"
}

interface VideoPlayerProps {
  file: ModuleFile;
  qualities: VideoQuality;
  originalUrl: string;
  downloadUrl: string;
  module?: {
    id: number;
    title: string;
  };
  formation?: {
    id: number;
    title: string;
  };
}

export default function VideoPlayer({ 
  file, 
  qualities, 
  originalUrl, 
  downloadUrl,
  module,
  formation 
}: VideoPlayerProps) {
  const [currentQuality, setCurrentQuality] = useState<QualityType>('144p');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Formations', href: '/formations' },
    ...(formation ? [{ title: formation.title, href: `/formations/${formation.id}` }] : []),
    { title: 'Lecteur Vidéo' }
  ];

  // Get available qualities including original
  const availableQualities = {
    original: originalUrl,
    ...qualities
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
    return labels[quality] || quality.toUpperCase();
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
      
      // Small delay to allow state update
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            videoRef.current.play().catch(console.error);
          }
        }
      }, 100);
    } else {
      setCurrentQuality(quality);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Get current video URL based on selected quality
  const getCurrentVideoUrl = () => {
    if (currentQuality === 'original') {
      return originalUrl;
    }
    // Use the same route pattern as admin
    return `/student/module-files/${file.id}/quality/${currentQuality}`;
  };

  return (
    <>
      <Head title={`Vidéo - ${file.original_name}`}>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <DashboardHeader breadcrumbs={breadcrumbs} />

      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          {isMobileOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
          )}

          <div className={`
            fixed lg:relative inset-y-0 left-0 z-40 w-64 lg:w-auto
            transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 transition-transform duration-300 ease-in-out
          `}>
            <AppSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
          </div>

          <AppContent variant="sidebar" className="flex-1 bg-gray-50">
            <div className="p-4 lg:p-6">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  href={formation ? `/formations/${formation.id}` : '/formations'}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm border"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour {formation ? 'à la formation' : 'aux formations'}
                </Link>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Video Player - Main Section */}
                <div className="xl:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                            {file.original_name}
                          </h1>
                          {module && (
                            <p className="text-gray-600 text-sm sm:text-base">
                              Module: <span className="font-semibold">{module.title}</span>
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              Vidéo
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getQualityColor(currentQuality)}`}>
                              {getQualityLabel(currentQuality)}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Télécharger
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative bg-black">
                      <video
                        ref={videoRef}
                        key={getCurrentVideoUrl()}
                        src={getCurrentVideoUrl()}
                        className="w-full h-auto max-h-[70vh]"
                        controls
                        controlsList="nodownload"
                        preload="metadata"
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                      >
                        <source src={getCurrentVideoUrl()} type={file.mime_type} />
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                    </div>

                    {/* Quality Selector - Similar to Admin */}
                    <div className="p-4 sm:p-6 border-t border-gray-200">
                      <div className="mt-3 sm:mt-0 p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2 sm:mb-3 text-gray-700">
                          Qualités disponibles:
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2">

                          {/* Other Qualities */}
                          {(['144p', '240p', '360p', '480p', '720p', '1080p'] as QualityType[])
                            .filter(quality => qualities[quality])
                            .map(quality => (
                              <button
                                key={quality}
                                onClick={() => changeVideoQuality(quality)}
                                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-medium transition-all ${
                                  currentQuality === quality
                                    ? `${getQualityColor(quality)} text-white shadow-lg scale-105`
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border hover:border-gray-200'
                                }`}
                              >
                                {quality.toUpperCase()}
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Video Information */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Current Quality Info */}
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Settings className="w-4 h-4 mr-2 text-blue-600" />
                      Informations vidéo
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Qualité actuelle</label>
                        <div className={`mt-1 px-3 py-2 rounded-lg ${getQualityColor(currentQuality)} text-white text-sm font-medium`}>
                          {getQualityLabel(currentQuality)}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Qualités disponibles</label>
                        <div className="mt-1 flex flex-wrap gap-1">
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
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Streaming</label>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-600">Actif</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Module & Formation Info */}
                  {(module || formation) && (
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-600" />
                        Contexte
                      </h3>
                      <div className="space-y-3">
                        {module && (
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-gray-500">Module</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-medium">
                              {module.title}
                            </div>
                          </div>
                        )}
                        {formation && (
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-gray-500">Formation</label>
                            <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-medium">
                              {formation.title}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AppContent>
        </div>
      </AppShell>

      <Footer />
    </>
  );
}