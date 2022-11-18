<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrganizationCreated extends Mailable
{
    use Queueable, SerializesModels;

    private $name;
    private $email;
    private $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $email, string $password)
    {
        $this->password = $password;
        $this->email = $email;
        $this->name = $name;
    }

    public function build()
    {
        return $this->subject("Welcome on Climagex, {$this->name}")->markdown('emails.organization_created', [
            'username' => $this->name,
            'password' => $this->password,
            'email' => $this->email
        ]);
    }
}
