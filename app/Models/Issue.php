<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Http\Request;

final class Issue extends InertiaBaseModel
{
    use Searchable;

    protected $fillable = [
        'camion_id',
        'title',
        'status',
    ];

    /**
     * Get the truck related to this issue.
     */
    public function Trcuk()
    {
        return $this->belongsTo(Truck::class, 'camion_id');
    }

    /**
     * Get the searchable fields
     */
    public function getSearchableFields(): array
    {
        return [
            'full_name',
            'code',
            'phone',
        ];
    }

    /**
     * Get relations to load with search
     */
    public function getSearchRelations(): array
    {
        return [
            // your relations like 'trucks', 'stations', etc...
        ];
    }

    public static function getData(Request $request)
    {
        return Issue::latest()->paginate($request->perPage ?? 15);
    }
}
