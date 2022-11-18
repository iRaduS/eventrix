<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EvenimentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->organization_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'lat' => 'required|numeric',
            'long' => 'required|numeric',
            'name' => 'required|string|min:3|max:128',
            'description' => 'required|string|min:3|max:256',
            'started_at' => 'required|date|after:today',
            'ended_at' => 'required|date|after:started_at',
            'participants' => 'required|numeric|min:2|max:400',
            'type' => 'required|numeric|min:1|max:3',
            'banner_picture' => 'file|image|mimes:png,jpg,jpeg|max:4096'
        ];
    }
}
