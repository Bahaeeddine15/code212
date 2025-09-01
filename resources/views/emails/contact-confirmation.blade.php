{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\contact-confirmation.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo" style="color: #fff;">CODE212</div>
        <div class="subtitle" style="color: #fff;">Center of Digital Empowerment</div>
    </div>

    <div class="success-icon"
        style="background-color: #10b981; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 20px auto;">
        ✓
    </div>

    <div class="content" style="text-align: center;">
        <h2 style="color: #10b981; margin-bottom: 20px;">Message reçu avec succès !</h2>

        <div class="greeting" style="font-size: 18px; color: #fff; margin-bottom: 20px;">
            Bonjour <strong>{{ $contactData['prenom'] }} {{ $contactData['nom'] }}</strong>,
        </div>

        <p style="color: #fff; font-size: 16px; line-height: 1.6;">
            Nous avons bien reçu votre message concernant "<strong
                style="color:pink;">{{ ucfirst($contactData['subject']) }}</strong>" et nous vous remercions de nous avoir
            contactés.
        </p>

        <div class="message-summary"
            style="background-color: #18181b; padding: 20px; border-radius: 8px; border-left: 4px solid #e91e63; margin: 20px 0; text-align: left;">
            <h3 style="color: pink; margin-top: 0;">📋 Récapitulatif de votre message :</h3>

            <div class="field-group">
                <div class="field-label" style="color: #fff;">📧 Email de contact</div>
                <div class="field-value" style="color: #fff;">{{ $contactData['email'] }}</div>
            </div>

            @if ($contactData['telephone'])
                <div class="field-group">
                    <div class="field-label" style="color: #fff;">📱 Téléphone</div>
                    <div class="field-value" style="color: #fff;">{{ $contactData['telephone'] }}</div>
                </div>
            @endif

            <div class="field-group">
                <div class="field-label" style="color: #fff;">📋 Sujet</div>
                <div class="field-value" style="color: #fff;">{{ ucfirst($contactData['subject']) }}</div>
            </div>

            <div class="field-group">
                <div class="field-label" style="color: #fff;">💬 Votre message</div>
                <div class="field-value"
                    style="font-style: italic; border-left: 3px solid #e91e63; padding-left: 15px; margin-top: 10px; color: #fff;">
                    "{{ $contactData['message'] }}"
                </div>
            </div>
        </div>

        <div class="next-steps"
            style="background-color: #222; padding: 20px; border-radius: 8px; border: 1px solid #10b981; margin: 25px 0;">
            <h3 style="color: #10b981; margin-top: 0;">🚀 Prochaines étapes :</h3>
            <ul style="text-align: left; color: #10b981;">
                <li>Notre équipe va examiner votre demande</li>
                <li>Nous vous répondrons le <strong>plus tôt possible.</strong></li>
                <li>Vous recevrez notre réponse à l'adresse : <strong
                        style="color:#fff;">{{ $contactData['email'] }}</strong></li>
            </ul>
        </div>

        <div class="contact-info"
            style="background-color: #333; padding: 15px; border-radius: 8px; border: 1px solid #fbbf24; margin: 20px 0;">
            <h4 style="color: #fbbf24; margin-top: 0;">📞 Besoin d'une réponse urgente ?</h4>
            <p style="margin-bottom: 0; color: #fff;">
                Vous pouvez nous contacter directement par téléphone au <strong style="color:#fff;">+212 5XX XXX
                    XXX</strong>
                ou par email à <strong style="color:#fff;">code212@uca.ac.ma</strong>
            </p>
        </div>
    </div>

    <div class="footer"
        style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #222; color: #bbb; font-size: 14px;">
        <p><strong style="color:#fff;">CODE212 - Center of Digital Empowerment</strong></p>
        <p>112 Bd Abdelkrim Al Khattabi, Marrakech 40000, Maroc</p>
        <p>Email: <span style="color:#fff;">code212@uca.ac.ma</span> | Téléphone: <span style="color:#fff;">+212 5XX XXX
                XXX</span></p>
        <p style="margin-top: 15px; font-size: 12px; color: #888;">
            Cet email a été généré automatiquement le {{ now()->format('d/m/Y à H:i') }}
        </p>
    </div>
@endsection
