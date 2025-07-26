import React from 'react';
import { FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-gray-100 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm mb-3 md:mb-0">
            <div className="flex items-center group">
              <FiPhone className="text-red-500 mr-2 text-sm group-hover:text-red-400 transition-colors" />
              <a href="tel:+12345678900" className="group-hover:text-red-400 transition-colors">
                +1 (234) 567-8900
              </a>
            </div>
            
            <div className="flex items-center group">
              <FiMail className="text-red-500 mr-2 text-sm group-hover:text-red-400 transition-colors" />
              <a href="mailto:info@tarcoaviation.com" className="group-hover:text-red-400 transition-colors">
                info@tarcoaviation.com
              </a>
            </div>
            
            <div className="flex items-center group">
              <FiClock className="text-red-500 mr-2 text-sm group-hover:text-red-400 transition-colors" />
              <span className="group-hover:text-red-400 transition-colors">
                Mon-Fri: 9AM - 6PM
              </span>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="flex items-center space-x-4">
            <a href="#" className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors group" aria-label="Facebook">
              <FaFacebookF className="text-gray-400 group-hover:text-white text-xs" />
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors group" aria-label="Twitter">
              <FaTwitter className="text-gray-400 group-hover:text-white text-xs" />
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors group" aria-label="LinkedIn">
              <FaLinkedinIn className="text-gray-400 group-hover:text-white text-xs" />
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors group" aria-label="Instagram">
              <FaInstagram className="text-gray-400 group-hover:text-white text-xs" />
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors group" aria-label="YouTube">
              <FaYoutube className="text-gray-400 group-hover:text-white text-xs" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;