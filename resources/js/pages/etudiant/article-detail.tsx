import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Articles", isActive: true },
];

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  author: string;
  images: string[];
}

interface Props {
  article: Article;
  breadcrumbs: BreadcrumbItem[];
}

export default function ArticleDetail({ article }: Props) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Custom Dashboard Header */}
      <DashboardHeader breadcrumbs={headerBreadcrumbs} />
      
      <AppShell variant="sidebar">
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
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
            {article.images && article.images.length > 0 && (
              <>
                <img
                  src={`/storage/${article.images[0]}`}
                  alt={article.title}
                  className="w-full h-auto max-h-[400px] object-cover mb-4"
                />
                {article.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-4">
                    {article.images.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={`/storage/${img}`}
                        alt={article.title + " image " + (idx + 2)}
                        className="h-32 rounded object-cover"
                        style={{ minWidth: 120, maxWidth: 180 }}
                      />
                    ))}
                  </div>
                )}
              </>
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
        </div>
      </AppShell>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
