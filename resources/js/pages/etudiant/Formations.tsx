import { Head } from "@inertiajs/react";
import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import FormationCard from "@/components/common/formation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { type BreadcrumbItem } from '@/types';

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Formations", isActive: true },
];

interface Formation {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: string;
  photo: string;
}

interface Props {
  formations: Formation[];
  search?: string;
}

export default function Formations({
  formations,
  search: initialSearch = "",
}: Props) {
  const [search, setSearch] = useState(initialSearch);

  const filteredFormations = formations.filter((f) =>
    `${f.titre} ${f.description} ${f.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Formations">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Formations Disponibles
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Découvrez nos formations et développez vos compétences
                </p>
              </div>

              {/* 🔍 Barre de recherche */}
              <div className="mb-8 space-y-2">
                <Label htmlFor="search">Recherche</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* 📚 Formations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations.length > 0 ? (
                  filteredFormations.map((formation) => (
                    <FormationCard
                      key={formation.id}
                      id={formation.id}
                      titre={formation.titre}
                      description={formation.description}
                      category={formation.category}
                      niveau={formation.niveau}
                      photo={formation.photo}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                    Aucune formation ne correspond à votre recherche.
                  </div>
                )}
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
