<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    public function addComment(Request $request, $postId)
    {
        $request->validate([
            'comment_text' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        $post = Post::findOrFail($postId);

        $comment = Comment::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'comment_text' => $request->comment_text,
        ]);

        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment ], 201);
    }


    public function getComments($postId)
    {
        $post = Post::findOrFail($postId);

        $comments = $post->comments()->with('user')->get();

        return response()->json(['comments' => $comments], 200);
    }
}
