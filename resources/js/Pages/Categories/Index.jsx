import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Category({ auth, categories, success }) {
    const deleteCategory = (category) => {
        const alerta = Swal.mixin({
            buttonsStyling: true,
        });
        alerta
            .fire({
                title: `Are you sure you want to delete ${category.name}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i> Yes, delete',
                cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route("categories.destroy", category.id), {
                        onSuccess: () => {
                            ok("Post deleted");
                        },
                    });
                }
            });
    };
    const ok = (message) => {
        Swal.fire({ title: message, icon: "success" });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Categories
                    </h2>
                    <Link
                        href={route("categories.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            {" "}
            <Head title="Categories" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <th className="w-2 px-3 py-3">ID</th>
                                        <th className="w-6 px-3 py-3">Name</th>
                                        <th className="w-4 px-3 py-3 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.data.map((category) => (
                                        <tr key={category.id}>
                                            <th className="px-3 py-2">
                                                {category.id}
                                            </th>
                                            <td className="px-3 py-2">
                                                {category.name}
                                            </td>
                                            <td className="px-3 py-2 text-right text-nowrap">
                                                <Link
                                                    href={route(
                                                        "categories.edit",
                                                        category.id
                                                    )}
                                                    className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteCategory(category)
                                                    }
                                                    className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={categories.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
