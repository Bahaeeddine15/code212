import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    maxAttendees: number;
    category: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface Props {
    event: Event;
}

export default function EventEdit({ event }: Props) {
    const [form, setForm] = useState({
    title: event.title ?? '',
    description: event.description ?? '',
    start_date: event.start_date ?? '',
    end_date: event.end_date ?? '',
    location: event.location ?? '',
    maxAttendees: event.maxAttendees?.toString() ?? '',
    category: event.category ?? '',
    status: event.status ?? 'upcoming',
});
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/events/${event.id}`, { ...form, max_attendees: parseInt(form.maxAttendees) }, {
            onError: err => setErrors(err),
            onSuccess: () => router.visit('/events'),
        });
    };

    return (
        <AppLayout>
            <Head title="Modifier l'événement" />
            <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                <a href="/events" className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux événements
                </a>
                <h1 className="text-2xl font-bold mb-6">Modifier l'événement</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Titre</label>
                        <input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)} className="w-full border rounded px-3 py-2" required />
                        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} className="w-full border rounded px-3 py-2" rows={3} required />
                        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Date de début</label>
                        <input type="date" value={form.start_date} onChange={e => handleChange('start_date', e.target.value)} className="w-full border rounded px-3 py-2" required />
                        {errors.start_date && <p className="text-red-600 text-sm">{errors.start_date}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Date de fin</label>
                        <input type="date" value={form.end_date} onChange={e => handleChange('end_date', e.target.value)} className="w-full border rounded px-3 py-2" required />
                        {errors.end_date && <p className="text-red-600 text-sm">{errors.end_date}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Lieu</label>
                        <input type="text" value={form.location} onChange={e => handleChange('location', e.target.value)} className="w-full border rounded px-3 py-2" required />
                        {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Nombre max de participants</label>
                        <input type="number" value={form.maxAttendees} onChange={e => handleChange('maxAttendees', e.target.value)} className="w-full border rounded px-3 py-2" min={1} required />
                        {errors.maxAttendees && <p className="text-red-600 text-sm">{errors.maxAttendees}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Catégorie</label>
                        <select value={form.category} onChange={e => handleChange('category', e.target.value)} className="w-full border rounded px-3 py-2">
                            <option value="Conférence">Conférence</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Séminaire">Séminaire</option>
                            <option value="Compétition">Compétition</option>
                        </select>
                        {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Sauvegarder
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
