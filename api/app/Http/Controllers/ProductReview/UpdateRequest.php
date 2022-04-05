<?php

namespace App\Http\Controllers\ProductReview;

use App\Models\ProductReview;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'rating'    => ['sometimes', 'numeric', 'between:1,5'],
            'text'      => ['required', 'string', 'between:3,16384'],
        ];
    }

    public function authorize(): bool
    {
        return $this->productReview->user_id == $this->user()->id;
    }
}
