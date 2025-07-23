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
<<<<<<< HEAD
      title: "Certificats",
      value: "12",
      description: "Certificats obtenus",
      icon: Award,
      bgColor: "bg-gradient-to-r from-[#ffc000] to-[#ff8c00]", 
      textColor: "text-white",
      iconColor: "text-white/80",
    },
    {
      title: "Formations",
      value: formations.length.toString(),
      description: "Formations disponibles",
      icon: BookOpen,
      bgColor: "bg-gradient-to-r from-[#726bb3] to-[#515dde]", // Vert électrique
      textColor: "text-white",
      iconColor: "text-white/80",
    },
    {
      title: "Réservations",
      value: "1",
      description: "Réservation en attente",
      icon: MapPin,
      bgColor: "bg-gradient-to-r from-[#ff005b] to-[#c5027f]", // Jaune/Or
      textColor: "text-white",
      iconColor: "text-white/80",
=======
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
>>>>>>> edbb3d0b2f55106622f63a3843d7d94ab4b96e0d
    },
  ],
  certificats: [
    { id: 1, title: "Python Essentials" },
    { id: 2, title: "JavaScriot Basics" },
  ],

<<<<<<< HEAD
  const renderDashboardContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* User Profile Header */}
            <div className="bg-gradient-to-r from-[#b13283] via-[#9f2d76] to-[#8e2869] rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 ">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="bg-[#8e2869] text-white text-xl font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.name.toUpperCase()}</h1>
                  <p className="text-white/90">{user.university}</p>
                  <p className="text-white/70 text-sm">
                    {user.studentId} - {user.department}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} 
                      className={`${stat.bgColor} border-0 hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                        <p className={`text-xs ${stat.iconColor} font-medium`}>{stat.description}</p>
                      </div>
                      <div className="ml-2">
                        <stat.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-y-transparent border-r-transparent border-l-4 border-l-[#3a2b6c]">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-[#3a2b6c]" />
                    <span className="text-black">Certificats Récents</span>
                  </CardTitle>
                  <CardDescription>Vos derniers certificats obtenus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-[#081f44]">
                  {[
                    { name: "JavaScript Avancé", date: "15 Nov 2024", status: "Complété" },
                    { name: "React Development", date: "10 Nov 2024", status: "Complété" },
                    { name: "Node.js Fundamentals", date: "5 Nov 2024", status: "En cours" },
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#f4f4f4] rounded-lg hover:bg-[#e0e0e0] transition-all duration-300 hover:scale-105">
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-gray-500">{cert.date}</p>
                      </div>
                      <Badge
                        variant={cert.status === "Complété" ? "default" : "secondary"}
                        className={cert.status === "Complété" ? "bg-[#3a2b6c] text-white" : "bg-transparent text-[#3a2b6c] border border-[#3a2b6c]"}
                      >
                        {cert.status}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#3a2b6c] text-[#3a2b6c] hover:bg-[#3a2b6c] hover:text-white bg-transparent"
                  >
                    Voir plus →
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#3a2b6c] border-y-transparent border-r-transparent bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-[#3a2b6c]" />
                    <span className="text-black">Prochaines Formations</span>
                  </CardTitle>
                  <CardDescription>Vos formations à venir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-[#081f44]">
                  {[
                    { name: "Python pour Data Science", date: "20 Nov 2024", participants: "45" },
                    { name: "Machine Learning Basics", date: "25 Nov 2024", participants: "32" },
                    { name: "Web Development", date: "30 Nov 2024", participants: "28" },
                  ].map((formation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#f4f4f4] rounded-lg hover:bg-[#e0e0e0] transition-all duration-300 hover:scale-105">
                      <div>
                        <p className="font-medium">{formation.name}</p>
                        <p className="text-sm text-gray-500 flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formation.date}</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{formation.participants}</span>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#3a2b6c] text-[#3a2b6c] hover:bg-[#3a2b6c] hover:text-white bg-transparent"
                  >
                    Voir plus →
                  </Button>
                </CardContent>
              </Card>
            </div>
          

      case "profile":
        return (
          <Card className="border-l-4 border-l-[#3a2b6c] bg-white">
            <CardHeader>
              <CardTitle className="text-[#081f44]">Informations du Profil</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nom</label>
                    <p className="text-gray-600">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <Button className="text-white bg-[#3a2b6c] hover:bg-[#3a2b6c]/90">
                  Modifier le profil
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "certificates":
        return (
          <Card className="border-l-4 border-l-[#3a2b6c] bg-white">
            <CardHeader>
              <CardTitle className="text-[#081f44]">Mes Certificats</CardTitle>
              <CardDescription>Consultez tous vos certificats obtenus</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Liste des certificats à venir...</p>
            </CardContent>
          </Card>
        )

      case "booking":
        return (
          <Card className="border-l-4 border-l-[#3a2b6c] bg-white">
            <CardHeader>
              <CardTitle className="text-[#081f44]">Réservation de Local</CardTitle>
              <CardDescription>Réservez un local pour vos activités</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Interface de réservation à venir...</p>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#3a2b6c] text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <GraduationCap className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Student Portal</h1>
                <p className="text-sm text-purple-200">Dashboard</p>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">Student Portal</h2>
              <p className="text-[#ffc000] text-sm">Dashboard</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-purple-200 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Quitter
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-[#f4f4f4] text-[#525252] shadow-lg"
                    : "text-gray-300 hover:bg-[#ae3181] hover:text-white transition-all duration-300 hover:scale-105"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-[#452ff5]/20 mt-auto sticky bottom-0 rounded-b-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-[#f4f4f4] text-[#3a2b6c] font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user.name}</p>
              <p className="text-[#ffc000] text-sm truncate">Étudiant</p>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="w-full bg-[#c5027f] hover:bg-red-600 text-white"
            onClick={() => console.log("Logout")}
=======
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
        "Initiez-vous aux bases de l’intelligence artificielle et ses applications.",
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

      <div className="flex flex-col gap-8 p-8 bg-white dark:bg-[#0A1F44] text-gray-900 dark:text-white font-raleway">
        <div className="space-y-6">
          {/* Header Profile Section */}
          <div className="bg-gradient-to-r from-[#b13283] via-[#9f2d76] to-[#8e2869] rounded-xl p-5 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <img
                src={mockUser.avatarUrl}
                alt={mockUser.name}
                className="h-16 w-16 rounded-full border-2 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                <p className="text-white/90">{mockUser.ecole}</p>
                <p className="text-white/70 text-sm">{mockUser.email}</p>
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
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-white/80">Formations en cours</p>
                  </div>
                  <ScrollText className="h-10 w-10 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#ff005b] to-[#c5027f] border-0 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">1</p>
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
                  <Progress value={formation.progression} />
                </div>
              ))}
            </CardContent>
          </Card>

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
