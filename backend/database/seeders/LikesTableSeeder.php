<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Like;

class LikesTableSeeder extends Seeder
{
    public function run()
    {
        Like::create([
            'user_id' => 1,
            'post_id' => 1,
        ]);

    }
}
