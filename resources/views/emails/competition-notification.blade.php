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
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .header.success {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
        }
        .header.warning {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
        }
        .header.info {
            background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
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
        .competition-details {
            background-color: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .competition-details h3 {
            margin: 0 0 15px 0;
            color: #1f2937;
            font-size: 18px;
            font-weight: 600;
        }
        .detail-item {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            margin-right: 10px;
            min-width: 120px;
        }
        .detail-value {
            color: #6b7280;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-accepted {
            background-color: #d1fae5;
            color: #065f46;
        }
        .status-rejected {
            background-color: #fee2e2;
            color: #991b1b;
        }
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        .instructions {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .instructions h4 {
            margin: 0 0 12px 0;
            color: #1e40af;
            font-size: 16px;
            font-weight: 600;
        }
        .instructions ul {
            margin: 0;
            padding-left: 20px;
        }
        .instructions li {
            margin-bottom: 8px;
            color: #1e40af;
        }
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
            transition: all 0.3s ease;
        }
        .action-button:hover {
            background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
            text-decoration: none;
            color: white;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
        }
        .social-links {
            margin-top: 20px;
        }
        .social-links a {
            color: #6b7280;
            text-decoration: none;
            margin: 0 10px;
            font-size: 14px;
        }
        .emoji {
            font-size: 20px;
            margin-right: 8px;
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .detail-item {
                flex-direction: column;
                align-items: flex-start;
            }
            .detail-label {
                min-width: auto;
                margin-bottom: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header {{ $status === 'Confirmé' ? 'success' : ($status === 'Refusé' ? 'warning' : 'info') }}">
            <div style="text-align: center; margin-bottom: 15px;">
                <!-- Logo avec fallback texte -->
                <div style="font-size: 28px; font-weight: bold; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin-bottom: 10px;">
                    CODE212
                </div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 300;">
                    École Supérieure de Technologie
                </div>
            </div>
            <h1>
                @if($status === 'Confirmé')
                    🎉 Inscription Acceptée
                @elseif($status === 'Refusé')
                    📋 Inscription Non Retenue
                @else
                    📝 Inscription Reçue
                @endif
            </h1>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">
                @if($status === 'Confirmé')
                    Félicitations {{ $participantName }} !
                @elseif($status === 'Refusé')
                    Bonjour {{ $participantName }},
                @else
                    Bonjour {{ $participantName }},
                @endif
            </div>

            <div class="message">
                @if($status === 'Confirmé')
                    Nous avons le plaisir de vous informer que votre inscription à la compétition <strong>{{ $competitionTitle }}</strong> a été acceptée !
                @elseif($status === 'Refusé')
                    Nous vous remercions pour votre intérêt pour la compétition <strong>{{ $competitionTitle }}</strong>. Malheureusement, nous ne pouvons pas retenir votre inscription pour cette édition.
                @else
                    Nous avons bien reçu votre inscription à la compétition <strong>{{ $competitionTitle }}</strong>. Votre inscription est actuellement en cours de traitement.
                @endif
            </div>

            <!-- Competition Details -->
            <div class="competition-details">
                <h3>📋 Détails de la compétition</h3>
                <div class="detail-item">
                    <span class="detail-label">📅 Date :</span>
                    <span class="detail-value">{{ $competitionDate }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">📍 Lieu :</span>
                    <span class="detail-value">{{ $competitionLocation }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">🏷️ Catégorie :</span>
                    <span class="detail-value">{{ $competitionCategory }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">👤 Participant :</span>
                    <span class="detail-value">{{ $participantName }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">📧 Email :</span>
                    <span class="detail-value">{{ $participantEmail }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">📱 Téléphone :</span>
                    <span class="detail-value">{{ $participantPhone }}</span>
                </div>
                @if($participantClub)
                <div class="detail-item">
                    <span class="detail-label">🏢 Club :</span>
                    <span class="detail-value">{{ $participantClub }}</span>
                </div>
                @endif
                <div class="detail-item">
                    <span class="detail-label">📊 Statut :</span>
                    <span class="status-badge status-{{ strtolower($status === 'Confirmé' ? 'accepted' : ($status === 'Refusé' ? 'rejected' : 'pending')) }}">
                        {{ $status }}
                    </span>
                </div>
            </div>

            @if($status === 'Confirmé')
            <!-- Instructions for accepted participants -->
            <div class="instructions">
                <h4>📋 Instructions importantes</h4>
                <ul>
                    <li>Veuillez vous présenter au lieu de la compétition 30 minutes avant le début</li>
                    <li>N'oubliez pas d'apporter une pièce d'identité valide</li>
                    <li>En cas d'empêchement, merci de nous prévenir au plus vite</li>
                    <li>Consultez votre email régulièrement pour d'éventuelles mises à jour</li>
                </ul>
            </div>

            <div class="message">
                Nous avons hâte de vous voir participer à cette compétition ! Préparez-vous bien et donnez le meilleur de vous-même.
            </div>

            @elseif($status === 'Refusé')
            <!-- Message for rejected participants -->
            <div class="instructions">
                <h4>🤝 Raisons possibles</h4>
                <ul>
                    <li>Nombre maximum de participants atteint</li>
                    <li>Critères de sélection non remplis</li>
                    <li>Informations incomplètes ou incorrectes</li>
                    <li>Deadline dépassée</li>
                </ul>
            </div>

            <div class="message">
                Ne vous découragez pas ! De nouvelles compétitions sont régulièrement organisées. 
                Nous vous encourageons à consulter notre site web pour découvrir d'autres opportunités et améliorer vos compétences.
            </div>

            @else
            <!-- Message for pending participants -->
            <div class="instructions">
                <h4>⏳ Prochaines étapes</h4>
                <ul>
                    <li>Votre inscription sera évaluée par notre équipe</li>
                    <li>Vous recevrez une notification par email dans les prochains jours</li>
                    <li>Assurez-vous que vos informations de contact sont correctes</li>
                    <li>Consultez régulièrement vos emails (y compris les spams)</li>
                </ul>
            </div>

            <div class="message">
                Merci pour votre patience ! Notre équipe examine attentivement chaque inscription.
            </div>
            @endif

            <!-- Action Button -->
            <div style="text-align: center;">
                <a href="{{ $actionUrl }}" class="action-button">
                    @if($status === 'Confirmé')
                        🏆 Voir les détails de la compétition
                    @elseif($status === 'Refusé')
                        🔍 Voir d'autres compétitions
                    @else
                        📋 Voir la compétition
                    @endif
                </a>
            </div>

            <div class="message" style="margin-top: 30px; font-style: italic; color: #6b7280;">
                @if($status === 'Confirmé')
                    Merci de faire partie de notre communauté CODE212 ! 🚀
                @elseif($status === 'Refusé')
                    Merci pour votre compréhension et votre participation à notre communauté. 🙏
                @else
                    Merci pour votre intérêt pour CODE212 ! 💻
                @endif
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>CODE212</strong> - École Supérieure de Technologie</p>
            <p>Votre communauté de développement et d'innovation</p>
            
            <div class="social-links">
                <a href="#">🌐 Site Web</a>
                <a href="#">📧 Contact</a>
                <a href="#">📱 Facebook</a>
                <a href="#">💼 LinkedIn</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.
            </p>
        </div>
    </div>
</body>
</html>
