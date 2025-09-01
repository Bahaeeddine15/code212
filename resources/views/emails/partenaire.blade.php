{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\partenaire.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo" style="color: #fff;">CODE212</div>
        <div class="title" style="color: #fff;">🤝 Nouvelle Demande de Partenariat</div>
    </div>

    <div class="urgent-note" style="color: pink;">
        <strong>📩 Opportunité partenariat :</strong> Une organisation souhaite collaborer avec CODE212 !
    </div>

    <!-- Informations de l'organisation -->
    <div class="info-section">
        <div class="info-title" style="color: pink;">🏢 Informations de l'organisation</div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Organisation :</span>
            <span class="info-value" style="color: #fff;"><strong>{{ $partenaireData['nom_organisation'] }}</strong></span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Contact principal :</span>
            <span class="info-value" style="color: #fff;"><strong>{{ $partenaireData['contact_principal'] }}</strong></span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Poste :</span>
            <span class="info-value" style="color: #fff;">{{ $partenaireData['poste'] }}</span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Email professionnel :</span>
            <span class="info-value">
                <a href="mailto:{{ $partenaireData['email_professionnel'] }}"
                    style="color: #e91e63; text-decoration: none;">
                    {{ $partenaireData['email_professionnel'] }}
                </a>
            </span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Téléphone :</span>
            <span class="info-value">
                <a href="tel:{{ $partenaireData['telephone'] }}" style="color: #e91e63; text-decoration: none;">
                    {{ $partenaireData['telephone'] }}
                </a>
            </span>
        </div>
        @if (!empty($partenaireData['site_web']))
            <div class="info-item">
                <span class="info-label" style="color: #fff;">Site web :</span>
                <span class="info-value">
                    <div class="website-link">
                        <a href="{{ $partenaireData['site_web'] }}" target="_blank"
                            style="color: #e91e63; text-decoration: none;">
                            🌐 {{ $partenaireData['site_web'] }}
                        </a>
                    </div>
                </span>
            </div>
        @endif
    </div>

    <!-- Type de partenariat et secteur -->
    <div class="info-section">
        <div class="info-title" style="color: pink;">🎯 Type de collaboration</div>
        <div style="text-align: center; margin: 15px 0;">
            <span class="type-badge"
                style="color: #fff; background: #e91e63; padding: 4px 12px; border-radius: 6px;">{{ $partenaireData['type_partenariat'] }}</span>
        </div>
        <div class="info-item">
            <span class="info-label" style="color: #fff;">Secteur d'activité :</span>
            <span class="info-value">
                <span class="sector-badge"
                    style="color: #fff; background: #9333ea; padding: 4px 12px; border-radius: 6px;">{{ $partenaireData['secteur_activite'] }}</span>
            </span>
        </div>
    </div>

    <!-- Description du projet -->
    <div class="project-section">
        <div class="info-title" style="color: pink;">💡 Description du projet de partenariat</div>
        <p class="project-text" style="color: #fff;">
            "{{ $partenaireData['description_projet'] }}"
        </p>
    </div>

    <!-- Informations de traitement -->
    <div class="timestamp" style="color: #fff;">
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

    <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #222; border-radius: 8px;">
        <p style="margin: 0; color: #2e7d32; font-weight: 500;">
            💼 <strong>Action recommandée :</strong> Examiner la proposition et planifier un appel de découverte dans les
            48h
        </p>
    </div>

    <div class="footer">
        <p style="color: #fff;">📧 Email automatique généré par le système CODE212</p>
        <p style="color: #fff;">🏫 École CODE212 - Excellence en Informatique</p>
        <p style="color: #e91e63; font-weight: 500;">Nous formons les développeurs de demain</p>
    </div>
@endsection
