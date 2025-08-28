import { AppContent } from "@/components/layout/app-content";
import { AppShell } from "@/components/layout/app-shell";
import { AppSidebar } from "@/components/layout/app-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Search, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import { type BreadcrumbItem } from "@/types";

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Articles", isActive: true },
];

interface Article {
  published_at: string | number | Date;
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  images: string[];
}

interface PaginationData {
  current_page: number;
  data: Article[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Props {
  articles: PaginationData;
  categories: string[];
  filters: {
    search?: string;
    category?: string;
  };
}

export default function Articles({ articles, categories, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [categoryFilter, setCategoryFilter] = useState(
    filters.category || "all"
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSearch = () => {
    router.get(
      "/articles",
      {
        search: searchTerm || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    router.get(
      "/articles",
      {
        search: searchTerm || undefined,
        category: value !== "all" ? value : undefined,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    router.get("/articles");
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      actualite: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
      information: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
      guide: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
      evenement: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
      annonce: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
      ressource: "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
    );
  };

  return (
    <>
      <Head>
        <title>Articles</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
          
          <AppContent
            variant="sidebar"
            className="flex-1 bg-gray-50 dark:bg-[#101828] font-[Poppins] lg:ml-0"
          >

          <div className="max-w-7xl mx-auto px-4 py-5">
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
            
            <div className="mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Découvrez nos derniers articles et actualités
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e2939] rounded-lg shadow-sm border border-gray-200 dark:border-[#364153] p-3 mb-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <Input
                    placeholder="Rechercher des articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 h-12 border-gray-300 dark:border-[#364153] dark:bg-[#364153] dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <Select
                    value={categoryFilter}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-48 h-12 dark:bg-[#364153] dark:border-[#364153] dark:text-white">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#1e2939] dark:border-[#364153]">
                      <SelectItem value="all" className="dark:text-white dark:hover:bg-[#364153]">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="dark:text-white dark:hover:bg-[#364153]">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleSearch}
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>

            {articles.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {articles.data.map((article) => (
                    <Card
                      key={article.id}
                      className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-[#364153] dark:bg-[#1e2939] overflow-hidden flex flex-col"
                    >
                      <div className="aspect-video bg-gray-100 dark:bg-[#364153] overflow-hidden">
                        {article.images && article.images.length > 0 ? (
                          <img
                            src={`/storage/${article.images[0]}`}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">
                              {article.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      <CardContent className="flex flex-col flex-1 p-6">
                        <div className="mb-3">
                          <Badge
                            className={getCategoryColor(article.category)}
                            variant="outline"
                          >
                            {article.category}
                          </Badge>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed whitespace-pre-line">
                          {article.excerpt.length > 150
                            ? article.excerpt.substring(0, 150) + "..."
                            : article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-5 mt-auto">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {new Date(
                                article.published_at
                              ).toLocaleDateString("fr-FR")}
                            </span>
                          </div>

                          <Link href={`/articles/${article.id}`}>
                            <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                              Voir Plus
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {articles.last_page > 1 && (
                  <div className="bg-white dark:bg-[#1e2939] rounded-lg shadow-sm border border-gray-200 dark:border-[#364153] p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Affichage de {articles.from} à {articles.to} sur{" "}
                        {articles.total} articles
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={articles.prev_page_url || "#"}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                            articles.prev_page_url
                              ? "bg-gray-100 dark:bg-[#364153] hover:bg-gray-200 dark:hover:bg-[#4a556b] text-gray-700 dark:text-gray-300"
                              : "bg-gray-50 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={(e) =>
                            !articles.prev_page_url && e.preventDefault()
                          }
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Précédent
                        </Link>

                        <div className="flex gap-1">
                          {articles.links
                            .filter(
                              (link) =>
                                link.label !== "&laquo; Previous" &&
                                link.label !== "Next &raquo;"
                            )
                            .map((link, index) => (
                              <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                  link.active
                                    ? "bg-blue-600 text-white"
                                    : link.url
                                      ? "bg-gray-100 dark:bg-[#364153] hover:bg-gray-200 dark:hover:bg-[#4a556b] text-gray-700 dark:text-gray-300"
                                      : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                }`}
                                onClick={(e) => !link.url && e.preventDefault()}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                              />
                            ))}
                        </div>

                        <Link
                          href={articles.next_page_url || "#"}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                            articles.next_page_url
                              ? "bg-gray-100 dark:bg-[#364153] hover:bg-gray-200 dark:hover:bg-[#4a556b] text-gray-700 dark:text-gray-300"
                              : "bg-gray-50 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={(e) =>
                            !articles.next_page_url && e.preventDefault()
                          }
                        >
                          Suivant
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 w-full bg-white dark:bg-[#1e2939] rounded-lg shadow-sm border border-gray-200 dark:border-[#364153]">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-[#364153] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchTerm || categoryFilter !== "all"
                    ? "Aucun résultat trouvé"
                    : "Aucun article disponible"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {searchTerm || categoryFilter !== "all"
                    ? "Essayez de modifier vos critères de recherche."
                    : "Il n'y a pas encore d'articles publiés."}
                </p>
                {(searchTerm || categoryFilter !== "all") && (
                  <Button onClick={clearFilters} variant="outline" className="dark:border-[#364153] dark:text-gray-300 dark:hover:bg-[#364153]">
                    Effacer les filtres
                  </Button>
                )}
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
