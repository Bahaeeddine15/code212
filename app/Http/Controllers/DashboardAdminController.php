<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Event;
use App\Models\Media;
use App\Models\Formation;
use App\Models\Competition;
use App\Models\User;
use App\Models\Etudiant;
use App\Models\Certificate;
use App\Models\Module;
use App\Models\ModuleFile;
use App\Models\ModuleCompletion;
use App\Models\FormationRegistration;
use App\Models\EventRegistration;
use App\Models\CompetitionRegistration;
use App\Models\Reservation;

class DashboardAdminController extends Controller
{
    public function index()
    {
        return inertia('dashboard_admin/dashboard', [
            'name' => auth('admin')->user()->name,
            'stats' => [
                // Articles
                'articles' => Article::count(),
                'articles_published' => Article::where('status', 'published')->count(),
                'articles_draft' => Article::where('status', 'draft')->count(),
                'articles_archived' => Article::where('status', 'archived')->count(),
                'articles_views' => Article::sum('views'),
                'articles_this_month' => Article::whereMonth('created_at', now()->month)->count(),

                // Events
                'events' => Event::count(),
                'events_finished' => Event::where('status', 'completed')->count(),
                'events_ongoing' => Event::where('status', 'ongoing')->count(),
                'events_upcoming' => Event::where('status', 'upcoming')->count(),

                // Event Registrations (participants)
                'events_participants' => EventRegistration::where('status', 'registered')->count(),

                // Media
                'media' => Media::count(),

                // Formations
                'formations' => Formation::count(),

                // Formation Registrations
                'formation_registrations' => FormationRegistration::count(),

                // Modules
                'modules' => Module::count(),

                // Module Files
                'module_files' => ModuleFile::count(),

                // Module Completions
                'module_completions' => ModuleCompletion::count(),

                // Etudiants (students)
                'etudiants' => Etudiant::count(),
                'users_new_this_month' => Etudiant::whereMonth('created_at', now()->month)->count(),

                // Certificates
                'certificates' => Certificate::count(),
            ],
            'adminEmail' => 'admin@code212.ma',
        ]);
    }
}
