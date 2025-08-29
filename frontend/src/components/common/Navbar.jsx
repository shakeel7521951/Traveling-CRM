import React from "react";
import { FiBell, FiMail, FiSettings, FiUser, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-[#242C54] to-[#1a1f42] text-white border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center py-4">
          {/* Brand */}
          <div className="flex items-center group">
            <div className="bg-[#E4141C] text-white p-2 rounded-xl mr-3">
              <FiUser className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-[#E4141C] transition-colors">
                Traveling CRM
              </h1>
              <p className="text-xs text-gray-300">
                Professional Travel Management
              </p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search passengers, campaigns..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors group">
                <FiBell className="text-gray-300 group-hover:text-white text-lg" />
                <span className="absolute -top-1 -right-1 bg-[#E4141C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  3
                </span>
              </button>

              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors group">
                <FiMail className="text-gray-300 group-hover:text-white text-lg" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  7
                </span>
              </button>

              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                <FiSettings className="text-gray-300 group-hover:text-white text-lg" />
              </button>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-white/20"></div>

            {/* Social Media */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E4141C] transition-colors group"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-gray-300 group-hover:text-white text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E4141C] transition-colors group"
                aria-label="Twitter"
              >
                <FaTwitter className="text-gray-300 group-hover:text-white text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E4141C] transition-colors group"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-gray-300 group-hover:text-white text-sm" />
              </a>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-gray-300">System Administrator</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E4141C] to-[#c1121f] flex items-center justify-center text-white font-bold shadow-lg border-2 border-white/20">
                  A
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
