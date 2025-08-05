<?php

declare(strict_types=1);

namespace App\Http\Resources\Papier;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

final class PapierCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'data' => $this->collection->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'truck' => $item->Truck->matricule,
                    'notification_after' => $item->DaysUntilFin,
                ];
            }),

            'links' => $this->resource,
        ];
    }
}
