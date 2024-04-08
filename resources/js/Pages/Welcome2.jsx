import React from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Left from "./Left";
import Center from "./Center";
import Right from "./SideBar";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout>
            <Head title="Welcome" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-2">
                <div className="col-span-4 ">
                    <Left />
                </div>
                <div className="col-span-4 ">
                    <Center />
                </div>
                <div className="col-span-4">
                    <Right />
                </div>
            </div>
            {/* <div className="flex gap-2">
                <div className="w-30%">
                    <Left />
                </div>
                <div className="w-40%">
                    <Center />
                </div>
                <div className="w-30%">
                    <Right />
                </div>
            </div> */}
        </GuestLayout>
    );
}
