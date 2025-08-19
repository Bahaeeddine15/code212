<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #374151;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .logo {
            max-width: 200px;
            height: auto;
            margin-bottom: 15px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.7;
        }
        .details-box {
            background-color: #f9fafb;
            border-left: 4px solid #9333ea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .details-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .detail-item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
        }
        .detail-icon {
            font-size: 16px;
            margin-right: 10px;
            width: 20px;
        }
        .detail-label {
            font-weight: 600;
            color: #4b5563;
            margin-right: 8px;
        }
        .detail-value {
            color: #1f2937;
        }
        .status-approved {
            background-color: #ecfdf5;
            border-color: #10b981;
            color: #047857;
        }
        .status-rejected {
            background-color: #fef2f2;
            border-color: #ef4444;
            color: #dc2626;
        }
        .status-pending {
            background-color: #fef3c7;
            border-color: #f59e0b;
            color: #92400e;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%);
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 15px;
        }
        .university-info {
            color: #9ca3af;
            font-size: 12px;
            line-height: 1.5;
        }
        .important-note {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .important-note-title {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
        }
        .reasons-list {
            margin: 15px 0;
            padding-left: 0;
        }
        .reason-item {
            list-style: none;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        .reason-item:before {
            content: "•";
            color: #9333ea;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 0 10px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .header h1 {
                font-size: 20px;
            }
            .greeting {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="{{ asset('images/code212-logo.png') }}" alt="CODE212 - Université Cadi Ayyad" class="logo">
            <h1>{{ $subject }}</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">{{ $greeting }}</div>
            
            <div class="message">
                {!! $introMessage !!}
            </div>

            <!-- Reservation Details -->
            <div class="details-box {{ $statusClass ?? '' }}">
                <div class="details-title">📋 Détails de votre réservation</div>
                
                <div class="detail-item">
                    <span class="detail-icon">📅</span>
                    <span class="detail-label">Date :</span>
                    <span class="detail-value">{{ $reservation->date_reservation }}</span>
                </div>

                <div class="detail-item">
                    <span class="detail-icon">🎯</span>
                    <span class="detail-label">Ressource :</span>
                    <span class="detail-value">{{ $resourceInfo }}</span>
                </div>

                @if($reservation->telephone)
                <div class="detail-item">
                    <span class="detail-icon">📞</span>
                    <span class="detail-label">Téléphone :</span>
                    <span class="detail-value">{{ $reservation->telephone }}</span>
                </div>
                @endif

                <div class="detail-item">
                    <span class="detail-icon">🆔</span>
                    <span class="detail-label">N° Apogée :</span>
                    <span class="detail-value">{{ $reservation->num_apogee }}</span>
                </div>

                @if($reservation->description)
                <div class="detail-item">
                    <span class="detail-icon">📝</span>
                    <span class="detail-label">Description :</span>
                    <span class="detail-value">{{ $reservation->description }}</span>
                </div>
                @endif
            </div>

            <!-- Status-specific content -->
            @if(isset($statusMessage))
                <div class="message">
                    {!! $statusMessage !!}
                </div>
            @endif

            @if(isset($importantNote))
                <div class="important-note">
                    <div class="important-note-title">⚠️ Important</div>
                    <div>{!! $importantNote !!}</div>
                </div>
            @endif

            @if(isset($reasonsList))
                <div class="message">
                    <strong>Raisons possibles :</strong>
                    <ul class="reasons-list">
                        @foreach($reasonsList as $reason)
                            <li class="reason-item">{{ $reason }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @if(isset($actionsList))
                <div class="message">
                    <strong>Vous pouvez :</strong>
                    <ul class="reasons-list">
                        @foreach($actionsList as $action)
                            <li class="reason-item">{{ $action }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Action Button -->
            @if(isset($actionUrl) && isset($actionText))
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{{ $actionUrl }}" class="button">{{ $actionText }}</a>
                </div>
            @endif

            <div class="message">
                {!! $closingMessage !!}
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                Cordialement,<br>
                <strong>L'équipe CODE212-UCA</strong>
            </div>
            <div class="university-info">
                CODE212 - École Nationale des Sciences Appliquées<br>
                Université Cadi Ayyad - Marrakech<br>
                📧 mouadaitelhachmi94@gmail.com | 🌐 www.uca.ma
            </div>
        </div>
    </div>
</body>
</html>
