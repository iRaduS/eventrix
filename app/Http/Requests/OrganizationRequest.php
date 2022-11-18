<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class OrganizationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:64',
            'description' => ['required','regex:/^[a-zA-Z\d\s\-\,\#\.\+]+$/', 'min:3', 'max:512'],
            'email' => 'required|email',
            'address' => 'required|min:10|regex:/^[a-zA-Z\d\s\-\,\#\.\+]+$/|max:255',
            'profile_picture' => 'nullable|string',
            'phone' => ['nullable','regex:/^$|^\(?\d{2,4}\)?[\d\s-]+$/', 'min:3','max:16'],
            'website' => ['required','regex:/^$|^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/'],
            'type' => 'required|integer|max:3'
        ];
    }
}
