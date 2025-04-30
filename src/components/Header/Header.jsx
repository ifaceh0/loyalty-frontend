import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">


            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <h2 className="font-bold text-fuchsia-600">MyApp</h2>

                    </Link>


                    <div className="flex items-center lg:order-2">
                        {/* Sign Up Dropdown */}
                        <div className="relative group inline-block">
                            {/* Trigger (Not Clickable) */}
                            <div
                                className="text-white bg-orange-700 hover:bg-gray-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2 lg:px-5 lg:py-2.5 mr-2 focus:outline-none cursor-default"
                            >
                                Sign up
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-[150px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                                <NavLink
                                    to="/signup-shopkeeper"
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-orange-100 hover:text-orange-700"
                                >
                                    Shopkeeper
                                </NavLink>
                                <NavLink
                                    to="/signup-user"
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-orange-100 hover:text-orange-700"
                                >
                                    User
                                </NavLink>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <NavLink
                            to="/signin"
                            className="text-white bg-blue-700 hover:bg-gray-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Sign in
                        </NavLink>
                    </div>



                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-fuchsia-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-fuchsia-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/features"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-fuchsia-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-fuchsia-700 lg:p-0`
                                    }
                                >
                                    Features
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/subscription"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-fuchsia-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-fuchsia-700 lg:p-0`
                                    }
                                >
                                    Subscription
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/resources"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-fuchsia-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-fuchsia-700 lg:p-0`
                                    }
                                >
                                    Resources
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-fuchsia-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-fuchsia-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}


