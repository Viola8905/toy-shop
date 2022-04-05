<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'first_name'  => $this->faker->firstName(),
            'middle_name' => $this->faker->boolean(75) ? $this->faker->firstName() : null,
            'last_name'   => $this->faker->lastName(),
            'email'       => $this->faker->unique()->safeEmail(),
            'password'    => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'role_id'     => Role::USER_ID,
        ];
    }
}
