import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import { Save, ArrowLeft, GraduationCap, Plus } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestion des formations',
        href: '/formations',
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
        file: null as File | null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    /*const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post('/formations', form, {
            onError: (err) => {
                setErrors(err);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
                router.visit('/formations');
            },
        });
    };*/
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('level', form.level);
        formData.append('duration', form.duration);
        formData.append('category', form.category);
        if (form.file) formData.append('file', form.file);

        router.post('/formations', formData, {
            forceFormData: true,
            onError: err => setErrors(err),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, file: e.target.files?.[0] || null }));
        setErrors(prev => ({ ...prev, file: '' }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, file: e.target.files?.[0] || null }));
        setErrors(prev => ({ ...prev, file: '' }));
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
                            href="/formations"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Retour aux formations</span>
                        </Link>
                    </div>
                </div>

                {/* Formulaire */}
                <div className="max-w-4xl mx-auto w-full">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Plus className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Nouvelle formation</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Titre */}
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Titre de la formation *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => handleChange('title', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Nom de votre formation..."
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Niveau */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Niveau *</label>
                                    <select
                                        value={form.level}
                                        onChange={e => handleChange('level', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.level ? 'border-red-500' : 'border-gray-200'}`}
                                        required
                                    >
                                        <option value="">Sélectionner un niveau</option>
                                        <option value="Débutant">Débutant</option>
                                        <option value="Intermédiaire">Intermédiaire</option>
                                        <option value="Avancé">Avancé</option>
                                    </select>
                                    {errors.level && <p className="text-sm text-red-600">{errors.level}</p>}
                                </div>

                                {/* Durée */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-gray-700">Durée *</label>
                                    <input
                                        type="text"
                                        value={form.duration}
                                        onChange={e => handleChange('duration', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.duration ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Ex: 30 heures"
                                        required
                                    />
                                    {errors.duration && <p className="text-sm text-red-600">{errors.duration}</p>}
                                </div>

                                {/* Catégorie */}
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Catégorie *</label>
                                    <input
                                        type="text"
                                        value={form.category}
                                        onChange={e => handleChange('category', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 ${errors.category ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Ex: Informatique, Management, Langues..."
                                        required
                                    />
                                    {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">Description *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => handleChange('description', e.target.value)}
                                    className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Décrivez votre formation en détail..."
                                    rows={5}
                                    required
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-4 pt-8 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{isSubmitting ? 'Création en cours...' : 'Créer la formation'}</span>
                                </button>
                                <Link
                                    href="/formations"
                                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
                                >
                                    Annuler
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                <a href="/formations" className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600">
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
                        <label className="block mb-1 font-medium">Fichier (PDF ou vidéo)</label>
                        <input
                            type="file"
                            accept=".pdf,video/*"
                            onChange={handleFileChange}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.file && <p className="text-red-600 text-sm">{errors.file}</p>}
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
