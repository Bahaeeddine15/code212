{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\competition-notification.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header {{ $status === 'Confirmé' ? 'success' : ($status === 'Refusé' ? 'warning' : 'info') }}">
        <div style="text-align: center; margin-bottom: 15px;">
            <div
                style="font-size: 28px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin-bottom: 10px;">
                CODE212
            </div>
            <div style="font-size: 14px; color: #fff; font-weight: 300;">
                École Supérieure de Technologie
            </div>
        </div>
        <h1 style="color: pink;">
            @if ($status === 'Confirmé')
                🎉 Inscription Acceptée
            @elseif($status === 'Refusé')
                📋 Inscription Non Retenue
            @else
                📝 Inscription Reçue
            @endif
        </h1>
    </div>

    <div class="content" style="color: #fff;">
        <div class="greeting" style="color: #fff;">
            @if ($status === 'Confirmé')
                Félicitations {{ $participantName }} !
            @elseif($status === 'Refusé')
                Bonjour {{ $participantName }},
            @else
                Bonjour {{ $participantName }},
            @endif
        </div>

        <div class="message" style="color: #fff;">
            @if ($status === 'Confirmé')
                Nous avons le plaisir de vous informer que votre inscription à la compétition <strong
                    style="color:pink;">{{ $competitionTitle }}</strong> a été acceptée !
            @elseif($status === 'Refusé')
                Nous vous remercions pour votre intérêt pour la compétition <strong
                    style="color:pink;">{{ $competitionTitle }}</strong>. Malheureusement, nous ne pouvons pas retenir votre
                inscription pour cette édition.
            @else
                Nous avons bien reçu votre inscription à la compétition <strong
                    style="color:pink;">{{ $competitionTitle }}</strong>. Votre inscription est actuellement en cours de
                traitement.
            @endif
        </div>

        <div class="competition-details" style="background: #222; border-radius: 8px; padding: 18px 20px; margin: 25px 0;">
            <h3 style="color: pink;">📋 Détails de la compétition</h3>
            <div class="detail-item"><span class="detail-label" style="color: #fff;">📅 Date :</span> <span
                    class="detail-value" style="color: #fff;">{{ $competitionDate }}</span></div>
            <div class="detail-item"><span class="detail-label" style="color: #fff;">📍 Lieu :</span> <span
                    class="detail-value" style="color: #fff;">{{ $competitionLocation }}</span></div>
            <div class="detail-item"><span class="detail-label" style="color: #fff;">🏷️ Catégorie :</span> <span
                    class="detail-value" style="color: #fff;">{{ $competitionCategory }}</span></div>
            <div class="detail-item"><span class="detail-label" style="color: #fff;">👤 Participant :</span> <span
                    class="detail-value" style="color: #fff;">{{ $participantName }}</span></div>
            <div class="detail-item"><span class="detail-label" style="color: #fff;">📧 Email :</span> <span
                    class="detail-value"><a href="mailto:{{ $participantEmail }}"
                        style="color: #e91e63;">{{ $participantEmail }}</a></span></div>
            <div class="detail-item"><span class="detail-label" style="color: #fff;">📱 Téléphone :</span> <span
                    class="detail-value"><a href="tel:{{ $participantPhone }}"
                        style="color: #e91e63;">{{ $participantPhone }}</a></span></div>
            @if ($participantClub)
                <div class="detail-item"><span class="detail-label" style="color: #fff;">🏢 Club :</span> <span
                        class="detail-value" style="color: #fff;">{{ $participantClub }}</span></div>
            @endif
            <div class="detail-item">
                <span class="detail-label" style="color: #fff;">📊 Statut :</span>
                <span
                    class="status-badge status-{{ strtolower($status === 'Confirmé' ? 'accepted' : ($status === 'Refusé' ? 'rejected' : 'pending')) }}"
                    style="color: #fff; background: {{ $status === 'Confirmé' ? '#22c55e' : ($status === 'Refusé' ? '#ef4444' : '#f59e42') }}; padding: 2px 10px; border-radius: 6px;">
                    {{ $status }}
                </span>
            </div>
        </div>

        @if ($status === 'Confirmé')
            <div class="instructions"
                style="background: #18181b; border-radius: 8px; padding: 16px 20px; margin-bottom: 18px;">
                <h4 style="color: pink;">📋 Instructions importantes</h4>
                <ul style="color: #fff;">
                    <li>Veuillez vous présenter au lieu de la compétition 30 minutes avant le début</li>
                    <li>N'oubliez pas d'apporter une pièce d'identité valide</li>
                    <li>En cas d'empêchement, merci de nous prévenir au plus vite</li>
                    <li>Consultez votre email régulièrement pour d'éventuelles mises à jour</li>
                </ul>
            </div>
            <div class="message" style="color: #fff;">
                Nous avons hâte de vous voir participer à cette compétition ! Préparez-vous bien et donnez le meilleur de
                vous-même.
            </div>
        @elseif($status === 'Refusé')
            <div class="instructions"
                style="background: #18181b; border-radius: 8px; padding: 16px 20px; margin-bottom: 18px;">
                <h4 style="color: pink;">🤝 Raisons possibles</h4>
                <ul style="color: #fff;">
                    <li>Nombre maximum de participants atteint</li>
                    <li>Critères de sélection non remplis</li>
                    <li>Informations incomplètes ou incorrectes</li>
                    <li>Deadline dépassée</li>
                </ul>
            </div>
            <div class="message" style="color: #fff;">
                Ne vous découragez pas ! De nouvelles compétitions sont régulièrement organisées.
                Nous vous encourageons à consulter notre site web pour découvrir d'autres opportunités et améliorer vos
                compétences.
            </div>
        @else
            <div class="instructions"
                style="background: #18181b; border-radius: 8px; padding: 16px 20px; margin-bottom: 18px;">
                <h4 style="color: pink;">⏳ Prochaines étapes</h4>
                <ul style="color: #fff;">
                    <li>Votre inscription sera évaluée par notre équipe</li>
                    <li>Vous recevrez une notification par email dans les prochains jours</li>
                    <li>Assurez-vous que vos informations de contact sont correctes</li>
                    <li>Consultez régulièrement vos emails (y compris les spams)</li>
                </ul>
            </div>
            <div class="message" style="color: #fff;">
                Merci pour votre patience ! Notre équipe examine attentivement chaque inscription.
            </div>
        @endif

        <div style="text-align: center; margin-top: 20px;">
            <a href="{{ $actionUrl }}" class="action-button"
                style="display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #e91e63 100%); color: #fff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0;">
                @if ($status === 'Confirmé')
                    🏆 Voir les détails de la compétition
                @elseif($status === 'Refusé')
                    🔍 Voir d'autres compétitions
                @else
                    📋 Voir la compétition
                @endif
            </a>
        </div>

        <div class="message" style="margin-top: 30px; font-style: italic; color: pink;">
            @if ($status === 'Confirmé')
                Merci de faire partie de notre communauté CODE212 ! 🚀
            @elseif($status === 'Refusé')
                Merci pour votre compréhension et votre participation à notre communauté. 🙏
            @else
                Merci pour votre intérêt pour CODE212 ! 💻
            @endif
        </div>
    </div>

    <div class="footer" style="color: #fff;">
        <p><strong>CODE212</strong> - École Supérieure de Technologie</p>
        <p>Votre communauté de développement et d'innovation</p>
        <div class="social-links" style="margin: 10px 0;">
            <a href="#" style="color: #e91e63; margin-right: 10px;">🌐 Site Web</a>
            <a href="#" style="color: #e91e63; margin-right: 10px;">📧 Contact</a>
            <a href="#" style="color: #e91e63; margin-right: 10px;">📱 Facebook</a>
            <a href="#" style="color: #e91e63;">💼 LinkedIn</a>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #bbb;">
            Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.
        </p>
    </div>
@endsection
