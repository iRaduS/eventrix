<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EvenimentsController;

Route::middleware(['auth', 'organization'])->group(function () {
    Route::get('/events', [EvenimentsController::class, 'index'])
        ->name('eveniments.index');

    Route::get('/events/create', [EvenimentsController::class, 'create'])
        ->name('eveniments.create');

    Route::get('/events/{eveniment}', [EvenimentsController::class, 'edit'])
        ->name('eveniments.edit');

    Route::post('/events', [EvenimentsController::class, 'store'])
        ->name('eveniments.store');

    Route::delete('/events/{eveniment}', [EvenimentsController::class, 'delete'])
        ->name('eveniments.delete');

    Route::patch('/events/{eveniment}', [EvenimentsController::class, 'update'])
        ->name('eveniments.update');

    Route::patch('/events/applications/{eveniment}', [EvenimentsController::class, 'applications'])
        ->name('eveniments.applications');
});
