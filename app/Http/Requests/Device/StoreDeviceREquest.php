<?php

declare(strict_types=1);

namespace App\Http\Requests\Device;

use Illuminate\Foundation\Http\FormRequest;

final class StoreDeviceREquest extends FormRequest
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
        return [
            'name' => 'required',
            'type' => 'required',
            'vehicle_id' => 'required',
            'sim_number' => 'nullable',
            'imei' => 'nullable',
            'status' => 'nullable',
            'firmware_version' => 'nullable',
            'ip_address' => 'nullable',
            'location' => 'nullable',
            'notes' => 'nullable',
        ];
    }
}
