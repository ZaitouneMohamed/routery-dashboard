<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class Truck extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'matricule',
        'statue',
        'is_for_aej',
        'marque',
        'genre',
        'type_carburant',
        'n_chasie',
        'puissanse_fiscale',
        'premier_mise',
        'consommation',
    ];

    public function getSearchableFields(): array
    {
        return [
            'matricule',
        ];
    }

    public function getSearchRelations(): array
    {
        return [
            // your relations like 'trucks', 'stations', etc...
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('statue', 1);
    }

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 5);
    }
}
