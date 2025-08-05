<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class BonFactory extends Factory
{
    public function definition(): array
    {
        return [
            'consumption_id' => 1, // Replace with factory relation if needed
            'date' => $this->faker->date(),
            'qte_litre' => $this->faker->randomFloat(2, 10, 500),
            'description' => $this->faker->optional()->sentence(),
            'prix' => $this->faker->randomFloat(2, 100, 10000),
            'station_id' => 1, // Replace with factory relation if needed
            'numero_bon' => $this->faker->unique()->bothify('BON-####'),
            'km' => $this->faker->randomFloat(2, 1000, 100000),
            'nature' => $this->faker->randomElement(['gazole', 'essence']),
        ];
    }
}
