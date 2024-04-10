<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('refresh', [AuthController::class, 'refresh']);


Route::get('get-user', [UsersController::class, 'getUser']);
Route::get('get-all-users', [UsersController::class, 'getAllUsers']);
Route::post('update-user', [UsersController::class, 'updateUser']);


Route::get('/followers/count', [FollowController::class, 'followersCount']);
Route::get('/following/count', [FollowController::class, 'followingCount']);
Route::post('/follow/{userId}', [FollowController::class, 'follow']);
Route::delete('/unfollow/{userId}', [FollowController::class, 'unfollow']);


Route::get('/posts/count', [PostController::class, 'postCount']);
Route::get('/posts/getAll', [PostController::class, 'getAllPosts']);
Route::post('/posts/create', [PostController::class, 'createPost']);
Route::delete('/posts/delete/{id}', [PostController::class, 'deletePost']);