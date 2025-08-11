<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class Papier extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'title',
        'truck_id',
        'last_notification',
        'days_count',
        'description',
    ];

    protected $casts = [
        'last_notification' => 'date',
    ];

    public function Truck()
    {
        return $this->belongsTo(Truck::class);
    }

    public function getDaysUntilFinAttribute()
    {
        if (! $this->last_notification || ! $this->days_count) {
            return null;
        }

        return Carbon::parse($this->last_notification)->addDays($this->days_count)->diffForHumans(Carbon::today());

    }

    public function getProgressPercentageAttribute()
    {
        $totalDuration = $this->date_debut->diffInDays($this->date_fin);
        $elapsedDuration = $this->date_debut->diffInDays(Carbon::today());

        // Calculate progress percentage, ensuring it does not exceed 100%
        $percentage = ($elapsedDuration / $totalDuration) * 100;

        return \min(\max($percentage, 0), 100); // Clamp between 0 and 100
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

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 15);
    }
}
