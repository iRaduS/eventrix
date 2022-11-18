<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParticipantsController;

Route::middleware(['auth'])->group(function () {
    Route::delete('/participant/{eveniment}/{user}', [ParticipantsController::class, 'leave'])
        ->name('participant.leave');

    Route::post('/participant/{eveniment}', [ParticipantsController::class, 'participate'])
        ->name('participant.participate');
});
