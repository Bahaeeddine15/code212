import AppLayout from '@/layouts/app-layout-admin';
import { Head, router, Link } from '@inertiajs/react';
import { Calendar, Check, X, Users } from 'lucide-react';

interface Registration { id:number; name:string; email?:string; ecole?:string; status:string; registered_at?:string }
interface EventInfo { id:number; title:string; start_date?:string; end_date?:string; max_attendees?:number }

export default function EventRegistrations({ event, registrations }:{ event: EventInfo, registrations: Registration[] }){
  const fmt = (d?:string)=> d? new Date(d).toLocaleDateString('fr-FR', { dateStyle:'medium' }): '';
  return (
    <AppLayout breadcrumbs={[{title:'Dashboard', href:'/admin/dashboard'},{title:'Gestion des événements', href:'/admin/events'},{title:`Inscriptions - ${event.title}`, href:'#'}]}>
      <Head title={`Inscriptions - ${event.title}`} />
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-2xl border shadow p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-600"/>
            <div>
              <h1 className="text-xl font-semibold">{event.title}</h1>
              <p className="text-sm text-gray-600">{fmt(event.start_date)} → {fmt(event.end_date)} • Capacité: {event.max_attendees ?? '—'}</p>
            </div>
          </div>
          <Link href="/admin/events" className="text-sm text-blue-600 hover:underline">Retour</Link>
        </div>

        <div className="bg-white rounded-2xl border shadow">
          <div className="px-5 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5"/>
              <span className="font-medium">Inscriptions ({registrations.length})</span>
            </div>
          </div>

          <div className="divide-y">
            {registrations.map(r => (
              <div key={r.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-sm text-gray-600">{r.email ?? ''}</div>
                  {r.ecole && (<div className="text-xs text-gray-500">{r.ecole}</div>)}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${r.status==='approved'?'bg-emerald-100 text-emerald-700': r.status==='rejected'?'bg-rose-100 text-rose-700':'bg-amber-100 text-amber-700'}`}>{r.status}</span>
                  {r.status !== 'approved' && (
                    <button onClick={()=> router.patch(`/admin/events/registrations/${r.id}/approve`)} className="p-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"><Check className="w-4 h-4"/></button>
                  )}
                  {r.status !== 'rejected' && (
                    <button onClick={()=> router.patch(`/admin/events/registrations/${r.id}/reject`)} className="p-2 rounded bg-rose-600 text-white hover:bg-rose-700"><X className="w-4 h-4"/></button>
                  )}
                </div>
              </div>
            ))}
            {registrations.length===0 && (
              <div className="px-5 py-10 text-center text-gray-600">Aucune inscription pour le moment.</div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
