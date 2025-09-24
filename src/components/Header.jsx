import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';


import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center">
        <div className="relative mr-4">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
        <FaBell className="mr-4 text-gray-600 cursor-pointer" />
        <div className="relative" ref={profileRef}>
          <FaUserCircle
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={() => setDropdownOpen((open) => !open)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-t" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
