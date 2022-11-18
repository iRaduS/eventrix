<?php

namespace App\Observers;

use App\Jobs\CreateRewardJob;
use App\Models\Reward;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RewardObserver
{
    use Loggable;

    public function creating(Reward $reward) {
        try {
            $document_file = Str::random(128) . '.' . request('attachment')->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('rewards', request('attachment'), $document_file);

            $reward->document = $document_file;
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);
        }
    }

    public function created(Reward $reward) {
        $dispatchData = [
            'email' => $reward->email,
            'user' => $reward->user,
            'description' => $reward->description,
            'link' => env('APP_URL') . '/storage/rewards/' . $reward->document
        ];

        dispatch(new CreateRewardJob($dispatchData));
    }
}
