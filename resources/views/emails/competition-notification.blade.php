{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\competition-notification.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header {{ $status === 'Confirmé' ? 'success' : ($status === 'Refusé' ? 'warning' : 'info') }}">
        <div style="text-align: center; margin-bottom: 15px;">
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
@endsection