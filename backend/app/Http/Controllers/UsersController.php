<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
        ]);
    }
    

    public function updateUser(Request $request){
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
    
            if (File::exists(public_path('/profile_pictures/') . $user->profile_picture)) {
                File::delete((public_path('/profile_pictures/') . $user->profile_picture));
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