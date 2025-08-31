<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Code212' }}</title>
    <style>
        body {
            background: #0c1120;
            color: #fff;
            font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 520px;
            margin: 40px auto;
            background: #18181b;
            border-radius: 18px;
            box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.25);
            padding: 32px 24px;
        }

        .logo {
            display: block;
            margin: 0 auto 24px auto;
            height: 60px;
        }

        h1,
        h2,
        h3 {
            color: #3b82f6;
            font-weight: bold;
        }

        p{
            color: #fff;
        }

        .btn {
            display: inline-block;
            background: #22c55e;
            color: #fff;
            font-weight: bold;
            padding: 12px 28px;
            border-radius: 8px;
            text-decoration: none;
            margin: 24px 0;
        }

        .footer {
            color: #ec4899;
            font-size: 0.95rem;
            text-align: center;
            margin-top: 32px;
        }

        a {
            color: #3b82f6;
        }
    </style>
</head>

<body>
    <div class="container">
        <img src="{{ $message->embed(public_path('cd212.png')) }}" alt="Code212" class="logo">
        @yield('content')
        <div class="footer">
            Fourni par le centre Code212 de l’université Cadi AYYAD.
        </div>
    </div>
</body>

</html>
