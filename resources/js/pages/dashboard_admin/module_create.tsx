import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';

// Accept formations as a prop from Inertia page
interface Props {
    formationId: number;
    formations: Formation[];
}

interface Formation {
    id: number;
    title: string;
}

export default function ModuleCreate({ formationId, formations = [] }: Props) {
    const [selectedFormationId, setSelectedFormationId] = useState<number | null>(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        duration: '',
        order: 1
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Use selectedFormationId for module creation
    const id = selectedFormationId || formationId;

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            setErrors({ formationId: 'Formation ID manquant.' });
            return;
        }
        router.post(`/formations/${id}/modules`, form, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <AppLayout>
            <Head title="Nouveau module" />
            <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                <a href={id ? `/formations/${id}` : '/formations'} className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour à la formation
                </a>
                <h1 className="text-2xl font-bold mb-6">Ajouter un module</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Formation</label>
                        <select
                            value={selectedFormationId ?? ''}
                            onChange={e => setSelectedFormationId(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2 bg-purple
                            "
                            required
                        >
                            <option value="">Sélectionner une formation</option>
                            {formations.map(f => (
                                <option key={f.id} value={f.id}>{f.title}</option>
                            ))}
                        </select>
                        {errors.formationId && <p className="text-red-600 text-sm">{errors.formationId}</p>}
                    </div>
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
                        <label className="block mb-1 font-medium">Durée</label>
                        <input
                            type="text"
                            value={form.duration}
                            onChange={e => handleChange('duration', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.duration && <p className="text-red-600 text-sm">{errors.duration}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Ordre</label>
                        <input
                            type="number"
                            value={form.order}
                            onChange={e => handleChange('order', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            min={1}
                            required
                        />
                        {errors.order && <p className="text-red-600 text-sm">{errors.order}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" /> Sauvegarder
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
