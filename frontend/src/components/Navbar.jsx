import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleCategorySelect = (path) => {
    setDropdownOpen(false); // Close dropdown after selection
    setMobileDropdownOpen(false); // Close mobile dropdown after selection
    navigate(path);
  };

  return (
    <nav className="bg-[#3C0C1C]">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center px-40 py-4">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735973780/WhatsApp_Image_2025-01-04_at_12.15.46-removebg-preview_f5bres.png"
            alt="Mantra Logo"
            className="h-16 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 text-[#D5B36B] baskervville-regular">
          <Link
            to="/"
            className={`font-extrabold hover:text-white ${
              isActive("/") ? "text-white" : ""
            }`}
          >
            HOME
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`font-bold text-[#D5B36B] hover:text-white ${
                dropdownOpen ? "text-white" : ""
              } uppercase`}
            >
              Products
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 bg-[#3C0C1C] shadow-lg rounded-md text-left z-10 w-40 border border-[#D5B36B]">
                <button
                  onClick={() => handleCategorySelect("/products")}
                  className="block px-4 py-3 text-sm font-semibold text-[#D5B36B] hover:text-white transition-all uppercase tracking-wide"
                >
                  All Products
                </button>
                <button
                  onClick={() =>
                    handleCategorySelect("/productscategory/GreenTea")
                  }
                  className="block px-4 py-3 text-sm font-semibold text-[#D5B36B] hover:text-white transition-all uppercase tracking-wide"
                >
                  Green Tea
                </button>
                <button
                  onClick={() =>
                    handleCategorySelect("/productscategory/HerbalTea")
                  }
                  className="block px-4 py-3 text-sm font-semibold text-[#D5B36B] hover:text-white transition-all uppercase tracking-wide"
                >
                  Herbal Tea
                </button>
                <button
                  onClick={() =>
                    handleCategorySelect("/productscategory/BlackTea")
                  }
                  className="block px-4 py-3 text-sm font-semibold text-[#D5B36B] hover:text-white transition-all uppercase tracking-wide"
                >
                  Black Tea
                </button>
              </div>
            )}
          </div>

          <Link
            to="/recipes"
            className={`font-extrabold hover:text-white ${
              isActive("/recipes") ? "text-white" : ""
            }`}
          >
            RECIPES
          </Link>
          <Link
            to="/blogs"
            className={`font-extrabold hover:text-white ${
              isActive("/blogs") ? "text-white" : ""
            }`}
          >
            BLOGS
          </Link>
          <Link
            to="/our-story-vision"
            className={`font-extrabold hover:text-white ${
              isActive("/our-story-vision") ? "text-white" : ""
            }`}
          >
            OUR STORY & VISION
          </Link>
          <Link
            to="/contactus"
            className={`font-extrabold hover:text-white ${
              isActive("/contactus") ? "text-white" : ""
            }`}
          >
            CONTACT US
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/adminlogin">
            <FiUser size={20} className="text-[#D5B36B]" />
          </Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#383838] focus:outline-none"
        >
          <FiMenu size={24} className="text-[#D5B36B]" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735973780/WhatsApp_Image_2025-01-04_at_12.15.46-removebg-preview_f5bres.png"
            alt="Mantra Logo"
            className="h-16 w-auto"
          />
        </Link>

        {/* Search Icon */}
        <button className="text-[#383838] focus:outline-none">
          <FiSearch size={24} className="text-[#D5B36B]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#3C0C1C] baskervville-regular text-center shadow-md">
          <Link
            to="/"
            className={`block px-4 py-2 text-sm font-bold text-[#D5B36B] hover:text-white ${
              isActive("/") ? "text-white" : ""
            }`}
          >
            HOME
          </Link>
          <div className="relative">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="block w-full px-4 py-2 text-sm font-bold text-[#D5B36B] hover:text-white uppercase text-center"
            >
              PRODUCTS
            </button>
            {mobileDropdownOpen && (
              <div className="bg-[#3C0C1C] mx-24 rounded-md border border-[#D5B36B] flex flex-col items-center">
                <button
                  onClick={() => handleCategorySelect("/products")}
                  className="block px-6 py-2 text-sm text-[#D5B36B] hover:text-white uppercase text-center"
                >
                  All Products
                </button>
                <button
                  onClick={() =>
                    handleCategorySelect("/productscategory/GreenTea")
                  }
                  className="block px-6 py-2 text-sm text-[#D5B36B] hover:text-white uppercase text-center"
                >
                  Green Tea
                </button>
                <button
                  onClick={() =>
                    handleCategorySelect("/productscategory/HerbalTea")
                  }
                  className="block px-6 py-2 text-sm text-[#D5B36B] hover:text-white uppercase text-center"
                >
                  Herbal Tea
                </button>
                <button
                  onClick={() =>
                    handleCategorySelect("/productscategory/BlackTea")
                  }
                  className="block px-6 py-2 text-sm text-[#D5B36B] hover:text-white uppercase text-center"
                >
                  Black Tea
                </button>
              </div>
            )}
          </div>
          <Link
            to="/recipes"
            className={`block px-4 py-2 text-sm font-bold text-[#D5B36B] hover:text-white ${
              isActive("/recipes") ? "text-white" : ""
            }`}
          >
            RECIPES
          </Link>
          <Link
            to="/blogs"
            className={`block px-4 py-2 text-sm font-bold text-[#D5B36B] hover:text-white ${
              isActive("/blogs") ? "text-white" : ""
            }`}
          >
            BLOGS
          </Link>
          <Link
            to="/contactus"
            className={`block px-4 py-2 text-sm font-bold text-[#D5B36B] hover:text-white ${
              isActive("/contactus") ? "text-white" : ""
            }`}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
