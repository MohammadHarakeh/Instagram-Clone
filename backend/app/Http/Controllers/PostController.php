<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class PostController extends Controller
{
    public function postCount()
    {
        $user = auth()->user();
        $postsCount = $user->posts()->count();
        return response()->json(['post_count' => $postsCount]);
    }
}
