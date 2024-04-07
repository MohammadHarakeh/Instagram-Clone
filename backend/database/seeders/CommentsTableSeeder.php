<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentsTableSeeder extends Seeder
{
    public function run()
    {
        Comment::create([
            'user_id' => 1,
            'post_id' => 1,
        ]);

    }
}
