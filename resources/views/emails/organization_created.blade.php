@component('mail::message')
# Bine ai venit!

Salutări **{{ $username }}**, acest email este generat automat de către aplicația **Climagex**
Te rugăm să te autentifici pe platformă folosind datele de mai jos:

>E-mail de conectare: **{{ $email }}**
>Parolă de conectare: **{{ $password }}**

@component('mail::button', ['url' => config('app.url')])
Intră pe platformă
@endcomponent

Mulțumim, <br>
{{ config('app.name') }}
@endcomponent
