import { Head, Link, router } from '@inertiajs/react';
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Menu } from 'lucide-react';

interface AssetItem {
  id: number;
  name: string;
  type: 'pdf' | 'video' | 'other';
  url?: string | null; // present only when unlocked
}

interface ModuleItem {
  id: number;
  titre: string;
  description?: string;
  assets?: AssetItem[]; // 👈 new
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
  duration?: string | null; // <-- add this
  status?: string | null;   // <-- add this if you want to show status
  language?: string | null;
}

interface ShowProps {
  formation: Formation;
}

export default function Show({ formation }: ShowProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://picsum.photos/800/400";
  };

  const headerBreadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Formations', href: '/formations' },
  ];

  const registerToFormation = (id: number) => {
    // if you have Ziggy: router.post(route('formations.register', id), {}, { preserveScroll: true });
    router.post(`/formations/${id}/register`, {}, { preserveScroll: true });
  };

  const typeBadge = (t: AssetItem['type']) =>
    t === 'video' ? '🎬 Vidéo' : t === 'pdf' ? '📄 PDF' : '📎 Fichier';

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
            <div className="p-4 lg:p-6 pt-6">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="p-3 bg-[#4f39f6] text-white rounded-lg shadow-lg hover:bg-[#3a2b75] transition-colors flex items-center gap-2"
                >
                  <Menu className="w-5 h-5" />
                  <span className="text-sm font-medium">Menu</span>
                </button>
              </div>

              <div className="mb-6">
                <Link
                  href="/formations"
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Retour aux formations
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-[#1a1a1c]">
                {/* Image */}
                <div className="w-full h-64 md:h-80">
                  <img
                    src={formation.photo || '/images/default-formation.jpg'}
                    alt={formation.titre}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                <div className="p-6 md:p-8">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      {formation.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      🏆 Certification
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                      📊 Niveau {formation.niveau}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    {formation.titre}
                  </h1>

                  {/* Description */}
                  <div className="prose max-w-none mb-8">
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {formation.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {!formation.isSignedUp ? (
                      <button
                        onClick={() => registerToFormation(formation.id)}
                        className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        🚀 S'inscrire à cette formation
                      </button>
                    ) : (
                      <div className="flex-1 px-8 py-3 rounded-lg bg-green-50 text-green-700 font-medium flex items-center justify-center">
                        ✅ Vous êtes inscrit(e)
                      </div>
                    )}
                    <Link
                      href="/formations"
                      className="flex-1 px-8 py-3 bg-gray-200 text-center text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      ← Retour à la liste
                    </Link>
                  </div>

                  {/* Modules */}
                  <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4">📚 Modules</h2>

                    {formation.modules && formation.modules.length > 0 ? (
                      <ul className="space-y-5">
                        {formation.modules.map((m) => (
                          <li key={m.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="font-semibold text-gray-900 dark:text-white">{m.titre}</div>
                            {m.description && (
                              <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">{m.description}</p>
                            )}

                            {/* Files inside each module */}
                            {m.assets && m.assets.length > 0 ? (
                              <ul className="mt-3 space-y-2">
                                {m.assets.map((a) => {
                                  const locked = !formation.isSignedUp || !a.url;
                                  return (
                                    <li key={a.id} className="flex items-center justify-between gap-3">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                                          {typeBadge(a.type)}
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">{a.name}</span>
                                      </div>

                                      {!locked ? (
                                        <div className="flex gap-2">
                                          <a
                                            href={a.url!}
                                            className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            {a.type === 'video' ? '▶️ Lire' : '⬇️ Ouvrir'}
                                          </a>
                                          <a
                                            href={a.url!}
                                            className="px-3 py-1.5 text-sm rounded bg-gray-600 text-white hover:bg-gray-700"
                                            download
                                          >
                                            ⬇️ Télécharger
                                          </a>
                                        </div>
                                      ) : (
                                        <button
                                          className="px-3 py-1.5 text-sm rounded bg-yellow-100 text-yellow-800 cursor-not-allowed"
                                          disabled
                                          title="Inscrivez-vous pour accéder au contenu"
                                        >
                                          🔒 Verrouillé
                                        </button>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <p className="mt-2 text-sm text-gray-500">Aucun contenu pour ce module.</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">Aucun module disponible pour le moment.</p>
                    )}
                  </div>

                  {/* Extra info */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Durée:</span>{" "}
                        {formation.duration ? formation.duration : "Non spécifiée"}
                      </div>
                      <div>
                        <span className="font-medium">Format:</span> En ligne
                      </div>
                      <div>
                        <span className="font-medium">Langue:</span> {" "}
                        {formation.language ? formation.language : "Non spécifiée"}
                      </div>
                      <div>
                        <span className="font-medium">Support:</span> 24/7
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