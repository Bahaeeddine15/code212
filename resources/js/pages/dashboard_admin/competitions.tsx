import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    Trophy, 
    Users, 
    Calendar, 
    MapPin, 
    Medal, 
    UserPlus, 
    FileText, 
    Download,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';
import { useState } from 'react';

// Types
interface Competition {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    registrations: number;
    maxParticipants: number;
    status: 'Ouvert' | 'Complet' | 'Fermé';
    deadline: string;
    description?: string;
}

interface Registration {
    id: number;
    competitionId: number;
    participantName: string;
    email: string;
    phone: string;
    category: string;
    club: string;
    registrationDate: string;
    status: 'Confirmé' | 'En attente' | 'Refusé';
    paymentStatus: 'Payé' | 'En attente' | 'Refusé';
    notes?: string;
}

// Données simulées initiales
const initialCompetitions: Competition[] = [
    {
        id: 1,
        title: "Championnat National 2024",
        date: "2024-02-15",
        location: "Stade Olympique",
        category: "Senior",
        registrations: 45,
        maxParticipants: 50,
        status: "Ouvert",
        deadline: "2024-02-01",
        description: "Championnat national de la discipline"
    },
    {
        id: 2,
        title: "Tournoi Junior",
        date: "2024-03-10",
        location: "Centre Sportif",
        category: "Junior",
        registrations: 32,
        maxParticipants: 40,
        status: "Ouvert",
        deadline: "2024-02-25",
        description: "Tournoi pour les jeunes talents"
    },
    {
        id: 3,
        title: "Coupe d'Excellence",
        date: "2024-01-20",
        location: "Arena Principale",
        category: "Elite",
        registrations: 20,
        maxParticipants: 20,
        status: "Complet",
        deadline: "2024-01-15",
        description: "Compétition pour les athlètes d'élite"
    },
];

const initialRegistrations: Registration[] = [
    {
        id: 1,
        competitionId: 1,
        participantName: "Jean Dupont",
        email: "jean.dupont@email.com",
        phone: "06 12 34 56 78",
        category: "Senior",
        club: "Club Sportif Paris",
        registrationDate: "2024-01-15",
        status: "Confirmé",
        paymentStatus: "Payé"
    },
    {
        id: 2,
        competitionId: 1,
        participantName: "Marie Martin",
        email: "marie.martin@email.com",
        phone: "06 98 76 54 32",
        category: "Senior",
        club: "AS Lyon",
        registrationDate: "2024-01-18",
        status: "En attente",
        paymentStatus: "En attente"
    },
    {
        id: 3,
        competitionId: 2,
        participantName: "Pierre Moreau",
        email: "pierre.moreau@email.com",
        phone: "06 11 22 33 44",
        category: "Junior",
        club: "Jeunes Talents",
        registrationDate: "2024-01-20",
        status: "Confirmé",
        paymentStatus: "Payé"
    },
];

