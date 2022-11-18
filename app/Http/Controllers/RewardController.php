<?php

namespace App\Http\Controllers;

use App\Http\Requests\RewardRequest;
use App\Models\Eveniment;
use App\Models\Reward;
use App\Models\User;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RewardController extends Controller
{
    use Loggable;

    public function create(Eveniment $eveniment, User $user) {
        return Inertia::render('Reward/Create', compact('eveniment', 'user'));
    }

    public function store(Eveniment $eveniment, User $user, RewardRequest $request) {
        try {
            Reward::create(['user_id' => $user->id, 'eveniment_id' => $eveniment->id, 'description' => $request->description, 'user' => $request->name, 'email' => $request->email]);
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('You sent a reward with success.')]);
    }
}
