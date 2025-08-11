<?php

declare(strict_types=1);

namespace App\Http\Requests\Facture;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

final class UpdateFactureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        Log::info('Current route facture parameter:', ['facture' => \request()->route('facture')]);

        return [
            'date' => 'required|date',
            'prix' => 'required',
            'station_id' => 'required|exists:stations,id',
            'n_bon' => 'required', Rule::unique('factures', 'n_bon')->ignore(\request()->route('facture')),

        ];
    }
}
