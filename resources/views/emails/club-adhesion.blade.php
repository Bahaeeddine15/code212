{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\club-adhesion.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">CODE212</div>
        <div class="title">🎯 Nouvelle Demande d'Adhésion Club</div>
    </div>

    <div class="urgent-note">
        <strong>📩 Action requise :</strong> Un étudiant souhaite rejoindre un club !
    </div>

    <!-- Informations de l'étudiant -->
    <div class="info-section">
        <div class="info-title">👤 Informations de l'étudiant</div>
        <div class="info-item">
            <span class="info-label">Nom complet :</span>
            <span class="info-value"><strong>{{ $adhesionData['prenom'] }} {{ $adhesionData['nom'] }}</strong></span>
        </div>
        <div class="info-item">
            <span class="info-label">Email :</span>
            <span class="info-value">
                <a href="mailto:{{ $adhesionData['email'] }}" style="color: #e91e63; text-decoration: none;">
                    {{ $adhesionData['email'] }}
                </a>
            </span>
        </div>
        <div class="info-item">
            <span class="info-label">Téléphone :</span>
            <span class="info-value">
                <a href="tel:{{ $adhesionData['telephone'] }}" style="color: #e91e63; text-decoration: none;">
                    {{ $adhesionData['telephone'] }}
                </a>
            </span>
        </div>
        <div class="info-item">
            <span class="info-label">Niveau d'étude :</span>
            <span class="info-value">
                <span class="level-badge">{{ $adhesionData['niveau_etude'] }}</span>
            </span>
        </div>
    </div>

    <!-- Club d'intérêt -->
    <div class="info-section">
        <div class="info-title">🎯 Club d'intérêt</div>
        <div style="text-align: center; margin: 15px 0;">
            <span class="club-badge">{{ $adhesionData['club_interesse'] }}</span>
        </div>
    </div>

    <!-- Motivation -->
    <div class="motivation-section">
        <div class="info-title">💭 Motivation de l'étudiant</div>
        <p class="motivation-text">
            "{{ $adhesionData['motivation'] }}"
        </p>
    </div>

    <!-- Informations de traitement -->
    <div class="timestamp">
        <strong>🕒 Reçu le :</strong> {{ now()->format('d/m/Y à H:i') }}<br>
        <strong>📧 Répondre à :</strong> 
        <a href="mailto:{{ $adhesionData['email'] }}?subject=Re: Demande d'adhésion - {{ $adhesionData['club_interesse'] }}" 
           style="color: #4caf50; text-decoration: none;">
            {{ $adhesionData['email'] }}
        </a>
    </div>

    <div class="footer">
        <p>📧 Email automatique généré par le système CODE212</p>
        <p>🏫 École CODE212 - Excellence en Informatique</p>
        <p style="color: #e91e63; font-weight: 500;">Nous formons les développeurs de demain</p>
    </div>
@endsection