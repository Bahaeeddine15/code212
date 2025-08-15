import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, GraduationCap, Plus } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Gestion des formations',
        href: '/admin/formations',
    },
    {
        title: 'Nouvelle formation',
        href: '#',
    },
];

export default function FormationCreate() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        level: '',
        duration: '',
        category: '',
        link: '',
        thumbnail: null as File | null, // <-- add this
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('level', form.level);
        formData.append('duration', form.duration);
        formData.append('category', form.category);
        formData.append('link', form.link);
        if (form.thumbnail) {
            formData.append('thumbnail', form.thumbnail);
        }
        router.post('/admin/formations', formData, {
            forceFormData: true,
            onError: err => setErrors(err),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nouvelle formation" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
                {/* Header moderne */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Nouvelle formation</h1>
                                <p className="text-gray-600 mt-2 text-lg">Créez une nouvelle formation pour vos étudiants</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/formations"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour aux formations</span>
                        </Link>
                    </div>
                </div>


                <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                    <a href="/admin/formations" className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux formations
                    </a>
                    <h1 className="text-2xl font-bold mb-6">Créer une nouvelle formation</h1>
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
                                type="text"
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
                        <div>
                            <label className="block mb-1 font-medium">Lien externe (optionnel)</label>
                            <input
                                type="url"
                                value={form.link}
                                onChange={e => handleChange('link', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                placeholder="https://www.cisco.com/..."
                            />
                            {errors.link && <p className="text-red-600 text-sm">{errors.link}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Miniature (optionnelle)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleChange('thumbnail', e.target.files ? e.target.files[0] : null)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.thumbnail && <p className="text-red-600 text-sm">{errors.thumbnail}</p>}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Sauvegarder
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
