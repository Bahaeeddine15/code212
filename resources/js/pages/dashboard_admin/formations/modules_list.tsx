import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { 
  Plus, FileText, Trash2, Edit3, GraduationCap, ArrowLeft, Download, PlayCircle,
  Users, Search, Mail, Calendar, Eye, UserCheck, UserX, Award // ADD Award icon
} from 'lucide-react';
import { ModernButton, PageHeader } from '@/components/ui/modern-components';
import { BreadcrumbItem } from '@/types';

type FileType = 'pdf' | 'video' | 'other';

interface ModuleFile {
  id: number;
  original_name?: string;
  name?: string;
  type?: FileType;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  files: ModuleFile[];
}

interface Student {
  id: number;
  name: string;
  email: string;
  ecole?: string;
  ville?: string;
  telephone?: string;
  student_id?: string;
  registered_at: string;
  // ADD PROGRESS TRACKING
  completed_modules?: number;
  total_modules?: number;
  progress_percentage?: number;
  last_activity?: string;
}

interface Formation {
  id: number;
  title: string;
}

interface Props {
  formation: Formation;
  modules: Module[];
  students: {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  search?: string;
}

/* Helpers */
const getExt = (filename?: string) => (filename?.split('.').pop() || '').toLowerCase();

const inferType = (name?: string): FileType => {
  const ext = getExt(name);
  if (ext === 'pdf') return 'pdf';
  if (['mp4','mov','avi','webm','mkv','m3u8'].includes(ext)) return 'video';
  return 'other';
};

const openHref = (id: number) => `/admin/module-files/${id}`;
const downloadHref = (id: number) => `/admin/module-files/${id}/download`;
const videoHref = (id: number) => `/admin/module-files/${id}/video`;

/* Students Table Component */
const StudentsTable = ({ 
  formation, 
  students, 
  search, 
  onSearch,
  totalModules
}: {
  formation: Formation;
  students: Props['students'];
  search?: string;
  onSearch: (query: string, page?: number) => void;
  totalModules: number;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 25) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressIcon = (percentage: number) => {
    if (percentage >= 100) return '🎉';
    if (percentage >= 75) return '🔥';
    if (percentage >= 50) return '📈';
    if (percentage >= 25) return '⚡';
    return '🚀';
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > students.last_page) return;
    onSearch(search || '', page);
  };

  // ADD CERTIFICATE GENERATION HANDLER
  const handleGenerateCertificate = (student: Student) => {
    console.log('Generating certificate for:', student.name);
    // This will be implemented later
    alert(`Génération du certificat pour ${student.name}...`);
  };

