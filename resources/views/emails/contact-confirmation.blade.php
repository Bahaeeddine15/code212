<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de votre message - CODE212</title>
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
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #10b981;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
        }
        .success-icon {
            background-color: #10b981;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin: 20px auto;
        }
        .content {
            margin: 20px 0;
            text-align: center;
        }
        .greeting {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 20px;
        }
        .message-summary {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
            margin: 20px 0;
            text-align: left;
        }
        .field-group {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: bold;
            color: #374151;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .field-value {
            color: #1f2937;
            font-size: 16px;
            margin-top: 5px;
        }
        .next-steps {
            background-color: #ecfdf5;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #d1fae5;
            margin: 25px 0;
        }
        .next-steps h3 {
            color: #065f46;
            margin-top: 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .contact-info {
            background-color: #fef3c7;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #fbbf24;
            margin: 20px 0;
        }
        .contact-info h4 {
            color: #92400e;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">CODE212</div>
            <div class="subtitle">Center of Digital Empowerment</div>
        </div>

        <div class="success-icon">✓</div>

        <div class="content">
            <h2 style="color: #10b981; margin-bottom: 20px;">Message reçu avec succès !</h2>
            
            <div class="greeting">
                Bonjour <strong>{{ $contactData['prenom'] }} {{ $contactData['nom'] }}</strong>,
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Nous avons bien reçu votre message concernant "<strong>{{ ucfirst($contactData['subject']) }}</strong>" et nous vous remercions de nous avoir contactés.
            </p>

            <div class="message-summary">
                <h3 style="color: #1f2937; margin-top: 0;">📋 Récapitulatif de votre message :</h3>
                
                <div class="field-group">
                    <div class="field-label">📧 Email de contact</div>
                    <div class="field-value">{{ $contactData['email'] }}</div>
                </div>

                @if($contactData['telephone'])
                <div class="field-group">
                    <div class="field-label">📱 Téléphone</div>
                    <div class="field-value">{{ $contactData['telephone'] }}</div>
                </div>
                @endif

                <div class="field-group">
                    <div class="field-label">📋 Sujet</div>
                    <div class="field-value">{{ ucfirst($contactData['subject']) }}</div>
                </div>

                <div class="field-group">
                    <div class="field-label">💬 Votre message</div>
                    <div class="field-value" style="font-style: italic; border-left: 3px solid #e5e7eb; padding-left: 15px; margin-top: 10px;">
                        "{{ $contactData['message'] }}"
                    </div>
                </div>
            </div>

            <div class="next-steps">
                <h3>🚀 Prochaines étapes :</h3>
                <ul style="text-align: left; color: #065f46;">
                    <li>Notre équipe va examiner votre demande</li>
                    <li>Nous vous répondrons le <strong>plutot possible.</strong></li>
                    <li>Vous recevrez notre réponse à l'adresse : <strong>{{ $contactData['email'] }}</strong></li>
                </ul>
            </div>

            <div class="contact-info">
                <h4>📞 Besoin d'une réponse urgente ?</h4>
                <p style="margin-bottom: 0; color: #92400e;">
                    Vous pouvez nous contacter directement par téléphone au <strong>+212 5XX XXX XXX</strong> 
                    ou par email à <strong>code212@uca.ac.ma</strong>
                </p>
            </div>
        </div>

        <div class="footer">
            <p><strong>CODE212 - Center of Digital Empowerment</strong></p>
            <p>112 Bd Abdelkrim Al Khattabi, Marrakech 40000, Maroc</p>
            <p>Email: code212@uca.ac.ma | Téléphone: +212 5XX XXX XXX</p>
            <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                Cet email a été généré automatiquement le {{ now()->format('d/m/Y à H:i') }}
            </p>
        </div>
    </div>
</body>
</html>
