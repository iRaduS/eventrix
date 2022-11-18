<?php

namespace App\Traits;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

trait Loggable
{
    public function sendDebugLogs(string $class, \Exception $e) {
        if (App::environment('APP_DEBUG')) {
            Log::debug("{$class}: {$e->getMessage()}");
        }
    }
}
