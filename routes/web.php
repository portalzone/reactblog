<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PowerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');


Route::get('/toggle-dark-mode', function () {
    session(['dark-mode' => !session('dark-mode', false)]);
    return back();
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('categories', CategoryController::class);
    Route::resource('posts', PostController::class);
    Route::resource('powers', PowerController::class);
    // Route::get('/post', [PostController::class, 'restore'])->name('post.restore');
    Route::get('/post', [PostController::class, 'delete'])->name('post.delete');
    Route::put('/post/{post}', [PostController::class, 'restore'])->name('post.restore');
    // Route::put('posts/{post}/restore', 'PostController@restore')->name('post.restore');

});

Route::get('/latest-posts', [PostController::class, 'latestPosts'])->name('post.latest');
Route::get('/latest-posts2', [PostController::class, 'latestPosts2'])->name('post.latest2');
Route::get('/sport-posts', [PostController::class, 'sportPosts'])->name('post.sport');
Route::get('/politics-posts', [PostController::class, 'politicsPosts'])->name('post.politics');
Route::get('/side-posts', [PostController::class, 'sidePosts'])->name('post.side');

Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
require __DIR__.'/auth.php';
