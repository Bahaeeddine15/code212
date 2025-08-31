{{-- filepath: c:\xampp\htdocs\code212\resources\views\emails\contact-confirmation.blade.php --}}
@extends('emails.cd212')

@section('content')
    <div class="header">
        <div class="logo">CODE212</div>
        <div class="subtitle">Center of Digital Empowerment</div>
    </div>

    <div class="success-icon" style="background-color: #10b981; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 20px auto;">
        ✓
    </div>

    <div class="content" style="text-align: center;">
        <h2 style="color: #10b981; margin-bottom: 20px;">Message reçu avec succès !</h2>
        
        <div class="greeting" style="font-size: 18px; color: #1f2937; margin-bottom: 20px;">
            Bonjour <strong>{{ $contactData['prenom'] }} {{ $contactData['nom'] }}</strong>,
        </div>

        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Nous avons bien reçu votre message concernant "<strong>{{ ucfirst($contactData['subject']) }}</strong>" et nous vous remercions de nous avoir contactés.
        </p>

        <div class="message-summary" style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; text-align: left;">
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

        <div class="next-steps" style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #d1fae5; margin: 25px 0;">
            <h3 style="color: #065f46; margin-top: 0;">🚀 Prochaines étapes :</h3>
            <ul style="text-align: left; color: #065f46;">
                <li>Notre équipe va examiner votre demande</li>
                <li>Nous vous répondrons le <strong>plus tôt possible.</strong></li>
                <li>Vous recevrez notre réponse à l'adresse : <strong>{{ $contactData['email'] }}</strong></li>
            </ul>
        </div>

        <div class="contact-info" style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fbbf24; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">📞 Besoin d'une réponse urgente ?</h4>
            <p style="margin-bottom: 0; color: #92400e;">
                Vous pouvez nous contacter directement par téléphone au <strong>+212 5XX XXX XXX</strong> 
                ou par email à <strong>code212@uca.ac.ma</strong>
            </p>
        </div>
    </div>

    <div class="footer" style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
        <p><strong>CODE212 - Center of Digital Empowerment</strong></p>
        <p>112 Bd Abdelkrim Al Khattabi, Marrakech 40000, Maroc</p>
        <p>Email: code212@uca.ac.ma | Téléphone: +212 5XX XXX XXX</p>
        <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
            Cet email a été généré automatiquement le {{ now()->format('d/m/Y à H:i') }}
        </p>
    </div>
@endsection