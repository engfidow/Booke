import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  // Detect scroll and add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-white p-4 fixed top-0 w-full z-10 transition-shadow duration-300 ${
        hasScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <h1 className="ml-3 text-xl font-bold text-gray-900">Bookoe</h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink
              to="/"
              className="text-gray-700 hover:text-pink-500"
              style={({ isActive }) => ({
                color: isActive ? '#ec4899' : '', // Active link color (pink)
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className="text-gray-700 hover:text-pink-500"
              style={({ isActive }) => ({
                color: isActive ? '#ec4899' : '', // Active link color (pink)
              })}
            >
              Our Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-gray-700 hover:text-pink-500"
              style={({ isActive }) => ({
                color: isActive ? '#ec4899' : '', // Active link color (pink)
              })}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-pink-500">
            <i className="fas fa-heart"></i>
          </button>
          <button className="text-gray-700 hover:text-pink-500">
            <i className="fas fa-shopping-bag"></i>
          </button>
          <button className="text-gray-700 hover:text-pink-500">
            <i className="fas fa-user"></i>
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-700 hover:text-pink-500">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
