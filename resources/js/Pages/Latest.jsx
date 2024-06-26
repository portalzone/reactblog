import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";

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
            const response = await fetch("/latest-posts");
            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts);
            } else {
                console.error("Failed to fetch latest posts");
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div>
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
                            {" "}
                            {/* Use Link component from React Router */}
                            <img
                                src={post.image}
                                alt={post.name}
                                className="w-full rounded"
                            />
                            <h2 className="p-1 mt-2 mb-2 text-xl font-semibold">
                                {post.name}
                            </h2>
                            <p className="flex-grow p-1 text-gray-900 border-t dark:text-gray-100">
                                {truncateText(post.body)}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
