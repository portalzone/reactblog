import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Latest({ user }) {
    const [posts, setPosts] = useState([]);

    const truncateText = (text, limit = 30) => {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + "..."; // Append ellipsis if text is truncated
        }
        return text;
    };

    useEffect(() => {
        fetchLatestPosts();
    }, []);

    const fetchLatestPosts = async () => {
        try {
            const response = await fetch("/latest-posts2");
            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts);
            } else {
                console.error("Failed to fetch latest posts");
            }
        } catch (error) {
            console.error("Error fetching latest posts:", error);
        }
    };
    return (
        <GuestLayout>
            {/* <Head title="Welcome" /> */}
            <div className="px-4">
                <div className="px-2 pb-3 text-xl font-bold text-white rounded bg-gray-950 dark:bg-gray-200 dark:text-gray-950">
                    Latest Post
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col transition-transform transform bg-white rounded shadow-md text-gray-950 dark:text-white dark:bg-gray-950 hover:scale-105"
                        >
                            <Link
                                href={route("posts.show", post.id)}
                                className="text-bold"
                            >
                                <img
                                    src={post.image}
                                    alt={post.name}
                                    className="w-full rounded"
                                />

                                {/* Use Link component from React Router */}
                                <h2 className="p-1 mt-2 mb-2 text-base font-semibold">
                                    {post.name}
                                </h2>
                                <p>{truncateText(post.body)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
