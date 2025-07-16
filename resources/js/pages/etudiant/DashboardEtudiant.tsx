"use client"

import { useState } from "react"
import { User, Award, BookOpen, MapPin, LogOut, GraduationCap, Calendar, Clock, FileText, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Dashboard from "../formations/Dashboard"
import { Link } from '@inertiajs/react';

// Interface pour les données de formation
interface Formation {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: number;
  photo: string;
  created_at: string;
  updated_at: string;
}

interface StudentDashboardProps {
  formations?: Formation[];
}

export default function StudentDashboard({ formations = [] }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")

  // Example user data
  const user = {
    name: "Mely Mely",
    email: "mely.mely@uca.ac.ma",
    studentId: "2024001",
    university: "UNIVERSITÉ CADI AYYAD DE MARRAKECH",
    department: "GCDSTE - ENSA MARRAKECH",
  }

  // Navigation items
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: GraduationCap },
    { id: "profile", label: "Profil", icon: User },
    { id: "certificates", label: "Certificats", icon: Award },
    { id: "formations", label: "Formations", icon: BookOpen },
    { id: "booking", label: "Réserver local", icon: MapPin },
  ]

  // Stats data
  const stats = [
    {
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
    },
  ]

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
          >
            <LogOut className="h-4 w-4 mr-2" />
            Quitter
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto ml-72">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm mx-6 mt-3 px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-[#300069]">
            <GraduationCap className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{renderDashboardContent()}</div>
      </main>
    </div>
  )
}
