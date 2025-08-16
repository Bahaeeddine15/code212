import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';

interface Formation {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    category: string;
}

interface Props {
    formation: Formation;
}

export default function FormationEdit({ formation }: Props) {
    const [form, setForm] = useState({
        title: formation.title,
        description: formation.description,
        level: formation.level,
        duration: formation.duration,
        category: formation.category,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: field === 'duration' ? String(value) : value
        }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/formations/${formation.id}`, form, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <AppLayout>
            <Head title="Modifier la formation" />
            <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                <a href="/admin/formations" className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux formations
                </a>
                <h1 className="text-2xl font-bold mb-6">Modifier la formation</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Titre</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => handleChange('title', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            value={form.description}
                            onChange={e => handleChange('description', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                            required
                        />
                        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Niveau</label>
                        <select
                            value={form.level}
                            onChange={e => handleChange('level', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Sélectionner un niveau</option>
                            <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avancé">Avancé</option>
                        </select>
                        {errors.level && <p className="text-red-600 text-sm">{errors.level}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Durée</label>
                        <input
                            type="number"
                            value={form.duration}
                            onChange={e => handleChange('duration', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.duration && <p className="text-red-600 text-sm">{errors.duration}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Catégorie</label>
                        <input
                            type="text"
                            value={form.category}
                            onChange={e => handleChange('category', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" /> Sauvegarder
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
