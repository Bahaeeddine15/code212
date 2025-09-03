{{-- filepath: c:\xampp\htdocs\code212\resources\views\certificates\template.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Certificate of Completion</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            html, body, .certificate-bg {
                width: 380mm !important;
                height: 260mm !important;
                min-height: 0 !important;
                min-width: 0 !important;
                max-width: none !important;
                max-height: none !important;
                overflow: visible !important;
                margin: 4mm !important;
                padding: 4mm !important;
                margin-right: 4mm !important;
            }
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Courier New', monospace;
            background: #111827;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .certificate-bg {
            position: relative;
            width: 380mm;
            height: 260mm;
            background: #111827;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        /* Left side geometric shapes - positioned beside student name */
        .left-shapes {
            position: absolute;
            left: 0;
            top: 0;
            width: 300px;
            height: 100%;
            z-index: 0;
        }
        
        .left-circle-1 {
            position: absolute;
            top: 50%;
            left: 80px;
            transform: translateY(-50%);
            width: 80px;
            height: 80px;
            background: #eab308;
            border-radius: 50%;
            opacity: 0.4;
        }
        
        .left-circle-2 {
            position: absolute;
            top: 60%;
            left: 40px;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            background: #22c55e;
            border-radius: 50%;
            opacity: 0.3;
        }

        /* Right side geometric shapes - positioned beside student name */
        .right-shapes {
            position: absolute;
            right: 0;
            top: 0;
            width: 300px;
            height: 100%;
            z-index: 0;
        }
        
        .right-circle-1 {
            position: absolute;
            top: 50%;
            right: 80px;
            transform: translateY(-50%);
            width: 120px;
            height: 120px;
            background: #ec4899;
            border-radius: 50%;
            opacity: 0.3;
        }
        
        .right-circle-2 {
            position: absolute;
            top: 65%;
            right: 40px;
            transform: translateY(-50%);
            width: 100px;
            height: 100px;
            background: #3b82f6;
            border-radius: 50%;
            opacity: 0.25;
        }
        
        .right-circle-3 {
            position: absolute;
            top: 45%;
            right: 200px;
            transform: translateY(-50%);
            width: 80px;
            height: 80px;
            background: #8b5cf6;
            border-radius: 50%;
            opacity: 0.2;
            filter: blur(20px);
        }

        /* Geometric polygons - positioned beside content */
        .polygon-container {
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
            width: 200px;
            height: 200px;
            opacity: 0.15;
            z-index: 0;
        }
    </style>
</head>
<body>
    <div class="certificate-bg">
        <!-- Left side geometric shapes -->
        <div class="left-shapes">
            <div class="left-circle-1"></div>
            <div class="left-circle-2"></div>
        </div>

        <!-- Right side geometric shapes -->
        <div class="right-shapes">
            <div class="right-circle-1"></div>
            <div class="right-circle-2"></div>
            <div class="right-circle-3"></div>
            
            <!-- Geometric polygons -->
            <div class="polygon-container">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <polygon points="100,50 300,80 250,200 150,180" fill="url(#gradient1)" stroke="#ec4899" stroke-width="2"/>
                    <polygon points="200,150 350,180 300,300 200,280" fill="url(#gradient2)" stroke="#8b5cf6" stroke-width="2"/>
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ec4899;stop-opacity:0.3" />
                            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.1" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.3" />
                            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>

        <!-- Top Logos with same margin and spacing -->
        <div class="absolute top-12 left-16 z-10">
            <img src="{{ public_path('all-robots.png') }}" class="h-32" alt="Robots Mascot">
        </div>
        <div class="absolute top-12 right-16 z-10">
            <img src="{{ public_path('cd212.png') }}" class="h-32" alt="Code212 Logo">
        </div>

        <!-- Main certificate content - Centered -->
        <div class="flex-1 flex items-center justify-center px-20">
            <div class="text-center max-w-5xl w-full">
                <!-- Certificate Title -->
                <h1 class="text-6xl font-bold mb-8 text-[#3b82f6] tracking-wide leading-tight">
                    &lt;Certificate of completion&gt;
                </h1>
                
                <!-- Award text -->
                <p class="text-2xl mb-8 text-white font-medium">
                    Ce certificat est accordé à:
                </p>
                
                <!-- Student Name -->
                <h2 class="text-8xl font-bold mb-8 text-white leading-tight tracking-wide">
                    {{ $studentName }}
                </h2>
                
                <!-- Completion text -->
                <p class="text-2xl mb-8 text-white font-medium">
                    après avoir réussi son examen final de la formation
                </p>
                
                <!-- Formation Name -->
                <h3 class="text-4xl font-bold mb-10 text-[#22c55e] leading-tight">
                    {{ $formationTitle }}
                </h3>
                
                <!-- Institution text -->
                <p class="text-lg text-gray-300 font-medium">
                    Fourni par le centre Code212 de l'université Cadi AYYAD.
                </p>
            </div>
        </div>

        <!-- Footer with signature and date -->
        <div class="absolute bottom-12 left-0 w-full z-10">
            <div class="flex justify-between px-16">
                <div class="flex flex-col items-start">
                    <span class="text-[#ec4899] text-xl font-bold mb-2">&lt;Signature&gt;</span>
                    <span class="italic text-white text-lg font-medium">Walid Bouarifi</span>
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-[#ec4899] text-xl font-bold mb-2">&lt;Date&gt;</span>
                    <span class="text-white text-lg font-medium">{{ $completionDate }}</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
