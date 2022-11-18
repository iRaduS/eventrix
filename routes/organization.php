<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrganizationController;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/organizations', [OrganizationController::class, 'index'])
        ->name('organizations.index');

    Route::get('/organizations/{organization}', [OrganizationController::class, 'edit'])
        ->name('organizations.edit');

    Route::post('/organizations', [OrganizationController::class, 'store'])
        ->name('organizations.store');

    Route::patch('/organizations/{organization}', [OrganizationController::class, 'update'])
        ->name('organizations.update');

    Route::delete('/organizations/{organization}', [OrganizationController::class, 'delete'])
        ->name('organizations.delete');
});
