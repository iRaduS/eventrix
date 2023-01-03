<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
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

    activity()->causedBy(auth()->user())->log("visited Dashboard");
    if ($organization > 0) {
        $eveniments = \App\Models\Eveniment::with('users')->where('organization_id', $organization)->get();

        $weatherAppToken = env('OPENWEATHER_API_TOKEN');

        foreach ($eveniments as $eveniment) {
            if (!Cache::has("eveniments.weather.{$eveniment->id}")) {
                $response = Http::get("https://api.openweathermap.org/data/2.5/weather?lat={$eveniment->lat}&lon={$eveniment->long}&excluded=minutely,hourly,daily,alerts&appid={$weatherAppToken}&units=metric");

                Cache::add("eveniments.weather.{$eveniment->id}", $response->json(), 5 * 60);
                $eveniment->weatherData = $response->json();
            } else {
                $eveniment->weatherData = Cache::get("eveniments.weather.{$eveniment->id}");
            }
        }

        return Inertia::render('Dashboard', compact('eveniments'));
    } else {
        $eveniments = \App\Models\Eveniment::with('users')->paginate();

        $weatherAppToken = env('OPENWEATHER_API_TOKEN');

        foreach ($eveniments as $eveniment) {
            if (!Cache::has("eveniments.weather.{$eveniment->id}")) {
                $response = Http::get("https://api.openweathermap.org/data/2.5/weather?lat={$eveniment->lat}&lon={$eveniment->long}&excluded=minutely,hourly,daily,alerts&appid={$weatherAppToken}&units=metric");

                Cache::add("eveniments.weather.{$eveniment->id}", $response->json(), 5 * 60);
                $eveniment->weatherData = $response->json();
            } else {
                $eveniment->weatherData = Cache::get("eveniments.weather.{$eveniment->id}");
            }
        }

        return Inertia::render('Dashboard', compact('eveniments'));
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/logs', [\App\Http\Controllers\LogController::class, 'index'])
    ->middleware(['auth', 'admin'])->name('logs.index');
Route::get('/logs/export/{type}', [\App\Http\Controllers\LogController::class, 'export'])
    ->middleware(['auth', 'admin'])->name('logs.export');

require __DIR__.'/auth.php';
require __DIR__.'/organization.php';
require __DIR__.'/eveniments.php';
require __DIR__.'/participants.php';
require __DIR__.'/rewards.php';
