import { AppContent } from '@/components/layout/app-content';
import { AppShell } from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/app-sidebar-header';


interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    category: string;
    max_attendees: number;
    status: string;
}

interface Props {
    events: Event[];
}

export default function Events({ events }: Props) {
    const breadcrumbs = [
        { title: 'Accueil', href: '/dashboard' },
        { title: 'Événements', href: '/events' }
    ];

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                
                <div className='p-6'>
                    <h1 className='text-3xl font-bold mb-4'>Events</h1>
                    
                    <div className='grid gap-4'>
                        {events.length > 0 ? (
                            events.map((event) => (

                                <div key={event.id} className='flex-1 border border-black p-3 rounded-lg'>
                                    <h3 className='font-bold text-lg mb-2'>{event.title}</h3>
                                    <p className='text-base mb-2'>{event.description}</p>
                                    <div className='text-sm text-gray-600'>
                                        <p>📍 {event.location}</p>
                                        <p>📅 {new Date(event.start_date).toLocaleDateString()}</p>
                                        <p>👥 Max: {event.max_attendees} participants</p>
                                        <p>🏷️ {event.category}</p>
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                            event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='text-center text-gray-500 w-full'>
                                <p>Aucun événement disponible</p>
                            </div>
                        )}
                    </div>
                </div> 
            </AppContent>
        </AppShell>
    );
}
