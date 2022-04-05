<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::query()->insert([
            ['name' => 'Іграшки'],
            ['name' => 'Роботи'],
            ['name' => 'М\'які іграшки'],
            ['name' => 'Іграшки для мальків'],
            ['name' => 'Навчальні ігракши'],
        ]);
    }
}
