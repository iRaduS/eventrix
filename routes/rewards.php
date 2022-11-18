<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RewardController;

Route::middleware(['auth'])->group(function () {
    Route::get('/reward/{eveniment}/{user}', [RewardController::class, 'create'])
        ->name('reward.create');

    Route::post('/reward/{eveniment}/{user}', [RewardController::class, 'store'])
        ->name('reward.store');
});
