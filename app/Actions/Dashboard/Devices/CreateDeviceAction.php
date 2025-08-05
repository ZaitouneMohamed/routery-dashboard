<?php

declare(strict_types=1);

namespace App\Actions\Dashboard\Devices;

use App\Models\Device;

final class CreateDeviceAction
{
    public function handle(array $data)
    {
        Device::create($data);
    }
}
