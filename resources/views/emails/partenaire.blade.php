{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\partenaire.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">CODE212</div>
        <div class="title">🤝 Nouvelle Demande de Partenariat</div>
    </div>

    <div class="urgent-note">
        <strong>📩 Opportunité partenariat :</strong> Une organisation souhaite collaborer avec CODE212 !
    </div>

    <!-- Informations de l'organisation -->
    <div class="info-section">
        <div class="info-title">🏢 Informations de l'organisation</div>
        <div class="info-item">
            <span class="info-label">Organisation :</span>
            <span class="info-value"><strong>{{ $partenaireData['nom_organisation'] }}</strong></span>
        </div>
        <div class="info-item">
            <span class="info-label">Contact principal :</span>
            <span class="info-value"><strong>{{ $partenaireData['contact_principal'] }}</strong></span>
        </div>
        <div class="info-item">
            <span class="info-label">Poste :</span>
            <span class="info-value">{{ $partenaireData['poste'] }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Email professionnel :</span>
            <span class="info-value">
                <a href="mailto:{{ $partenaireData['email_professionnel'] }}" style="color: #2196f3; text-decoration: none;">
                    {{ $partenaireData['email_professionnel'] }}
                </a>
            </span>
        </div>
        <div class="info-item">
            <span class="info-label">Téléphone :</span>
            <span class="info-value">
                <a href="tel:{{ $partenaireData['telephone'] }}" style="color: #2196f3; text-decoration: none;">
                    {{ $partenaireData['telephone'] }}
                </a>
            </span>
        </div>
        @if(!empty($partenaireData['site_web']))
        <div class="info-item">
            <span class="info-label">Site web :</span>
            <span class="info-value">
                <div class="website-link">
                    <a href="{{ $partenaireData['site_web'] }}" target="_blank" style="color: #2196f3; text-decoration: none;">
                        🌐 {{ $partenaireData['site_web'] }}
                    </a>
                </div>
            </span>
        </div>
        @endif
    </div>

    <!-- Type de partenariat et secteur -->
    <div class="info-section">
        <div class="info-title">🎯 Type de collaboration</div>
        <div style="text-align: center; margin: 15px 0;">
            <span class="type-badge">{{ $partenaireData['type_partenariat'] }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Secteur d'activité :</span>
            <span class="info-value">
                <span class="sector-badge">{{ $partenaireData['secteur_activite'] }}</span>
            </span>
        </div>
    </div>

    <!-- Description du projet -->
    <div class="project-section">
        <div class="info-title">💡 Description du projet de partenariat</div>
        <p class="project-text">
            "{{ $partenaireData['description_projet'] }}"
        </p>
    </div>

    <!-- Informations de traitement -->
    <div class="timestamp">
        <strong>🕒 Reçu le :</strong> {{ now()->format('d/m/Y à H:i') }}<br>
        <strong>📧 Répondre à :</strong> 
        <a href="mailto:{{ $partenaireData['email_professionnel'] }}?subject=Re: Demande de partenariat - {{ $partenaireData['nom_organisation'] }}" 
           style="color: #4caf50; text-decoration: none;">
            {{ $partenaireData['email_professionnel'] }}
        </a><br>
        <strong>📞 Appeler :</strong> 
        <a href="tel:{{ $partenaireData['telephone'] }}" style="color: #4caf50; text-decoration: none;">
            {{ $partenaireData['telephone'] }}
        </a>
    </div>

    <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
        <p style="margin: 0; color: #2e7d32; font-weight: 500;">
            💼 <strong>Action recommandée :</strong> Examiner la proposition et planifier un appel de découverte dans les 48h
        </p>
    </div>

    <div class="footer">
        <p>📧 Email automatique généré par le système CODE212</p>
        <p>🏫 École CODE212 - Excellence en Informatique</p>
        <p style="color: #2196f3; font-weight: 500;">Nous formons les développeurs de demain</p>
    </div>
@endsection