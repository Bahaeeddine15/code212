import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import DashboardHeader from "@/components/layout/dashboard-header";
import Footer from "@/components/layout/footer";
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Eye, User, Tag, Menu } from 'lucide-react';
import { useState } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  published_at: string;
  category: string;
  views: number;
  images?: string[];
  created_at: string;
  updated_at: string;
}

interface Props { 
  article: Article;
}

export default function ArticleDetail({ article }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Create breadcrumbs for the header component
  const headerBreadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Articles", href: "/articles" },
  ];

  return (
    <>
      <Head>
        <title>{`Article - ${article.title}`}</title>
        <meta name="description" content={article.excerpt} />
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
          
          <AppContent variant="sidebar" className="flex-1 bg-white dark:bg-[#101828] font-[Poppins] lg:ml-0">
            <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
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
              
              {/* Back button */}
              <div className="mb-6">
                <Button variant="outline" asChild className="dark:border-[#364153] dark:text-gray-300 dark:hover:bg-[#364153]">
                  <Link href="/articles" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux articles
                  </Link>
                </Button>
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views} vues
                  </div>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Par {article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.published_at || article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Image */}
              {article.images && article.images.length > 0 && (
                <div className="mb-8">
                  <img
                    src={`/storage/${article.images[0]}`}
                    alt={article.title}
                    className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              <Card className="dark:bg-[#1e2939] dark:border-[#364153]">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">Article</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Excerpt */}
                  {article.excerpt && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-[#364153] rounded-lg border-l-4 border-blue-500">
                      <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                  
                  {/* Additional Images */}
                  {article.images && article.images.length > 1 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Images associées</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.images.slice(1).map((image, index) => (
                          <img
                            key={index}
                            src={`/storage/${image}`}
                            alt={`${article.title} - Image ${index + 2}`}
                            className="w-full h-48 object-cover rounded-lg shadow"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Article Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#364153]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Article créé le {new Date(article.created_at).toLocaleDateString('fr-FR')}</p>
                    {article.updated_at !== article.created_at && (
                      <p>Dernière modification le {new Date(article.updated_at).toLocaleDateString('fr-FR')}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" asChild className="dark:border-[#364153] dark:text-gray-300 dark:hover:bg-[#364153]">
                      <Link href="/articles">
                        Voir tous les articles
                      </Link>
                    </Button>
                  </div>
                </div>
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
