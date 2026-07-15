<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'between:0,999999.99', 'decimal:0,2'],
            'stock' => ['required', 'integer', 'between:0,65535'],
            'categories' => ['required', 'array', 'exists:categories,id'],
        ];
    }
}
