<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\City;
use App\Models\Device;
use App\Models\Driver;
use App\Models\Facture;
use App\Models\Papier;
use App\Models\Reparation;
use App\Models\ReparationInfo;
use App\Models\Station;
use App\Models\Truck;
use App\Models\Type;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1)->create();
        Truck::factory(10)->create();
        Driver::factory(10)->create();
        Station::factory(10)->create();
        Papier::factory(20)->create();
        Facture::factory(20)->create();
        Reparation::factory(10)->create();
        Type::factory(10)->create();
        // ReparationInfo::factory(30)->create();
        Device::factory(10)->create();
        City::factory(10)->create();
    }
}
