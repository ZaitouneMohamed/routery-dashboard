<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\InertiaBaseController;
use App\Http\Requests\Papier\PapierStoreRequest;
use App\Http\Resources\Papier\PapierCollection;
use App\Http\Resources\Papier\PapierResource;
use App\Models\Papier;

final class PapierController extends InertiaBaseController
{
    protected $model = Papier::class;

    protected $resourceClass = PapierResource::class;

    protected $CollectionClass = PapierCollection::class;

    protected $storeRequestClass = PapierStoreRequest::class;

    protected $folderPath = 'Papiers';

    protected $routeName = 'papiers.index';
}
