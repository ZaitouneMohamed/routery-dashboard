<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class Station extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'name',
        'solde',
        'gerant_name',
        'gerant_phone',
        'gerant_rep_name',
        'gerant_rep_phone',
        'ville',
    ];

    public function getSearchableFields(): array
    {
        return [
            'name',
        ];
    }

    public function getSearchRelations(): array
    {
        return [
            // your relations like 'trucks', 'stations', etc...
        ];
    }

    protected $searchFillables = ['name'];

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 15);
    }
}
