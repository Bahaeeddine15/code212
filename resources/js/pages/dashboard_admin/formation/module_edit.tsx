import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
    file_path?: string;
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
        file: module.file_path || null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [existingFile, setExistingFile] = useState<string | null>(module.file_path || null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: field === 'order' ? Number(value) : String(value)
        }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setErrors(prev => ({ ...prev, file: '' }));

        if (selectedFile) {
            if (selectedFile.type.startsWith('video/')) {
                setPreview(URL.createObjectURL(selectedFile));
            } else if (selectedFile.type === 'application/pdf') {
                setPreview(null); // PDFs can't be previewed easily
            }
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('duration', String(form.duration));
        formData.append('order', String(form.order));

        // Only append file if it's a File object (not a string)
        if (file) {
            formData.append('file', file);
        }

        router.post(`/formations/${formationId}/modules/${module.id}?_method=PUT`, formData, {
            forceFormData: true,
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
                            type="number"
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
                    <div>
                        <label className="block mb-1 font-medium">Fichier (PDF ou vidéo)</label>
                        {existingFile && (
                            <div className="mb-2 text-sm text-gray-600">
                                Fichier actuel :
                                {existingFile.endsWith('.pdf') ? (
                                    <a
                                        href={`/storage/${existingFile}`}
                                        target="_blank"
                                        className="ml-2 text-indigo-600 hover:underline"
                                    >
                                        Voir le PDF
                                    </a>
                                ) : (
                                    <video controls className="w-full max-h-48 mt-2 rounded">
                                        <source src={`/storage/${existingFile}`} />
                                        Votre navigateur ne prend pas en charge cette vidéo.
                                    </video>
                                )}
                            </div>
                        )}
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
