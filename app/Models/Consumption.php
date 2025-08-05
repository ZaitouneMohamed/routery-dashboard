<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\ConsumptionCalculatorService;
use App\Traits\Searchable;

final class Consumption extends InertiaBaseModel
{
    use Searchable;

    protected $fillable = [
        'driver_id',
        'truck_id',
        'date',
        'description',
        'status',
        'city',
        'km_proposer',
        'n_magasin',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function truck()
    {
        return $this->belongsTo(Truck::class);
    }

    public function Bons()
    {
        return $this->hasMany(Bon::class, 'consumption_id');
    }

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

    // Calculated Attributes
    public function getQtyLittreAttribute()
    {
        return \app(ConsumptionCalculatorService::class)->calculateQtyLitre($this);
    }

    public function getKmTotalAttribute()
    {
        return \app(ConsumptionCalculatorService::class)->calculateKmTotal($this);
    }

    public function getTauxAttribute()
    {
        return \app(ConsumptionCalculatorService::class)->calculateTaux($this);
    }

    public function getPrixAttribute()
    {
        return \app(ConsumptionCalculatorService::class)->calculatePrix($this);
    }

    public function getFullPrixAttribute()
    {
        return \app(ConsumptionCalculatorService::class)->calculateFullPrix($this);
    }

    public function getStatueAttribute()
    {
        return \app(ConsumptionCalculatorService::class)->calculateStatus($this);
    }

    public static function getData($request)
    {
        return self::orderBy('date', 'desc')->paginate($request['perPage'] ?? 15);
    }
}
