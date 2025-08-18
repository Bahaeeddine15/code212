import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';
import DashboardHeader from "@/components/layout/dashboard-header";
import { Head, Link } from '@inertiajs/react';
import { MapPin, Calendar as CalendarIcon, Users, Tag, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import React from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string; // ISO
    end_date: string;
    location: string;
    category: string;
    max_attendees: number;
    status: string;
}

// Create breadcrumbs for the header component
const headerBreadcrumbs = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Événements", isActive: true },
];

interface Props { events: Event[]; }

// Utility to parse date safely
const parseDate = (d: string) => new Date(d);
function todayISOOffset(offsetDays:number){ const d=new Date(); d.setDate(d.getDate()+offsetDays); return d.toISOString().split('T')[0]; }

function formatTimeRange(startISO: string, endISO: string){
    try{
        const s = new Date(startISO);
        const e = new Date(endISO);
        const sameDay = s.toDateString() === e.toDateString();
        if(sameDay){
            return `${s.toLocaleDateString('fr-FR')} – ${e.toLocaleDateString('fr-FR')}`;
        }
        return `${s.toLocaleDateString('fr-FR')} – ${e.toLocaleDateString('fr-FR')}`;
    }catch{
        return '';
    }
}

// Normalized events with date objects and colors
interface NormalizedEvent extends Event {
    start: Date;
    end: Date;
    color: string;
}

