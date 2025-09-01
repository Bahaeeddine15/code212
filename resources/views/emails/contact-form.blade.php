{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\contact-form.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo" style="color: #fff;">CODE212</div>
        <div class="subtitle" style="color: #fff;">Center of Digital Empowerment</div>
    </div>

    <h2 style="color: pink; margin-bottom: 20px;">📩 Nouveau message de contact</h2>

    <div class="content" style="color: #fff;">
        <div class="field-group">
            <span class="field-label" style="color: #fff;">👤 Nom complet</span>
            <div class="field-value" style="color: #fff;">{{ $contactData['prenom'] }} {{ $contactData['nom'] }}</div>
        </div>

        <div class="field-group">
            <span class="field-label" style="color: #fff;">📧 Email</span>
            <div class="field-value">
                <a href="mailto:{{ $contactData['email'] }}" style="color: #e91e63; text-decoration: none;">
                    {{ $contactData['email'] }}
                </a>
            </div>
        </div>

        @if ($contactData['telephone'])
            <div class="field-group">
                <span class="field-label" style="color: #fff;">📱 Téléphone</span>
                <div class="field-value" style="color: #fff;">{{ $contactData['telephone'] }}</div>
            </div>
        @endif

        <div class="field-group">
            <span class="field-label" style="color: #fff;">📋 Sujet</span>
            <div class="field-value" style="color: #fff;">{{ ucfirst($contactData['subject']) }}</div>
        </div>

        <div class="field-group">
            <span class="field-label" style="color: #fff;">💬 Message</span>
            <div class="message-field"
                style="color: #fff; border-left: 3px solid #e91e63; padding-left: 12px; margin-top: 8px;">
                {{ $contactData['message'] }}
            </div>
        </div>
    </div>

    <div class="timestamp" style="color: #fff; margin-top: 20px;">
        ⏰ Message reçu le {{ now()->format('d/m/Y à H:i') }}
    </div>

    <div class="footer" style="color: #bbb; margin-top: 30px;">
        <p><strong style="color: #fff;">CODE212 - Center of Digital Empowerment</strong></p>
        <p>112 Bd Abdelkrim Al Khattabi, Marrakech 40000, Maroc</p>
        <p>Email: <span style="color: #fff;">code212@uca.ac.ma</span> | Téléphone: <span style="color: #fff;">+212 5XX XXX
                XXX</span></p>
    </div>
@endsection
