<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RewardCreated extends Mailable
{
    use Queueable, SerializesModels;

    private $name;
    private $description;
    private $link;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $description, string $link)
    {
        $this->name = $name;
        $this->description = $description;
        $this->link = $link;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("A reward from Climagex {$this->name}")->markdown('emails.reward_created', [
            'username' => $this->name,
            'description' => $this->description,
            'link' => $this->link
        ]);
    }
}
