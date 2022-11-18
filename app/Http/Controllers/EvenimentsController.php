<?php

namespace App\Http\Controllers;

use App\Transformers\EvenimentTransformer;
use App\Http\Requests\EvenimentRequest;
use App\Models\Eveniment;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EvenimentsController extends Controller
{
     use Loggable;

    public function index()
    {
        $eveniments = Eveniment::where('organization_id', Auth::user()->organization_id)->paginate();

        return Inertia::render('Eveniments/Index', compact('eveniments'));
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Eveniments/Create');
    }

    public function edit(Eveniment $eveniment)
    {
        $participants = $eveniment->getUsersForEvent($eveniment->id);

        return Inertia::render('Eveniments/Edit', compact('eveniment', 'participants'));
    }

    public function store(EvenimentRequest $request, EvenimentTransformer $transfomer) {
        try {
            Eveniment::create($transfomer->transform($request->all()));
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The event was created with success!')]);
    }

    public function delete(Eveniment $eveniment) {
        try {
            $eveniment->delete();
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The event was deleted with success!')]);
    }

    public function update(Eveniment $eveniment, EvenimentRequest $request, EvenimentTransformer $transfomer) {
        try {
            $eveniment->update($transfomer->transform($request->all()));
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The event was updated with success!')]);
    }

    public function applications(Eveniment $eveniment) {
        try {
            $eveniment->update(['closed' =>  !$eveniment->closed]);
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The applications for the event were updated with success!')]);
    }
}
