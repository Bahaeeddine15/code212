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
            // Validation des données pour club partenaire
            $validated = $request->validate([
                'nom_organisation' => 'required|string|max:255',
                'contact_principal' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'telephone' => 'required|string|max:20',
                'description_projet' => 'required|string|max:2000',
            ]);

            // Envoi de l'email principal à l'admin CODE212
            Mail::to(env('MAIL_FROM_ADDRESS', 'contact@code212.ma'))->send(new ClubAdhesionMail($validated));

            // Email de confirmation au club
            Mail::to($validated['email'])->send(new ClubAdhesionConfirmationMail($validated));

            Log::info('Demande de partenariat club envoyée avec succès', [
                'email' => $validated['email'],
                'club' => $validated['nom_organisation'],
            ]);

            return redirect()->route('clubs.partners')
                ->with('club_success', '✅ Votre demande de partenariat a été envoyée avec succès ! Nous examinerons votre candidature et vous répondrons dans les plus brefs délais. Un email de confirmation vous a été envoyé.');
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi de la demande de partenariat club', [
                'error' => $e->getMessage(),
                'email' => $request->email ?? 'Non défini',
                'club' => $request->nom_organisation ?? 'Non défini'
            ]);

            return redirect()->route('clubs.partners')
                ->with('club_error', '❌ Une erreur est survenue lors de l\'envoi de votre demande de partenariat. Veuillez réessayer ou nous contacter directement.')
                ->withInput();
        }
    }
}
