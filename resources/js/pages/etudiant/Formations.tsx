import { Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import FormationCard from "@/components/common/formation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
  { title: "Formations", href: "/formations" },
];
const mockFormations = [
  {
    id: 1,
    titre: "Fullstack Web avec Laravel & Vue",
    description: "Créer des applications web modernes avec Laravel et Vue.js",
    category: "Développement Web",
    niveau: "Intermediaire",
    photo: "https://humadev-international.com/wp-content/uploads/2021/01/humadev-cabinet-de-formation-au-maroc.jpg",
  },
  {
    id: 2,
    titre: "Cybersécurité pour les débutants",
    description: "Comprendre les bases de la sécurité informatique",
    category: "Cybersécurité",
    niveau: "Débutant",
    photo: "https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg",
  },
  {
    id: 3,
    titre: "Analyse de données avec Python",
    description: "Utiliser Python et Pandas pour explorer les données",
    category: "Data Science",
    niveau: "Intermediaire",
    photo: "https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg",
  },
  {
    id: 4,
    titre: "Introduction à l'Intelligence Artificielle",
    description: "Découvrir les concepts fondamentaux de l'IA",
    category: "Intelligence Artificielle",
    niveau: "Débutant",
    photo: "https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg",
  },
  {
    id: 5,
    titre: "Développement Mobile avec React Native",
    description: "Créer des applications mobiles multiplateformes",
    category: "Développement Mobile",
    niveau: "Intermediaire",
    photo: "https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg",
  },
  {
    id: 6,
    titre: "Architecture des Microservices",
    description: "Concevoir des systèmes distribués avec des microservices",
    category: "Architecture Logicielle",
    niveau: "Avancé",
    photo: "https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg",
  },
  {
    id: 7,
    titre: "Machine Learning avec TensorFlow",
    description: "Construire des modèles de machine learning avancés",
    category: "Machine Learning",
    niveau: "Avancé",
    photo: "https://fimme.ma/wp-content/uploads/2023/02/Formation-e1706544507836.jpg",
  },
];

export default function Formations() {
  const [search, setSearch] = useState("");

  const filteredFormations = mockFormations.filter((f) =>
    `${f.titre} ${f.description} ${f.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Formations" />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Formations Code212 - Université Cadi Ayyad
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Découvrez les formations spécialement conçues pour les étudiants des
            établissements de l’Université Cadi Ayyad au sein du lab Code212.
          </p>
        </div>

        {/* 🔍 Barre de recherche */}
        <div className="mb-8 space-y-2">
          <Label htmlFor="search">Recherche</Label>
          <Input
            id="search"
            type="text"
            placeholder="Rechercher une formation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 📚 Formations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormations.length > 0 ? (
            filteredFormations.map((formation) => (
              <FormationCard
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
    </AppLayout>
  );
}
