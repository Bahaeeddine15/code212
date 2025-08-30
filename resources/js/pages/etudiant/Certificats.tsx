import { Head } from '@inertiajs/react';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Menu, Award } from 'lucide-react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';

// TypeScript interfaces
interface Certificate {
  id: number;
  code: string;
  formation_title: string;
  formation_id: number;
  registered_date: string;
  issued_date: string | null;
  pdf_url?: string | null;
  preview_image?: string | null;
  student_name: string;
  verification_url?: string | null;
  is_generated: boolean;
  is_completed: boolean;
}

interface Props {
  certificates: Certificate[];
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
  { title: "Mes certificats", href: "/certificats" },
];

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Certificats", isActive: true },
];

export default function Certificats({ certificates, auth }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Count only generated certificates for statistics
  const generatedCertificatesCount = certificates?.filter(cert => cert.is_generated).length || 0;
  const hasRegistrations = certificates && certificates.length > 0;

  return (
    <>
      <Head title="Mes Certificats">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
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
          
          <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#101828] font-[Poppins] lg:ml-0">
            <div className="p-4 lg:p-6 pt-6">
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
              
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Mes Certificats
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Tous les certificats obtenus après la validation d'une formation dans le lab Code212 – Université Cadi Ayyad.
                </p>
              </div>

              {/* UPDATED: Only show certification process info if user has registrations */}
              {hasRegistrations && (
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        🎓 Comment obtenir votre certificat ?
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>
                          Pour obtenir votre certificat officiel, vous devez :
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>✅ <strong>Terminer tous les modules</strong> de la formation en ligne</li>
                          <li>📝 <strong>Réussir l'examen final</strong> au centre Code212</li>
                          <li>🏢 <strong>Se présenter physiquement</strong> à l'Université Cadi Ayyad</li>
                        </ul>
                        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700">
                          <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
                            📅 Prêt à passer l'examen ?
                          </p>
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            asChild
                          >
                            <a href="/reservations" className="inline-flex items-center gap-2">
                              📋 Réserver une session d'examen
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Certificate Grid or Empty State */}
              {hasRegistrations ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className={`overflow-hidden border transition-all duration-200 ${
                      cert.is_generated 
                        ? 'dark:bg-[#1e2939] border-gray-200 dark:border-gray-700 hover:shadow-lg cursor-pointer' 
                        : 'dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 opacity-60'
                    }`}>
                      
                      {/* Certificate Preview Image */}
                      <div className="relative">
                        {cert.is_generated && cert.preview_image ? (
                          <img 
                            src={cert.preview_image} 
                            alt={`Certificat ${cert.formation_title}`}
                            className="w-full h-40 object-cover"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                            <Award className="w-16 h-16 text-white opacity-30" />
                            {/* Overlay for pending certificates */}
                            {!cert.is_generated && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="text-center text-white px-4">
                                  <div className="text-sm font-semibold">EN ATTENTE</div>
                                  {cert.is_completed ? (
                                    <div className="text-xs">Formation terminée<br/>Passez l'examen au centre Code212</div>
                                  ) : (
                                    <div className="text-xs">Terminez la formation d'abord</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-2 right-2">
                          {cert.is_generated ? (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                              ✓ Certifié
                            </span>
                          ) : cert.is_completed ? (
                            <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                              📝 Examen requis
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
                              🔒 Verrouillé
                            </span>
                          )}
                        </div>
                      </div>

                      <CardContent className="p-4 space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {cert.formation_title}
                        </h3>

                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <p><span className="font-medium">Code :</span> {cert.code}</p>
                          <p><span className="font-medium">Inscrit le :</span> {formatDate(cert.registered_date)}</p>
                          {cert.is_generated && cert.issued_date && (
                            <p><span className="font-medium">Certifié le :</span> {formatDate(cert.issued_date)}</p>
                          )}
                          <p><span className="font-medium">Étudiant :</span> {cert.student_name}</p>
                        </div>

                        {/* Status Message */}
                        {!cert.is_generated && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-xs text-blue-800 dark:text-blue-200">
                              {cert.is_completed ? (
                                <>
                                  <strong>🎯 Prochaine étape :</strong><br/>
                                  Réservez une session d'examen au centre Code212 pour obtenir votre certificat officiel.
                                </>
                              ) : (
                                <>
                                  <strong>📚 En cours :</strong><br/>
                                  Terminez tous les modules pour débloquer l'examen de certification.
                                </>
                              )}
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          {/* Download Button */}
                          {cert.is_generated && cert.pdf_url ? (
                            <Button variant="default" className="w-full flex items-center gap-2" asChild>
                              <a href={cert.pdf_url} target="_blank" rel="noopener noreferrer">
                                <FileDown className="w-4 h-4" />
                                Voir le certificat
                              </a>
                            </Button>
                          ) : cert.is_completed ? (
                            <Button variant="outline" className="w-full bg-yellow-50 hover:bg-yellow-100 border-yellow-200" asChild>
                              <a href="/reservations" className="flex items-center gap-2">
                                📋 Réserver l'examen
                              </a>
                            </Button>
                          ) : (
                            <Button variant="outline" className="w-full" disabled>
                              <FileDown className="w-4 h-4 mr-2" />
                              Terminez la formation d'abord
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                // UPDATED: Empty State - Clean and simple
                <div className="text-center py-12">
                  <Award className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun certificat disponible
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    Vous n'avez pas encore de certificats. Inscrivez-vous à une formation pour commencer votre parcours de certification !
                  </p>
                  <Button asChild>
                    <a href="/formations">
                      📚 Découvrir les formations
                    </a>
                  </Button>
                </div>
              )}

              {/* UPDATED: Statistics - Only show if user has registrations */}
              {hasRegistrations && (
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {generatedCertificatesCount > 0 ? '🎉 Félicitations !' : '📋 Statistiques'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {generatedCertificatesCount > 0 
                          ? `Vous avez obtenu ${generatedCertificatesCount} certificat${generatedCertificatesCount > 1 ? 's' : ''} officiel${generatedCertificatesCount > 1 ? 's' : ''}.`
                          : `${certificates.length} formation${certificates.length > 1 ? 's' : ''} inscrite${certificates.length > 1 ? 's' : ''}, ${generatedCertificatesCount} certificat${generatedCertificatesCount > 1 ? 's' : ''} obtenu${generatedCertificatesCount > 1 ? 's' : ''}.`
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {generatedCertificatesCount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Certificat{generatedCertificatesCount > 1 ? 's' : ''} obtenu{generatedCertificatesCount > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
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