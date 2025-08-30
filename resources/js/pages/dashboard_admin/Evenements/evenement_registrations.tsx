import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Calendar, Check, X,  ArrowLeft, User, Mail, Phone, School, MapPin} from 'lucide-react';


type Status = 'waitlist' | 'registered' | 'rejected' | 'cancelled';

interface Etudiant {
  id: number;
  name?: string | null;
  email?: string | null;
  telephone?: string | null;
  ecole?: string | null;
  
}

interface Registration {
  id: number;
  status: Status;
  registered_at?: string | null;
  etudiant: Etudiant;
}

interface EventInfo { 
  id:number; 
  title:string; 
  start_date?:string; 
  end_date?:string; 
  max_attendees?:number 
}
interface Props {
  event: EventInfo;
  registrations: Registration[];
  
}
const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { dateStyle: 'medium' }) : '';

const StatusBadge = ({ status }: { status: Status }) => {
  const map: Record<Status, { label: string; cls: string }> = {
    waitlist:   { label: 'En attente', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300' },
    registered: { label: 'Accepté',    cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300' },
    rejected:   { label: 'Refusé',     cls: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-300' },
    cancelled:  { label: 'Annulé',     cls: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
  };
  const s = map[status];
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${s.cls}`}>{s.label}</span>;
};

export default function EventRegistrations({ event, registrations }: Props) {
  const [busyId, setBusyId] = useState<number | null>(null);

  // Actions: approve -> registered, reject -> cancelled
  const approve = (regId: number) => {
    setBusyId(regId);
    router.patch(
      `/admin/events/${event.id}/registrations/${regId}/approve`,
      {},
      { preserveScroll: true, onFinish: () => setBusyId(null) }
    );
  };

  const reject = (regId: number) => {
    setBusyId(regId);
    router.patch(
      `/admin/events/${event.id}/registrations/${regId}/reject`,
      {},
      { preserveScroll: true, onFinish: () => setBusyId(null) }
    );
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Gestion des événements', href: '/admin/events' },
        { title: 'Inscriptions', href: '#' },
      ]}
    >
      <Head title={`Inscriptions - ${event.title}`} />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Event header */}
        <div className="bg-white dark:bg-card rounded-2xl border shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">{event.title}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {fmtDate(event.start_date)} → {fmtDate(event.end_date)} • Capacité: {event.max_attendees ?? '—'}
              </p>
            </div>
          </div>
          <Link href="/admin/events" className="text-sm text-blue-600 hover:underline self-start sm:self-auto">
            Retour
          </Link>
        </div>

        {/* Registrations list */}
        <div className="bg-white dark:bg-card rounded-2xl border shadow">
          <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">
                Inscriptions ({registrations.length})
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-neutral-800">
                <tr className="text-left">
                  
                  <th className="px-4 py-3 font-semibold">Nom</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">École</th>
                  <th className="px-4 py-3 font-semibold">Téléphone</th>
                  <th className="px-4 py-3 font-semibold">Statut</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 sm:px-5 py-8 sm:py-10 text-center text-muted-foreground">
                      Aucune inscription pour le moment.
                    </td>
                  </tr>
                )}

                {registrations.map((r) => {
                  const { etudiant } = r;
                  const pending = r.status === 'waitlist';

                  return (
                    <tr key={r.id}>
                     
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          
                          {etudiant?.name ?? '—'}
                        </div>
                      </td>
                      
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          
                          {etudiant?.email ?? '—'}
                        </div>
                      </td>
                       <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          
                          {etudiant?.ecole ?? '—'}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          
                          {etudiant?.telephone ?? '—'}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex justify-end gap-2">
                          {/* Approve (→ registered) */}
                          <button
                            onClick={() => router.patch(`/admin/events/${event.id}/registrations/${r.id}/approve`)}
                            disabled={r.status !== 'waitlist'}
                            className={`p-2 rounded min-w-[36px] min-h-[36px] ${
                              r.status === 'waitlist' ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                            title="Accepter"
                          >✓</button>

                          <button
                            onClick={() => router.patch(`/admin/events/${event.id}/registrations/${r.id}/reject`)}
                            disabled={!(r.status === 'waitlist' || r.status === 'registered')}
                            className={`p-2 rounded min-w-[36px] min-h-[36px] ${
                              (r.status === 'waitlist' || r.status === 'registered')
                                ? 'bg-rose-600 text-white hover:bg-rose-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                            title="Refuser"
                          >✕</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