export default function CompetitionsPage() {
    // State management
    const [competitions, setCompetitions] = useState<Competition[]>(initialCompetitions);
    const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
    const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showCompetitionForm, setShowCompetitionForm] = useState(false);
    const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
    const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Form states
    const [formData, setFormData] = useState({
        competitionId: '',
        participantName: '',
        email: '',
        phone: '',
        category: '',
        club: '',
        notes: ''
    });

    const [competitionFormData, setCompetitionFormData] = useState({
        title: '',
        date: '',
        location: '',
        category: '',
        maxParticipants: '',
        deadline: '',
        description: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCompetitionInputChange = (field: string, value: string) => {
        setCompetitionFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRegistration) {
            // Update existing registration
            setRegistrations(prev => prev.map(reg => 
                reg.id === editingRegistration.id 
                    ? { 
                        ...reg, 
                        ...formData,
                        competitionId: parseInt(formData.competitionId),
                        registrationDate: editingRegistration.registrationDate
                    }
                    : reg
            ));
            setEditingRegistration(null);
        } else {
            // Add new registration
            const newRegistration: Registration = {
                id: Math.max(...registrations.map(r => r.id)) + 1,
                competitionId: parseInt(formData.competitionId),
                participantName: formData.participantName,
                email: formData.email,
                phone: formData.phone,
                category: formData.category,
                club: formData.club,
                registrationDate: new Date().toISOString().split('T')[0],
                status: 'En attente',
                paymentStatus: 'En attente',
                notes: formData.notes
            };
            setRegistrations(prev => [...prev, newRegistration]);
            
            // Update competition registration count
            setCompetitions(prev => prev.map(comp => 
                comp.id === parseInt(formData.competitionId)
                    ? { ...comp, registrations: comp.registrations + 1 }
                    : comp
            ));
        }
        
        setShowRegistrationForm(false);
        setFormData({
            competitionId: '',
            participantName: '',
            email: '',
            phone: '',
            category: '',
            club: '',
            notes: ''
        });
    };

    const handleCompetitionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCompetition) {
            // Update existing competition
            setCompetitions(prev => prev.map(comp => 
                comp.id === editingCompetition.id 
                    ? { 
                        ...comp, 
                        ...competitionFormData,
                        maxParticipants: parseInt(competitionFormData.maxParticipants),
                        status: comp.status
                    }
                    : comp
            ));
            setEditingCompetition(null);
        } else {
            // Add new competition
            const newCompetition: Competition = {
                id: Math.max(...competitions.map(c => c.id)) + 1,
                title: competitionFormData.title,
                date: competitionFormData.date,
                location: competitionFormData.location,
                category: competitionFormData.category,
                maxParticipants: parseInt(competitionFormData.maxParticipants),
                deadline: competitionFormData.deadline,
                description: competitionFormData.description,
                registrations: 0,
                status: 'Ouvert'
            };
            setCompetitions(prev => [...prev, newCompetition]);
        }
        
        setShowCompetitionForm(false);
        setCompetitionFormData({
            title: '',
            date: '',
            location: '',
            category: '',
            maxParticipants: '',
            deadline: '',
            description: ''
        });
    };

    const deleteRegistration = (id: number) => {
        const registration = registrations.find(r => r.id === id);
        if (registration) {
            setRegistrations(prev => prev.filter(r => r.id !== id));
            // Update competition registration count
            setCompetitions(prev => prev.map(comp => 
                comp.id === registration.competitionId
                    ? { ...comp, registrations: comp.registrations - 1 }
                    : comp
            ));
        }
    };

    const deleteCompetition = (id: number) => {
        setCompetitions(prev => prev.filter(c => c.id !== id));
        setRegistrations(prev => prev.filter(r => r.competitionId !== id));
    };

    const updateRegistrationStatus = (id: number, status: Registration['status']) => {
        setRegistrations(prev => prev.map(reg => 
            reg.id === id ? { ...reg, status } : reg
        ));
    };

    const updatePaymentStatus = (id: number, paymentStatus: Registration['paymentStatus']) => {
        setRegistrations(prev => prev.map(reg => 
            reg.id === id ? { ...reg, paymentStatus } : reg
        ));
    };

    const openEditRegistration = (registration: Registration) => {
        setEditingRegistration(registration);
        setFormData({
            competitionId: registration.competitionId.toString(),
            participantName: registration.participantName,
            email: registration.email,
            phone: registration.phone,
            category: registration.category,
            club: registration.club,
            notes: registration.notes || ''
        });
        setShowRegistrationForm(true);
    };

    const openEditCompetition = (competition: Competition) => {
        setEditingCompetition(competition);
        setCompetitionFormData({
            title: competition.title,
            date: competition.date,
            location: competition.location,
            category: competition.category,
            maxParticipants: competition.maxParticipants.toString(),
            deadline: competition.deadline,
            description: competition.description || ''
        });
        setShowCompetitionForm(true);
    };

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ouvert':
                return 'bg-green-100 text-green-800';
            case 'Complet':
                return 'bg-red-100 text-red-800';
            case 'Fermé':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getParticipantStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmé':
                return 'bg-green-100 text-green-800';
            case 'En attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'Refusé':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    // Filtered data
    const filteredRegistrations = registrations.filter(reg => {
        const matchesCompetition = selectedCompetition ? reg.competitionId === selectedCompetition : true;
        const matchesSearch = searchTerm === '' || 
            reg.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.club.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
        return matchesCompetition && matchesSearch && matchesStatus;
    });

    const filteredCompetitions = competitions.filter(comp => {
        const matchesSearch = searchTerm === '' || 
            comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comp.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="Inscription aux compétitions" />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inscription aux compétitions</h1>
                        <p className="text-muted-foreground">
                            Gérez les inscriptions et les participants aux compétitions
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            onClick={() => setShowCompetitionForm(true)}
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                            <Trophy className="mr-2 h-4 w-4" />
                            Nouvelle compétition
                        </Button>
                        <Button 
                            onClick={() => setShowRegistrationForm(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Nouvelle inscription
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Rechercher par nom, email, club..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filtrer par statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="Confirmé">Confirmé</SelectItem>
                                <SelectItem value="En attente">En attente</SelectItem>
                                <SelectItem value="Refusé">Refusé</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Compétitions actives</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{competitions.filter(c => c.status === 'Ouvert').length}</div>
                            <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total inscriptions</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{registrations.length}</div>
                            <p className="text-xs text-muted-foreground">+15% ce mois</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inscriptions confirmées</CardTitle>
                            <Medal className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {registrations.filter(r => r.status === 'Confirmé').length}
                            </div>
                            <p className="text-xs text-muted-foreground">85% du total</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Prochaine compétition</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">jours restants</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Competitions List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Compétitions disponibles</CardTitle>
                        <CardDescription>
                            Liste des compétitions ouvertes aux inscriptions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredCompetitions.map((competition) => (
                                <div 
                                    key={competition.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                        selectedCompetition === competition.id 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setSelectedCompetition(competition.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold">{competition.title}</h3>
                                                <Badge className={getStatusColor(competition.status)}>
                                                    {competition.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {competition.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {competition.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    {competition.registrations}/{competition.maxParticipants}
                                                </div>
                                            </div>
                                            {competition.description && (
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {competition.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditCompetition(competition);
                                                }}
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Éditer
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétition ?')) {
                                                        deleteCompetition(competition.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Supprimer
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Registrations Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Inscriptions</CardTitle>
                                <CardDescription>
                                    {selectedCompetition 
                                        ? `Participants pour ${competitions.find(c => c.id === selectedCompetition)?.title}`
                                        : 'Toutes les inscriptions'
                                    }
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Exporter
                                </Button>
                                {selectedCompetition && (
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setSelectedCompetition(null)}
                                    >
                                        Voir tout
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Participant</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Club</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Paiement</TableHead>
                                    <TableHead>Date d'inscription</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRegistrations.map((registration) => (
                                    <TableRow key={registration.id}>
                                        <TableCell className="font-medium">
                                            {registration.participantName}
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="text-sm">{registration.email}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {registration.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{registration.club}</TableCell>
                                        <TableCell>{registration.category}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Select 
                                                    value={registration.status} 
                                                    onValueChange={(value) => updateRegistrationStatus(registration.id, value as Registration['status'])}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Confirmé">Confirmé</SelectItem>
                                                        <SelectItem value="En attente">En attente</SelectItem>
                                                        <SelectItem value="Refusé">Refusé</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Select 
                                                    value={registration.paymentStatus} 
                                                    onValueChange={(value) => updatePaymentStatus(registration.id, value as Registration['paymentStatus'])}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Payé">Payé</SelectItem>
                                                        <SelectItem value="En attente">En attente</SelectItem>
                                                        <SelectItem value="Refusé">Refusé</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                        <TableCell>{registration.registrationDate}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => openEditRegistration(registration)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
                                                            deleteRegistration(registration.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Registration Form Modal */}
                {showRegistrationForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-lg">
                            <CardHeader>
                                <CardTitle>
                                    {editingRegistration ? 'Modifier l\'inscription' : 'Nouvelle inscription'}
                                </CardTitle>
                                <CardDescription>
                                    {editingRegistration ? 'Modifier les informations du participant' : 'Inscrire un participant à une compétition'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="competition">Compétition</Label>
                                        <Select 
                                            value={formData.competitionId} 
                                            onValueChange={(value) => handleInputChange('competitionId', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une compétition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {competitions.filter(c => c.status === 'Ouvert').map((comp) => (
                                                    <SelectItem key={comp.id} value={comp.id.toString()}>
                                                        {comp.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="participantName">Nom du participant</Label>
                                        <Input
                                            id="participantName"
                                            value={formData.participantName}
                                            onChange={(e) => handleInputChange('participantName', e.target.value)}
                                            placeholder="Jean Dupont"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="jean.dupont@email.com"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            placeholder="06 12 34 56 78"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Catégorie</Label>
                                        <Select onValueChange={(value) => handleInputChange('category', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="junior">Junior</SelectItem>
                                                <SelectItem value="senior">Senior</SelectItem>
                                                <SelectItem value="elite">Elite</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="club">Club</Label>
                                        <Input
                                            id="club"
                                            value={formData.club}
                                            onChange={(e) => handleInputChange('club', e.target.value)}
                                            placeholder="Nom du club"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes (optionnel)</Label>
                                        <Textarea
                                            id="notes"
                                            value={formData.notes}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('notes', e.target.value)}
                                            placeholder="Informations complémentaires..."
                                            rows={3}
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => {
                                                setShowRegistrationForm(false);
                                                setEditingRegistration(null);
                                                setFormData({
                                                    competitionId: '',
                                                    participantName: '',
                                                    email: '',
                                                    phone: '',
                                                    category: '',
                                                    club: '',
                                                    notes: ''
                                                });
                                            }}
                                        >
                                            Annuler
                                        </Button>
                                        <Button type="submit">
                                            {editingRegistration ? 'Modifier' : 'Inscrire'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Competition Form Modal */}
                {showCompetitionForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-lg">
                            <CardHeader>
                                <CardTitle>
                                    {editingCompetition ? 'Modifier la compétition' : 'Nouvelle compétition'}
                                </CardTitle>
                                <CardDescription>
                                    {editingCompetition ? 'Modifier les informations de la compétition' : 'Créer une nouvelle compétition'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleCompetitionSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Titre</Label>
                                        <Input
                                            id="title"
                                            value={competitionFormData.title}
                                            onChange={(e) => handleCompetitionInputChange('title', e.target.value)}
                                            placeholder="Championnat National 2024"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={competitionFormData.date}
                                                onChange={(e) => handleCompetitionInputChange('date', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="deadline">Date limite</Label>
                                            <Input
                                                id="deadline"
                                                type="date"
                                                value={competitionFormData.deadline}
                                                onChange={(e) => handleCompetitionInputChange('deadline', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Lieu</Label>
                                        <Input
                                            id="location"
                                            value={competitionFormData.location}
                                            onChange={(e) => handleCompetitionInputChange('location', e.target.value)}
                                            placeholder="Stade Olympique"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Catégorie</Label>
                                            <Select 
                                                value={competitionFormData.category} 
                                                onValueChange={(value) => handleCompetitionInputChange('category', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Junior">Junior</SelectItem>
                                                    <SelectItem value="Senior">Senior</SelectItem>
                                                    <SelectItem value="Elite">Elite</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="maxParticipants">Participants max</Label>
                                            <Input
                                                id="maxParticipants"
                                                type="number"
                                                value={competitionFormData.maxParticipants}
                                                onChange={(e) => handleCompetitionInputChange('maxParticipants', e.target.value)}
                                                placeholder="50"
                                                min="1"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={competitionFormData.description}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleCompetitionInputChange('description', e.target.value)}
                                            placeholder="Description de la compétition..."
                                            rows={3}
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => {
                                                setShowCompetitionForm(false);
                                                setEditingCompetition(null);
                                                setCompetitionFormData({
                                                    title: '',
                                                    date: '',
                                                    location: '',
                                                    category: '',
                                                    maxParticipants: '',
                                                    deadline: '',
                                                    description: ''
                                                });
                                            }}
                                        >
                                            Annuler
                                        </Button>
                                        <Button type="submit">
                                            {editingCompetition ? 'Modifier' : 'Créer'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
