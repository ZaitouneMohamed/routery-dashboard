<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class ConsumptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'driver_id' => 1, // Replace with factory relation if needed
            'truck_id' => 1, // Replace with factory relation if needed
            'date' => $this->faker->date(),
            'description' => $this->faker->optional()->sentence(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'city' => $this->faker->city(),
            'km_proposer' => $this->faker->randomFloat(2, 10, 1000),
            'n_magasin' => $this->faker->optional()->bothify('MAG-####'),
        ];
    }
}
