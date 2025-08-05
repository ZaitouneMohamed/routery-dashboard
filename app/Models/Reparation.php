<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class Reparation extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['chaufeur_id', 'camion_id', 'date', 'fournisseur', 'reparation', 'prix', 'nature', 'type', 'n_bon'];

    public function Info()
    {
        return $this->hasMany(ReparationInfo::class);
    }

    public function Driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function Truck()
    {
        return $this->belongsTo(Truck::class);
    }

    /**
     * Get the searchable fields
     */
    public function getSearchableFields(): array
    {
        return [
            'n_bon',
            'date',
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

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 15);
    }
}
