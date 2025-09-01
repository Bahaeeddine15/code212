@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="title" style="color: #fff;">🎉 Confirmation de Demande de Partenariat Club</div>
    </div>

    <p style="font-size: 16px; color: pink; text-align: center; margin-bottom: 25px;">
        Bonjour <strong>{{ $adhesionData['contact_principal'] }}</strong>,<br>
        <span style="color: pink">Nous avons bien reçu la demande de partenariat pour le club suivant :</span>
    </p>

    <div class="club-highlight" style="text-align: center;">
        <span class="club-badge" style="color: #fff;">{{ $adhesionData['nom_organisation'] }}</span>
    </div>
    <br>
    <!-- Récapitulatif de la demande -->
    <div class="info-section">
        <div class="info-title">📋 <span style="color: #fff">Récapitulatif de votre demande</span></div>
        <p><strong>Email :</strong> {{ $adhesionData['email'] }}</p>
        <p><strong>Téléphone :</strong> {{ $adhesionData['telephone'] }}</p>
        <p><strong>Date de soumission :</strong> {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <!-- Prochaines étapes -->
    <div class="next-steps" style="color: #fff">
        <div class="info-title" style="color:pink;">🚀 <strong>Prochaines étapes</strong></div>
        <div class="step">
            <span class="step-number">1</span>
            <span><strong>Examen de votre candidature</strong> - Notre équipe va examiner votre demande et votre
                motivation.</span>
        </div>
        <div class="step">
            <span class="step-number">2</span>
            <span><strong>Réponse dans 48-72h</strong> - Vous recevrez une réponse par email avec les détails de la
                suite.</span>
        </div>
        <div class="step">
            <span class="step-number">3</span>
            <span><strong>Partenariat</strong> - Si accepté, vous recevrez les informations pour officialiser le
                partenariat.</span>
        </div>
    </div>

    <div class="timeline" style="color: #fff">
        <strong>⏰ Délai de traitement :</strong> 48 à 72 heures ouvrables<br>
        <strong>📧 Suivi :</strong> Vous serez contacté par email pour la suite du processus
    </div>

    <div class="contact-info">
        <div class="info-title" style="color: pink;">📞 Besoin d'aide ?</div>
        <p>Si vous avez des questions concernant votre demande, n'hésitez pas à nous contacter :</p>
        <p>
            <strong>📧 Email :</strong>
            <a href="mailto:clubs@code212.ma" style="color: #0066cc; text-decoration: none;">clubs@code212.ma</a>
        </p>
        <p>
            <strong>🏫 Site web :</strong>
            <a href="https://code212.ma" style="color: #0066cc; text-decoration: none;">www.code212.ma</a>
        </p>
    </div>

    <div class="footer">
        <p>📧 Email automatique - Ne pas répondre à ce message</p>
        <p style="margin-top: 15px; font-size: 11px; color: #999;">
            Vous recevez cet email suite à votre demande de partenariat sur notre plateforme.
        </p>
    </div>
@endsection
