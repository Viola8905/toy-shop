<?php

namespace App\Http\Requests;

class GetProductRequest extends GetRequest
{
    public function rules(): array
    {
        return array_merge(
            parent::rules(),
            [
                'category_ids'   => ['sometimes', 'array'],
                'category_ids.*' => ['required', 'numeric', 'exists:categories,id']
            ]
        );
    }
}
