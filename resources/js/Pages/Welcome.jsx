// Welcome.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Latest from "./Latest";

export default function Welcome({ user }) {
    return (
        <GuestLayout>
            <Head title="This is where we tell stories" />
            <Latest user={user} />
        </GuestLayout>
    );
}
