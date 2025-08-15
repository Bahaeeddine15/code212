import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
  { title: "Mes certificats", href: "/certificats" },
];

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Certificats", isActive: true },
];

const mockCertificates = [
  {
    id: 1,
    code: "CERT-20250719-001",
    formation: "Fullstack Web avec Laravel & Vue",
    date: "2025-07-19",
    pdfUrl: "/certificates/1.pdf",
    previewImage: "https://elements-resized.envatousercontent.com/elements-cover-images/db2861b2-970f-4874-80cc-90a9015c8422?w=2038&cf_fit=scale-down&q=85&format=auto&s=db9fb3d21660eddab18883bf6bdc505267b4bc6e2ee97d04269f87a59a334a7b", 
  },
  {
    id: 2,
    code: "CERT-20250710-002",
    formation: "Cybersécurité pour les débutants",
    date: "2025-07-10",
    pdfUrl: "/certificates/2.pdf",
    previewImage: "https://elements-resized.envatousercontent.com/elements-cover-images/db2861b2-970f-4874-80cc-90a9015c8422?w=2038&cf_fit=scale-down&q=85&format=auto&s=db9fb3d21660eddab18883bf6bdc505267b4bc6e2ee97d04269f87a59a334a7b", 
  },
];

export default function Certificats() {
  return (
    <>
      <Head title="Mes Certificats">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      
      <AppLayout>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mes Certificats
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tous les certificats obtenus après la validation d'une formation dans le lab Code212 – Université Cadi Ayyad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCertificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden dark:bg-[#1a1a1c]">
              {cert.previewImage && (
                <img src={cert.previewImage} alt="Certificat" className="w-full h-40 object-cover" />
              )}

              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.formation}</h3>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">Code :</span> {cert.code}</p>
                  <p><span className="font-medium">Délivré le :</span> {cert.date}</p>
                </div>

                <Button variant="default" className="w-full flex items-center gap-2" asChild>
                  <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileDown className="w-4 h-4" />
                    Télécharger le certificat (PDF)
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </AppLayout>
      
      {/* Footer */}
      <Footer />
    </>
  );
}