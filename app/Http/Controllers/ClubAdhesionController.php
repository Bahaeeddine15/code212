<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ClubAdhesionMail;
use App\Mail\ClubAdhesionConfirmationMail;
use Illuminate\Support\Facades\Log;

class ClubAdhesionController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'prenom' => 'required|string|max:255',
                'nom' => 'required|string|max:255', 
                'email' => 'required|email|max:255',
                'telephone' => 'required|string|max:20',
                'club_interesse' => 'required|string|max:255',
                'niveau_etude' => 'required|string|max:255',
                'motivation' => 'required|string|max:2000',
            ]);

            // Envoi de l'email principal à l'admin CODE212
            Mail::to(env('MAIL_FROM_ADDRESS', 'contact@code212.ma'))->send(new ClubAdhesionMail($validated));

            // Email de confirmation à l'étudiant
            Mail::to($validated['email'])->send(new ClubAdhesionConfirmationMail($validated));

            // Log du succès
            Log::info('Demande d\'adhésion club envoyée avec succès', [
                'email' => $validated['email'],
                'nom' => $validated['nom'] . ' ' . $validated['prenom'],
                'club' => $validated['club_interesse']
            ]);

            return redirect()->route('clubs.partners')
                ->with('club_success', '✅ Votre demande d\'adhésion a été envoyée avec succès ! Nous examinerons votre candidature et vous répondrons dans les plus brefs délais. Un email de confirmation vous a été envoyé.');

        } catch (\Exception $e) {
            // Log de l'erreur
            Log::error('Erreur lors de l\'envoi de la demande d\'adhésion club', [
                'error' => $e->getMessage(),
                'email' => $request->email ?? 'Non défini',
                'club' => $request->club_interesse ?? 'Non défini'
            ]);

            return redirect()->route('clubs.partners')
                ->with('club_error', '❌ Une erreur est survenue lors de l\'envoi de votre demande d\'adhésion. Veuillez réessayer ou nous contacter directement.')
                        ->withInput();
        }
    }
}
