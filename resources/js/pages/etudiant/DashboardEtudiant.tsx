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
      color: "bg-[#3a2b6c]",
      bgColor: "bg-[#3a2b6c]/10",
      textColor: "text-[#3a2b6c]",
    },
    {
      title: "Formations",
      value: formations.length.toString(),
      description: "Formations disponibles",
      icon: BookOpen,
      color: "bg-[#3a2b6c]",
      bgColor: "bg-[#3a2b6c]/10",
      textColor: "text-[#3a2b6c]",
    },
    {
      title: "Réservations",
      value: "1",
      description: "Réservation en attente",
      icon: MapPin,
      color: "bg-[#3a2b6c]",
      bgColor: "bg-[#3a2b6c]/10",
      textColor: "text-[#3a2b6c]",
    },
  ]

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* User Profile Header */}
            <div className="bg-gradient-to-r from-[#b13283] via-[#9f2d76] to-[#8e2869] rounded-xl p-5 text-white hover:shadow-lg">
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
                <Card key={index} className={`${stat.bgColor} border-transparent hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.description}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "formations":
        return (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-[#3a2b6c] bg-white">
              <CardHeader>
                <CardTitle className="text-[#081f44]">Mes Formations</CardTitle>
                <CardDescription>Suivez vos formations en cours et à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <Dashboard formations={formations} embedded={true} />
              </CardContent>
            </Card>
          </div>
        )

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

            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : "text-purple-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* User profile at bottom */}
          <div className="absolute bottom-0 w-64 p-6 border-t border-purple-600">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-purple-600 text-white">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-purple-200">Étudiant</p>
              </div>
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

        {/* Main content */}
        <div className="flex-1 p-8">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  )
}
