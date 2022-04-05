<?php

namespace App\Http\Requests\ProductReview;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'product_id' => ['required', 'numeric', 'exists:products,id'],
            'rating'     => ['sometimes', 'numeric', 'between:1,5'],
            'text'       => ['required', 'string', 'between:3,16384'],
        ];
    }
}
