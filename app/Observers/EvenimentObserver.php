<?php

namespace App\Observers;

use App\Models\Eveniment;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EvenimentObserver
{
    use Loggable;

    public function creating(Eveniment $eveniment) {
        try {
            $banner_file = Str::random() . $eveniment->name . '.' . request('banner_picture')->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('eveniments', request('banner_picture'), $banner_file);

            $eveniment->banner_picture = $banner_file;
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);
        }
    }

    public function updating(Eveniment $eveniment) {
        try {
            if ($eveniment->isDirty('banner_picture')) {
                $banner_file = Str::random() . $eveniment->name . '.' . request('banner_picture')->getClientOriginalExtension();

                if (Storage::disk('public')->exists("eveniments/{$eveniment->banner_picture}")) {
                    Storage::disk('public')->delete($eveniment->banner_picture);
                }

                Storage::disk('public')->putFileAs('eveniments', request('banner_picture'), $banner_file);
                $eveniment->banner_picture = $banner_file;
            }
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);
        }
    }
}
