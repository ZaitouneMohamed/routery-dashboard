<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class IssueFactory extends Factory
{
    public function definition(): array
    {
        return [
            'truck_id' => 1, // Replace with factory relation if needed
            'title' => $this->faker->sentence(3),
            'status' => $this->faker->randomElement(['open', 'closed', 'in_progress']),
        ];
    }
}
