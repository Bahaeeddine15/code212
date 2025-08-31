@extends('emails.cd212')

@section('content')
    <h2>Réinitialisation du mot de passe</h2>
    <p>Bonjour,</p>
    <p>
        Vous recevez cet email car nous avons reçu une demande de réinitialisation du mot de passe pour votre compte.
    </p>
    <a href="{{ $url }}" class="btn">Réinitialiser le mot de passe</a>
    <p>
        Si vous n'avez pas demandé de réinitialisation, aucune action n'est requise.
    </p>
    <p style="color:#22c55e;">L’équipe Code212</p>
@endsection
