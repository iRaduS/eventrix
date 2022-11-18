<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    $organization = \Illuminate\Support\Facades\Auth::user()->organization_id;

    if ($organization > 0) {
        $eveniments = \App\Models\Eveniment::with('users')->where('organization_id', $organization)->get();
        return Inertia::render('Dashboard', compact('eveniments'));
    } else {
        $eveniments = \App\Models\Eveniment::with('users')->paginate();
        return Inertia::render('Dashboard', compact('eveniments'));
    }
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
require __DIR__.'/organization.php';
require __DIR__.'/eveniments.php';
require __DIR__.'/participants.php';
require __DIR__.'/rewards.php';
