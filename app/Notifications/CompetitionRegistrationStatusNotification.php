<?php

namespace App\Notifications;

use App\Models\CompetitionRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class CompetitionRegistrationStatusNotification extends Notification
{
    use Queueable;

    protected $registration;
    protected $status;

    /**
     * Create a new notification instance.
     */
    public function __construct(CompetitionRegistration $registration)
    {
        $this->registration = $registration;
        $this->status = $registration->status;
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
        $competition = $this->registration->competition;
        
        return (new MailMessage)
            ->subject($this->getEmailSubject())
            ->view('emails.competition-notification', [
                'subject' => $this->getEmailSubject(),
                'status' => $this->status,
                'participantName' => $this->registration->participant_name,
                'participantEmail' => $this->registration->email,
                'participantPhone' => $this->registration->phone,
                'participantClub' => $this->registration->club,
                'competitionTitle' => $competition->title,
                'competitionDate' => $competition->date ? Carbon::parse($competition->date)->format('d/m/Y') : 'Date à définir',
                'competitionLocation' => $competition->location,
                'competitionCategory' => $competition->category,
                'actionUrl' => $this->getActionUrl($competition),
            ]);
    }

    /**
     * Get the email subject based on status.
     */
    private function getEmailSubject(): string
    {
        $competition = $this->registration->competition;
        
        switch ($this->status) {
            case 'Confirmé':
                return '🎉 Inscription acceptée - ' . $competition->title;
            case 'Refusé':
                return '📋 Inscription non retenue - ' . $competition->title;
            default:
                return '📝 Inscription reçue - ' . $competition->title;
        }
    }

    /**
     * Get the action URL based on status.
     */
    private function getActionUrl($competition): string
    {
        if ($this->status === 'Refusé') {
            return url('/competition');
        }
        
        return url('/competition/' . $competition->id);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'registration_id' => $this->registration->id,
            'competition_id' => $this->registration->competition_id,
            'status' => $this->status,
            'participant_name' => $this->registration->participant_name,
            'competition_title' => $this->registration->competition->title,
        ];
    }
}