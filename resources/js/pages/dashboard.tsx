import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Users, GraduationCap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome, Student!</h1>
                    <p className="text-muted-foreground">This is your formation liste.</p>
                </div>
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Formations Card */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href={route('formations.dashboard')} className="block">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Formations</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">Découvrir</div>
                                <p className="text-xs text-muted-foreground">
                                    Explorez nos formations disponibles
                                </p>
                            </CardContent>
                        </Link>
                    </Card>

                    {/* Students Card */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Étudiants</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">Communauté</div>
                            <p className="text-xs text-muted-foreground">
                                Connectez-vous avec d'autres étudiants
                            </p>
                        </CardContent>
                    </Card>

                    {/* Certifications Card */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">Mes Certificats</div>
                            <p className="text-xs text-muted-foreground">
                                Vos accomplissements et certifications
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-6">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Commencez votre apprentissage</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Explorez nos formations et certifications pour développer vos compétences
                        </p>
                        <Button asChild size="lg">
                            <Link href={route('formations.dashboard')}>
                                Voir les formations
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
