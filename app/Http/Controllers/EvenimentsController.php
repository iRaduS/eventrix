<?php

namespace App\Http\Controllers;

use App\Transformers\EvenimentTransformer;
use App\Http\Requests\EvenimentRequest;
use App\Models\Eveniment;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EvenimentsController extends Controller
{
     use Loggable;

    public function index()
    {
        $eveniments = Eveniment::where('organization_id', Auth::user()->organization_id)->paginate();
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

        activity()->causedBy(auth()->user())->log("visited page Eveniments > Index");
        return Inertia::render('Eveniments/Index', compact('eveniments'));
    }

    public function create(): \Inertia\Response
    {
        activity()->causedBy(auth()->user())->log("visited page Eveniments > Create");
        return Inertia::render('Eveniments/Create');
    }

    public function edit(Eveniment $eveniment)
    {
        $participants = $eveniment->getUsersForEvent($eveniment->id);

        return Inertia::render('Eveniments/Edit', compact('eveniment', 'participants'));
    }

    public function store(EvenimentRequest $request, EvenimentTransformer $transfomer) {
        try {
            $eveniment = Eveniment::create($transfomer->transform($request->all()));
            activity()->performedOn($eveniment)->causedBy(auth()->user())->log("created a new Eveniment");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The event was created with success!')]);
    }

    public function delete(Eveniment $eveniment) {
        try {
            $eveniment->delete();

            if (Cache::has("eveniments.weather.{$eveniment->id}")) {
                Cache::forget("eveniments.weather.{$eveniment->id}");
            }

            activity()->performedOn($eveniment)->causedBy(auth()->user())->log("deleted an Eveniment");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The event was deleted with success!')]);
    }

    public function update(Eveniment $eveniment, EvenimentRequest $request, EvenimentTransformer $transfomer) {
        try {
            $eveniment->update($transfomer->transform($request->all()));

            activity()->performedOn($eveniment)->causedBy(auth()->user())->log("updated an Eveniment");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The event was updated with success!')]);
    }

    public function applications(Eveniment $eveniment) {
        try {
            $eveniment->update(['closed' =>  !$eveniment->closed]);

            activity()->performedOn($eveniment)->causedBy(auth()->user())->log("updated status of applications for an Eveniment");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The applications for the event were updated with success!')]);
    }
}
