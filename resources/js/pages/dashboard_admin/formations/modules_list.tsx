import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Plus, FileText, Trash2, Edit3, GraduationCap, ArrowLeft, Download, PlayCircle } from 'lucide-react';
import { ModernButton, PageHeader } from '@/components/ui/modern-components';
import { BreadcrumbItem } from '@/types';

type FileType = 'pdf' | 'video' | 'other';

interface ModuleFile {
  id: number;
  original_name?: string;
  name?: string;       // optional; use original_name if absent
  type?: FileType;     // optional; inferred if absent
  // (server may also send mime_type, disk, etc.)
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  files: ModuleFile[]; // ✅ single source of truth
}

interface Formation {
  id: number;
  title: string;
}

interface Props {
  formation: Formation;
  modules: Module[];
}

/* Helpers */
const getExt = (filename?: string) => (filename?.split('.').pop() || '').toLowerCase();

const inferType = (name?: string): FileType => {
  const ext = getExt(name);
  if (ext === 'pdf') return 'pdf';
  if (['mp4','mov','avi','webm','mkv','m3u8'].includes(ext)) return 'video';
  return 'other';
};

const openHref = (id: number) => `/admin/module-files/${id}`;             // stream inline (pdf/other)
const downloadHref = (id: number) => `/admin/module-files/${id}/download`; // download any
const videoHref = (id: number) => `/admin/module-files/${id}/video`;       // Inertia page with qualities

/* Card */
const ModuleCard = ({
  module,
  onEdit,
  onDelete,
}: {
  module: Module;
  onEdit: (module: Module) => void;
  onDelete: (module: Module) => void;
}) => {
  const files = module.files ?? [];

  return (
    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6 flex flex-col hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
        <h2 className="text-base sm:text-lg font-bold text-foreground dark:text-white line-clamp-2">
          {module.title}
        </h2>
        <span className="text-xs text-muted-foreground self-start sm:self-auto whitespace-nowrap">
          Durée : {module.duration}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
        {module.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-3 sm:gap-2">
        <div className="flex-1">
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Fichiers :</p>

            {files.length > 0 ? (
              <ul className="space-y-1">
                {files.map((f) => {
                  const displayName = f.name || f.original_name || `file-${f.id}`;
                  const t: FileType = f.type || inferType(displayName);

                  return (
                    <li key={f.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                          {t === 'pdf' ? '📄 PDF' : t === 'video' ? '🎬 Vidéo' : '📎 Fichier'}
                        </span>
                        
                      </div>

                      <div className="flex items-center gap-2">
                        {t === 'video' ? (
                          <Link
                            href={videoHref(f.id)}
                            className="px-2.5 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-1"
                            title="Lire (qualités)"
                          >
                            <PlayCircle className="w-3.5 h-3.5" />
                            Lire
                          </Link>
                        ) : (
                          <a
                            href={openHref(f.id)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                            title="Ouvrir"
                          >
                            Ouvrir
                          </a>
                        )}

                        
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">Aucun fichier pour ce module.</div>
            )}
          </div>
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

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
    },
    {
      title: 'Formations',
      href: '/admin/formations',
    },
    {
      title: `Modules`,
      isActive: true,
    },
  ];

  const handleDelete = (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce module ?')) return;
    router.delete(`/admin/modules/${id}`, {
      onSuccess: () => setModuleList((prev) => prev.filter(m => m.id !== id)),
    });
  };

  const handleModuleEdit = (module: Module) => {
    router.visit(`/admin/modules/${module.id}/edit`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Modules" />
      <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 overflow-x-auto bg-background">
        {/* Back */}
        <div className="flex items-center mb-2 sm:mb-4">
          <Link
            href="/admin/formations"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Retour aux formations</span>
            <span className="sm:hidden">Retour</span>
          </Link>
        </div>

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
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}