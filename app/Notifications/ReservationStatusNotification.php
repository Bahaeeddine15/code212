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
        $studentName = $this->reservation->prenom . ' ' . $this->reservation->nom;
        
        if ($status === Reservation::STATUS_APPROVED) {
            return $this->buildApprovedEmail($studentName);
        } elseif ($status === Reservation::STATUS_REJECTED) {
            return $this->buildRejectedEmail($studentName);
        }
        
        return $this->buildPendingEmail($studentName);
    }

    private function buildApprovedEmail($studentName)
    {
        $resourceInfo = $this->getResourceInfo();
        
        return (new MailMessage)
            ->subject('✅ Réservation Approuvée - CODE212-UCA')
            ->view('emails.reservation-notification', [
                'subject' => '✅ Réservation Approuvée',
                'greeting' => 'Bonjour ' . $studentName . ',',
                'introMessage' => 'Nous avons le plaisir de vous informer que votre demande de réservation a été <strong>approuvée</strong> !',
                'reservation' => $this->reservation,
                'resourceInfo' => $resourceInfo,
                'statusClass' => 'status-approved',
                'statusMessage' => '🎉 <strong>Félicitations !</strong> Votre réservation est maintenant confirmée. Vous pouvez vous présenter à la date prévue.',
                'importantNote' => 'Veuillez vous présenter à l\'heure avec votre <strong>carte d\'étudiant</strong>.',
                'actionUrl' => url('/reservations'),
                'actionText' => 'Voir mes réservations',
                'closingMessage' => 'Merci de faire confiance à CODE212-UCA !'
            ]);
    }

    private function buildRejectedEmail($studentName)
    {
        $resourceInfo = $this->getResourceInfo();
        
        return (new MailMessage)
            ->subject('❌ Réservation Non Approuvée - CODE212-UCA')
            ->view('emails.reservation-notification', [
                'subject' => '❌ Réservation Non Approuvée',
                'greeting' => 'Bonjour ' . $studentName . ',',
                'introMessage' => 'Nous vous informons que votre demande de réservation n\'a malheureusement pas pu être approuvée.',
                'reservation' => $this->reservation,
                'resourceInfo' => $resourceInfo,
                'statusClass' => 'status-rejected',
                'statusMessage' => '😔 Nous nous excusons pour ce désagrément.',
                'reasonsList' => [
                    'Ressource non disponible à la date demandée',
                    'Conflit avec d\'autres réservations',
                    'Informations incomplètes',
                    'Politique de réservation non respectée'
                ],
                'actionsList' => [
                    'Faire une nouvelle demande pour une autre date',
                    'Contacter l\'administration pour plus d\'informations'
                ],
                'actionUrl' => url('/reservations'),
                'actionText' => 'Faire une nouvelle réservation',
                'closingMessage' => 'Merci de votre compréhension.'
            ]);
    }

    private function buildPendingEmail($studentName)
    {
        return (new MailMessage)
            ->subject('⏳ Réservation en Attente - CODE212-UCA')
            ->view('emails.reservation-notification', [
                'subject' => '⏳ Réservation en Attente',
                'greeting' => 'Bonjour ' . $studentName . ',',
                'introMessage' => 'Votre demande de réservation est en cours de traitement.',
                'reservation' => $this->reservation,
                'resourceInfo' => $this->getResourceInfo(),
                'statusClass' => 'status-pending',
                'statusMessage' => 'Vous recevrez une notification dès qu\'elle sera traitée.',
                'closingMessage' => 'Merci de votre patience.'
            ]);
    }

    private function getResourceInfo()
    {
        $resourceType = $this->reservation->resource_type;
        $locationType = $this->reservation->location_type;
        $roomDetails = $this->reservation->room_details;

        if ($resourceType === 'pc') {
            return '💻 Poste (PC)';
        } elseif ($resourceType === 'local') {
            if ($locationType === 'salle_conference') {
                return '🏢 Local - Salle de conférence';
            } elseif ($locationType === 'salle_reunion') {
                $etage = '';
                if ($roomDetails === '1er_etage') {
                    $etage = ' (1er étage)';
                } elseif ($roomDetails === '2eme_etage') {
                    $etage = ' (2ème étage)';
                } elseif ($roomDetails === '3eme_etage') {
                    $etage = ' (3ème étage)';
                }
                return '🏢 Local - Salle de réunion' . $etage;
            }
            return '🏢 Local';
        }
        
        return 'Ressource non spécifiée';
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
