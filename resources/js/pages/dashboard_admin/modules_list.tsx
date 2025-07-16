import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    order: number;
}

interface Formation {
    id: number;
    title: string;
}

interface Props {
    formation: Formation;
    modules: Module[];
}
export default function ModulesList({ formation, modules }: Props) {
    const [moduleList, setModuleList] = useState(modules);

    const handleDelete = (id: number) => {
        if (!confirm('Voulez-vous vraiment supprimer ce module ?')) return;
        router.delete(`/admin/modules/${id}`, {
            onSuccess: () => setModuleList(moduleList.filter(m => m.id !== id)),
        });
    };

    return (
        <AppLayout>
            <Head title={`Modules de ${formation.title}`} />
            <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-6">
                    Modules de la formation : <span className="text-indigo-600">{formation.title}</span>
                </h1>
                {moduleList.length === 0 ? (
                    <p className="text-gray-500">Aucun module pour cette formation.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {moduleList.map(module => (
                            <div key={module.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">{module.title}</h2>
                                    <span className="text-xs text-gray-500">Durée : {module.duration}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{module.description}</p>
                                <div className="flex gap-2 mt-auto">
                                    <a
                                        href={`/dashboard_admin/module_edit/${module.id}`}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    >
                                        Éditer
                                    </a>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                        onClick={() => handleDelete(module.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}