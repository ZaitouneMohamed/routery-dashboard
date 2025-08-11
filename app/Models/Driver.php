<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class Driver extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['full_name', 'phone', 'code', 'numero_2', 'adresse', 'cnss', 'email', 'cni', 'status'];

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

    public function scopeActive($query)
    {
        return $query->where('statue', 1);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return \asset('storage/'.$this->image->url);
        }

        return null; // or a default image URL
    }

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 20);
    }
}
