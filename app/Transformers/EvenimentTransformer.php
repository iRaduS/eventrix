<?php

namespace App\Transformers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EvenimentTransformer
{
    public function transform(array $data)
    {
        $data = (object)$data;
        return [
            'lat' => $data->lat,
            'long' => $data->long,
            'name' => $data->name,
            'description' => $data->description,
            'type' => $data->type,
            'started_at' => $data->started_at,
            'ended_at' => $data->ended_at,
            'participants' => $data->participants,
            'organization_id' => Auth::user()->organization_id
        ];
    }
}
