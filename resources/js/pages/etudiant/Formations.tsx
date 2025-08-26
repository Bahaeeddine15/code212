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
import { Menu } from "lucide-react";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
                  Formations Disponibles
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Découvrez nos formations et développez vos compétences
                </p>
              </div>

              {/* 🔍 Barre de recherche */}
              <div className="mb-8 space-y-2">
                <Label htmlFor="search" className="text-gray-900 dark:text-white">Recherche</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white dark:bg-[#1e2939] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
