<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class FactureFactory extends Factory
{
    public function definition(): array
    {
        return [
            'date' => $this->faker->date(),
            'prix' => $this->faker->randomFloat(2, 100, 10000),
            'station_id' => $this->faker->randomNumber(1, 10),
            'n_bon' => $this->faker->unique()->bothify('BON-####'),
        ];
    }
}
