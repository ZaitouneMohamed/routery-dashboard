<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\InertiaBaseController;
use App\Http\Requests\Bon\StoreBonRequest;
use App\Http\Requests\Bon\UpdateBonRequest;
use App\Models\Bon;

final class BonController extends InertiaBaseController
{
    protected $model = Bon::class;

    protected $folderPath = 'Consumption';

    // protected $storeRequestClass = StoreConsumptionRequest::class;
    protected $updateRequestClass = UpdateBonRequest::class;

    protected $storeRequestClass = StoreBonRequest::class;
    // protected $routeName = "consumption.index";
    // protected $resourceClass = ConsumptionResource::class;

}
