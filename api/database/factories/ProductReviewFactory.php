<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $userIds = User::query()->pluck('id');
        $productIds = Product::query()->pluck('id');

        return [
            'user_id'        => $userIds->random(),
            'product_id'     => $productIds->random(),
            'rating'         => $this->faker->boolean() ? $this->faker->randomFloat(1, 1, 5) : null,
            'text'           => $this->faker->realText(),
            'bought_already' => $this->faker->boolean(75),
        ];
    }
}
