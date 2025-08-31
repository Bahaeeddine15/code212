@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">CODE212</div>
        <div class="title">🎉 Confirmation de Demande d'Adhésion</div>
    </div>

    <div class="success-message">
        ✅ Félicitations {{ $adhesionData['prenom'] }} ! Votre demande a été reçue avec succès.
    </div>

    <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 25px;">
        Bonjour <strong>{{ $adhesionData['prenom'] }} {{ $adhesionData['nom'] }}</strong>,<br>
        Nous avons bien reçu votre demande d'adhésion au club suivant :
    </p>

    <div class="club-highlight">
        <span class="club-badge">{{ $adhesionData['club_interesse'] }}</span>
    </div>

    <!-- Récapitulatif de la demande -->
    <div class="info-section">
        <div class="info-title">📋 Récapitulatif de votre demande</div>
        <p><strong>Email :</strong> {{ $adhesionData['email'] }}</p>
        <p><strong>Téléphone :</strong> {{ $adhesionData['telephone'] }}</p>
        <p><strong>Niveau d'étude :</strong> {{ $adhesionData['niveau_etude'] }}</p>
        <p><strong>Date de soumission :</strong> {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <!-- Prochaines étapes -->
    <div class="next-steps">
        <div class="info-title">🚀 Prochaines étapes</div>

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
            <span><strong>Intégration au club</strong> - Si accepté, vous recevrez les informations pour rejoindre le
                club.</span>
        </div>
    </div>

    <!-- Timeline -->
    <div class="timeline">
        <strong>⏰ Délai de traitement :</strong> 48 à 72 heures ouvrables<br>
        <strong>📧 Suivi :</strong> Vous serez contacté par email pour la suite du processus
    </div>

    <!-- Informations de contact -->
    <div class="contact-info">
        <div class="info-title">📞 Besoin d'aide ?</div>
        <p>Si vous avez des questions concernant votre demande d'adhésion, n'hésitez pas à nous contacter :</p>
        <p>
            <strong>📧 Email :</strong>
            <a href="mailto:clubs@code212.ma" style="color: #0066cc; text-decoration: none;">clubs@code212.ma</a>
        </p>
        <p>
            <strong>🏫 Site web :</strong>
            <a href="https://code212.ma" style="color: #0066cc; text-decoration: none;">www.code212.ma</a>
        </p>
    </div>

    <!-- Liens sociaux -->
    <div class="social-links">
        <a href="#" class="social-link">📘 Facebook</a>
        <a href="#" class="social-link">📷 Instagram</a>
        <a href="#" class="social-link">💼 LinkedIn</a>
    </div>

    <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #fff3cd; border-radius: 8px;">
        <p style="margin: 0; color: #856404; font-weight: 500;">
            🌟 <strong>Astuce :</strong> En attendant la réponse, explorez nos autres clubs et événements sur notre site web
            !
        </p>
    </div>

    <div class="footer">
        <p>📧 Email automatique - Ne pas répondre à ce message</p>
        <p>🏫 École CODE212 - Excellence en Informatique</p>
        <p style="color: #e91e63; font-weight: 500;">Nous formons les développeurs de demain</p>
        <p style="margin-top: 15px; font-size: 11px; color: #999;">
            Vous recevez cet email suite à votre demande d'adhésion sur notre plateforme.
        </p>
    </div>
@endsection
