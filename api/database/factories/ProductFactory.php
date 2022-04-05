<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    private const BEST_DEAL_CHANCE = 5; // %

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $priceDegree = $this->faker->numberBetween(1, 4);

        return [
            'name'         => $this->faker->text(100),
            'description'  => $this->faker->realText(500),
            'price'        => $this->faker->randomFloat(2, 10 ** ($priceDegree - 1), 10 ** $priceDegree),
            'amount'       => $this->faker->numberBetween(0, 100),
            'is_best_deal' => $this->faker->boolean(self::BEST_DEAL_CHANCE),
        ];
    }
}
