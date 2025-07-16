import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
}

interface Props {
    module: Module;
    formationId: number;
}

export default function ModuleEdit({ module, formationId }: Props) {
    const [form, setForm] = useState({
        title: module.title,
        description: module.description,
        duration: module.duration,
        order: module.order,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/formations/${formationId}/modules/${module.id}`, form, {
            onError: (err) => setErrors(err),
            onSuccess: () => {
                router.visit(`/dashboard_admin/formation/${formationId}/modules`);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Modifier le module" />
            <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                <a href={`/dashboard_admin/formation/${formationId}/modules`} className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux modules
                </a>
                <h1 className="text-2xl font-bold mb-6">Modifier le module</h1>
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
                        className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" /> Sauvegarder
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}