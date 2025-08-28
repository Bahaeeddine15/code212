import AppLayout from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Edit3,
  Trash2,
  Search,
  Clock,
  Users,
  Award,
  BookOpen,
  PlayCircle,
  FileText,
  CheckCircle
} from 'lucide-react';
import { ModernButton, PageHeader } from '@/components/ui/modern-components';

/* ---------------- Types ---------------- */

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  file_path?: string; // (unused if you’ve fully migrated)
}

interface Formation {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  link?: string;
  modules: Module[];
  enrolledStudents?: number;
  maxStudents?: number;
  thumbnail?: string;
  status?: 'published' | 'draft';   // 👈 NEW
}

type Counts = { published: number; draft: number; all: number };

// Accept array, paginator, or keyed object
type Paginator<T> = { data: T[]; [k: string]: any };
type Props = {
  formations: Formation[] | Paginator<Formation> | Record<string, Formation>;
  activeStatus?: 'published' | 'draft' | 'all'; // 👈 NEW
  counts?: Counts;                               // 👈 NEW
};

/* ---------------- UI Helpers ---------------- */

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard' },
  { title: 'Formations/Certifications', href: '/admin/formations' },
];

const StatusTabs = ({
  active = 'published',
  counts = { published: 0, draft: 0, all: 0 },
}: {
  active?: 'published' | 'draft' | 'all';
  counts?: Counts;
}) => {
  const go = (s: 'published' | 'draft' | 'all') =>
    router.get('/admin/formations', { status: s }, { preserveScroll: true, replace: true });

  const base = 'px-3 py-1.5 rounded-md text-sm font-medium transition';
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => go('published')}
        className={`${base} ${active === 'published' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Publiées ({counts.published})
      </button>
      <button
        onClick={() => go('draft')}
        className={`${base} ${active === 'draft' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Brouillons ({counts.draft})
      </button>
      <button
        onClick={() => go('all')}
        className={`${base} ${active === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Toutes ({counts.all})
      </button>
    </div>
  );
};

/* ---------------- Cards ---------------- */

const ModuleCard = ({
  module,
  onEdit,
  onDelete,
  onPlay,
}: {
  module: Module;
  onEdit: (module: Module) => void;
  onDelete: (module: Module) => void;
  onPlay: (module: Module) => void;
}) => {
  return (
    <div className="bg-background rounded-xl shadow border border-border p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base sm:text-lg font-semibold text-foreground flex-1 line-clamp-2">{module.title}</h4>
        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            className="p-1.5 sm:p-2 text-primary hover:bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors"
            onClick={() => onEdit(module)}
          >
            <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
            onClick={() => onDelete(module)}
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-1.5 sm:p-2 text-green-600 dark:text-green-400 hover:bg-green-50 rounded-lg transition-colors"
            onClick={() => onPlay(module)}
          >
            <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{module.description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 sm:gap-0">
        <span>Durée : {module.duration}</span>
        <span>Ordre : {module.order}</span>
      </div>
      {module.file_path && (
        <a
          href={`/storage/${module.file_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:underline text-xs"
        >
          <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Voir le fichier
        </a>
      )}
    </div>
  );
};

