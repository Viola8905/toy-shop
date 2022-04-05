<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CategoryProductPivotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        $products = Product::all();
        $products->each(function (Product $product) use ($categories) {
            $categoriesNumber = mt_rand(1, 3);
            $randomCategories = $categories->random($categoriesNumber);
            $product->categories()->attach($randomCategories);
        });
    }
}
