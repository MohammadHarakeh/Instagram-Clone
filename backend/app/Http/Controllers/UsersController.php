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
}
