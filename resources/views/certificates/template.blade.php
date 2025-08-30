<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Certificat de Formation - Code212</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        @page {
            size: A4 landscape;
            margin: 0;
        }

        body {
            width: 100vw;
            height: 100vh;
            min-height: 100vh;
            min-width: 100vw;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(120deg, #1e40af 0%, #7c3aed 60%, #ec4899 100%);
            margin: 0;
            padding: 0;
            display: flex;
            align-items: stretch;
            justify-content: stretch;
        }

        .certificate {
            width: 100vw;
            height: 100vh;
            min-height: 100vh;
            min-width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: stretch;
            position: relative;
        }

        .certificate-inner {
            width: 100%;
            height: 100%;
            padding: 60px 80px 40px 80px;
            background: rgba(255, 255, 255, 0.90);
            border-radius: 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
        }

        /* Logo section */
        .logo-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            position: relative;
            z-index: 10;
        }

        .logo-left {
            width: 120px;
            height: auto;
        }

        .logo-right-bg {
            position: relative;
            display: inline-block;
        }

        .logo-right-bg::before {
            content: '';
            position: absolute;
            top: 10%;
            left: 10%;
            width: 80%;
            height: 80%;
            background: radial-gradient(circle, #f3e8ff 60%, #ede9fe 100%);
            border-radius: 16px;
            z-index: 0;
            filter: blur(2px);
        }

        .logo-right {
            width: 150px;
            height: auto;
            position: relative;
            z-index: 1;
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 15px;
        }

        .institution {
            font-size: 28px;
            font-weight: 700;
            color: #1e40af;
            letter-spacing: 3px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .university {
            font-size: 16px;
            color: #64748b;
            font-style: italic;
            margin-bottom: 15px;
        }

        .divider {
            width: 180px;
            height: 3px;
            background: linear-gradient(90deg, #1e40af, #7c3aed, #ec4899);
            margin: 0 auto 15px auto;
            border-radius: 1px;
        }

        /* Main content */
        .main-content {
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: -30px;
        }

        .certificate-title {
            font-size: 40px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 18px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.08);
        }

        .award-text {
            font-size: 18px;
            color: #475569;
            margin-bottom: 18px;
            font-style: italic;
        }

        .student-name {
            font-size: 32px;
            font-weight: 700;
            color: #1e40af;
            margin: 18px 0;
            position: relative;
            display: inline-block;
        }

        .student-name::after {
            content: '';
            position: absolute;
            bottom: -7px;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #1e40af, #7c3aed);
            border-radius: 2px;
        }

        .completion-text {
            font-size: 16px;
            color: #475569;
            margin-bottom: 16px;
            line-height: 1.4;
        }

        .formation-title {
            font-size: 24px;
            font-weight: 600;
            color: #7c3aed;
            margin-bottom: 24px;
            font-style: italic;
            line-height: 1.2;
        }

        .achievement-details {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 60px;
            margin: 24px 0;
        }

        .detail-item {
            text-align: center;
            min-width: 120px;
        }

        .detail-value {
            font-size: 18px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 4px;
        }

        .detail-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Footer */
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 25px;
            position: relative;
        }

        .verification-section {
            text-align: left;
            flex: 1;
        }

        .verification-title {
            font-size: 11px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }

        .certificate-id {
            font-size: 14px;
            font-weight: 600;
            color: #1e40af;
            font-family: 'Courier New', monospace;
            margin-bottom: 2px;
        }

        .verification-url {
            font-size: 11px;
            color: #64748b;
        }

        .signatures {
            display: flex;
            gap: 80px;
            align-items: flex-end;
        }

        .signature {
            text-align: center;
            min-width: 160px;
        }

        .signature-line {
            width: 140px;
            height: 2px;
            background: #1e40af;
            margin: 0 auto 8px auto;
        }

        .signature-name {
            font-size: 15px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 2px;
        }

        .signature-title {
            font-size: 12px;
            color: #64748b;
            font-style: italic;
        }

        /* Watermark - lighter */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 100px;
            font-weight: 100;
            color: rgba(30, 64, 175, 0.03);
            z-index: 0;
            pointer-events: none;
        }
    </style>
</head>

<body>
    <div class="certificate">
        <!-- Watermark -->
        <div class="watermark">CODE212</div>

        <div class="certificate-inner">
            <!-- Logo section -->
            <div class="logo-section">
                <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('universite-cadi-ayyad-marrakech-maroc-seeklogo.png'))) }}"
                    alt="UCA Logo" class="logo-left" />
                <div class="logo-right-bg">
                    <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('cd212.png'))) }}"
                        alt="Code212 Logo" class="logo-right" />
                </div>
            </div>

            <!-- Header -->
            <div class="header">
                <div class="institution">Code212</div>
                <div class="university">Espace d'Innovation - Université Cadi Ayyad</div>
                <div class="divider"></div>
            </div>

            <!-- Main content -->
            <div class="main-content">
                <h1 class="certificate-title">Certificat d'Excellence</h1>

                <p class="award-text">
                    Il est par les présentes certifié que
                </p>

                <div class="student-name">{!! e($studentName) !!}</div>

                <p class="completion-text">
                    a brillamment réussi et terminé avec distinction le programme de formation
                </p>

                <div class="formation-title">« {!! e($formationTitle) !!} »</div>

                <div class="achievement-details">
                    <div class="detail-item">
                        <div class="detail-value">{{ $duration ?? '40' }}h</div>
                        <div class="detail-label">Durée totale</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">{{ $completionDate }}</div>
                        <div class="detail-label">Date d'achèvement</div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="verification-section">
                    <div class="verification-title">Vérification</div>
                    <div class="certificate-id">{{ $certificateCode }}</div>
                    <div class="verification-url">code212.ma/verify</div>
                </div>

                <div class="signatures">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <div class="signature-name">Walid Bouarifi</div>
                        <div class="signature-title">Directeur Général</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
