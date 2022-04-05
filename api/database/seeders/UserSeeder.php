<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::query()->insert([
            [
                'first_name'  => 'Admin',
                'middle_name' => null,
                'last_name'   => 'ToyStore',
                'email'       => 'adm.toystore@gmail.com',
                'password'    => Hash::make('hahaha'),
                'role_id'     => Role::ADMIN_ID
            ]
        ]);

        User::factory()->count(100)->create();
    }
}
