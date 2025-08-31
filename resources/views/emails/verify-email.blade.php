@extends('emails.cd212')

@section('content')
    <h2>Vérification de l'adresse email</h2>
    <p>Bonjour,</p>
    <p>
        Merci de vous être inscrit sur la plateforme Code212.<br>
        Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email :
    </p>
    <a href="{{ $url }}" class="btn">Vérifier mon adresse email</a>
    <p>
        Si vous n'avez pas créé de compte, ignorez simplement cet email.
    </p>
    <p style="color:#22c55e;">L’équipe Code212</p>
@endsection
