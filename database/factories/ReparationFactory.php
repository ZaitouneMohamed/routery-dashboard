<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class ReparationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'driver_id' => $this->faker->randomNumber(1, 10),
            'truck_id' => $this->faker->randomNumber(1, 10),
            'date' => $this->faker->date(),
            'fournisseur' => $this->faker->company(),
            'reparation' => $this->faker->word(),
            'prix' => $this->faker->randomFloat(2, 100, 10000),
            'nature' => $this->faker->randomElement(['mechanical', 'electrical', 'bodywork']),
            'type' => $this->faker->randomElement(['minor', 'major']),
            'n_bon' => $this->faker->unique()->bothify('BON-####'),
        ];
    }
}
