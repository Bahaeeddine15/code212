import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { ScrollText, Medal, CalendarDays, ClipboardCheck } from "lucide-react";
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Étudiant", href: "/dashboard" },
];

const mockUser = {
  name: "David Ben",
  email: "test@example.com",
  ecole: "ENSA Marrakech",
  avatarUrl:
    "https://ui-avatars.com/api/?name=David+B&background=0D8ABC&color=fff",
};

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

export default function Dashboard() {
  const {
    formations,
    certificats,

    evenements,
  } = mockData;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Étudiant" />

      <div className="flex flex-col gap-8 p-6 bg-white dark:bg-[#0A1F44] text-gray-900 dark:text-white font-raleway">
        {/* 👤 User Profile Info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-[#121c3a] shadow-sm">
          <img
            src={mockUser.avatarUrl}
            alt="Avatar"
            className="w-14 h-14 rounded-full border-2 border-yellow-400 dark:border-[#ffc000]"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Salut ,{" "}
              <span className="text-blue-600 dark:text-[#61dafb]">
                {mockUser.name}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              École : {mockUser.ecole}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {mockUser.email}
            </p>
          </div>
        </div>

        {/* 🧠 Première ligne : infos essentielles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Formations en cours */}
          <Card className="bg-white dark:bg-[#121214] border-l-4 border-l-[#3a2b6c]">
            <CardHeader>
              <CardTitle className="text-[#081f44] dark:text-white">
                Formations en cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formations.map((formation) => (
                <div
                  key={formation.id}
                  className="p-4 bg-[#f4f4f4] dark:bg-[#1e1e1e] rounded-lg hover:bg-[#e0e0e0] dark:hover:bg-[#2a2a2a] transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-[#081f44] dark:text-white">
                      {formation.nom}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-[#3a2b6c] dark:text-white border border-[#3a2b6c]"
                    >
                      {formation.niveau}
                    </Badge>
                  </div>
                  <Progress value={formation.progression} className="h-2" />
                </div>
              ))}
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
