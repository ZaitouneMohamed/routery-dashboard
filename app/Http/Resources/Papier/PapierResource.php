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
            'description' => $this->description,
            'last_notification' => $this->last_notification ? $this->last_notification->format('Y-m-d') : null,
            'days_count' => $this->days_count,
            'truck' => $this->Truck->matricule,
        ];
    }
}
