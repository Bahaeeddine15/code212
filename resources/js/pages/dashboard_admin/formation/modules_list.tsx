import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    Plus,
    FileText,
    Trash2,
    Edit3,
    GraduationCap,
     } from 'lucide-react';
import { ModernButton, PageHeader } from '@/components/ui/modern-components';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  file_path?: string;
}

interface Formation {
  id: number;
  title: string;
}

interface Props {
  formation: Formation;
  modules: Module[];
}

function renderModuleFile(filePath?: string, onOpenVideo?: () => void) {
  if (!filePath) return null;
  const extension = filePath.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') {
    return (
      <div className="mt-4">
        <p className="text-sm text-gray-600 font-medium mb-1">Fichier attaché :</p>
        <a href={`/storage/${filePath}`} target="_blank" className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
          <FileText className="w-4 h-4" /> Voir le PDF
        </a>
      </div>
    );
  }
  if (["mp4", "avi", "mov"].includes(extension || '')) {
    return (
      <div className="mt-4">
        <p className="text-sm text-gray-600 font-medium mb-1">Vidéo attachée :</p>
        <button onClick={onOpenVideo} className="text-blue-600 hover:underline text-sm">
          📹 Voir la vidéo
        </button>
      </div>
    );
  }
  return null;
}

const ModuleCard = ({ module, onEdit, onDelete, onShowVideo }: {
  module: Module;
  onEdit: (module: Module) => void;
  onDelete: (module: Module) => void;
  onPlay: (module: Module) => void;
  onShowVideo: (filePath: string) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{module.title}</h2>
        <span className="text-xs text-gray-500">Durée : {module.duration}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{module.description}</p>

      <div className="flex justify-between mt-auto">
        {renderModuleFile(module.file_path, () => onShowVideo(`/storage/${module.file_path}`))}
        <button onClick={() => onEdit(module)} className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition">
          <Edit3 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(module)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function ModulesList({ formation, modules }: Props) {
  const [moduleList, setModuleList] = useState(modules);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPath, setVideoPath] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce module ?')) return;
    router.delete(`/admin/modules/${id}`, {
      onSuccess: () => setModuleList(moduleList.filter(m => m.id !== id)),
    });
  };

  const handleModuleEdit = (module: Module) => {
    router.visit(`/dashboard_admin/module_edit/${module.id}`);
  };

  const handleModulePlay = (module: Module) => {
    console.log('Lecture du module:', module);
  };

  return (
    <AppLayout>
        <Head title="Modules" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 overflow-x-auto bg-background">

                {/* Header moderne */}
                <PageHeader
                    title={`Modules - ${formation.title}`}
                    description="Créez et gérez vos modules de formation."
                    icon={GraduationCap}
                    theme="primary"
                    actions={
                        <div className="flex space-x-3">
                            <ModernButton
                                theme="primary"
                                icon={Plus}
                                onClick={() => router.visit(`/dashboard_admin/module_create?formationId=${formation.id}`)}
                            >
                                Ajouter un module
                            </ModernButton>
                        </div>
                    }
                />


            <div className="w-full px-4">


            {moduleList.length === 0 ? (
            <div className="text-center text-gray-500">Aucun module pour cette formation.</div>
            ) : (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
                {moduleList.map(module => (
                <ModuleCard
                    key={module.id}
                    module={module}
                    onEdit={handleModuleEdit}
                    onDelete={() => handleDelete(module.id)}
                    onPlay={handleModulePlay}
                    onShowVideo={(filePath) => {
                    setVideoPath(filePath);
                    setShowVideo(true);
                    }}
                />
                ))}
            </div>
            )}
            </div>

            {showVideo && videoPath && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl w-full relative">
                    <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-1 right-1 text-gray-600 hover:text-red-500 text-xl font-bold"
                    >
                    ×
                    </button>
                    <div className="relative w-full pt-[56.25%] rounded overflow-hidden"> {/* 16:9 ratio */}
                        <video
                            controls
                            className="absolute top-0 left-0 w-full h-full object-contain rounded"
                        >
                            <source src={videoPath} type="video/mp4" />
                            Votre navigateur ne prend pas en charge cette vidéo.
                        </video>
                    </div>
                </div>
                </div>
            )}
            </div>

    </AppLayout>
  );
}
