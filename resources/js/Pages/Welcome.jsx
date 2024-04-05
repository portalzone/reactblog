import React from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout>
            <Head title="Welcome" />
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div class="col-span-4 ">
                    <Left />
                </div>
                <div class="col-span-4 ">
                    <Center />
                </div>
                <div class="col-span-4">
                    <Right />
                </div>
            </div>
        </GuestLayout>
    );
}
