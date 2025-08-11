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
            'marque' => $this->marque,
            'genre' => $this->genre,
            'type_carburant' => $this->type_carburant,
            'n_chasie' => $this->n_chasie,
            'puissanse_fiscale' => $this->puissanse_fiscale,
            'premier_mise' => $this->premier_mise,
        ];
    }
}
