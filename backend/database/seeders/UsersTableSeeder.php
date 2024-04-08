<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Mohammad Harakeh',
            'email' => 'harakeh@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Ali Ismail',
            'email' => 'Ali@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Taha Taha',
            'email' => 'Taha@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Charbel Daoud',
            'email' => 'Charbel@gmail.com',
            'password' => bcrypt('password'),
        ]);

    }
}

