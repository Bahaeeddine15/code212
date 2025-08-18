import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { type BreadcrumbItem } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppContent } from "@/components/layout/app-content";
import { AppSidebarHeader } from "@/components/layout/app-sidebar-header";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  author: string;
  image?: string; // <-- ajout pour l'image
}

interface Props {
  article: Article;
  breadcrumbs: BreadcrumbItem[];
}

export default function ArticleDetail({ article }: Props) {
  return (
    <AppLayout>
      <Head title={article.title} />

      <AppContent variant="sidebar" className="overflow-x-hidden bg-white">
        <AppSidebarHeader
          breadcrumbs={[
            { title: "Dashboard Étudiant", href: "/dashboard" },
            { title: "Articles", href: "/articles" },
            { title: article.title, href: "" },
          ]}
        />

        <div className="p-6 space-y-6 w-full">
          <Link href="/articles">
            <Button
              variant="outline"
              className="mb-4 border-gray-400 text-[#121214] hover:border-[#c5027f] hover:text-[#c5027f]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux articles
            </Button>
          </Link>

          <Card className="overflow-hidden border border-gray-300 w-full">
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-70 object-cover"
              />
            )}
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
              <CardTitle className="text-2xl font-bold text-[#121214]">
                {article.title}
              </CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Publié le{" "}
                {new Date(article.published_at).toLocaleDateString("fr-FR")} par{" "}
                {article.author}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed whitespace-pre-line">
                {article.excerpt.length > 150
                  ? article.excerpt.substring(0, 150) + "..."
                  : article.excerpt}
              </p>

              <div className="prose max-w-none text-gray-800">
                <p className="whitespace-pre-line">{article.content}</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-6">
            <Link href="/articles">
              <Button
                size="lg"
                className="bg-[#c5027f] hover:bg-[#ff005b] text-white"
              >
                Voir plus d'articles
              </Button>
            </Link>
          </div>
        </div>
      </AppContent>
    </AppLayout>
  );
}
