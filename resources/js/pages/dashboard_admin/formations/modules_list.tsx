import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import {
    Plus,
    FileText,
    Trash2,
    Edit3,
    GraduationCap,
    ArrowLeft,
     } from 'lucide-react';
import { ModernButton, PageHeader } from '@/components/ui/modern-components';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  file_path?: string;
  files?: { id: number; [key: string]: any }[];
}

interface Formation {
  id: number;
  title: string;
}

interface Props {
  formation: Formation;
  modules: Module[];
}

function renderModuleFile(filePath?: string, onOpenVideo?: () => void, fileId?: number) {
  if (!filePath) return null;
  const extension = filePath.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') {
    return (
      <div className="mt-4">
        <p className="text-sm text-muted-foreground font-medium mb-1">Fichier attaché :</p>
        <a href={`/storage/${filePath}`} target="_blank" className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
          <FileText className="w-4 h-4" /> Voir le PDF
        </a>
      </div>
    );
  }
  if (["mp4", "avi", "mov"].includes(extension || '')) {
    return (
      <div className="mt-4">
        <p className="text-sm text-muted-foreground font-medium mb-1">Vidéo attachée :</p>
        <Link
          href={route('admin.modules.files.video', { file: fileId })}
          className="text-primary hover:underline text-sm"
        >
          📹 Lire la vidéo
        </Link>
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
    <div className="bg-card dark:bg-card dark:bg-gray-700 rounded-2xl shadow-lg border border-border p-4 sm:p-6 flex flex-col hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
        <h2 className="text-base sm:text-lg font-bold text-foreground dark:text-white line-clamp-2">{module.title}</h2>
        <span className="text-xs text-muted-foreground self-start sm:self-auto whitespace-nowrap">Durée : {module.duration}</span>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">{module.description}</p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-3 sm:gap-2">
        <div className="flex-1">
          {renderModuleFile(module.file_path, undefined, module.files?.[0]?.id)}
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button 
            onClick={() => onEdit(module)} 
            className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Modifier"
          >
            <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button 
            onClick={() => onDelete(module)} 
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Supprimer"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
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
    router.visit(`/admin/modules/${module.id}/edit`);
  };

  const handleModulePlay = (module: Module) => {
    console.log('Lecture du module:', module);
  };

    return (
        <AppLayout>
            <Head title="Modules" />
                <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 overflow-x-auto bg-background">

                    {/* Back to Formations Button */}
                    <div className="flex items-center mb-2 sm:mb-4">
                        <Link
                            href="/admin/formations"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Retour aux formations</span>
                            <span className="sm:hidden">Retour</span>
                        </Link>
                    </div>                {/* Header moderne */}
                <PageHeader
                    title={`Modules - ${formation.title}`}
                    description="Créez et gérez vos modules de formation."
                    icon={GraduationCap}
                    theme="primary"
                    actions={
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <ModernButton
                                theme="primary"
                                icon={Plus}
                                onClick={() => router.visit(`/admin/formations/${formation.id}/modules/create`)}
                            >
                                <span className="hidden sm:inline">Ajouter un module</span>
                                <span className="sm:hidden">Ajouter</span>
                            </ModernButton>
                        </div>
                    }
                />


                <div className="w-full px-2 sm:px-4">

                    {moduleList.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8 sm:py-12">Aucun module pour cette formation.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
                </div>            {showVideo && videoPath && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-card dark:bg-card rounded-lg shadow-lg p-4 sm:p-6 max-w-4xl w-full relative max-h-[90vh] overflow-auto">
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-muted-foreground hover:text-red-500 text-lg sm:text-xl font-bold z-10 bg-background rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                        >
                            ×
                        </button>
                        <div className="relative w-full pt-[56.25%] rounded overflow-hidden mt-4 sm:mt-6"> {/* 16:9 ratio */}
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
