<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact - CODE212</title>
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
            border-bottom: 3px solid #2563eb;
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
        .content {
            margin: 20px 0;
        }
        .field-group {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8fafc;
            border-left: 4px solid #2563eb;
            border-radius: 5px;
        }
        .field-label {
            font-weight: bold;
            color: #374151;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .field-value {
            color: #1f2937;
            font-size: 16px;
            padding: 5px 0;
        }
        .message-field {
            background-color: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .timestamp {
            background-color: #ecfdf5;
            color: #065f46;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">CODE212</div>
            <div class="subtitle">Center of Digital Empowerment</div>
        </div>

        <h2 style="color: #1f2937; margin-bottom: 20px;">📩 Nouveau message de contact</h2>

        <div class="content">
            <div class="field-group">
                <span class="field-label">👤 Nom complet</span>
                <div class="field-value">{{ $contactData['prenom'] }} {{ $contactData['nom'] }}</div>
            </div>

            <div class="field-group">
                <span class="field-label">📧 Email</span>
                <div class="field-value">
                    <a href="mailto:{{ $contactData['email'] }}" style="color: #2563eb; text-decoration: none;">
                        {{ $contactData['email'] }}
                    </a>
                </div>
            </div>

            @if($contactData['telephone'])
            <div class="field-group">
                <span class="field-label">📱 Téléphone</span>
                <div class="field-value">{{ $contactData['telephone'] }}</div>
            </div>
            @endif

            <div class="field-group">
                <span class="field-label">📋 Sujet</span>
                <div class="field-value">{{ ucfirst($contactData['subject']) }}</div>
            </div>

            <div class="field-group">
                <span class="field-label">💬 Message</span>
                <div class="message-field">
                    {{ $contactData['message'] }}
                </div>
            </div>
        </div>

        <div class="timestamp">
            ⏰ Message reçu le {{ now()->format('d/m/Y à H:i') }}
        </div>

        <div class="footer">
            <p><strong>CODE212 - Center of Digital Empowerment</strong></p>
            <p>112 Bd Abdelkrim Al Khattabi, Marrakech 40000, Maroc</p>
            <p>Email: code212@uca.ac.ma | Téléphone: +212 5XX XXX XXX</p>
        </div>
    </div>
</body>
</html>
