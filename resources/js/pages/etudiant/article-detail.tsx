import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  image?: string;
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

        <div className="p-6 w-full min-w-0">
          <Link href="/articles">
            <Button
              variant="outline"
              className="mb-4 border-gray-400 text-[#121214] hover:border-[#c5027f] hover:text-[#c5027f]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux articles
            </Button>
          </Link>

          <Card className="overflow-hidden border border-gray-300 w-full min-w-0">
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[400px] object-cover"
              />
            )}
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-6 w-full">
              <CardTitle className="text-2xl font-bold text-[#121214] w-full">
                {article.title}
              </CardTitle>
              <div className="text-sm text-gray-500 mt-1 w-full">
                Publié le{" "}
                {new Date(article.published_at).toLocaleDateString("fr-FR")} par{" "}
                {article.author}
              </div>
            </CardHeader>
            <CardContent className="p-6 w-full min-w-0">
              <div className="w-full min-w-0">
                <p className="text-gray-600 font-bold mb-4 leading-relaxed whitespace-pre-line w-full">
                  {article.excerpt}
                </p>

                <div className="w-full min-w-0">
                  <p className="whitespace-pre-line text-gray-800 w-full min-w-0">
                    {article.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-6 w-full">
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
