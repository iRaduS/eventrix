@component('mail::message')
# Felicitari!

Salutări **{{ $username }}**, acest email este generat automat de către aplicația **Climagex**

Ai primit un premiu din partea unui organizator, si un mesaj de la acesta:
{{ $description }}

@component('mail::button', ['url' => $link])
    Descarca premiul de aici
@endcomponent


Mulțumim, <br>
{{ config('app.name') }}
@endcomponent
