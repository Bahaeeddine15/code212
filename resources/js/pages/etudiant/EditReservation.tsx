import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Reservation {
    id: number;
    nom: string;
    prenom: string;
    num_apogee: string;
    email: string;
    description: string;
    date_reservation: string;
    status: string;
}

interface Props {
    reservation: Reservation;
    [key: string]: any;
}

export default function EditReservation({ reservation }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom: reservation.nom,
        prenom: reservation.prenom,
        num_apogee: reservation.num_apogee,
        email: reservation.email,
        description: reservation.description,
        date_reservation: reservation.date_reservation,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('reservations.update', reservation.id));
    };

    return (
        <>
            <Head title="Modifier la réservation" />
            
            <div className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Modifier votre réservation</h1>
                        <p className="text-gray-600 mt-2">Modifiez les détails de votre demande de réservation</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informations de la réservation</CardTitle>
                            <CardDescription>
                                Réservation #{reservation.id} - Statut: {reservation.status === 'pending' ? 'En attente' : reservation.status}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nom">Nom *</Label>
                                        <Input
                                            id="nom"
                                            type="text"
                                            value={data.nom}
                                            onChange={(e) => setData('nom', e.target.value)}
                                            className={errors.nom ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="prenom">Prénom *</Label>
                                        <Input
                                            id="prenom"
                                            type="text"
                                            value={data.prenom}
                                            onChange={(e) => setData('prenom', e.target.value)}
                                            className={errors.prenom ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="num_apogee">Numéro Apogée *</Label>
                                        <Input
                                            id="num_apogee"
                                            type="text"
                                            value={data.num_apogee}
                                            onChange={(e) => setData('num_apogee', e.target.value)}
                                            className={errors.num_apogee ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.num_apogee && <p className="text-red-500 text-sm">{errors.num_apogee}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={errors.email ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_reservation">Date de réservation souhaitée *</Label>
                                    <Input
                                        id="date_reservation"
                                        type="date"
                                        value={data.date_reservation}
                                        onChange={(e) => setData('date_reservation', e.target.value)}
                                        className={errors.date_reservation ? 'border-red-500' : ''}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                    {errors.date_reservation && <p className="text-red-500 text-sm">{errors.date_reservation}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description de votre demande *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-red-500' : ''}
                                        placeholder="Décrivez votre demande de réservation..."
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Mise à jour...' : '✏️ Mettre à jour'}
                                    </Button>
                                    
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        🔙 Annuler
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">💡 Information importante</h3>
                        <p className="text-blue-700 text-sm">
                            Vous ne pouvez modifier votre réservation que si elle est encore en attente. 
                            Une fois approuvée ou rejetée, elle ne peut plus être modifiée.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
