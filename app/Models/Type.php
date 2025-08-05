<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class Type extends InertiaBaseModel
{
    use HasFactory;
    use Searchable;

    // protected $table = "";

    protected $fillable = [];

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
}
