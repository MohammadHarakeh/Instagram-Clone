<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Follow;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        Post::create([
            'user_id' => 1,
            'image' => '1712702595.jpg',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 2,
            'image' => '1712708159.png',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 3,
            'image' => '1712708576.png',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 4,
            'image' => '1712702595.jpg',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 1,
            'image' => '1712708159.png',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 1,
            'image' => '1712702595.jpg',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 1,
            'image' => '1712708576.png',
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 2,
            'image' => '1712708576.png', 
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 4,
            'image' => '1712708576.png', 
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 5,
            'image' => '1712708576.png', 
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 6,
            'image' => '1712708576.png', 
            'caption' => 'This is a post caption.',
        ]);

        Post::create([
            'user_id' => 6,
            'image' => '1712708576.png', 
            'caption' => 'this should not be seen.',
        ]);
    }
}
