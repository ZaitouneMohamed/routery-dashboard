<?php

declare(strict_types=1);

namespace App\Http\Resources\Truck;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class TruckResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'matricule' => $this->matricule,
            'consommation' => $this->consommation,
        ];
    }
}
