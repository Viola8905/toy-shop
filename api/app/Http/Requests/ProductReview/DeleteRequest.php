<?php

namespace App\Http\Requests\ProductReview;

use App\Models\ProductReview;
use Illuminate\Foundation\Http\FormRequest;

class DeleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin() || $this->productReview->user_id == $this->user()->id;
    }

    public function rules(): array
    {
        return [];
    }
}
