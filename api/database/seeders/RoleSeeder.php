<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::query()->insertOrIgnore([
            [
                'id'   => 100,
                'name' => 'user',
            ],
            [
                'id'   => 200,
                'name' => 'admin',
            ]
        ]);
    }
}
