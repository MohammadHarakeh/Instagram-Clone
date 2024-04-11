<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\CommentsController;

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
Route::get('/posts/getUserPost', [PostController::class, 'getLoggedUserPosts']);
Route::post('/posts/create', [PostController::class, 'createPost']);
Route::delete('/posts/delete/{id}', [PostController::class, 'deletePost']);


Route::post('/toggleLike/post/{postId}', [LikesController::class, 'toggleLike']);
Route::get('/like/count/{postId}', [LikesController::class, 'getPostLikes']);


Route::post('/add/comment/{postId}', [CommentsController::class, 'addComment']);
Route::get('/get/comment/{postId}', [CommentsController::class, 'getComments']);