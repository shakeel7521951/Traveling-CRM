import React from 'react';
import { FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-gray-100 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center py-3">
          {/* Contact Information */}
         
      
            
            <div className="flex text-xs sm:text-lg items-center group">
              
              <a href="mailto:info@tarcoaviation.com" className="group-hover:text-red-400 text-xl font-semibold transition-colors">
               Travelling-CRM
              </a>
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
             <div className="w-8 h-8 rounded-full bg-[#E4141C] flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;