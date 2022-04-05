<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email'    => ['required', 'email', 'exists:users,email'],
            'token'    => ['required', 'string'],
            'password' => ['required', 'string', 'between:3,256']
        ];
    }
}
