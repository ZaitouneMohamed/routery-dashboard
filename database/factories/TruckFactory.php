<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

final class TruckFactory extends Factory
{
    public function definition(): array
    {
        return [
            'matricule' => $this->faker->unique()->bothify('TRK-####'),
            'statue' => $this->faker->boolean(90),
            'is_for_aej' => $this->faker->boolean(10),
            'marque' => $this->faker->company(),
            'genre' => $this->faker->word(),
            'type_carburant' => $this->faker->randomElement(['diesel', 'essence', 'electric']),
            'n_chasie' => $this->faker->unique()->bothify('CHS-####'),
            'puissanse_fiscale' => $this->faker->randomNumber(2),
            'premier_mise' => $this->faker->date(),
            'consommation' => $this->faker->randomFloat(2, 5, 30),
        ];
    }
}
