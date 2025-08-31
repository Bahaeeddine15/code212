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
                width: 297mm !important;
                height: 210mm !important;
                min-height: 0 !important;
                min-width: 0 !important;
                max-width: none !important;
                max-height: none !important;
                overflow: visible !important;
            }
        }
        body {
            font-family: monospace;
            background: #0c1120;
            min-height: 100vh;
            min-width: 100vw;
            overflow: hidden;
        }
        .certificate-bg {
            position: relative;
            width: 100vw;
            height: 100vh;
            min-height: 100vh;
            min-width: 100vw;
            background: #0c1120;
            overflow: hidden;
        }
        /* Geometric shapes */
        .shape {
            position: absolute;
            opacity: 0.18;
            z-index: 0;
        }
        .circle-blue {
            top: 4%; left: 8%;
            width: 220px; height: 220px;
            background: #3b82f6;
            border-radius: 50%;
            filter: blur(2px);
        }
        .circle-green {
            bottom: 7%; left: 12%;
            width: 140px; height: 140px;
            background: #22c55e;
            border-radius: 50%;
            filter: blur(2px);
        }
        .circle-pink {
            top: 12%; right: 10%;
            width: 180px; height: 180px;
            background: #ec4899;
            border-radius: 50%;
            filter: blur(2px);
        }
        .square-purple {
            bottom: 8%; right: 8%;
            width: 110px; height: 110px;
            background: #8b5cf6;
            border-radius: 24px;
            filter: blur(2px);
        }
        .circle-yellow {
            top: 40%; left: 45%;
            width: 80px; height: 80px;
            background: #fde047;
            border-radius: 50%;
            opacity: 0.10;
            filter: blur(2px);
        }
        @media (max-width: 900px) {
            .circle-blue, .circle-green, .circle-pink, .square-purple, .circle-yellow {
                width: 90px; height: 90px;
            }
        }
    </style>
</head>
<body>
  <div class="certificate-bg">
    <!-- Geometric shapes -->
    <div class="shape circle-blue"></div>
    <div class="shape circle-green"></div>
    <div class="shape circle-pink"></div>
    <div class="shape square-purple"></div>
    <div class="shape circle-yellow"></div>

    <!-- Top Logos (robots + Code212) -->
    <div class="absolute top-10 left-10 z-10">
      <img src="{{ public_path('all-robots.png') }}" class="h-24 md:h-32" alt="Robots">
    </div>
    <div class="absolute top-10 right-10 z-10">
      <img src="{{ public_path('cd212.png') }}" class="h-16 md:h-20" alt="Code212 Logo">
    </div>

    <!-- Centered certificate content -->
    <div class="flex items-center justify-center w-full h-full absolute inset-0 z-10">
      <div class="w-full px-8 md:px-20 flex flex-col items-center justify-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6 text-[#3b82f6] tracking-wide text-center">
          Certificate of completion;
        </h2>
        <p class="text-lg md:text-2xl mb-6 text-center">Ce certificat est accordé à:</p>
        <h1 class="text-5xl md:text-7xl font-extrabold mb-4 text-white leading-tight text-center">
          {{ $studentName }}
        </h1>
        <p class="text-base md:text-xl mb-4 text-center">
          après avoir réussi son en examen finale de la formation
        </p>
        <h2 class="text-2xl md:text-4xl font-bold mb-10 text-[#22c55e] text-center">
          {{ $formationTitle }}
        </h2>
      </div>
    </div>

    <!-- Footer note and signature/date row -->
    <div class="absolute bottom-0 left-0 w-full z-10 pb-10">
      <div class="flex flex-col items-center mb-4">
        <p class="text-xs md:text-base text-gray-200 text-center">
          Fourni par le centre Code212 de l’université Cadi AYYAD.
        </p>
      </div>
      <div class="flex justify-between w-full px-20">
        <div class="flex flex-col items-start">
          <span class="text-[#ec4899] text-lg md:text-xl font-bold mb-2">Signature</span>
          <span class="italic text-white text-base md:text-lg">Walid Bouarifi</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-[#ec4899] text-lg md:text-xl font-bold mb-2">Date</span>
          <span class="text-white text-base md:text-lg">{{ $completionDate }}</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>