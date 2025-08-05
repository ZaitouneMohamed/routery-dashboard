<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Consumption;
use App\Models\Driver;
use App\Models\Papier;
use App\Models\Station;
use App\Models\Truck;
use Illuminate\Support\Facades\Cache;

final class DashboardController extends Controller
{
    public function getCardData()
    {
        $cachedCounts = [
            'chauffeur' => Cache::rememberForever('chauffeur_count', function () {
                return Driver::count();
            }),
            'camion' => Cache::rememberForever('camion_count', function () {
                return Truck::count();
            }),
            'papier' => Cache::rememberForever('papier_count', function () {
                return Papier::count();
            }),
            'station' => Cache::rememberForever('station_count', function () {
                return Station::count();
            }),
            'consomation' => Cache::rememberForever('consomation_count', function () {
                return Consumption::count();
            }),
        ];

        return \response()->json([
            'countData' => $cachedCounts,
        ]);
    }
}
