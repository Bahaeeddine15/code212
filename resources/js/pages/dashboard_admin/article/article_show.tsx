import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbItem } from "@/types";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
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
  created_at: string;
  updated_at: string;
}

interface ArticleShowProps {
  article: Article;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin/dashboard" },
  { title: "Gestion des articles", href: "/admin/articles" },
  { title: "Détails de l'article", href: "#" },
];

export default function ArticleShow({ article }: ArticleShowProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      published: {
        label: "Publié",
        variant: "default" as const,
        className: "bg-green-500 text-white",
      },
      draft: {
        label: "Brouillon",
        variant: "secondary" as const,
        className: "bg-yellow-500 text-white",
      },
      archived: {
        label: "Archivé",
        variant: "outline" as const,
        className: "bg-gray-500 text-white",
      },
    };
    const config = statusConfig[article.status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      router.delete(`/admin/articles/${article.id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Article: ${article.title}`} />

      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link
            href="/admin/articles"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux articles
          </Link>

          <div className="flex gap-3">
            <Link href={`/admin/articles/${article.id}/edit`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Edit className="w-4 h-4 mr-2" /> Modifier
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 border-red-200"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Supprimer
            </Button>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <article className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
            <header className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200 text-sm px-3 py-1"
                  >
                    {article.category}
                  </Badge>
                  {getStatusBadge()}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-light">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views} lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min de lecture</span>
                </div>
              </div>
            </header>

            {article.image && (
              <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            <div className="px-8 py-8 w-full">
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-full">
                <div
                  className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{
                    __html: article.content
                      .replace(/\r\n/g, "\n")
                      .split(/\n{2,}/)
                      .map(
                        (paragraph) =>
                          `<p class="mb-6">${paragraph.replace(/\n/g, "<br />")}</p>`
                      )
                      .join(""),
                  }}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </AppLayout>
  );
}
