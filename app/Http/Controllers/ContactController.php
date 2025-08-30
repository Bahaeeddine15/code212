<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'prenom' => 'required|string|max:255',
                'nom' => 'required|string|max:255', 
                'email' => 'required|email|max:255',
                'telephone' => 'nullable|string|max:20',
                'subject' => 'required|string|max:255',
                'message' => 'required|string|max:2000',
            ]);

            // Envoi de l'email principal à CODE212
            Mail::to(env('MAIL_FROM_ADDRESS', 'contact@code212.ma'))->send(new ContactFormMail($validated));

            // Email de confirmation à l'expéditeur
            Mail::to($validated['email'])->send(new \App\Mail\ContactConfirmationMail($validated));

            // Log du succès
            Log::info('Email de contact envoyé avec succès', [
                'email' => $validated['email'],
                'nom' => $validated['nom'] . ' ' . $validated['prenom']
            ]);

            return back()->with('success', '✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais. Un email de confirmation vous a été envoyé.');

        } catch (\Exception $e) {
            // Log de l'erreur
            Log::error('Erreur lors de l\'envoi de l\'email de contact', [
                'error' => $e->getMessage(),
                'email' => $request->email ?? 'Non défini'
            ]);

            return back()->with('error', '❌ Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ou nous contacter directement.')
                        ->withInput();
        }
    }
}
