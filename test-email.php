<?php

require_once __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Reservation;
use App\Models\NotifiableUser;
use App\Notifications\ReservationStatusNotification;

// Créer une réservation de test
$reservation = new Reservation();
$reservation->nom = 'Doe';
$reservation->prenom = 'John';
$reservation->email = 'test@example.com';
$reservation->num_apogee = '12345678';
$reservation->date_reservation = '2025-08-25';
$reservation->description = 'Test de réservation avec nouveau design email';
$reservation->status = 'pending';
$reservation->resource_type = 'local';
$reservation->location_type = 'salle_conference';
$reservation->room_details = 'Salle des conférences';
$reservation->telephone = '0612345678';
$reservation->save();

echo "Réservation créée avec ID: " . $reservation->id . PHP_EOL;

// Tester l'envoi d'email d'approbation
$reservation->status = Reservation::STATUS_APPROVED;
$reservation->save();

try {
    $notifiableUser = new NotifiableUser($reservation->email, $reservation->prenom . ' ' . $reservation->nom);
    $notifiableUser->notify(new ReservationStatusNotification($reservation));
    echo "Email d'approbation envoyé avec succès !" . PHP_EOL;
} catch (Exception $e) {
    echo "Erreur lors de l'envoi de l'email: " . $e->getMessage() . PHP_EOL;
}

// Tester l'envoi d'email de rejet
$reservation->status = Reservation::STATUS_REJECTED;
$reservation->save();

try {
    $notifiableUser = new NotifiableUser($reservation->email, $reservation->prenom . ' ' . $reservation->nom);
    $notifiableUser->notify(new ReservationStatusNotification($reservation));
    echo "Email de rejet envoyé avec succès !" . PHP_EOL;
} catch (Exception $e) {
    echo "Erreur lors de l'envoi de l'email: " . $e->getMessage() . PHP_EOL;
}

echo "Test terminé !" . PHP_EOL;
