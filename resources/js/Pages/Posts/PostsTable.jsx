import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function PostsTable({
    posts,
    user, // Receive user object as a prop
    success,
    queryParams = null,
    hideCategoryColumn = false,
}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("posts.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const truncateText = (text, limit = 30) => {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + "..."; // Append ellipsis if text is truncated
        }
        return text;
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("posts.index"), queryParams);
    };

    const deletePost = (post) => {
        // Corrected parameter name
        const alerta = Swal.mixin({
            buttonsStyling: true,
        });
        alerta
            .fire({
                title: `Are you sure you want to delete ${post.name}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i> Yes, delete',
                cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route("posts.destroy", post.id), {
                        onSuccess: () => {
                            ok("Post deleted");
                        },
                    });
                }
            });
    };

    const restorePost = (post) => {
        // Corrected parameter name
        const alerta = Swal.mixin({
            buttonsStyling: true,
        });
        alerta
            .fire({
                title: `Are you sure you want to restore ${post.name}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i> Yes, restore',
                cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.put(route("post.restore", post.id), {
                        preserveState: true,
                        onSuccess: () => {
                            ok("Post Restored");
                        },
                        onError: (errors) => {
                            console.error("Error restoring post:", errors);
                        },
                    });
                }
            });
    };

    const ok = (message) => {
        Swal.fire({ title: message, icon: "success" });
    };
    return (
        <>
            {success && (
                <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                    {success}
                </div>
            )}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-3">Image</th>
                            {!hideCategoryColumn && (
                                <TableHeading
                                    name="name"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}
                                >
                                    Name
                                </TableHeading>
                            )}
                            <TableHeading
                                name="category_id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Category
                            </TableHeading>
                            <th className="px-3 py-3">Body</th>

                            <th className="px-3 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>

                            {!hideCategoryColumn && (
                                <th className="px-3 py-3"></th>
                            )}
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Post Name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.hidden}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "hidden",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="0">Public</option>
                                    <option value="1">Private</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.map((post) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={post.id}
                            >
                                <td className="px-3 py-2">{post.id}</td>

                                <td className="px-3 py-2">
                                    <img
                                        src={post.image}
                                        style={{ width: 60 }}
                                    />
                                </td>
                                <th className="px-3 py-2 hover:underline">
                                    <Link href={route("posts.show", post.id)}>
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

                                <td className="px-3 py-2 text-nowrap">
                                    <Link
                                        href={route("posts.edit", post.id)}
                                        className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    {/* {user && user.power === 9 && ( */}
                                    <button
                                        onClick={(e) => restorePost(post)}
                                        className="mx-1 font-medium text-red-600 dark:text-green-500 hover:underline"
                                    >
                                        Restore
                                    </button>
                                    {/* )} */}
                                    <button
                                        onClick={(e) => deletePost(post)}
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
            <Pagination links={posts.meta.links} />
        </>
    );
}
