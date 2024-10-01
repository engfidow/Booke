import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`bg-white p-4 fixed top-0 w-full z-10 transition-shadow duration-300 ${hasScrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <h1 className="ml-3 text-xl font-bold text-gray-900">Bookoe</h1>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li><NavLink to="/" className="text-gray-700 hover:text-pink-500">Home</NavLink></li>
          <li><NavLink to="/books" className="text-gray-700 hover:text-pink-500">Our Books</NavLink></li>
          <li><NavLink to="/contact" className="text-gray-700 hover:text-pink-500">Contact Us</NavLink></li>
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button className="text-gray-700 hover:text-pink-500">
                <i className="fas fa-heart"></i> <span>{favoriteItems}</span>
              </button>
              <button className="text-gray-700 hover:text-pink-500">
                <i className="fas fa-shopping-bag"></i> <span>{cartItems}</span>
              </button>
              <button className="text-gray-700 hover:text-pink-500" onClick={handleLogout}>
                <i className="fas fa-user"></i> Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="text-white hover:bg-pink-500 bg-pink-600 px-4 py-2 rounded-lg">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
