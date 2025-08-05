<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Consumption;
use App\Models\Driver;
use App\Models\Facture;
use App\Models\Reparation;
use App\Models\Truck;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

final class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        return Inertia::render('dashboard', [
            'stats' => $this->getStats(),
        ]);
    }

    private function getStats()
    {
        // Cache stats for 5 minutes to improve performance
        return Cache::remember('dashboard_stats', 300, function () {
            $currentMonth = Carbon::now()->startOfMonth();
            $lastMonth = Carbon::now()->subMonth()->startOfMonth();
            $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();

            return [
                'totalTrucks' => [
                    'count' => Truck::count(),
                    'change' => $this->calculateMonthlyChange(
                        Truck::count(),
                        Truck::where('created_at', '<=', $lastMonthEnd)->count()
                    ),
                    'status' => $this->getChangeStatus(
                        Truck::count(),
                        Truck::where('created_at', '<=', $lastMonthEnd)->count()
                    ),
                    'subtitle' => 'Flotte totale',
                ],
                'activeTrucks' => [
                    'count' => Truck::where('statue', 1)->count(),
                    'change' => $this->calculateMonthlyChange(
                        Truck::where('statue', 1)->count(),
                        Truck::where('statue', 1)
                            ->where('updated_at', '<=', $lastMonthEnd)
                            ->count()
                    ),
                    'status' => $this->getChangeStatus(
                        Truck::where('statue', 1)->count(),
                        Truck::where('statue', 1)
                            ->where('updated_at', '<=', $lastMonthEnd)
                            ->count()
                    ),
                    'subtitle' => 'En service',
                ],
                'activeDrivers' => [
                    'count' => Driver::where('status', 1)->count(),
                    'change' => $this->calculateMonthlyChange(
                        Driver::where('status', 1)->count(),
                        Driver::where('status', 1)
                            ->where('created_at', '<=', $lastMonthEnd)
                            ->count()
                    ),
                    'status' => $this->getChangeStatus(
                        Driver::where('status', 1)->count(),
                        Driver::where('status', 1)
                            ->where('created_at', '<=', $lastMonthEnd)
                            ->count()
                    ),
                    'subtitle' => 'Chauffeurs actifs',
                ],
                'totalInvoices' => [
                    'count' => Facture::whereMonth('created_at', $currentMonth->month)
                        ->whereYear('created_at', $currentMonth->year)
                        ->count(),
                    'change' => $this->calculateMonthlyChange(
                        Facture::whereMonth('created_at', $currentMonth->month)
                            ->whereYear('created_at', $currentMonth->year)
                            ->count(),
                        Facture::whereMonth('created_at', $lastMonth->month)
                            ->whereYear('created_at', $lastMonth->year)
                            ->count()
                    ),
                    'status' => $this->getChangeStatus(
                        Facture::whereMonth('created_at', $currentMonth->month)
                            ->whereYear('created_at', $currentMonth->year)
                            ->count(),
                        Facture::whereMonth('created_at', $lastMonth->month)
                            ->whereYear('created_at', $lastMonth->year)
                            ->count()
                    ),
                    'subtitle' => 'Factures ce mois',
                ],
                'pendingRepairs' => [
                    'count' => Reparation::count(),
                    'change' => $this->calculateMonthlyChange(
                        Reparation::count(),
                        Reparation::where('created_at', '<=', $lastMonthEnd)
                            ->count()
                    ),
                    'status' => $this->getChangeStatus(
                        Reparation::count(),
                        Reparation::where('created_at', '<=', $lastMonthEnd)
                            ->count(),
                        true // Reverse status for repairs (less is better)
                    ),
                    'subtitle' => 'Réparations en cours',
                ],
                'fuelCost' => [
                    'count' => \number_format(
                        Consumption::whereMonth('created_at', $currentMonth->month)
                            ->whereYear('created_at', $currentMonth->year)
                            ->sum('km_proposer') ?? 0,
                        0
                    ),
                    'change' => $this->calculateMonthlyChange(
                        Consumption::whereMonth('created_at', $currentMonth->month)
                            ->whereYear('created_at', $currentMonth->year)
                            ->sum('km_proposer') ?? 0,
                        Consumption::whereMonth('created_at', $lastMonth->month)
                            ->whereYear('created_at', $lastMonth->year)
                            ->sum('km_proposer') ?? 0,
                        'currency'
                    ),
                    'status' => $this->getChangeStatus(
                        Consumption::whereMonth('created_at', $currentMonth->month)
                            ->whereYear('created_at', $currentMonth->year)
                            ->sum('km_proposer') ?? 0,
                        Consumption::whereMonth('created_at', $lastMonth->month)
                            ->whereYear('created_at', $lastMonth->year)
                            ->sum('km_proposer') ?? 0,
                        true // Reverse status for costs (less is better)
                    ),
                    'subtitle' => 'Coût carburant (MAD)',
                ],
            ];
        });
    }

    /**
     * Calculate monthly change between current and previous values
     */
    private function calculateMonthlyChange($current, $previous, $type = 'count')
    {
        if ($type === 'currency') {
            return \abs($current - $previous);
        }

        if ($previous === 0) {
            return $current > 0 ? $current : 0;
        }

        $percentageChange = (($current - $previous) / $previous) * 100;

        return \abs(\round($percentageChange));
    }

    /**
     * Get status direction (up/down) based on comparison
     */
    private function getChangeStatus($current, $previous, $reverse = false)
    {
        if ($current > $previous) {
            return $reverse ? 'down' : 'up';
        } elseif ($current < $previous) {
            return $reverse ? 'up' : 'down';
        }

        return 'up'; // Default to up for no change
    }

    /**
     * Clear dashboard cache (useful for development or manual refresh)
     */
    public function clearCache()
    {
        Cache::forget('dashboard_stats');

        return \response()->json([
            'success' => true,
            'message' => 'Dashboard cache cleared',
        ]);
    }
}
