import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog, FaListAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-10 flex-1">
        <Link
          to="/dashboard"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
            location.pathname === "/dashboard" || location.pathname === "/"
              ? "bg-gray-700"
              : ""
          }`}
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>

        <Link
          to="/categories"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
            location.pathname === "/categories" ? "bg-gray-700" : ""
          }`}
        >
          <FaListAlt className="mr-3" />
          Categories
        </Link>
        <Link
          to="/movies"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
            location.pathname === "/movies" ? "bg-gray-700" : ""
          }`}
        >
          <FaListAlt className="mr-3" />
          Movies
        </Link>
        <Link
          to="/users"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
            location.pathname === "/users" ? "bg-gray-700" : ""
          }`}
        >
          <FaUsers className="mr-3" />
          Users
        </Link>
        {/* <Link
          to="/signup"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
            location.pathname === "/signup" ? "bg-gray-700" : ""
          }`}
        >
          <FaCog className="mr-3" />
          Signup
        </Link>
        <Link
          to="/signin"
          className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
            location.pathname === "/signin" ? "bg-gray-700" : ""
          }`}
        >
          <FaCog className="mr-3" />
          Signin
        </Link> */}
      </nav>
    </div>
  );
};

export default Sidebar;
