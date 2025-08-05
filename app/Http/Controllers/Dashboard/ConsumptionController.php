<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\InertiaBaseController;
use App\Http\Requests\Consumption\StoreConsumptionRequest;
use App\Http\Requests\Consumption\UpdateConsumptionRequest;
use App\Http\Resources\Consumption\ConsumptionCollection;
use App\Http\Resources\Consumption\ConsumptionResource;
use App\Models\Consumption;

final class ConsumptionController extends InertiaBaseController
{
    protected $model = Consumption::class;

    protected $folderPath = 'Consumption';

    protected $storeRequestClass = StoreConsumptionRequest::class;

    protected $updateRequestClass = UpdateConsumptionRequest::class;

    protected $routeName = 'consumption.index';

    protected $resourceClass = ConsumptionResource::class;

    protected $CollectionClass = ConsumptionCollection::class;
}
