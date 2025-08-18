import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BreadcrumbItem } from "@/types";
import { ArrowLeft, Save, Plus, X } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Gestion des articles",
    href: "/admin/articles",
  },
  {
    title: "Nouvel article",
    href: "#",
  },
];

export default function ArticleCreate() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as "draft" | "published" | "archived",
    image: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageError, setImageError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setFormData((prev) => ({ ...prev, image: file }));
    setImageError("");
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        data.append("image", value);
      } else if (key !== "image") {
        data.append(key, value as string);
      }
    });

    router.post("/admin/articles", data, {
      onSuccess: () => {
        setIsSubmitting(false);
        // Will redirect to articles list automatically
      },
      onError: (errors) => {
        setIsSubmitting(false);
        setErrors(errors);
      },
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Créer un nouvel article" />

      <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
        {/* Header moderne */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Créer un nouvel article
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Rédigez et publiez votre article
                </p>
              </div>
            </div>
            <Link
              href="/admin/articles"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour aux articles</span>
            </Link>
          </div>
        </div>

        {/* Create Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nouvel article
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <Label
                    htmlFor="title"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Titre de l'article *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Saisissez le titre de votre article..."
                    required
                    className={`px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.title ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-3">
                  <Label
                    htmlFor="excerpt"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Résumé *
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="Rédigez un résumé de votre article (sera affiché dans la liste des articles)..."
                    rows={3}
                    required
                    className={`px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none ${errors.excerpt ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-red-600">{errors.excerpt}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Le résumé apparaîtra sur les cartes d'articles et dans les
                    aperçus.
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <Label
                    htmlFor="content"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Contenu de l'article *
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Rédigez le contenu complet de votre article..."
                    rows={15}
                    required
                    className={`px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none ${errors.content ? "border-red-500" : "border-gray-200"}`}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-600">{errors.content}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Vous pouvez utiliser des sauts de ligne pour séparer les
                    paragraphes.
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                  {imageError && (
                    <p className="text-sm text-red-600">{imageError}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Sélectionnez une image pour illustrer l'article.
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-8 border-t border-gray-200">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Création en cours..." : "Créer l'article"}
                  </Button>
                  <Link href="/admin/articles">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                      Annuler
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar with Settings */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Article Settings */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Paramètres de l'article
                </h3>
                <div className="space-y-4">
                  {/* Category */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="category"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Catégorie *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger
                        className={`px-4 py-3 border-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.category ? "border-red-500" : "border-gray-200"}`}
                      >
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="actualite">Actualité</SelectItem>
                        <SelectItem value="information">Information</SelectItem>
                        <SelectItem value="guide">Guide</SelectItem>
                        <SelectItem value="evenement">Événement</SelectItem>
                        <SelectItem value="annonce">Annonce</SelectItem>
                        <SelectItem value="ressource">Ressource</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="status"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Statut de publication
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(
                        value: "draft" | "published" | "archived"
                      ) => handleInputChange("status", value)}
                    >
                      <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-gray-500 mt-2">
                      {formData.status === "draft" &&
                        "L'article sera sauvegardé comme brouillon"}
                      {formData.status === "published" &&
                        "L'article sera publié immédiatement"}
                      {formData.status === "archived" &&
                        "L'article sera archivé"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-4">
                  💡 Conseils de rédaction
                </h3>
                <div className="text-sm text-blue-700 space-y-2">
                  <ul className="space-y-2">
                    <li>• Utilisez un titre accrocheur et descriptif</li>
                    <li>
                      • Rédigez un résumé engageant pour attirer les lecteurs
                    </li>
                    <li>
                      • Structurez votre contenu avec des paragraphes clairs
                    </li>
                    <li>• Choisissez la bonne catégorie pour votre article</li>
                    <li>• Sauvegardez d'abord en brouillon pour réviser</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
