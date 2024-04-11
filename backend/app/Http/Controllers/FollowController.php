<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Follow;

class FollowController extends Controller
{


    public function toggleFollow($userId)
    {
        $user = auth()->user();
        $followedUser = User::findOrFail($userId);


        if (!$user->follows()->where('following_id', $userId)->exists()) {
            $user->follows()->create(['following_id' => $userId]);
            return response()->json(['message' => 'Successfully followed user.']);
        } else {
            $user->follows()->where('following_id', $userId)->delete();
            return response()->json(['message'=>'Successfully unfollowed user.']);
        }
    }


    public function unfollow($userId)
    {
        $user = auth()->user();
        $followedUser = User::findOrFail($userId);

        if ($user->follows()->where('following_id', $userId)->exists()) {
            $user->follows()->where('following_id', $userId)->delete();
            return response()->json(['message' => 'Successfully unfollowed user.']);
        } else {
            return response()->json(['message' => 'You are not following this user.'], 400);
        }
    }


    public function followersCount()
    {
        $user = auth()->user();
        $followersCount = $user->followers()->count();
        return response()->json(['followers_count' => $followersCount]);
    }
    
    public function followingCount()
    {
        $user = auth()->user();
        $followingCount = $user->following()->count();
        return response()->json(['following_count' => $followingCount]);
    }

}
