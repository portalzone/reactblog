import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Right({ auth }) {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full py-12">
                <div className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="w-full p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
