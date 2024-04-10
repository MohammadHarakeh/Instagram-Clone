<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Post;

class LikesController extends Controller
{
    public function toggleLike(Request $request, $postId)
    {
        $user = auth()->user();

        $existingLike = Like::where('user_id', $user->id)->where('post_id', $postId)->first();

        if($existingLike){
            $existingLike->delete();
            $message = 'Post unliked successfully';
        } else{
            $like = Like::create([
                'user_id' => $user->id,
                'post_id' => $postId,
            ]);
            $like->save();
            $message = 'Post Liked successfully';
        }
        return response()->json(['message' => $message], 200);
    }

    public function getPostLikes($postId)
    {
        $user = auth()->user();
        $post = Post::findOrFail($postId);

        $likeCount = $post->likes()->count();

        return response()->json(['likes'=>$likeCount], 200);
    }
}

