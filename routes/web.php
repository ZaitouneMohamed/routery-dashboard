<?php

declare(strict_types=1);

use App\Http\Controllers\Dashboard\BonController;
use App\Http\Controllers\Dashboard\ConsumptionController;
use App\Http\Controllers\Dashboard\DeviceController;
use App\Http\Controllers\Dashboard\DriverController;
use App\Http\Controllers\Dashboard\FactureController;
use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\PapierController;
use App\Http\Controllers\Dashboard\ReparationController;
use App\Http\Controllers\Dashboard\SearchController;
use App\Http\Controllers\Dashboard\StationController;
use App\Http\Controllers\Dashboard\TruckController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::permanentRedirect('/', '/dashboard');

Route::get('/map', function () {
    return Inertia::render('truck-map');
});

Route::get('dashboard', HomeController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::resource('drivers', DriverController::class);
    Route::resource('trucks', TruckController::class);
    Route::resource('stations', StationController::class);
    //
    Route::resource('consumption', ConsumptionController::class);
    Route::resource('factures', FactureController::class);
    Route::resource('bons', BonController::class);
    Route::resource('reparations', ReparationController::class);
    Route::resource('papiers', PapierController::class);
    Route::resource('device', DeviceController::class);

    Route::controller(SearchController::class)->name('search.')->prefix('search')->group(function () {
        Route::get('bonsSearch', 'bonsSearch')->name('bons');
        Route::get('driversSearch', 'driversSearch')->name('drivers');
        Route::get('trucksSearch', 'trucksSearch')->name('trucks');
        Route::get('stationsSearch', 'stationsSearch')->name('stations');
        Route::get('consumptionSearch', 'consumptionSearch')->name('consumption');
        Route::get('missionSearch', 'missionSearch')->name('mission');
    });
    Route::prefix('live-tracking')->name('live-tracking.')->group(function () {
        Route::get('/map', function () {
            return Inertia::render('truck-map');
        })->name('map');
    });
});

Route::get('/test-mail', function () {
    $data = [
        'subject' => 'Test Email',
        'body' => 'This is a test email from Laravel Docker setup.',
    ];

    Mail::send('emails.test', $data, function ($message) {
        $message->to('test@example.com')
            ->subject('Test Email from Laravel');
    });

    return 'Email has been sent. Check Mailhog at http://localhost:8025';
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
