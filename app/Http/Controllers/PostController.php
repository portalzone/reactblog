<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Redirect;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        if (!$user || !in_array($user->power, [3, 9])) {
            return inertia("Posts/Disallowed");
        }
        $query = Post::query();

        // If user's power is 3, filter posts by user_id
        $query->where('posts.hidden', 0);

        if ($user && $user->power == 3) {
            $query->where('posts.user_id', $user->id);
        }


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
            'auth' => [
                'user' => auth()->user(), // Pass authenticated user information
            ],
        ]);

    }

    public function delete()
    {
        $user = auth()->user();

        if (!$user || !in_array($user->power, [3, 9])) {
            return inertia("Posts/Disallowed");
        }

        if ($user->power == 9) {
            // User has power of 9, see the posts deleted by the moderator

            $query = Post::query();

            // Apply filters
            if (request("name")) {
                $query->where("name", "like", "%" . request("name") . "%");
            }
            if (request("hidden")) {
                $query->where("hidden", request("hidden"));
            }
            $query->where('posts.hidden', 1);

            // Retrieve and paginate posts
            $posts = $query->orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"))
                ->paginate(10)
                ->onEachSide(1);

            return inertia("Posts/Delete", [
                "posts" => PostResource::collection($posts),
                'queryParams' => request()->query() ?: null,
                'success' => session('success'),
                'auth' => [
                    'user' => auth()->user(), // Pass authenticated user information
                ],
            ]);
        } else {
            // User does not have sufficient permissions, return unauthorized access error
            return inertia("Posts/Disallowed");
        }
    }

    public function latestPosts()
    {
        $posts = Post::where('hidden', '0')
                     ->latest()
                     ->take(90)
                     ->get();

        return response()->json([
            'posts' => PostResource::collection($posts),
        ]);
    }
    public function latestPosts2()
    {
        $posts = Post::where('hidden', '0')
                    ->where('category_id', '3')
                     ->latest()
                     ->take(90)
                     ->get();

        return response()->json([
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function sportPosts()
    {
        $posts = Post::where('category_id', '3')
                     ->where('hidden', '0')
                     ->latest()
                     ->take(90)
                     ->get();

        return Inertia::render('Sport', [
            'posts' => PostResource::collection($posts),
        ]);
    }
    public function politicsPosts()
    {
        $posts = Post::where('category_id', '4')
                     ->where('hidden', '0')
                     ->latest()
                     ->take(90)
                     ->get();

        return Inertia::render('Politics', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function sidePosts()
    {
        $posts = Post::where('hidden', '0')
                     ->latest()
                     ->take(20)
                     ->get();

        return response()->json([
            'posts' => PostResource::collection($posts),
        ]);
    }
    // public function sportPosts()
    // {
    //     $posts = Post::where('category_id', '3')
    //                  ->where('hidden', '0')
    //                  ->latest()
    //                  ->take(20)
    //                  ->get();

    //     // Use the Inertia::render method to return an Inertia response
    //     return Inertia::render('Sport', [
    //         'posts' => PostResource::collection($posts),
    //     ]);
    // }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        if (!$user || !in_array($user->power, [3, 9])) {
            return inertia("Posts/Disallowed");
        }

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

        $user = auth()->user();
        if (!$user || !in_array($user->power, [3, 9])) {
            return inertia("Posts/Disallowed");
        }
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
    // public function show(Post $post)
    // {
    //     $user = auth()->user();
    //     // if (!$user || !in_array($user->power, [3, 9])) {
    //     //     return inertia("Posts/Disallowed");
    //     // }

    //     return inertia('Posts/Show', [
    //         'posts' => new PostResource($post),
    //     ]);
    // }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $user = auth()->user();
        if (!$user || !in_array($user->power, [3, 9])) {
            return inertia("Posts/Disallowed");
        }
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
        $user = auth()->user();
        if (!$user || !in_array($user->power, [3, 9])) {
            return inertia("Posts/Disallowed");
        }
        $data = $request->validated();
        $image = $data['image'] ?? null;
        // $data['updated_by'] = Auth::id();
        if ($request->file('image')) {
            if ($post->image) {
                Storage::disk('public')->deleteDirectory(dirname($post->image));
            }
            $data['image'] = $image->store('posts/' . Str::random(), 'public');

        }  else {
            $data['image'] = $post->image;
        }
        $post->update($data);

        return to_route('posts.index')
            ->with('success', "Post \"$post->name\" was updated");
    }

    public function restore(Request $request, Post $post)
    {
        $user = auth()->user();

        // Check if user is authenticated and has sufficient permissions
        if (!$user || !in_array($user->power, [9])) {
            return inertia("Posts/Disallowed");
        }

        // dd($post);

        // Update the 'hidden' attribute of the post
        $post->update(['hidden' => 0]);

        // Check if the post was updated successfully
        if ($post->wasChanged()) {
            // Return a response indicating success
            return Redirect::back()->with(['success' => 'Post restored successfully']);
        } else {
            // Return a response indicating that the post was not updated
            return Redirect::back()->withErrors(['error' => 'Failed to restore post']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
{
    // Check if the user has the required permissions
    $name = $post->name;
    $user = auth()->user();

    if (!$user) {
        return inertia("Posts/Disallowed");
    }

    if ($user->power == 9) {
        // User has power of 9, delete the post
        $post->delete();
        if ($post->image) {
            Storage::disk('public')->deleteDirectory(dirname($post->image));
        }
    } elseif ($user->power == 3) {
        // User has power of 3, change the 'hidden' column to 1
        $post->hidden = 1;
        $post->save();
    } else {
        // User does not have sufficient permissions, return unauthorized access error
        return inertia("Posts/Disallowed");
    }

    return to_route('posts.index')->with('success', "Post \"$name\" was deleted");
}
}
