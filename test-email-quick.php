<?php

require_once 'vendor/autoload.php';

// Test rapide d'envoi d'email
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

// Simuler des données de contact
$testData = [
    'prenom' => 'Test',
    'nom' => 'User',
    'email' => 'test@example.com',
    'telephone' => '+212612345678',
    'subject' => 'test',
    'message' => 'Ceci est un message de test pour vérifier que le système d\'email fonctionne correctement.'
];

try {
    echo "Test d'envoi d'email en cours...\n";
    
    // Tentative d'envoi
    Mail::to('mouadaitelhachmi94@gmail.com')->send(new ContactFormMail($testData));
    
    echo "✅ Email envoyé avec succès !\n";
} catch (Exception $e) {
    echo "❌ Erreur: " . $e->getMessage() . "\n";
}
