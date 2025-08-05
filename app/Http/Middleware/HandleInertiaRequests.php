<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sharedData = [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];

        // Share trucks, drivers, and cities data only for specific routes
        $routesNeedingFleetData = [
            'consumption.create',
            'consumption.edit',
            'reparation.create',
            'reparation.edit',
            // Add other routes that need this data
        ];

        if (\in_array($request->route()->getName(), $routesNeedingFleetData, true)) {
            $sharedData['fleetData'] = [
                'trucks' => \App\Models\Truck::select('id', 'matricule')->get(),
                'drivers' => \App\Models\Driver::select('id', 'full_name')->get(),
                'cities' => \App\Models\City::select('id', 'name')->get(),
            ];
        }

        return $sharedData;
    }
}