export default function Events({ events }: Props) {
    // Breadcrumbs
    const breadcrumbs = [
        { title: 'Dashboard Étudiant', href: '/dashboard' },
        { title: 'Événements', href: '/events' }
    ];

    // Placeholder events if none provided
    const sample: Event[] = [
        { id: 1, title: 'Atelier React', description: 'Découverte des hooks', start_date: todayISOOffset(2), end_date: todayISOOffset(2), location: 'Lab 1', category: 'Web', max_attendees: 30, status: 'upcoming' },
        { id: 2, title: 'Conférence IA', description: 'Tendances 2025', start_date: todayISOOffset(5), end_date: todayISOOffset(6), location: 'Amphi A', category: 'IA', max_attendees: 120, status: 'upcoming' },
        { id: 3, title: 'Hackathon', description: '24h innovation', start_date: todayISOOffset(8), end_date: todayISOOffset(9), location: 'Open Space', category: 'Concours', max_attendees: 60, status: 'upcoming' },
        { id: 4, title: 'Sécurité Web', description: 'OWASP Top 10', start_date: todayISOOffset(14), end_date: todayISOOffset(14), location: 'Salle B', category: 'Cyber', max_attendees: 40, status: 'upcoming' },
    ];

    const raw = (events && events.length) ? events : sample;

    // Category color styles (bar hex and badge gradient)
    const categoryStyles: Record<string,{bar:string; badge:string}> = {
        // French full names
        'Développement Web': { bar: '#6366F1', badge: 'from-indigo-500 to-indigo-600' },
        'Design & UX': { bar: '#EC4899', badge: 'from-pink-500 to-rose-500' },
        'Événement Spécial': { bar: '#F59E0B', badge: 'from-amber-500 to-orange-500' },
        'DevOps & Cloud': { bar: '#0EA5E9', badge: 'from-sky-500 to-sky-600' },
        'Data Science': { bar: '#8B5CF6', badge: 'from-violet-500 to-violet-600' },
        'Mobile Development': { bar: '#EAB308', badge: 'from-yellow-400 to-yellow-500' }, // changed to yellow
        'Intelligence Artificielle': { bar: '#10B981', badge: 'from-emerald-500 to-emerald-600' },
        'Entrepreneuriat Tech': { bar: '#F97316', badge: 'from-orange-500 to-orange-600' },
        'Cybersécurité': { bar: '#EF4444', badge: 'from-red-500 to-rose-600' },
        'Hackathon': { bar: '#6366F1', badge: 'from-indigo-500 to-indigo-600' },
        // Original short / legacy keys (aliases)
        'Web': { bar: '#6366F1', badge: 'from-indigo-500 to-indigo-600' },
        'IA': { bar: '#10B981', badge: 'from-emerald-500 to-emerald-600' },
        'Concours': { bar: '#6366F1', badge: 'from-indigo-500 to-indigo-600' },
        'Cyber': { bar: '#EF4444', badge: 'from-red-500 to-rose-600' },
        'Mobile': { bar: '#EAB308', badge: 'from-yellow-400 to-yellow-500' }, // alias updated to yellow
        'Data': { bar: '#8B5CF6', badge: 'from-violet-500 to-violet-600' },
    };
    function getCategoryStyle(cat:string){ return categoryStyles[cat] || { bar: '#64748B', badge: 'from-slate-500 to-slate-600' }; }

    const normalized: NormalizedEvent[] = raw.map((e) => ({
        ...e,
        start: parseDate(e.start_date),
        end: parseDate(e.end_date),
        color: getCategoryStyle(e.category).bar
    }));

    // Calendar state
    const today = new Date();
    const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = React.useState(today.getMonth()); // 0-11

    function nextMonth() {
        setCurrentMonth(m => (m === 11 ? (setCurrentYear(y => y + 1), 0) : m + 1));
    }
    function prevMonth() {
        setCurrentMonth(m => (m === 0 ? (setCurrentYear(y => y - 1), 11) : m - 1));
    }

    // Build weeks (array of weeks, each week array of Date | null) starting Monday
    const weeks = React.useMemo(() => buildCalendar(currentYear, currentMonth), [currentYear, currentMonth]);

    // Events intersecting current month for calendar bars
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
    const monthEvents = normalized.filter(e => e.end >= monthStart && e.start <= monthEnd);

    return (
        <>
            <Head>
                <title>Événements</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            {/* Custom Dashboard Header */}
            <DashboardHeader breadcrumbs={headerBreadcrumbs} />
            
            <AppShell variant="sidebar">
                <div className="flex w-full min-h-screen">
                    <AppSidebar />
                    <AppContent variant="sidebar" className="flex-1 bg-white font-[Poppins]">
                        <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* LEFT PANEL */}
                            <div className="lg:w-1/3 space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Événements à venir</h2>
                                    <p className="text-sm text-gray-500 mt-1">Ne manquez pas les événements programmés</p>
                                </div>
                                <div className="space-y-3">
                                    {normalized.sort((a,b)=>a.start.getTime()-b.start.getTime()).map(ev => (
                                        <Link href={`/events/${ev.id}`} key={ev.id} className="block">
                                        <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer">
                                            <div className={`flex flex-col items-center justify-center w-14 rounded-md bg-gradient-to-br ${getCategoryStyle(ev.category).badge} text-white py-2`}>
                                                <span className="text-lg font-semibold leading-none">{ev.start.getDate()}</span>
                                                <span className="text-[11px] font-medium mt-1 uppercase tracking-wide">{ev.start.toLocaleDateString('en-US',{month:'short'})}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 leading-tight line-clamp-1">{ev.title}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{ev.description}</p>
                                                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {formatTimeRange(ev.start_date, ev.end_date)}
                                                    </span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ev.location}</span>
                                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max {ev.max_attendees}</span>
                                                    <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {ev.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* RIGHT PANEL - CALENDAR */}
                            <div className="lg:flex-1 hidden lg:block">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><ChevronLeft className="w-5 h-5" /></button>
                                        <h3 className="text-lg font-semibold text-gray-800">{monthLabel(currentYear, currentMonth)}</h3>
                                        <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><ChevronRight className="w-5 h-5" /></button>
                                    </div>
                                    {/* Weekday headers */}
                                    <div className="grid grid-cols-7 text-xs font-medium text-gray-500 mb-2">
                                        {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(d => <div key={d} className="text-center py-1">{d}</div>)}
                                    </div>
                                    <div className="space-y-2">
                                        {weeks.map((week, wi) => (
                                            <div key={wi} className="relative">
                                                {/* Day cells */}
                                                <div className="grid grid-cols-7 gap-px">
                                                    {week.map((d, di) => {
                                                        if(!d) return <div key={di} className="h-16 bg-gray-50 rounded-md" />;
                                                        const isToday = sameDay(d, today);
                                                        return (
                                                            <div key={di} className={`relative h-16 rounded-md p-1 text-right text-[11px] font-medium ${isToday ? 'bg-indigo-50 ring-2 ring-indigo-400' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                                                                <span className={`absolute top-1 right-1 ${isToday ? 'text-indigo-700' : 'text-gray-600'}`}>{d.getDate()}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {/* Event bars overlay (clickable) */}
                                                <div className="absolute left-0 right-0 top-6 bottom-1 pointer-events-auto space-y-1">
                                                    {monthEvents.filter(e => intersectsWeek(e, week)).map(ev => {
                                                        const { left, span } = barPosition(ev, week);
                                                        return (
                                                            <a href={`/events/${ev.id}`} key={ev.id+wi} style={{ left: `${(left/7)*100}%`, width: `${(span/7)*100}%`, backgroundColor: ev.color }} className="absolute h-5 rounded-md text-[10px] font-medium text-white flex items-center px-2 overflow-hidden hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500">
                                                                <span className="truncate">{ev.title}</span>
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Legend now shows categories actually used */}
                                    <div className="flex flex-wrap gap-3 mt-6 text-xs">
                                        {Array.from(new Set(normalized.map(e=>e.category))).map(cat => {
                                            const style = getCategoryStyle(cat); return (
                                                <div key={cat} className="flex items-center gap-1"><span style={{backgroundColor:style.bar}} className="w-3 h-3 rounded-sm" /> <span className="text-gray-600">{cat}</span></div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500"><CalendarIcon className="w-4 h-4" /> Jour actuel surligné</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </AppContent>
                </div>
            </AppShell>
        </>
    );
}

// --- Helpers ---
function monthLabel(year:number, month:number){
    return new Date(year, month, 1).toLocaleDateString('fr-FR',{ month:'long', year:'numeric'});
}
function buildCalendar(year:number, month:number){
    const first = new Date(year, month, 1);
    const last = new Date(year, month+1,0);
    // Monday-based index (0..6)
    const startIdx = (first.getDay()+6)%7;
    const totalDays = last.getDate();
    const weeks: (Date|null)[][] = [];
    let currentWeek: (Date|null)[] = Array(startIdx).fill(null);
    for(let d=1; d<= totalDays; d++){
        currentWeek.push(new Date(year, month, d));
        if(currentWeek.length===7){ weeks.push(currentWeek); currentWeek=[]; }
    }
    if(currentWeek.length){ while(currentWeek.length<7) currentWeek.push(null); weeks.push(currentWeek); }
    return weeks;
}
function sameDay(a:Date,b:Date){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function intersectsWeek(ev:NormalizedEvent, week:(Date|null)[]){
    const weekStart = week.find(d=>d)!= null ? (week.find(d=>d) as Date) : null;
    const weekEnd = [...week].reverse().find(d=>d)!= null ? ([...week].reverse().find(d=>d) as Date) : null;
    if(!weekStart || !weekEnd) return false;
    return ev.end >= startOfDay(weekStart) && ev.start <= endOfDay(weekEnd);
}
function barPosition(ev:NormalizedEvent, week:(Date|null)[]){
    let left = 0; let span = 0;
    for(let i=0;i<7;i++){
        const d = week[i];
        if(!d) continue;
        const dayStart = startOfDay(d);
        const dayEnd = endOfDay(d);
        if(ev.end < dayStart || ev.start > dayEnd) continue;
        if(span===0){ left = i; span = 1; }
        else span++;
    }
    if(span===0){ left=0; span=1; }
    return { left, span };
}
function startOfDay(d:Date){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function endOfDay(d:Date){ return new Date(d.getFullYear(), d.getMonth(), d.getDate(),23,59,59); }
