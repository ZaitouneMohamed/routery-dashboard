<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Device;
use Illuminate\Support\Facades\Log;

final class DeviceObserver
{
    public function creating(Device $device): void
    {
        Log::info('hahaha');
    }
}
