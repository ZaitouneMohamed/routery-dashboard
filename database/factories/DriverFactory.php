<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class DriverFactory extends Factory
{
    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'code' => $this->faker->unique()->bothify('DRV-####'),
            'numero_2' => $this->faker->optional()->phoneNumber(),
            'adresse' => $this->faker->optional()->address(),
            'cnss' => $this->faker->optional()->numerify('########'),
            'email' => $this->faker->optional()->safeEmail(),
            'cni' => $this->faker->optional()->bothify('CNI#######'),
            'status' => $this->faker->boolean(90),
        ];
    }
}
