<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
            'image'=>'required|image|mimes:jpeg,png,j|max:2048',
            'caption'=>'required|string|max:255',
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
        $posts = Post::with('user')->orderBy('created_at', 'desc')->get();

        return response()->json(['posts'=>$posts], 200);
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
