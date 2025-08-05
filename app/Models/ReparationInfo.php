<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class ReparationInfo extends Model
{
    use HasFactory;

    protected $fillable = ['reparation_id', 'chaufeur_id', 'camion_id', 'prix', 'date', 'nature', 'type_id'];
}
