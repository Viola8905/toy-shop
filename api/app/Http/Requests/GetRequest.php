<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetRequest extends FormRequest
{
    public const DEFAULT_PER_PAGE = 15;

    public function rules(): array
    {
        return [
            'per_page' => ['required_with:page', 'numeric', 'between:1,100'],
            'page'     => ['sometimes', 'numeric'],
        ];
    }

    public function input($key = null, $default = null)
    {
        if ($key == 'per_page') {
            $default = self::DEFAULT_PER_PAGE;
        }
        return parent::input($key, $default);
    }
}
