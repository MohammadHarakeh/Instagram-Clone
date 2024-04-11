<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;


class UsersController extends Controller
{
    public function getUser(){
        if(!auth()->check()){
            return response()->json(['message' => 'Unauthorized'],401);
        }

        $user_id = auth()->user()->id;

        $user = User::find($user_id);
        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }
        
        return response()->json([
            'user' => $user
        ], 200);
    }

    // public function getAllUsers(){
    //     $users = User::all();

    //     return response()->json(['users'=>$users], 200);
    // }

    public function getAllUsers(){
        $authenticatedUser  = Auth::user();
    
        $users = User::where('id', '!=', $authenticatedUser->id)->get();
    
        $usersWithFollowStatus = $users->map(function ($user) use ($authenticatedUser){
            $isFollowing = $authenticatedUser->following->contains('id', $user->id);
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio,
                'profile_picture' => $user->profile_picture,
                'is_followed' => $isFollowing,
            ];
        });
        return response()->json(['users' => $usersWithFollowStatus], 200);
    }
    
    

    public function updateUser(Request $request){

        $request->validate([
            'profile_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'string',
            'bio' => 'string',
            'email' => 'string|email',
        ]);

        if(!auth()->check()){
            return response()->json(['message'=>'Unauthorized'], 401);
        }

        $user_id = auth()->user()->id;

        $user = User::find($user_id);

        if(!$user){
            return response()->json(['message'=>'User not found'], 404);
        }

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile_pictures/'), $filename);
    
            if ($user->profile_picture && $user->profile_picture !== 'defaultProfile.png') {
                $previousImagePath = public_path('/profile_pictures/') . $user->profile_picture;
                if (File::exists($previousImagePath)) {
                    File::delete($previousImagePath);
                }
            }
    
            $user->profile_picture = $filename;
            }

            if ($request->filled('name')) {
                $user->name = $request->input('name');
            }
        
            if ($request->filled('email')) {
                $user->email = $request->input('email');
            }

            if ($request->filled('bio')) {
                $user->bio = $request->input('bio');
            }

            $user->save();
        
            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user,
            ]);
        }

    }