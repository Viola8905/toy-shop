<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->guest();
    }

    public function rules(): array
    {
        return [
            'email'       => ['required', 'email', 'unique:users,email'],
            'first_name'  => ['required', 'string', 'between:3,64'],
            'middle_name' => ['sometimes', 'string', 'between:3,64'],
            'last_name'   => ['required', 'string', 'between:3,64'],
            'password'    => ['required', 'string', 'between:3,256']
        ];
    }

    public function processed(): array
    {
        return array_merge(parent::validated(), ['password' => Hash::make($this->password)]);
    }
}
