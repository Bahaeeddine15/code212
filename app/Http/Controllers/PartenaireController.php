<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\PartenaireMail;
use App\Mail\PartenaireConfirmationMail;
use Illuminate\Support\Facades\Log;

class PartenaireController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'nom_organisation' => 'required|string|max:255',
                'contact_principal' => 'required|string|max:255',
                'poste' => 'required|string|max:255',
                'email_professionnel' => 'required|email|max:255',
                'telephone' => 'required|string|max:20',
                'type_partenariat' => 'required|string|max:255',
                'secteur_activite' => 'required|string|max:255',
                'description_projet' => 'required|string|max:2000',
                'site_web' => 'nullable|url|max:255',
            ]);

            // Envoi de l'email principal à l'admin CODE212
            Mail::to(env('MAIL_FROM_ADDRESS', 'contact@code212.ma'))->send(new PartenaireMail($validated));

            // Email de confirmation à l'organisation
            Mail::to($validated['email_professionnel'])->send(new PartenaireConfirmationMail($validated));

            // Log du succès
            Log::info('Demande de partenariat envoyée avec succès', [
                'email' => $validated['email_professionnel'],
                'organisation' => $validated['nom_organisation'],
                'type' => $validated['type_partenariat']
            ]);

            return redirect()->route('clubs.partners')
                ->with('partenaire_success', '✅ Votre demande de partenariat a été envoyée avec succès ! Nous examinerons votre proposition et vous répondrons dans les plus brefs délais. Un email de confirmation vous a été envoyé.');

        } catch (\Exception $e) {
            // Log de l'erreur
            Log::error('Erreur lors de l\'envoi de la demande de partenariat', [
                'error' => $e->getMessage(),
                'email' => $request->email_professionnel ?? 'Non défini',
                'organisation' => $request->nom_organisation ?? 'Non défini'
            ]);

            return redirect()->route('clubs.partners')
                ->with('partenaire_error', '❌ Une erreur est survenue lors de l\'envoi de votre demande de partenariat. Veuillez réessayer ou nous contacter directement.')
                        ->withInput();
        }
    }
}
