<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class ReparationInfoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'reparation_id' => $this->faker->randomNumber(1, 10),
            'driver_id' => $this->faker->randomNumber(1, 10),
            'truck_id' => $this->faker->randomNumber(1, 10),
            'prix' => $this->faker->randomFloat(2, 100, 10000),
            'date' => $this->faker->date(),
            'nature' => $this->faker->randomElement(['mechanical', 'electrical', 'bodywork']),
            'type_id' => $this->faker->randomNumber(1, 10),
        ];
    }
}
