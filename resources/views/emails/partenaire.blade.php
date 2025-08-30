<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de partenariat - CODE212</title>
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
            border-bottom: 3px solid #2196f3;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2196f3;
            margin-bottom: 10px;
        }
        .title {
            color: #2c3e50;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .info-section {
            margin-bottom: 25px;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #2196f3;
        }
        .info-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .info-item {
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        .info-label {
            font-weight: 600;
            color: #555;
            min-width: 160px;
            display: inline-block;
        }
        .info-value {
            color: #333;
            flex: 1;
        }
        .project-section {
            background-color: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #1976d2;
            margin-bottom: 25px;
        }
        .project-text {
            font-style: italic;
            color: #444;
            line-height: 1.7;
            margin: 0;
            padding: 10px;
            background-color: white;
            border-radius: 6px;
        }
        .type-badge {
            display: inline-block;
            background: linear-gradient(135deg, #2196f3, #21cbf3);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
        }
        .sector-badge {
            display: inline-block;
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-weight: 500;
            font-size: 13px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 12px;
        }
        .timestamp {
            background-color: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
            margin-top: 20px;
        }
        .urgent-note {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        .website-link {
            display: inline-block;
            background-color: #f0f8ff;
            padding: 10px 15px;
            border-radius: 8px;
            margin-top: 10px;
            border: 1px solid #e3f2fd;
        }
    </style>
</head>
<body>
    <div class="email-container">
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
    </div>
</body>
</html>
