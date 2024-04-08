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
            'comment_text' => "comment 1",
        ]);

        Comment::create([
            'user_id' => 1,
            'post_id' => 2,
            'comment_text' => "comment 2",
        ]);

        Comment::create([
            'user_id' => 1,
            'post_id' => 3,
            'comment_text' => "comment 3",
        ]);

        Comment::create([
            'user_id' => 3,
            'post_id' => 1,
            'comment_text' => "comment 4",
        ]);

        Comment::create([
            'user_id' => 4,
            'post_id' => 4,
            'comment_text' => "comment 5",
        ]);

    }
}
