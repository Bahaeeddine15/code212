<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande d'adhésion club - CODE212</title>
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
            font-size: 20px;
            margin-bottom: 10px;
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
            min-width: 140px;
            display: inline-block;
        }
        .info-value {
            color: #333;
            flex: 1;
        }
        .motivation-section {
            background-color: #f1f8ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0066cc;
            margin-bottom: 25px;
        }
        .motivation-text {
            font-style: italic;
            color: #444;
            line-height: 1.7;
            margin: 0;
            padding: 10px;
            background-color: white;
            border-radius: 6px;
        }
        .club-badge {
            display: inline-block;
            background: linear-gradient(135deg, #e91e63, #9c27b0);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
        }
        .level-badge {
            display: inline-block;
            background: linear-gradient(135deg, #2196f3, #21cbf3);
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
    </style>
</head>
<body>
    <div class="email-container">
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
    </div>
</body>
</html>
