<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property-read \App\Models\Image|null $image
 */
final class Driver extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'full_name', 'phone', 'code',
        'numero_2', 'adresse',
        'cnss', 'email', 'cni', 'status',
    ];

    public function getSearchableFields(): array
    {
        return ['full_name', 'code', 'phone'];
    }

    public function getSearchRelations(): array
    {
        return [];
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? \asset('storage/'.$this->image->url) : null;
    }

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 20);
    }
}
