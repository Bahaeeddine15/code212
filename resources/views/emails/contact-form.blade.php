{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\contact-form.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">CODE212</div>
        <div class="subtitle">Center of Digital Empowerment</div>
    </div>

    <h2 style="color: #1f2937; margin-bottom: 20px;">📩 Nouveau message de contact</h2>

    <div class="content">
        <div class="field-group">
            <span class="field-label">👤 Nom complet</span>
            <div class="field-value">{{ $contactData['prenom'] }} {{ $contactData['nom'] }}</div>
        </div>

        <div class="field-group">
            <span class="field-label">📧 Email</span>
            <div class="field-value">
                <a href="mailto:{{ $contactData['email'] }}" style="color: #2563eb; text-decoration: none;">
                    {{ $contactData['email'] }}
                </a>
            </div>
        </div>

        @if($contactData['telephone'])
        <div class="field-group">
            <span class="field-label">📱 Téléphone</span>
            <div class="field-value">{{ $contactData['telephone'] }}</div>
        </div>
        @endif

        <div class="field-group">
            <span class="field-label">📋 Sujet</span>
            <div class="field-value">{{ ucfirst($contactData['subject']) }}</div>
        </div>

        <div class="field-group">
            <span class="field-label">💬 Message</span>
            <div class="message-field">
                {{ $contactData['message'] }}
            </div>
        </div>
    </div>

    <div class="timestamp">
        ⏰ Message reçu le {{ now()->format('d/m/Y à H:i') }}
    </div>

    <div class="footer">
        <p><strong>CODE212 - Center of Digital Empowerment</strong></p>
        <p>112 Bd Abdelkrim Al Khattabi, Marrakech 40000, Maroc</p>
        <p>Email: code212@uca.ac.ma | Téléphone: +212 5XX XXX XXX</p>
    </div>
@endsection