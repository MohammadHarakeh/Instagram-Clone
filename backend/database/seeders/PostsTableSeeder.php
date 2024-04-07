<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        Post::create([
            'user_id' => 1,
            'image' => 'example.jpg',
            'caption' => 'This is a post caption.',
        ]);

    }
}
