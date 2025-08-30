<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class PartenaireMail extends Mailable
{
    use Queueable, SerializesModels;

    public $partenaireData;

    /**
     * Create a new message instance.
     */
    public function __construct($partenaireData)
    {
        $this->partenaireData = $partenaireData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle demande de partenariat - CODE212',
            from: new Address(env('MAIL_FROM_ADDRESS'), $this->partenaireData['nom_organisation'] . ' (via CODE212)'),
            replyTo: $this->partenaireData['email_professionnel'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.partenaire',
            with: ['partenaireData' => $this->partenaireData],
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
