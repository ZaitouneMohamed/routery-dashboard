<?php

declare(strict_types=1);

namespace App\Http\Resources\Reparation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class ReparationResource extends JsonResource
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
            'Nbon' => $this->n_bon,
            'left' => $this->prix - $this->Info->sum('prix'),
        ];
    }
}
