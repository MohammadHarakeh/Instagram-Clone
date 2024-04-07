<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Follow;

class FollowsTableSeeder extends Seeder
{
    public function run()
    {
        
        Follow::create([
            'follower_id' => 1,
            'following_id' => 2,
        ]);

    }
}
