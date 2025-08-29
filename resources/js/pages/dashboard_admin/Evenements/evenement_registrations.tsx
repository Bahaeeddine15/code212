import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Calendar, Check, X, Users } from 'lucide-react';

interface Registration { id:number; name:string; email?:string; ecole?:string; status:string; registered_at?:string }
interface EventInfo { id:number; title:string; start_date?:string; end_date?:string; max_attendees?:number }

export default function EventRegistrations({ event, registrations }:{ event: EventInfo, registrations: Registration[] }){
  const fmt = (d?:string)=> d? new Date(d).toLocaleDateString('fr-FR', { dateStyle:'medium' }): '';
  return (
    <AppLayout breadcrumbs={[{title:'Dashboard', href:'/admin/dashboard'},{title:'Gestion des événements', href:'/admin/events'},{title:`Inscriptions`, href:'#'}]}>
      <Head title={`Inscriptions - ${event.title}`} />
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="bg-white dark:bg-card rounded-2xl border shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"/>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">{event.title}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">{fmt(event.start_date)} → {fmt(event.end_date)} • Capacité: {event.max_attendees ?? '—'}</p>
            </div>
          </div>
          <Link href="/admin/events" className="text-sm text-blue-600 hover:underline self-start sm:self-auto">Retour</Link>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl border shadow">
          <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 sm:w-5 sm:h-5"/>
              <span className="font-medium text-sm sm:text-base">Inscriptions ({registrations.length})</span>
            </div>
          </div>

          <div className="divide-y">
            {registrations.map(r => (
              <div key={r.id} className="px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex-1">
                  <div className="font-medium text-sm sm:text-base text-foreground">{r.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{r.email ?? ''}</div>
                  {r.ecole && (<div className="text-xs text-muted-foreground/80">{r.ecole}</div>)}
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`text-xs px-2 py-1 rounded-full ${r.status==='approved'?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300': r.status==='rejected'?'bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300':'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'}`}>{r.status}</span>
                  {r.status !== 'approved' && (
                    <button onClick={()=> router.patch(`/admin/events/registrations/${r.id}/approve`)} className="p-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"><Check className="w-3 h-3 sm:w-4 sm:h-4"/></button>
                  )}
                  {r.status !== 'rejected' && (
                    <button onClick={()=> router.patch(`/admin/events/registrations/${r.id}/reject`)} className="p-2 rounded bg-rose-600 text-white hover:bg-rose-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"><X className="w-3 h-3 sm:w-4 sm:h-4"/></button>
                  )}
                </div>
              </div>
            ))}
            {registrations.length===0 && (
              <div className="px-4 sm:px-5 py-8 sm:py-10 text-center text-muted-foreground text-sm sm:text-base">Aucune inscription pour le moment.</div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
