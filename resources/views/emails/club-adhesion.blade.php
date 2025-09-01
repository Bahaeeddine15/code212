{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\club-adhesion.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="title" style="color: #fff;">🤝 Nouvelle Demande de Partenariat Club</div>
    </div>

    <div class="info-section">
        <div class="info-title" style="color: pink;">📝 Informations du club</div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Nom du club :</span>
            <span class="info-value" style="color: #fff;"><strong>{{ $adhesionData['nom_organisation'] }}</strong></span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Responsable :</span>
            <span class="info-value" style="color: #fff;">{{ $adhesionData['contact_principal'] }}</span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Email :</span>
            <span class="info-value">
                <a href="mailto:{{ $adhesionData['email'] }}" style="color: #e91e63; text-decoration: none;">
                    {{ $adhesionData['email'] }}
                </a>
            </span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Téléphone :</span>
            <span class="info-value">
                <a href="tel:{{ $adhesionData['telephone'] }}" style="color: #e91e63; text-decoration: none;">
                    {{ $adhesionData['telephone'] }}
                </a>
            </span>
        </div>
    </div>

    <div class="motivation-section">
        <div class="info-title" style="color: pink;">🎯 Projet / Motivation du partenariat</div>
        <p class="motivation-text" style="color: #fff;">
            "{{ $adhesionData['description_projet'] }}"
        </p>
    </div>

    <div class="timestamp" style="color: #fff;">
        <strong>🕒 Reçu le :</strong> {{ now()->format('d/m/Y à H:i') }}<br>
        <strong>📧 Répondre à :</strong>
        <a href="mailto:{{ $adhesionData['email'] }}?subject=Re: Demande de partenariat club - {{ $adhesionData['nom_organisation'] }}"
            style="color: #4caf50; text-decoration: none;">
            {{ $adhesionData['email'] }}
        </a>
    </div>

    <div class="footer">
        <p style="color: #fff;">📧 Email automatique généré par le système CODE212</p>
    </div>
@endsection
