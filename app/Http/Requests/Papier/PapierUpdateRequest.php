<?php

declare(strict_types=1);

namespace App\Http\Requests\Papier;

use Illuminate\Foundation\Http\FormRequest;

final class PapierUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'truck_id' => 'required|exists:trucks,id',
            'last_notification' => 'nullable|date',
            'days_count' => 'required|integer|min:1',
            'description' => 'nullable|string|max:1000',
        ];
    }
}
