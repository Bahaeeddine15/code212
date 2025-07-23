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
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=64&bold=true`;
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
          <div className="bg-gradient-to-r from-[#b13283] via-[#9f2d76] to-[#8e2869] rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <Card className="bg-gradient-to-r from-[#ffc000] to-[#ff8c00] border-0 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-white/80">Certificats obtenus</p>
                  </div>
                  <Medal className="h-10 w-10 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#726bb3] to-[#515dde] border-0 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stats.total_formations}</p>
                    <p className="text-sm text-white/80">Formations disponibles</p>
                  </div>
                  <ScrollText className="h-10 w-10 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#ff005b] to-[#c5027f] border-0 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stats.reservations_en_attente}</p>
                    <p className="text-sm text-white/80">
                      Réservation en attente
                    </p>
                  </div>
                  <ClipboardCheck className="h-10 w-10 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formations en cours */}
          <Card className="bg-white dark:bg-[#121214] border-l-4 border-l-[#3a2b6c]">
            <CardHeader>
              <CardTitle className="text-[#081f44] dark:text-white">
                Formations en cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formations.length > 0 ? formations.slice(0, 5).map((formation) => (
                <div
                  key={formation.id}
                  className="p-4 bg-[#f4f4f4] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#e0e0e0] dark:hover:bg-[#2a2a2a] transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-[#081f44] dark:text-white">
                      {formation.titre}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-[#3a2b6c] dark:text-white border border-[#3a2b6c]"
                    >
                      {formation.niveau}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formation.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs text-[#3a2b6c] bg-[#3a2b6c]/10 px-2 py-1 rounded">
                      {formation.category}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">
                  Aucune formation disponible
                </p>
              )}
            </CardContent>
          </Card>

          {/* Certificats & Événements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-[#121214] border-l-4 border-l-[#3a2b6c]">
              <CardHeader>
                <CardTitle className="text-[#081f44] dark:text-white">
                  Mes Certificats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certificats.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex justify-between items-center text-[#081f44] dark:text-white"
                  >
                    <span>{cert.title}</span>
                    <Link
                      href="#"
                      className="text-[#00adbc] dark:text-[#2CD3A3] text-sm hover:underline"
                    >
                      Télécharger
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#121214] border-l-4 border-l-[#3a2b6c]">
              <CardHeader>
                <CardTitle className="text-[#081f44] dark:text-white">
                  Événements à venir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {evenements.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-[#f4f4f4] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#e0e0e0] dark:hover:bg-[#2a2a2a] transition-all duration-300 hover:scale-105"
                  >
                    <h3 className="font-medium text-[#081f44] dark:text-white">
                      {event.titre}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {event.dateDebut} - {event.lieu}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
