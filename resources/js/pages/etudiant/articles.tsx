import { AppContent } from "@/components/layout/app-content";
import { AppShell } from "@/components/layout/app-shell";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppSidebarHeader } from "@/components/layout/app-sidebar-header";
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
import { Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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
      actualite: "bg-red-50 text-red-700 border-red-200",
      information: "bg-blue-50 text-blue-700 border-blue-200",
      guide: "bg-green-50 text-green-700 border-green-200",
      evenement: "bg-purple-50 text-purple-700 border-purple-200",
      annonce: "bg-orange-50 text-orange-700 border-orange-200",
      ressource: "bg-teal-50 text-teal-700 border-teal-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  return (
    <AppShell variant="sidebar">
      <Head title="Articles" />
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <AppContent
          variant="sidebar"
          className="overflow-x-hidden overflow-y-auto h-screen bg-gray-50"
        >
          <AppSidebarHeader
            breadcrumbs={[
              { title: "Dashboard Étudiant", href: "/dashboard" },
              { title: "Articles", href: "/articles" },
            ]}
          />

          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Articles
              </h1>
              <p className="text-gray-600">
                Découvrez nos derniers articles et actualités
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher des articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <Select
                    value={categoryFilter}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-48 h-12">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleSearch}
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700"
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
                      className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden flex flex-col"
                    >
                      <div className="aspect-video bg-gray-100 overflow-hidden">
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

                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed whitespace-pre-line">
                          {article.excerpt.length > 150
                            ? article.excerpt.substring(0, 150) + "..."
                            : article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-5 mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {new Date(
                                article.published_at
                              ).toLocaleDateString("fr-FR")}
                            </span>
                          </div>

                          <Link href={`/articles/${article.id}`}>
                            <Button className="bg-[#2c64d3] text-white hover:bg-[#0087e8] dark:bg-[#2CD3A3] dark:hover:bg-[#00e87e]">
                              Voir Plus
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {articles.last_page > 1 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Affichage de {articles.from} à {articles.to} sur{" "}
                        {articles.total} articles
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={articles.prev_page_url || "#"}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                            articles.prev_page_url
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              : "bg-gray-50 text-gray-400 cursor-not-allowed"
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
                                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                      : "text-gray-400 cursor-not-allowed"
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
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              : "bg-gray-50 text-gray-400 cursor-not-allowed"
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
              <div className="text-center py-16 w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || categoryFilter !== "all"
                    ? "Aucun résultat trouvé"
                    : "Aucun article disponible"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || categoryFilter !== "all"
                    ? "Essayez de modifier vos critères de recherche."
                    : "Il n'y a pas encore d'articles publiés."}
                </p>
                {(searchTerm || categoryFilter !== "all") && (
                  <Button onClick={clearFilters} variant="outline">
                    Effacer les filtres
                  </Button>
                )}
              </div>
            )}
          </div>
        </AppContent>
      </div>
    </AppShell>
  );
}
