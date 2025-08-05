<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class PapierFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'date_debut' => $this->faker->date(),
            'date_fin' => $this->faker->date(),
            'description' => $this->faker->optional()->sentence(),
            'truck_id' => $this->faker->randomNumber(1, 10),
            'days_count' => $this->faker->numberBetween(1, 365),
            'last_notification' => $this->faker->optional()->date(),
        ];
    }
}
