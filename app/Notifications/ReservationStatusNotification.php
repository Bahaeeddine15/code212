<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Reservation;

class ReservationStatusNotification extends Notification
{
    use Queueable;

    protected $reservation;

    /**
     * Create a new notification instance.
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $status = $this->reservation->status;
        $statusText = $status === 'approved' ? 'approuvée' : 'rejetée';
        $statusColor = $status === 'approved' ? 'success' : 'error';

        return (new MailMessage)
            ->subject("Statut de votre réservation - {$statusText}")
            ->greeting("Bonjour {$this->reservation->prenom} {$this->reservation->nom},")
            ->line("Nous vous informons que votre réservation du " . 
                   $this->reservation->date_reservation . " a été {$statusText}.")
            ->line("**Détails de votre réservation :**")
            ->line("- Numéro Apogée : {$this->reservation->num_apogee}")
            ->line("- Date de réservation : {$this->reservation->date_reservation}")
            ->line("- Description : {$this->reservation->description}")
            ->when($status === 'approved', function ($message) {
                return $message->line('🎉 Félicitations ! Votre réservation a été acceptée.')
                              ->action('Voir mes réservations', url('/reservations'));
            })
            ->when($status === 'rejected', function ($message) {
                return $message->line('😔 Malheureusement, votre réservation n\'a pas pu être acceptée.')
                              ->line('Vous pouvez faire une nouvelle demande de réservation.')
                              ->action('Faire une nouvelle réservation', url('/reservations'));
            })
            ->line('Merci de faire confiance à notre service.')
            ->salutation('Cordialement, L\'équipe Code212');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'status' => $this->reservation->status,
            'message' => "Votre réservation a été " . 
                        ($this->reservation->status === 'approved' ? 'approuvée' : 'rejetée'),
        ];
    }
}
