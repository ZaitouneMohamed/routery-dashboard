<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'km_proposer',
    ];

    public function Missions()
    {
        // return $this->hasMany(Mission::class);
    }

    public static function getData($request)
    {
        return self::latest()->paginate($request['perPage'] ?? 20);
    }
}
