<?php

namespace App\Http\Controllers;

use App\Models\Eveniment;
use App\Models\User;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ParticipantsController extends Controller
{
    use Loggable;

    public function participate(Eveniment $eveniment): \Illuminate\Http\RedirectResponse
    {
        try {
            $eveniment->users()->attach(Auth::user());
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('You were added to the participants with success at this event.')]);
    }

    public function leave(Eveniment $eveniment, User $user): \Illuminate\Http\RedirectResponse
    {
        try {
            $eveniment->users()->detach($user);
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __("User {$user->name} won't participate no more to {$eveniment->name}")]);
    }
}
