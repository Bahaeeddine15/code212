import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbItem } from "@/types";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  FileText,
  BookOpen,
  Users,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  status: "published" | "draft" | "archived";
  category: string;
  views: number;
  image?: string;
}

interface ArticlesProps {
  articles: Article[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Gestion des articles",
    href: "/admin/articles",
  },
];

const ArticleCard = ({
  article,
  onEdit,
  onDelete,
}: {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}) => {
  const getStatusBadge = () => {
    const statusConfig = {
      published: {
        label: "Publié",
        variant: "default" as const,
        className: "bg-green-100 text-green-800",
      },
      draft: {
        label: "Brouillon",
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800",
      },
      archived: {
        label: "Archivé",
        variant: "outline" as const,
        className: "bg-gray-100 text-gray-800",
      },
    };

    const config = statusConfig[article.status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.visit(`/admin/articles/${article.id}`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {article.image && (
        <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-6 mb-6 rounded-t-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
      )}
      {!article.image && (
        <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 flex items-center justify-center -m-6 mb-6 rounded-t-2xl">
          <FileText className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-purple-600 transition-colors">
              {article.title}
            </h3>
            {getStatusBadge()}
          </div>
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Par {article.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{article.views} vues</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">{article.date}</span>
          </div>
          <Badge
            variant="outline"
            className="bg-indigo-100 text-indigo-800 border-indigo-200"
          >
            {article.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div
            className="flex justify-center items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => onEdit(article)}
              className="p-2 text-[#c5027f] hover:bg-[#c5027f]/10 dark:text-[#ff005b] dark:hover:bg-[#ff005b]/20 rounded-xl transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDelete(article.id)}
              className="p-2 text-[#ff005b] hover:bg-[#ff005b]/10 dark:text-[#c5027f] dark:hover:bg-[#c5027f]/20 rounded-xl transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Articles({ articles }: ArticlesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter articles based on search and filters
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculer les statistiques
  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    archived: articles.filter((a) => a.status === "archived").length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  };

  const handleEdit = (article: Article) => {
    // Redirect to edit page instead of showing inline form
    router.visit(`/admin/articles/${article.id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      router.delete(`/admin/articles/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestion des articles" />

      <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
        {/* Header moderne */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Articles & Publications
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Créez et gérez vos articles et publications
                </p>
              </div>
            </div>
            <Link href="/admin/articles/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                <span>Nouvel article</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total articles
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="p-4 bg-blue-100 rounded-2xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Publiés</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.published}
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-2xl">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Brouillons
                </p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.draft}
                </p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-2xl">
                <Edit className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Vues totales
                </p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {stats.totalViews}
                </p>
              </div>
              <div className="p-4 bg-purple-100 rounded-2xl">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 w-40">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="actualite">Actualité</SelectItem>
                  <SelectItem value="information">Information</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="evenement">Événement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Liste des articles */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-600" />
              Articles disponibles ({filteredArticles.length})
            </h2>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Modifiez vos critères de recherche"
                  : "Commencez par créer votre premier article"}
              </p>
              <Link href="/admin/articles/create">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto">
                  <Plus className="w-5 h-5" />
                  <span>Créer un article</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
