<?php

namespace App\Jobs;

use App\Mail\RewardCreated;
use App\Traits\Loggable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class CreateRewardJob implements ShouldQueue
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
        $createRewardMailable = new RewardCreated($this->details['user'], $this->details['description'], $this->details['link']);

        try {
            Mail::to($this->details['email'])->later(now()->seconds(15), $createRewardMailable);
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);
        }
    }
}
