{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\partenaire-confirmation.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">CODE212</div>
        <div class="title">🤝 Confirmation de Demande de Partenariat</div>
    </div>

    <div class="success-message">
        ✅ Merci {{ $partenaireData['nom_organisation'] }} ! Votre demande a été reçue avec succès.
    </div>

    <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 25px;">
        Bonjour <strong>{{ $partenaireData['contact_principal'] }}</strong>,<br>
        Nous avons bien reçu votre demande de partenariat pour le type de collaboration suivant :
    </p>

    <div class="partnership-highlight">
        <span class="partnership-badge">{{ $partenaireData['type_partenariat'] }}</span>
    </div>

    <!-- Récapitulatif de la demande -->
    <div class="info-section">
        <div class="info-title">📋 Récapitulatif de votre demande</div>
        <p><strong>Organisation :</strong> {{ $partenaireData['nom_organisation'] }}</p>
        <p><strong>Contact :</strong> {{ $partenaireData['contact_principal'] }} ({{ $partenaireData['poste'] }})</p>
        <p><strong>Email :</strong> {{ $partenaireData['email_professionnel'] }}</p>
        <p><strong>Téléphone :</strong> {{ $partenaireData['telephone'] }}</p>
        <p><strong>Secteur :</strong> {{ $partenaireData['secteur_activite'] }}</p>
        @if(!empty($partenaireData['site_web']))
        <p><strong>Site web :</strong> <a href="{{ $partenaireData['site_web'] }}" style="color: #2196f3;">{{ $partenaireData['site_web'] }}</a></p>
        @endif
        <p><strong>Date de soumission :</strong> {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <!-- Prochaines étapes -->
    <div class="next-steps">
        <div class="info-title">🚀 Prochaines étapes</div>
        
        <div class="step">
            <span class="step-number">1</span>
            <span><strong>Analyse de votre proposition</strong> - Notre équipe examine votre demande et évalue les synergies possibles.</span>
        </div>
        
        <div class="step">
            <span class="step-number">2</span>
            <span><strong>Évaluation stratégique</strong> - Nous analysons l'alignement avec nos objectifs pédagogiques et stratégiques.</span>
        </div>
        
        <div class="step">
            <span class="step-number">3</span>
            <span><strong>Réponse personnalisée</strong> - Vous recevrez une réponse détaillée avec les modalités de collaboration.</span>
        </div>
    </div>

    <!-- Timeline -->
    <div class="timeline">
        <strong>⏰ Délai de traitement :</strong> 5 à 7 jours ouvrables<br>
        <strong>📧 Suivi :</strong> Vous serez contacté par notre équipe partenariats<br>
        <strong>📞 Contact prioritaire :</strong> Appel de découverte si le projet correspond à nos critères
    </div>

    <!-- Avantages potentiels -->
    <div class="benefits-section">
        <div class="info-title">🌟 Avantages d'un partenariat avec CODE212</div>
        
        <div class="benefit-item">
            <span class="benefit-icon">🎓</span>
            <span>Accès à un vivier de talents formés aux dernières technologies</span>
        </div>
        
        <div class="benefit-item">
            <span class="benefit-icon">🚀</span>
            <span>Collaboration sur des projets innovants avec nos étudiants</span>
        </div>
        
        <div class="benefit-item">
            <span class="benefit-icon">🔬</span>
            <span>Participation à la recherche et développement technologique</span>
        </div>
        
        <div class="benefit-item">
            <span class="benefit-icon">📈</span>
            <span>Visibilité auprès de notre communauté tech et alumni</span>
        </div>
    </div>

    <!-- Informations de contact -->
    <div class="contact-info">
        <div class="info-title">📞 Contact équipe partenariats</div>
        <p>Pour toute question concernant votre demande, n'hésitez pas à nous contacter :</p>
        <p>
            <strong>📧 Email :</strong> 
            <a href="mailto:partenariats@code212.ma" style="color: #0066cc; text-decoration: none;">partenariats@code212.ma</a>
        </p>
        <p>
            <strong>🏫 Site web :</strong> 
            <a href="https://code212.ma" style="color: #0066cc; text-decoration: none;">www.code212.ma</a>
        </p>
        <p>
            <strong>📍 Adresse :</strong> École CODE212, Casablanca, Maroc
        </p>
    </div>

    <!-- Liens sociaux -->
    <div class="social-links">
        <a href="#" class="social-link">📘 LinkedIn</a>
        <a href="#" class="social-link">💼 Entreprises</a>
        <a href="#" class="social-link">🌐 Portfolio</a>
    </div>

    <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #fff3cd; border-radius: 8px;">
        <p style="margin: 0; color: #856404; font-weight: 500;">
            💡 <strong>Le saviez-vous ?</strong> CODE212 a déjà établi des partenariats avec plus de 15 entreprises leaders du secteur tech !
        </p>
    </div>

    <div class="footer">
        <p>📧 Email automatique - Ne pas répondre à ce message</p>
        <p>🏫 École CODE212 - Excellence en Informatique</p>
        <p style="color: #2196f3; font-weight: 500;">Nous formons les développeurs de demain</p>
        <p style="margin-top: 15px; font-size: 11px; color: #999;">
            Vous recevez cet email suite à votre demande de partenariat sur notre plateforme.
        </p>
    </div>
@endsection