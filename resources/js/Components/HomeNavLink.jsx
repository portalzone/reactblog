import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 text-gray-100 border-b-2 text-base font-bold leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-indigo-300 dark:border-indigo-600 text-gray-100 dark:text-gray-950 focus:border-indigo-800 "
                    : "border-transparent text-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-950 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
