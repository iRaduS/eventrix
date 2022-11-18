<?php

namespace App\Jobs;

use App\Mail\OrganizationCreated;
use App\Traits\Loggable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class CreateOrganizationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Loggable;

    protected $details;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $createOrganizationMailable = new OrganizationCreated($this->details['name'], $this->details['email'], $this->details['password']);

        try {
            Mail::to($this->details['email'])->later(now()->seconds(15), $createOrganizationMailable);
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);
        }
    }
}
