<?php

declare(strict_types=1);

namespace App\Http\Resources\Truck;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

final class TruckCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'marque' => $item->marque,
                    'matricule' => $item->matricule,
                    'consommation' => $item->consommation,
                    'genre' => $item->genre,
                    'type_carburant' => $item->type_carburant,
                ];
            }),
            // Include pagination information for the response
            'links' => [
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'total_pages' => $this->lastPage(),
            ],
        ];
    }
}
