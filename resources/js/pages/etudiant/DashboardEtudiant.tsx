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
      id: 2,
      nom: "Laravel API",
      niveau: "Avancé",
      enCours: true,
      progression: 17,
    },
  ],
  certificats: [
    { id: 1, title: "Python Essentials" },
    { id: 2, title: "JavaScriot Basics" },
  ],

  evenements: [
  {
    id: 1,
    titre: "Hackathon Étudiant",
    dateDebut: "2025-07-20",
    lieu: "Campus Casablanca",
    description: "Un défi en équipe pour créer une application innovante en 24h.",
  },
  {
    id: 2,
    titre: "Webinar Photoshop",
    dateDebut: "2025-07-22",
    lieu: "En ligne",
    description: "Atelier interactif pour apprendre les bases du design graphique.",
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
    description: "Initiez-vous aux bases de l’intelligence artificielle et ses applications.",
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
          <DashboardCard
            title="Cours en cours"
            icon={
              <ScrollText className="w-5 h-5 text-green-500 dark:text-[#00e87e]" />
            }
          >
            {formations
              .filter((f) => f.enCours)
              .map((f) => (
                <div key={f.id} className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{f.nom}</span>
                    <Badge variant="outline">Niveau {f.niveau}</Badge>
                  </div>
                  <Progress value={f.progression} className="h-2" />
                </div>
              ))}
          </DashboardCard>

          {/* Certificats */}
          <DashboardCard
            title="Mes Certificats"
            icon={
              <Medal className="w-5 h-5 text-pink-600 dark:text-[#c5027f]" />
            }
          >
            {certificats.map((cert) => (
              <div key={cert.id} className="flex justify-between text-sm">
                <span>{cert.title}</span>
                <a
                  href={`/certificats/${cert.id}/download`}
                  className="text-cyan-400 hover:underline"
                >
                  Télécharger
                </a>
              </div>
            ))}
          </DashboardCard>

          {/* Réservations */}
          <DashboardCard
            title="Réservations"
            icon={
              <ClipboardCheck className="w-5 h-5 text-purple-700 dark:text-[#6701e6]" />
            }
          >
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              Réservez votre place pour les formations, conférences ou sessions
              de coaching.
            </p>
            <Link href="/reservations">
              <Button className="mt-3 bg-blue-500 text-white hover:bg-blue-400 dark:bg-[#007bff] dark:text-white">
                Réserver une session
              </Button>
            </Link>
          </DashboardCard>
        </div>

        {/* 📅 Événements à venir */}
        <section>
  <h2 className="text-xl font-semibold font-montserrat flex items-center gap-2 text-teal-500 dark:text-[#2CD3A3]">
    <CalendarDays className="w-5 h-5" /> Formations à la Bibliothèque Cadi Ayyad 📚
  </h2>

  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {evenements
      .filter((e) =>
        e.lieu.toLowerCase().includes("bibliothèque cadi ayyad")
      )
      .map((e) => (
        <div
          key={e.id}
          className="rounded-xl bg-gray-100 dark:bg-[#1d2b4f] p-4 shadow-sm border border-gray-200 dark:border-[#2b3d70] hover:shadow-lg transition-shadow"
        >
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1">
            📘 {e.titre}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            📅 {e.dateDebut}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
            📍 {e.lieu}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {e.description}
          </p>
        </div>
      ))}
  </div>
</section>


      </div>
    </AppLayout>
  );
}

function DashboardCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-[#300069] rounded-2xl shadow-md hover:shadow-purple-700/30 transition-transform hover:scale-[1.01]">
      <CardHeader className="flex items-center gap-2">
        {icon}
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-800 dark:text-gray-300 space-y-2">
        {children}
      </CardContent>
    </Card>
  );
}
