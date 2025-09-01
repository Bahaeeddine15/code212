{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\reservation-notification.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">
            <img src="{{ asset('images/code212-logo.png') }}" alt="CODE212 - Université Cadi Ayyad"
                style="max-width: 200px; height: auto; margin-bottom: 15px;">
        </div>
        <h1 style="color: #fff;">{{ $subject }}</h1>
    </div>

    <div class="content" style="padding: 40px 30px;">
        <div class="greeting" style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 20px;">
            {{ $greeting }}
        </div>

        <div class="message" style="font-size: 16px; margin-bottom: 20px; line-height: 1.7; color: #fff;">
            {!! $introMessage !!}
        </div>

        <!-- Reservation Details -->
        <div class="details-box {{ $statusClass ?? '' }}"
            style="background-color: #222; border-left: 4px solid #9333ea; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <div class="details-title" style="font-weight: 600; color: pink; margin-bottom: 15px; font-size: 16px;">📋
                Détails de votre réservation</div>

            <div class="detail-item" style="display: flex; margin-bottom: 10px; align-items: center;">
                <span class="detail-icon" style="font-size: 16px; margin-right: 10px; width: 20px;">📅</span>
                <span class="detail-label" style="font-weight: 600; color: #fff; margin-right: 8px;">Date :</span>
                <span class="detail-value" style="color: #fff;">{{ $reservation->date_reservation }}</span>
            </div>

            <div class="detail-item" style="display: flex; margin-bottom: 10px; align-items: center;">
                <span class="detail-icon" style="font-size: 16px; margin-right: 10px; width: 20px;">🎯</span>
                <span class="detail-label" style="font-weight: 600; color: #fff; margin-right: 8px;">Ressource :</span>
                <span class="detail-value" style="color: #fff;">{{ $resourceInfo }}</span>
            </div>

            @if ($reservation->telephone)
                <div class="detail-item" style="display: flex; margin-bottom: 10px; align-items: center;">
                    <span class="detail-icon" style="font-size: 16px; margin-right: 10px; width: 20px;">📞</span>
                    <span class="detail-label" style="font-weight: 600; color: #fff; margin-right: 8px;">Téléphone :</span>
                    <span class="detail-value" style="color: #fff;">{{ $reservation->telephone }}</span>
                </div>
            @endif

            <div class="detail-item" style="display: flex; margin-bottom: 10px; align-items: center;">
                <span class="detail-icon" style="font-size: 16px; margin-right: 10px; width: 20px;">🆔</span>
                <span class="detail-label" style="font-weight: 600; color: #fff; margin-right: 8px;">N° Apogée :</span>
                <span class="detail-value" style="color: #fff;">{{ $reservation->num_apogee }}</span>
            </div>

            @if ($reservation->description)
                <div class="detail-item" style="display: flex; margin-bottom: 10px; align-items: center;">
                    <span class="detail-icon" style="font-size: 16px; margin-right: 10px; width: 20px;">📝</span>
                    <span class="detail-label" style="font-weight: 600; color: #fff; margin-right: 8px;">Description
                        :</span>
                    <span class="detail-value" style="color: #fff;">{{ $reservation->description }}</span>
                </div>
            @endif
        </div>

        <!-- Status-specific content -->
        @if (isset($statusMessage))
            <div class="message" style="font-size: 16px; margin-bottom: 20px; line-height: 1.7; color: #fff;">
                {!! $statusMessage !!}
            </div>
        @endif

        @if (isset($importantNote))
            <div class="important-note"
                style="background-color: #333; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; color: #fff;">
                <div class="important-note-title" style="font-weight: 600; color: #fbbf24; margin-bottom: 8px;">⚠️ Important
                </div>
                <div>{!! $importantNote !!}</div>
            </div>
        @endif

        @if (isset($reasonsList))
            <div class="message" style="color: #fff;">
                <strong>Raisons possibles :</strong>
                <ul class="reasons-list" style="margin: 15px 0; padding-left: 20px;">
                    @foreach ($reasonsList as $reason)
                        <li class="reason-item" style="list-style: disc; margin-bottom: 8px;">{{ $reason }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if (isset($actionsList))
            <div class="message" style="color: #fff;">
                <strong>Vous pouvez :</strong>
                <ul class="reasons-list" style="margin: 15px 0; padding-left: 20px;">
                    @foreach ($actionsList as $action)
                        <li class="reason-item" style="list-style: disc; margin-bottom: 8px;">{{ $action }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Action Button -->
        @if (isset($actionUrl) && isset($actionText))
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ $actionUrl }}" class="button"
                    style="display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; transition: transform 0.2s;">
                    {{ $actionText }}
                </a>
            </div>
        @endif

        <div class="message" style="font-size: 16px; margin-bottom: 20px; line-height: 1.7; color: #fff;">
            {!! $closingMessage !!}
        </div>
    </div>

    <div class="footer" style="background-color: #111; padding: 30px; text-align: center; border-top: 1px solid #222;">
        <div class="footer-text" style="color: #fff; font-size: 14px; margin-bottom: 15px;">
            Cordialement,<br>
            <strong>L'équipe CODE212-UCA</strong>
        </div>
        <div class="university-info" style="color: #bbb; font-size: 12px; line-height: 1.5;">
            CODE212 - École Nationale des Sciences Appliquées<br>
            Université Cadi Ayyad - Marrakech<br>
            📧 mouadaitelhachmi94@gmail.com | 🌐 www.uca.ma
        </div>
    </div>
@endsection
