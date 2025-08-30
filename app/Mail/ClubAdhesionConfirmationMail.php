<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ClubAdhesionConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $adhesionData;

    /**
     * Create a new message instance.
     */
    public function __construct($adhesionData)
    {
        $this->adhesionData = $adhesionData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation de votre demande d\'adhésion - CODE212',
            from: new Address(env('MAIL_FROM_ADDRESS'), 'CODE212'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.club-adhesion-confirmation',
            with: ['adhesionData' => $this->adhesionData],
        );
    }

    /**
     * Get the message attachments.
     */
    public function attachments(): array
    {
        return [];
    }
}
