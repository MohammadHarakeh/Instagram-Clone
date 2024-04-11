<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function postCount()
    {
        $user = auth()->user();
        $postsCount = $user->posts()->count();
        return response()->json(['post_count' => $postsCount]);
    }

    public function createPost(Request $request)
    {
        $request->validate([
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
            'caption'=>'string|max:255',
        ]);

        $user = auth()->user();

        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('post_images'), $imageName);

        $post = Post::create([
            'user_id' => $user->id,
            'image' => $imageName,
            'caption' => $request->caption,
        ]);
        $post->save();

        return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
    }


    public function getAllPosts()
    {
        $user = auth()->id();
    
        $followedUserIds = Follow::where('follower_id', $user)->pluck('following_id');
    
        $posts = Post::whereIn('user_id', $followedUserIds)
        ->with(['user', 'likes'])
        ->orderBy('created_at', 'desc')
        ->get();
    
    $posts->each(function ($post) use ($user) {
        $post->liked_by_user = $post->likes->contains('user_id', $user);
    });
    
    
        return response()->json(['posts' => $posts], 200);
    }


    public function getLoggedUserPosts()
    {
        $user = auth()->id();

        $posts = Post::where('user_id', $user)->orderBy('created_at', 'desc')->get(['image']);

        return response()->json(['posts' => $posts], 200);
    }
    


    public function deletePost($id)
    {
        $user = auth()->user();
    
        $post = Post::where('id', $id)
                     ->where('user_id', $user->id)
                     ->first();
    
        if (!$post) {
            return response()->json(['message' => 'Post not found or unauthorized'], 404);
        }
    
        if ($post->image) {
            File::delete(public_path('post_images/' . $post->image));
        }
    
        $post->delete();
    
        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
    

}
