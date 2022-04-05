<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UpdateSettingsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email'            => [
                'sometimes', 'email',
                Rule::unique('users', 'email')->ignore($this->user()->email, 'email')
            ],
            'first_name'       => ['sometimes', 'string', 'between:3,64'],
            'middle_name'      => ['sometimes', 'string', 'between:3,64'],
            'last_name'        => ['sometimes', 'string', 'between:3,64'],
            'password'         => ['sometimes', 'string', 'between:3,256', 'confirmed'],
            'current_password' => ['required_with:password', 'string'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!Hash::check($this->current_password, $this->user()->password)) {
                $validator->errors()->add('current_password', trans('auth.password'));
            }
        });
    }

    public function processed(): array
    {
        return array_merge(parent::validated(), ['password' => Hash::make($this->password)]);
    }
}
