<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\HasProductRules;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    use HasProductRules;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->productRules();
    }
}
