<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class StationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'solde' => $this->faker->randomFloat(2, 0, 100000),
            'gerant_name' => $this->faker->name(),
            'gerant_phone' => $this->faker->phoneNumber(),
            'gerant_rep_name' => $this->faker->name(),
            'gerant_rep_phone' => $this->faker->phoneNumber(),
            'city' => $this->faker->city(),
        ];
    }
}
