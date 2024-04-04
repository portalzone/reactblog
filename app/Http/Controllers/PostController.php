<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\CategoryResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Post::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("hidden")) {
            $query->where("hidden", request("hidden"));
        }

        $posts = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Posts/Index", [
            "posts" => PostResource::collection($posts),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Posts/Create", [
            'categories' => CategoryResource::collection($categories),
            'users' => UserResource::collection($users),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {

        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['user_id'] = Auth::id();
        if ($image) {
            $data['image'] = $image->store('posts/' . Str::random(), 'public');
        }
        Post::create($data);

        return to_route('posts.index')
            ->with('success', 'Post was created');

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Posts/Show', [
            'task' => new PostResource($post),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $categories = Category::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Posts/Edit", [
            'po' => new PostResource($post),
            'categories' => CategoryResource::collection($categories),
            'users' => UserResource::collection($users),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        // $data['updated_by'] = Auth::id();
        if ($image) {
            if ($post->image) {
                Storage::disk('public')->deleteDirectory(dirname($post->image));
            }
            $data['image'] = $image->store('posts/' . Str::random(), 'public');
        }
        $post->update($data);

        return to_route('posts.index')
            ->with('success', "Task \"$post->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $name = $post->name;
        $post->delete();
        if ($post->image) {
            Storage::disk('public')->deleteDirectory(dirname($post->image));
        }
        return to_route('posts.index')
            ->with('success', "Post \"$name\" was deleted");
    }
}
