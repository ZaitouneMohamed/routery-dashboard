<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
final class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'type' => $this->faker->randomElement(['gps', 'sensor', 'camera']),
            'vehicle_id' => $this->faker->randomNumber(1, 10),
            'sim_number' => $this->faker->numerify('06########'),
            'imei' => $this->faker->unique()->numerify('###############'),
            'status' => $this->faker->randomElement(['active', 'inactive', 'maintenance', 'retired']),
            'last_communication_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
            'installed_at' => $this->faker->optional()->dateTimeBetween('-6 months', '-1 day'),
            'firmware_version' => $this->faker->optional()->regexify('v[0-9]+\.[0-9]+\.[0-9]+'),
            'ip_address' => $this->faker->optional()->ipv4(),
            'location' => $this->faker->optional()->city(),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
