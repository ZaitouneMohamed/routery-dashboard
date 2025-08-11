<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\InertiaBaseController;
use App\Http\Requests\City\CityStoreRequest;
use App\Http\Requests\City\CityUpdateRequest;
use App\Http\Resources\City\CityCollection;
use App\Http\Resources\City\CityResource;
use App\Models\City;

final class CityController extends InertiaBaseController
{
    protected $model = City::class;

    protected $folderPath = 'City';

    protected $storeRequestClass = CityStoreRequest::class;

    protected $updateRequestClass = CityUpdateRequest::class;

    protected $routeName = 'city.index';

    protected $resourceClass = CityResource::class;

    protected $CollectionClass = CityCollection::class;
}
