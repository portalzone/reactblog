// Post.jsx
import React, { Component } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import SideBar from "../SideBar";

import { Head, Link } from "@inertiajs/react";

export default function Post({ post }) {
    // Construct the full URL for the image
    const imageUrl = `/storage/${post.image}`;

    // function PostComponent({ currentUser, post }) {
    //     const canEdit = canEditPost(currentUser, post);

    return (
        <GuestLayout>
            <Head title={post.name} />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-10">
                <div className="col-span-7">
                    <div className="flex flex-col px-4 transition-transform transform bg-white rounded shadow-md text-gray-950 dark:text-white dark:bg-gray-950">
                        <div className="flex justify-center">
                            <img
                                src={imageUrl}
                                className="rounded"
                                style={{ width: "70%" }}
                            />
                        </div>
                        <h2 className="p-1 mt-2 mb-2 text-xl font-semibold">
                            {post.name}
                        </h2>
                        <p className="p-1 text-lg text-gray-900 dark:text-gray-100">
                            {post.body}
                        </p>
                    </div>
                </div>
                <div className="col-span-3">
                    <SideBar /> {/* Render the SideBar component */}
                </div>
            </div>
        </GuestLayout>
    );
}
