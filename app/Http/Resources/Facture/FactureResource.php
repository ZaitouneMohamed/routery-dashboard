<?php

declare(strict_types=1);

namespace App\Http\Resources\Facture;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class FactureResource extends JsonResource
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
            'date' => $this->date,
            'prix' => $this->prix,
            'stationName' => $this->station->name,
            'type' => $this->type,
            'bon' => $this->n_bon,
        ];
    }
}
