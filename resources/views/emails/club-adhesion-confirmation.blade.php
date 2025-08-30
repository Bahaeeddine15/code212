<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de votre demande d'adhésion - CODE212</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #e91e63;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #e91e63;
            margin-bottom: 10px;
        }
        .title {
            color: #2c3e50;
            font-size: 22px;
            margin-bottom: 10px;
        }
        .success-message {
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 25px;
            font-weight: 500;
        }
        .info-section {
            margin-bottom: 25px;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #e91e63;
        }
        .info-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .club-highlight {
            text-align: center;
            margin: 20px 0;
        }
        .club-badge {
            display: inline-block;
            background: linear-gradient(135deg, #e91e63, #9c27b0);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }
        .next-steps {
            background-color: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2196f3;
            margin-bottom: 25px;
        }
        .step {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            padding: 8px 0;
        }
        .step-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #2196f3, #21cbf3);
            color: white;
            border-radius: 50%;
            font-weight: bold;
            margin-right: 15px;
            font-size: 14px;
        }
        .contact-info {
            background-color: #f1f8ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0066cc;
            margin-bottom: 25px;
        }
        .social-links {
            text-align: center;
            margin: 25px 0;
        }
        .social-link {
            display: inline-block;
            margin: 0 10px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            border-radius: 20px;
            font-weight: 500;
            font-size: 14px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 12px;
        }
        .timeline {
            background-color: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
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
                <span><strong>Examen de votre candidature</strong> - Notre équipe va examiner votre demande et votre motivation.</span>
            </div>
            
            <div class="step">
                <span class="step-number">2</span>
                <span><strong>Réponse dans 48-72h</strong> - Vous recevrez une réponse par email avec les détails de la suite.</span>
            </div>
            
            <div class="step">
                <span class="step-number">3</span>
                <span><strong>Intégration au club</strong> - Si accepté, vous recevrez les informations pour rejoindre le club.</span>
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
                🌟 <strong>Astuce :</strong> En attendant la réponse, explorez nos autres clubs et événements sur notre site web !
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
    </div>
</body>
</html>
