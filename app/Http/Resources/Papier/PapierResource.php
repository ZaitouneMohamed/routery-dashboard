<?php

declare(strict_types=1);

namespace App\Http\Resources\Papier;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class PapierResource extends JsonResource
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
            'title' => $this->title,
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'description' => $this->description,
            'truck' => $this->Truck->matricule,
            'enndAt' => $this->DaysUntilFin,
        ];
    }
}
