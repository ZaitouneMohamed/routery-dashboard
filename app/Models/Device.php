<?php

declare(strict_types=1);

namespace App\Models;

use App\Observers\DeviceObserver;
use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;

#[ObservedBy(DeviceObserver::class)]
final class Device extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'name', 'type', 'vehicle_id', 'sim_number', 'imei', 'status',
        'last_communication_at', 'installed_at', 'firmware_version',
        'ip_address', 'location', 'notes',
    ];

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

    protected $casts = [
        'last_communication_at' => 'datetime',
        'installed_at' => 'datetime',
    ];

    // Relationship with Truck model (or Car if changed)
    public function vehicle()
    {
        return $this->belongsTo(Truck::class); // or Car::class if using cars table
    }

    public function Image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getCategorieImageAttribute()
    {
        return \asset('images/categories/'.$this->Image->url);
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
        return self::latest()->with(['vehicle:id,matricule'])->paginate($request->perPage ?? 15);
    }
}
