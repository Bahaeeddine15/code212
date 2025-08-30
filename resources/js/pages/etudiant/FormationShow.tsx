import { Head, Link, router } from '@inertiajs/react';
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Menu, CheckCircle, Circle } from 'lucide-react';

interface AssetItem {
  id: number;
  name: string;
  type: 'pdf' | 'video' | 'other';
  url?: string | null;
  downloadUrl?: string | null;
  videoUrl?: string | null;
}

interface ModuleItem {
  id: number;
  titre: string;
  description?: string;
  duration?: string | null;
  order?: number;
  created_at?: string;
  assets?: AssetItem[];
  is_completed?: boolean;
}

interface Formation {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: string;
  photo?: string;
  created_at?: string;
  updated_at?: string;
  isSignedUp?: boolean;
  modules?: ModuleItem[];
  duration?: string | null;
  status?: string | null;
  language?: string | null;
}

interface ShowProps {
  formation: Formation;
}

export default function Show({ formation }: ShowProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<Set<number>>(
    new Set(formation.modules?.filter(m => m.is_completed).map(m => m.id) || [])
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://picsum.photos/800/400";
  };

  const headerBreadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Formations', href: '/formations' },
  ];

  const registerToFormation = (id: number) => {
    router.post(`/formations/${id}/register`, {}, { preserveScroll: true });
  };

  const toggleModuleCompletion = (moduleId: number) => {
    const isCurrentlyCompleted = completedModules.has(moduleId);
    
    // Optimistically update UI
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyCompleted) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });

    router.post(`/modules/${moduleId}/toggle-completion`, {}, {
      preserveScroll: true,
      onSuccess: (page) => {
        // Handle server response to ensure sync
        const flashData = page.props?.flash as any;
        if (flashData?.module_completion) {
          const { module_id, completed } = flashData.module_completion;
          setCompletedModules(prev => {
            const newSet = new Set(prev);
            if (completed) {
              newSet.add(module_id);
            } else {
              newSet.delete(module_id);
            }
            return newSet;
          });
        }
      },
      onError: (errors) => {
        console.error('Error toggling completion:', errors);
        // Revert optimistic update on error
        setCompletedModules(prev => {
          const newSet = new Set(prev);
          if (isCurrentlyCompleted) {
            newSet.add(moduleId);
          } else {
            newSet.delete(moduleId);
          }
          return newSet;
        });
      }
    });
  };

  const typeBadge = (t: AssetItem['type']) =>
    t === 'video' ? '🎬 Vidéo' : t === 'pdf' ? '📄 PDF' : '📎 Fichier';

  const sortedModules = formation.modules
    ? Array.from(
        new Map(
          formation.modules.map(m => [m.id, m])
        ).values()
      ).sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.created_at && b.created_at) {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        return 0;
      })
    : [];

  const totalModules = sortedModules.length;
  const completedCount = completedModules.size;
  const progressPercentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <>
      <Head title={`Formation - ${formation.titre}`}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <DashboardHeader breadcrumbs={headerBreadcrumbs} />

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

          <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins] lg:ml-0">
            <div className="p-3 sm:p-4 lg:p-6 pt-4 sm:pt-6">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="p-3 bg-[#4f39f6] text-white rounded-lg shadow-lg hover:bg-[#3a2b75] transition-colors flex items-center gap-2"
                >
                  <Menu className="w-5 h-5" />
                  <span className="text-sm font-medium">Menu</span>
                </button>
              </div>

              <div className="mb-4 sm:mb-6">
                <Link
                  href="/formations"
                  className="inline-flex items-center px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  ← Retour aux formations
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-[#1a1a1c]">
                {/* Image */}
                <div className="w-full h-48 sm:h-64 md:h-80">
                  <img
                    src={formation.photo || '/images/default-formation.jpg'}
                    alt={formation.titre}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      {formation.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      🏆 Certification
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      📊 Niveau {formation.niveau}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                    {formation.titre}
                  </h1>

                  {/* Description */}
                  <div className="prose max-w-none mb-6 sm:mb-8">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {formation.description}
                    </p>
                  </div>

                  {/* RESPONSIVE PROGRESS BAR */}
                  {formation.isSignedUp && totalModules > 0 && (
                    <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">📈 Votre progression</h3>
                        <span className="text-xs sm:text-sm font-medium text-gray-600 bg-white px-2 sm:px-3 py-1 rounded-full">
                          {completedCount}/{totalModules} modules terminés
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-semibold">{progressPercentage}% terminé</span>
                        {progressPercentage === 100 && <span className="ml-2">🎉 Félicitations !</span>}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-6 sm:mb-8">
                    {!formation.isSignedUp ? (
                      <button
                        onClick={() => registerToFormation(formation.id)}
                        className="flex-1 px-6 sm:px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
                      >
                        🚀 S'inscrire à cette formation
                      </button>
                    ) : (
                      <div className="flex-1 px-6 sm:px-8 py-3 rounded-lg bg-green-50 text-green-700 font-medium flex items-center justify-center text-sm sm:text-base">
                        ✅ Vous êtes inscrit(e)
                      </div>
                    )}
                    <Link
                      href="/formations"
                      className="flex-1 px-6 sm:px-8 py-3 bg-gray-200 text-center text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
                    >
                      ← Retour à la liste
                    </Link>
                  </div>

                  {/* Modules */}
                  <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">📚 Modules</h2>

                    {sortedModules.length > 0 ? (
                      <ul className="space-y-4 sm:space-y-5">
                        {sortedModules.map((m) => {
                          const isCompleted = completedModules.has(m.id);
                          return (
                            <li 
                              key={m.id} 
                              className={`p-3 sm:p-4 rounded-lg border transition-all ${
                                isCompleted 
                                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col lg:flex-row lg:items-start gap-3 sm:gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <div className={`font-semibold text-base sm:text-lg ${
                                      isCompleted 
                                        ? 'text-green-800 dark:text-green-200' 
                                        : 'text-gray-900 dark:text-white'
                                    }`}>
                                      {m.titre}
                                    </div>
                                    {isCompleted && (
                                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium inline-flex items-center gap-1 w-fit">
                                        ✅ <span className="hidden sm:inline">Terminé</span>
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Show duration */}
                                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    ⏱️ Durée : {m.duration ? m.duration : "Non spécifiée"}
                                  </div>
                                  
                                  {m.description && (
                                    <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base">{m.description}</p>
                                  )}

                                  {/* Files inside each module */}
                                  {m.assets && m.assets.length > 0 ? (
                                    <ul className="mt-3 space-y-2">
                                      {m.assets.map((a) => {
                                        const locked = !formation.isSignedUp || !a.url;
                                        return (
                                          <li key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                              <span className="text-xs sm:text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 whitespace-nowrap">
                                                {typeBadge(a.type)}
                                              </span>
                                              <span className={`text-sm sm:text-base truncate ${
                                                isCompleted 
                                                  ? 'text-green-800 dark:text-green-200' 
                                                  : 'text-gray-800 dark:text-gray-200'
                                              }`} title={a.name}>
                                                {a.name}
                                              </span>
                                            </div>

                                            {!locked ? (
                                              <div className="flex gap-1 sm:gap-2 flex-wrap">
                                                {a.type === 'video' ? (
                                                  <Link
                                                    href={`/student/module-files/${a.id}/video`}
                                                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap"
                                                  >
                                                    <span className="sm:hidden">▶️</span>
                                                    <span className="hidden sm:inline">▶️ Lire</span>
                                                  </Link>
                                                ) : (
                                                  <a
                                                    href={a.url!}
                                                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    <span className="sm:hidden">⬇️</span>
                                                    <span className="hidden sm:inline">⬇️ Ouvrir</span>
                                                  </a>
                                                )}
                                                <a
                                                  href={`/student/module-files/${a.id}/download`}
                                                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded bg-gray-600 text-white hover:bg-gray-700 whitespace-nowrap"
                                                  download
                                                >
                                                  <span className="sm:hidden">📥</span>
                                                  <span className="hidden sm:inline">⬇️ Télécharger</span>
                                                </a>
                                              </div>
                                            ) : (
                                              <button
                                                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded bg-yellow-100 text-yellow-800 cursor-not-allowed whitespace-nowrap"
                                                disabled
                                                title="Inscrivez-vous pour accéder au contenu"
                                              >
                                                <span className="sm:hidden">🔒</span>
                                                <span className="hidden sm:inline">🔒 Verrouillé</span>
                                              </button>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  ) : (
                                    <p className="mt-2 text-xs sm:text-sm text-gray-500">Aucun contenu pour ce module.</p>
                                  )}
                                </div>

                                {/* RESPONSIVE COMPLETION BUTTON */}
                                {formation.isSignedUp && (
                                  <div className="flex-shrink-0 w-full lg:w-auto">
                                    <button
                                      onClick={() => toggleModuleCompletion(m.id)}
                                      className={`w-full lg:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                                        isCompleted
                                          ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300'
                                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300'
                                      }`}
                                      title={isCompleted ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
                                    >
                                      {isCompleted ? (
                                        <>
                                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                          <span className="hidden xs:inline sm:inline">Terminé</span>
                                          <span className="xs:hidden sm:hidden">✓</span>
                                        </>
                                      ) : (
                                        <>
                                          <Circle className="w-4 h-4 flex-shrink-0" />
                                          <span className="hidden sm:inline">Marquer terminé</span>
                                          <span className="sm:hidden">Marquer ✓</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Aucun module disponible pour le moment.</p>
                    )}
                  </div>

                  {/* Extra info */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium block mb-1">Durée:</span>
                        <span>{formation.duration ? formation.duration : "Non spécifiée"}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium block mb-1">Format:</span>
                        <span>En ligne</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium block mb-1">Langue:</span>
                        <span>{formation.language ? formation.language : "Non spécifiée"}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium block mb-1">Support:</span>
                        <span>24/7</span>
                      </div>
                    </div>
                  </div>
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