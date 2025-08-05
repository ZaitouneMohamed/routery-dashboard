<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Actions\Dashboard\Devices\CreateDeviceAction;
use App\Http\Controllers\InertiaBaseController;
use App\Http\Requests\Device\StoreDeviceREquest;
use App\Http\Requests\Device\UpdateDeviceREquest;
use App\Http\Resources\Device\DeviceCollection;
use App\Http\Resources\Device\DeviceResource;
use App\Models\Device;

final class DeviceController extends InertiaBaseController
{
    protected $model = Device::class;

    protected $folderPath = 'Device';

    protected $storeRequestClass = StoreDeviceREquest::class;

    protected $updateRequestClass = UpdateDeviceREquest::class;

    protected $createActionPattern = CreateDeviceAction::class;

    protected $routeName = 'device.index';

    protected $resourceClass = DeviceResource::class;

    protected $CollectionClass = DeviceCollection::class;
}