  return (
    <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Étudiants inscrits</h2>
            <p className="text-sm text-muted-foreground">
              {students.total} étudiant{students.total > 1 ? 's' : ''} inscrit{students.total > 1 ? 's' : ''}
              <span className="ml-2 text-green-600 font-medium">(Progression suivie)</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={search || ''}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-card text-foreground text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {students.data.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {search ? 'Aucun étudiant trouvé' : 'Aucun étudiant inscrit'}
          </h3>
          <p className="text-muted-foreground">
            {search ? 'Essayez avec d\'autres mots-clés.' : 'Les étudiants inscrits apparaîtront ici.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table with Progress */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Étudiant</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">École/Ville</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Progression</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Dernière activité</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Inscrit le</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.data.map((student) => {
                  const completedModules = student.completed_modules || 0;
                  const progressPercentage = student.progress_percentage || 0;
                  const isCompleted = progressPercentage >= 100;
                  
                  return (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{student.name}</p>
                          {student.student_id && (
                            <p className="text-sm text-muted-foreground">ID: {student.student_id}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-foreground">{student.email}</p>
                          {student.telephone && (
                            <p className="text-sm text-muted-foreground">{student.telephone}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          {student.ecole && <p className="text-sm text-foreground">{student.ecole}</p>}
                          {student.ville && <p className="text-sm text-muted-foreground">{student.ville}</p>}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col items-center gap-2">
                          {/* Progress Circle */}
                          <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray={`${progressPercentage}, 100`}
                                className={getProgressColor(progressPercentage).replace('bg-', 'text-')}
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="100, 100"
                                className="text-gray-200"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold">
                                {getProgressIcon(progressPercentage)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Progress Details */}
                          <div className="text-center">
                            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${getProgressColor(progressPercentage)}`}>
                              {progressPercentage}% 
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {completedModules}/{totalModules} modules
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {student.last_activity ? (
                          <p className="text-sm text-muted-foreground">
                            {formatDate(student.last_activity)}
                          </p>
                        ) : (
                          <span className="text-sm text-gray-400">Aucune activité</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-muted-foreground">{formatDate(student.registered_at)}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* REPLACED MAIL WITH CERTIFICATE BUTTON */}
                          <button
                            onClick={() => handleGenerateCertificate(student)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isCompleted 
                                ? 'text-green-600 hover:bg-green-50' 
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            title={isCompleted ? "Générer le certificat" : "Formation non terminée"}
                            disabled={!isCompleted}
                          >
                            <Award className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {/* Add detailed progress view */}}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir le détail de progression"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards with Progress */}
          <div className="lg:hidden space-y-4">
            {students.data.map((student) => {
              const completedModules = student.completed_modules || 0;
              const progressPercentage = student.progress_percentage || 0;
              const isCompleted = progressPercentage >= 100;
              
              return (
                <div key={student.id} className="bg-background border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    
                    {/* Mobile Progress */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${getProgressColor(progressPercentage)}`}>
                          {progressPercentage}% {getProgressIcon(progressPercentage)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {completedModules}/{totalModules}
                        </p>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-12">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              getProgressColor(progressPercentage).includes('green') ? 'bg-green-500' :
                              getProgressColor(progressPercentage).includes('blue') ? 'bg-blue-500' :
                              getProgressColor(progressPercentage).includes('yellow') ? 'bg-yellow-500' :
                              getProgressColor(progressPercentage).includes('orange') ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {student.ecole && <p><span className="font-medium">École:</span> {student.ecole}</p>}
                    {student.ville && <p><span className="font-medium">Ville:</span> {student.ville}</p>}
                    {student.telephone && <p><span className="font-medium">Tél:</span> {student.telephone}</p>}
                    {student.last_activity && (
                      <p><span className="font-medium">Dernière activité:</span> {formatDate(student.last_activity)}</p>
                    )}
                    <p><span className="font-medium">Inscrit le:</span> {formatDate(student.registered_at)}</p>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    {/* REPLACED MAIL WITH CERTIFICATE BUTTON */}
                    <button
                      onClick={() => handleGenerateCertificate(student)}
                      className={`p-2 rounded-lg transition-colors ${
                        isCompleted 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title={isCompleted ? "Générer le certificat" : "Formation non terminée"}
                      disabled={!isCompleted}
                    >
                      <Award className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {/* Add detailed progress view */}}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Voir le détail de progression"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {students.last_page > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(students.current_page - 1)}
                disabled={students.current_page <= 1}
                className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Précédent
              </button>
              
              <span className="px-3 py-2 text-sm text-muted-foreground">
                Page {students.current_page} sur {students.last_page}
              </span>

              <button
                onClick={() => handlePageChange(students.current_page + 1)}
                disabled={students.current_page >= students.last_page}
                className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* Module Card Component */
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

export default function ModulesList({ formation, modules, students, search }: Props) {
  const [moduleList, setModuleList] = useState(modules);
  const [searchQuery, setSearchQuery] = useState(search || '');

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

  const handleSearch = (query: string, page?: number) => {
    setSearchQuery(query);
    router.get(`/admin/formations/${formation.id}/modules`, { 
      search: query || undefined,
      page: page || 1
    }, { 
      preserveState: true,
      replace: true,
      only: ['students'] 
    });
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

        {/* Modules Grid */}
        <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-foreground">Modules de formation</h2>
          </div>

          {moduleList.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 sm:py-12">
              <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun module</h3>
              <p className="mb-4">Cette formation n'a pas encore de modules.</p>
              <ModernButton
                theme="primary"
                onClick={() => router.visit(`/admin/formations/${formation.id}/modules/create`)}
              >
                Créer le premier module
              </ModernButton>
            </div>
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

        {/* Students Table */}
        <StudentsTable 
          formation={formation}
          students={students}
          search={searchQuery}
          onSearch={handleSearch}
          totalModules={moduleList.length}
        />
      </div>
    </AppLayout>
  );
}