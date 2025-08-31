@extends('emails.cd212')

@section('content')
    <h2>Mot de passe oublié</h2>
    <p>Bonjour,</p>
    <p>
        Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous :
    </p>
    <a href="{{ $url }}" class="btn">Réinitialiser le mot de passe</a>
    <p>
        Si vous n'avez pas demandé cette opération, ignorez simplement cet email.
    </p>
    <p style="color:#22c55e;">L’équipe Code212</p>
@endsection
