<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\InertiaBaseController;
use App\Http\Resources\Reparation\ReparationCollection;
use App\Http\Resources\Reparation\ReparationResource;
use App\Models\Reparation;

final class ReparationController extends InertiaBaseController
{
    protected $model = Reparation::class;

    protected $routeName = 'reparations.index';

    protected $folderPath = 'Reparation';

    protected $resourceClass = ReparationResource::class;

    protected $CollectionClass = ReparationCollection::class;
}
