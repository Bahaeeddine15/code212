import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { ScrollText, Medal, CalendarDays, ClipboardCheck } from "lucide-react";
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Stats {
  total_formations: number;
  total_reservations: number;
  reservations_en_attente: number;
  reservations_approuvees: number;
}

interface Formation {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: string;
  photo: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  ecole?: string;
  telephone?: string;
  ville?: string;
  student_id?: string;
  departement?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

interface Props {
  stats: Stats;
  formations: Formation[];
  user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
];

const mockData = {
  formations: [
    {
      id: 1,
      nom: "React Avancé",
      niveau: "Intermédiaire",
      enCours: true,
      progression: 60,
    },
    {
      id: 2,
      nom: "Laravel API",
      niveau: "Avancé",
      enCours: false,
      progression: 100,
    },
    {
      id: 3,
      nom: "TypeScript",
      niveau: "Avancé",
      enCours: true,
      progression: 17,
    },
  ],
  certificats: [
    { id: 1, title: "Python Essentials" },
    { id: 2, title: "JavaScript Basics" },
  ],

  evenements: [
    {
      id: 1,
      titre: "Hackathon Étudiant",
      dateDebut: "2025-07-20",
      lieu: "Campus Casablanca",
      description:
        "Un défi en équipe pour créer une application innovante en 24h.",
    },
    {
      id: 2,
      titre: "Webinar Photoshop",
      dateDebut: "2025-07-22",
      lieu: "En ligne",
      description:
        "Atelier interactif pour apprendre les bases du design graphique.",
    },
    {
      id: 3,
      titre: "Atelier Robotique",
      dateDebut: "2025-07-25",
      lieu: "Bibliothèque Cadi Ayyad",
      description: "Construisez et programmez votre propre robot avec Arduino.",
    },
    {
      id: 4,
      titre: "Découverte de l'IA",
      dateDebut: "2025-08-01",
      lieu: "Bibliothèque Cadi Ayyad",
      description:
        "Initiez-vous aux bases de l'intelligence artificielle et ses applications.",
    },
  ],
};

export default function Dashboard({ stats, formations, user }: Props) {
  // Générer l'URL de l'avatar avec les initiales de l'utilisateur
  const getAvatarUrl = (user: User) => {
    if (user.avatar_url) {
      return user.avatar_url;
    }
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a2b6c&color=fff&size=64&bold=true`;
  };

  const {
    certificats,
    evenements,
  } = mockData;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Étudiant" />

      <div className="flex flex-col gap-8 p-8 bg-white dark:bg-[#0A1F44] text-gray-900 dark:text-white font-raleway">
        <div className="space-y-6">
          {/* Header Profile Section */}
          <div className="bg-[#3a2b6c] rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:scale-102">
            <div className="flex items-center space-x-4">
              <img
                src={getAvatarUrl(user)}
                alt={user.name}
                className="h-16 w-16 rounded-full border-2 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-white/90">{user.ecole || 'École non renseignée'}</p>
                <p className="text-white/70 text-sm">{user.email}</p>
                {user.student_id && (
                  <p className="text-white/70 text-xs">ID: {user.student_id}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <Card className="bg-gradient-to-br from-[#c5027f] to-[#ff005b] border-0 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-3 flex justify-center items-center">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-xl font-bold text-white">12</p>
                    <p className="text-xs text-white/80">Certificats obtenus</p>
                  </div>
                  <Medal className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#515dde] to-[#726bb3] border-0 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-3 flex justify-center items-center">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-xl font-bold text-white">{stats.total_formations}</p>
                    <p className="text-xs text-white/80">Formations disponibles</p>
                  </div>
                  <ScrollText className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#00a87e] to-[#2cd3a3] border-0 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-3 flex justify-center items-center">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-xl font-bold text-white">{stats.reservations_en_attente}</p>
                    <p className="text-xs text-white/80">
                      Réservation en attente
                    </p>
                  </div>
                  <ClipboardCheck className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 🧠 Première ligne : infos essentielles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formations en cours */}
          <Card className="bg-white dark:bg-[#121214] transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#081f44] dark:text-white text-lg font-semibold">
                Formations en cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formations.length > 0 ? formations.slice(0, 5).map((formation) => (
                <div
                  key={formation.id}
                  className="p-3 bg-[#f8f9fa] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer group border-r-4 border-r-[#ff8500]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#081f44] dark:text-white text-sm group-hover:text-[#ff8500] transition-colors">
                      {formation.titre}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {formation.niveau}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {formation.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#ff8500] rounded-full"></div>
                    <span className="text-xs text-gray-500">{formation.category}</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">Aucune formation disponible</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Événements */}
          <Card className="bg-white dark:bg-[#121214] transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#081f44] dark:text-white text-lg font-semibold">
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {evenements.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-[#f8f9fa] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer group border-r-4 border-r-[#6366f1]"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#081f44] dark:text-white text-sm group-hover:text-[#6366f1] transition-colors">
                        {event.titre}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {event.dateDebut} • {event.lieu}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 ml-3.5">
                    {event.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
