{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\partenaire-confirmation.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo" style="color: #fff;">CODE212</div>
        <div class="title" style="color: #fff;">🤝 Confirmation de Demande de Partenariat</div>
    </div>

    <div class="success-message" style="color: #10b981; font-size: 18px; margin: 20px 0;">
        ✅ Merci {{ $partenaireData['nom_organisation'] }} ! Votre demande a été reçue avec succès.
    </div>

    <p style="font-size: 16px; color: #fff; text-align: center; margin-bottom: 25px;">
        Bonjour <strong>{{ $partenaireData['contact_principal'] }}</strong>,<br>
        Nous avons bien reçu votre demande de partenariat pour le type de collaboration suivant :
    </p>

    <div class="partnership-highlight" style="text-align: center; margin-bottom: 20px;">
        <span class="partnership-badge"
            style="color: #fff; background: #e91e63; padding: 6px 18px; border-radius: 8px; font-size: 16px;">
            {{ $partenaireData['type_partenariat'] }}
        </span>
    </div>

    <!-- Récapitulatif de la demande -->
    <div class="info-section" style="background: #18181b; border-radius: 8px; padding: 18px 20px; margin: 25px 0;">
        <div class="info-title" style="color: pink;">📋 Récapitulatif de votre demande</div>
        <p style="color: #fff;"><strong>Organisation :</strong> {{ $partenaireData['nom_organisation'] }}</p>
        <p style="color: #fff;"><strong>Contact :</strong> {{ $partenaireData['contact_principal'] }}
            ({{ $partenaireData['poste'] }})</p>
        <p style="color: #fff;"><strong>Email :</strong> <a href="mailto:{{ $partenaireData['email_professionnel'] }}"
                style="color: #e91e63;">{{ $partenaireData['email_professionnel'] }}</a></p>
        <p style="color: #fff;"><strong>Téléphone :</strong> <a href="tel:{{ $partenaireData['telephone'] }}"
                style="color: #e91e63;">{{ $partenaireData['telephone'] }}</a></p>
        <p style="color: #fff;"><strong>Secteur :</strong> {{ $partenaireData['secteur_activite'] }}</p>
        @if (!empty($partenaireData['site_web']))
            <p style="color: #fff;"><strong>Site web :</strong> <a href="{{ $partenaireData['site_web'] }}"
                    style="color: #2196f3;">{{ $partenaireData['site_web'] }}</a></p>
        @endif
        <p style="color: #fff;"><strong>Date de soumission :</strong> {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <!-- Prochaines étapes -->
    <div class="next-steps" style="background: #222; border-radius: 8px; padding: 18px 20px; margin-bottom: 25px;">
        <div class="info-title" style="color: pink;">🚀 Prochaines étapes</div>
        <div class="step" style="color: #fff; margin-bottom: 8px;">
            <span class="step-number" style="color: #e91e63; font-weight: bold;">1</span>
            <span><strong> Analyse de votre proposition</strong> - Notre équipe examine votre demande et évalue les
                synergies possibles.</span>
        </div>
        <div class="step" style="color: #fff; margin-bottom: 8px;">
            <span class="step-number" style="color: #e91e63; font-weight: bold;">2</span>
            <span><strong> Évaluation stratégique</strong> - Nous analysons l'alignement avec nos objectifs pédagogiques et
                stratégiques.</span>
        </div>
        <div class="step" style="color: #fff;">
            <span class="step-number" style="color: #e91e63; font-weight: bold;">3</span>
            <span><strong> Réponse personnalisée</strong> - Vous recevrez une réponse détaillée avec les modalités de
                collaboration.</span>
        </div>
    </div>

    <!-- Timeline -->
    <div class="timeline"
        style="color: #fff; background: #18181b; border-radius: 8px; padding: 14px 20px; margin-bottom: 25px;">
        <strong>⏰ Délai de traitement :</strong> 5 à 7 jours ouvrables<br>
        <strong>📧 Suivi :</strong> Vous serez contacté par notre équipe partenariats<br>
        <strong>📞 Contact prioritaire :</strong> Appel de découverte si le projet correspond à nos critères
    </div>

    <!-- Avantages potentiels -->
    <div class="benefits-section" style="background: #222; border-radius: 8px; padding: 18px 20px; margin-bottom: 25px;">
        <div class="info-title" style="color: pink;">🌟 Avantages d'un partenariat avec CODE212</div>
        <div class="benefit-item" style="color: #fff;"><span class="benefit-icon">🎓</span> Accès à un vivier de talents
            formés aux dernières technologies</div>
        <div class="benefit-item" style="color: #fff;"><span class="benefit-icon">🚀</span> Collaboration sur des projets
            innovants avec nos étudiants</div>
        <div class="benefit-item" style="color: #fff;"><span class="benefit-icon">🔬</span> Participation à la recherche et
            développement technologique</div>
        <div class="benefit-item" style="color: #fff;"><span class="benefit-icon">📈</span> Visibilité auprès de notre
            communauté tech et alumni</div>
    </div>

    <!-- Informations de contact -->
    <div class="contact-info" style="background: #18181b; border-radius: 8px; padding: 18px 20px; margin-bottom: 25px;">
        <div class="info-title" style="color: pink;">📞 Contact équipe partenariats</div>
        <p style="color: #fff;">Pour toute question concernant votre demande, n'hésitez pas à nous contacter :</p>
        <p style="color: #fff;">
            <strong>📧 Email :</strong>
            <a href="mailto:partenariats@code212.ma"
                style="color: #2196f3; text-decoration: none;">partenariats@code212.ma</a>
        </p>
        <p style="color: #fff;">
            <strong>🏫 Site web :</strong>
            <a href="https://code212.ma" style="color: #2196f3; text-decoration: none;">www.code212.ma</a>
        </p>
        <p style="color: #fff;">
            <strong>📍 Adresse :</strong> École CODE212, Casablanca, Maroc
        </p>
    </div>

    <!-- Liens sociaux -->
    <div class="social-links" style="text-align: center; margin-bottom: 25px;">
        <a href="#" class="social-link" style="color: #e91e63; margin-right: 10px;">📘 LinkedIn</a>
        <a href="#" class="social-link" style="color: #e91e63; margin-right: 10px;">💼 Entreprises</a>
        <a href="#" class="social-link" style="color: #e91e63;">🌐 Portfolio</a>
    </div>

    <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #222; border-radius: 8px;">
        <p style="margin: 0; color: #fbbf24; font-weight: 500;">
            💡 <strong>Le saviez-vous ?</strong> CODE212 a déjà établi des partenariats avec plus de 15 entreprises leaders
            du secteur tech !
        </p>
    </div>

    <div class="footer" style="color: #fff;">
        <p>📧 Email automatique - Ne pas répondre à ce message</p>
        <p>🏫 École CODE212 - Excellence en Informatique</p>
        <p style="color: #2196f3; font-weight: 500;">Nous formons les développeurs de demain</p>
        <p style="margin-top: 15px; font-size: 11px; color: #999;">
            Vous recevez cet email suite à votre demande de partenariat sur notre plateforme.
        </p>
    </div>
@endsection
