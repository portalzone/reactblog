import GuestLayout from "@/Layouts/GuestLayout";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Head, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({
    auth,
    user,
    success,
    posts,
    queryParams = null,
    hideCategoryColumn = false,
}) {
    const truncateText = (text, limit = 30) => {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + "..."; // Append ellipsis if text is truncated
        }
        return text;
    };

    return (
        <GuestLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Posts
                    </h2>
                    <Link
                        href={route("posts.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <tbody>
                                        {posts.data.map((post) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={post.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {post.id}
                                                </td>

                                                <td className="px-3 py-2">
                                                    <img
                                                        src={post.image}
                                                        style={{ width: 60 }}
                                                    />
                                                </td>
                                                <th className="px-3 py-2 hover:underline">
                                                    <Link
                                                        href={route(
                                                            "posts.show",
                                                            post.id
                                                        )}
                                                    >
                                                        {post.name}
                                                    </Link>
                                                </th>
                                                {!hideCategoryColumn && (
                                                    <td className="px-3 py-2">
                                                        {post.category.name}
                                                    </td>
                                                )}

                                                <th className="px-3 py-2">
                                                    {truncateText(post.body)}
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
