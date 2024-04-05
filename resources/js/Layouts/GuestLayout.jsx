import { useState } from "react";
import HomeNavLink from "@/Components/HomeNavLink";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    return (
        <div className="flex flex-col min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0 dark:bg-gray-900">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                </Link>
            </div> */}
            {/* Toggle button for the left nav */}
            <div className="pb-12">
                <button
                    onClick={toggleNav}
                    className="fixed z-50 p-2 text-gray-400 transition duration-150 ease-in-out rounded-md top-5 left-5 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                >
                    <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        {/* Lines to form an 'X' icon */}
                        <path
                            className={isNavOpen ? "hidden" : "inline-flex"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        {/* Lines to form a hamburger icon when nav is open */}
                        <path
                            className={!isNavOpen ? "hidden" : "inline-flex"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Navigation Menu */}
                <nav
                    className={`fixed top-0 left-0 z-40 h-full pt-16 text-white transition-transform duration-300 ease-in-out bg-gray-900 w-60 ${
                        isNavOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* Your navigation links here */}
                    <ul>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800"
                            >
                                Donation
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800"
                            >
                                Scholarship
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800"
                            >
                                Suggestion
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800"
                            >
                                Publish
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav className="relative">
                    <div className="flex items-center justify-between">
                        <h1 className="ml-12 text-xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                            This is where we tell stories
                        </h1>
                        <Link
                            href={route("dashboard")}
                            className="p-3 text-lg font-bold text-white transition-all bg-gray-900 rounded shadow hover:bg-gray-700 dark:bg-white hover:dark:bg-gray-200 dark:text-gray-900"
                        >
                            Dashboard
                        </Link>
                    </div>
                </nav>

                <div className="items-end w-full p-3 text-lg font-bold text-gray-700 bg-white border-t border-gray-300 dark:bg-white dark:text-gray-900 mt-11">
                    <HomeNavLink
                        href={route("post.latest")}
                        active={route().current("post.latest")}
                    >
                        Latest Post
                    </HomeNavLink>
                    <HomeNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </HomeNavLink>
                    <HomeNavLink
                        href={route("posts.index")}
                        active={route().current("posts.index")}
                    >
                        Post
                    </HomeNavLink>
                    <HomeNavLink
                        href={route("categories.index")}
                        active={route().current("categories.index")}
                    >
                        Category
                    </HomeNavLink>
                </div>
            </div>

            <main>{children}</main>
        </div>
    );
}