const FormationCard = ({
  formation,
  onDelete,
  onViewModules,
  onToggleStatus,
}: {
  formation: Formation;
  onDelete: (formation: Formation) => void;
  onViewModules: (formation: Formation) => void;
  onToggleStatus: (formation: Formation) => void;
}) => {
  const { title, description, level, duration, category, enrolledStudents = 0, maxStudents = 0, link, status = 'published' } = formation;

  // 👇 Ensure modules is always an array
  const modules = Array.isArray(formation.modules) ? formation.modules : [];

  const getLevelColor = () => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 dark:bg-green-900 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 dark:bg-red-900 text-red-800';
      default:
        return 'bg-gray-100 text-foreground';
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (link && !(e.target as HTMLElement).closest('button, a')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const published = status === 'published';

  return (
    <div
      className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-36 sm:h-48 -m-4 sm:-m-6 mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-t-2xl" />
        {formation.thumbnail ? (
          <img
            src={`/storage/${formation.thumbnail}`}
            alt={formation.title}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        ) : (
          <div className="w-full h-full grid place-items-center">
            <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90 drop-shadow-lg" />
          </div>
        )}

        {/* Status badge */}
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold ${published ? 'bg-green-600 text-white' : 'bg-amber-600 text-white'}`}>
          {published ? 'Publié' : 'Brouillon'}
        </span>
      </div>

      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2 text-sm sm:text-base">{description}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full self-start ${getLevelColor()}`}>{level}</span>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{duration}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium text-sm">Modules</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{modules.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium text-sm">Inscrits</span>
          <span className="font-bold text-green-600 dark:text-green-400 text-sm">{enrolledStudents}/{maxStudents}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${maxStudents ? (enrolledStudents / maxStudents) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <span className="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full self-start">
          {category}
        </span>
        <div className="flex space-x-2">
          <Link
            href={`/admin/formations/${formation.id}/edit`}
            className="p-1.5 sm:p-2 text-primary hover:bg-blue-50 dark:bg-blue-900/20 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
            onClick={e => e.stopPropagation()}
          >
            <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
          <button
            onClick={e => { e.stopPropagation(); onDelete(formation); }}
            className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Toggle publish/draft */}
          <button
            onClick={e => { e.stopPropagation(); onToggleStatus(formation); }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${published ? 'bg-amber-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {published ? 'Mettre en brouillon' : 'Publier'}
          </button>

          {!link && (
            <ModernButton size="sm" theme="primary" onClick={() => onViewModules(formation)}>
              <span className="hidden sm:inline">Voir modules</span>
              <span className="sm:hidden">Modules</span>
            </ModernButton>
          )}
          {link && <span className="text-primary text-xs font-semibold ml-2">Lien externe</span>}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Page ---------------- */

export default function Formations({
  formations,
  activeStatus = 'published',
  counts = { published: 0, draft: 0, all: 0 },
}: Props) {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [showModules, setShowModules] = useState(false);

  // 👇 Normalize formations to an array in all cases
  let list: Formation[] = [];
  if (Array.isArray(formations)) {
    list = formations;
  } else if (formations && typeof formations === 'object') {
    if ('data' in formations && Array.isArray(formations.data)) {
      list = formations.data;
    } else {
      list = Object.values(formations);
    }
  }
  if (!Array.isArray(list)) {
    console.warn('formations prop is not an array:', formations);
    list = [];
  }

  const handleFormationDelete = (formation: Formation) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      router.delete(`/admin/formations/${formation.id}`);
    }
  };

  const handleModuleDelete = (module: Module) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce module ?') && selectedFormation) {
      router.delete(`/admin/formations/${selectedFormation.id}/modules/${module.id}`);
    }
  };

  const handleModuleEdit = (module: Module) => {
    if (selectedFormation) {
      router.visit(`/admin/modules/${selectedFormation.id}/${module.id}/edit`);
    }
  };

  const handleViewModules = (formation: Formation) => {
    router.visit(`/admin/formations/${formation.id}/modules`);
  };

  const handleModulePlay = (_module: Module) => {
    // Optional: preview from admin
  };

  const handleToggleStatus = (formation: Formation) => {
    const next = formation.status === 'published' ? 'draft' : 'published';
    router.patch(`/admin/formations/${formation.id}/status`, { status: next }, { preserveScroll: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Formations/Certifications" />
      <div className="flex h-full flex-1 flex-col gap-6 sm:gap-8 p-4 sm:p-6 overflow-x-auto bg-background">

        <PageHeader
          title="Formations & Certifications"
          description="Créez et gérez vos formations professionnelles"
          icon={GraduationCap}
          theme="primary"
          actions={
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {selectedFormation && (
                <ModernButton
                  theme="secondary"
                  onClick={() => router.visit(`/admin/formations/${selectedFormation.id}/modules/create`)}
                >
                  Ajouter module
                </ModernButton>
              )}
              <ModernButton theme="primary" onClick={() => router.visit('/admin/formations/create')}>
                Nouvelle formation
              </ModernButton>
            </div>
          }
        />

        {/* Tabs */}
        <StatusTabs active={activeStatus} counts={counts} />

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Total formations</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">{counts.all}</p>
              </div>
              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Étudiants inscrits</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">—</p>
              </div>
              <div className="p-3 sm:p-4 bg-green-100 dark:bg-green-900 rounded-2xl">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Certifications</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1 sm:mt-2">—</p>
              </div>
              <div className="p-3 sm:p-4 bg-purple-100 rounded-2xl">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Modules actifs</p>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-600 mt-1 sm:mt-2">—</p>
              </div>
              <div className="p-3 sm:p-4 bg-cyan-100 rounded-2xl">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search/filter bar */}
        <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl bg-card dark:bg-card text-foreground text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <select className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl bg-card dark:bg-card text-foreground text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-all duration-200">
                <option>Tous les niveaux</option>
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
              </select>
              <select className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl bg-card dark:bg-card text-foreground text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-all duration-200">
                <option>Toutes les catégories</option>
                <option>Développement</option>
                <option>IA</option>
                <option>Sécurité</option>
                <option>Programmation</option>
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
              {activeStatus === 'draft' ? 'Brouillons' : activeStatus === 'all' ? 'Toutes les formations' : 'Formations publiées'}
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {list.map((formation) => (
              <FormationCard
                key={formation.id}
                formation={formation}
                onDelete={handleFormationDelete}
                onViewModules={handleViewModules}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        </div>

        {/* Optional preview section */}
        {showModules && selectedFormation && (
          <div className="bg-card dark:bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-purple-600" />
                Modules - {selectedFormation.title}
              </h2>
              <ModernButton
                theme="secondary"
                onClick={() => router.visit(`/admin/formations/${selectedFormation.id}/modules/create`)}
              >
                Ajouter module
              </ModernButton>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {selectedFormation?.modules.map((module: Module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onEdit={handleModuleEdit}
                  onDelete={handleModuleDelete}
                  onPlay={handleModulePlay}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}








