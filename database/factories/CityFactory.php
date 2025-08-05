<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class CityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->city(),
            'km_proposer' => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}
