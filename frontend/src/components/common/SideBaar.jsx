import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { 
  FiHome, 
  FiUsers, 
  FiMessageSquare, 
  FiStar, 
  FiPieChart, 
  FiSettings,
  FiMenu
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NavItem = ({ icon, text, active, path, sidebarOpen, isMobile }) => {
  return (
    <Link to={path}>
      <div 
        className={`flex items-center p-3 cursor-pointer group relative ${
          active ? 'bg-[#E4141C]' : 'hover:bg-[#2d365a]'
        }`}
      >
        <span className={`${sidebarOpen || isMobile ? 'mr-3' : 'mx-auto'}`}>
          {icon}
        </span>
        {(sidebarOpen && !isMobile) && <span>{text}</span>}
        
        {/* Tooltip for when sidebar is closed on desktop */}
        {!sidebarOpen && !isMobile && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#242C54] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {text}
          </div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = ({ activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Determine sidebar width based on state and screen size
  const getSidebarWidth = () => {
    if (isMobile) {
      return sidebarOpen ? 'w-15' : 'w-0';
    } else {
      return sidebarOpen ? 'w-64' : 'w-15';
    }
  };

  return (
    <div 
      className={`bg-[#242C54] text-white transition-all duration-300  h-full z-50 ${
        getSidebarWidth()

      }`}
    >
      <div className={`px-5 py-2 flex items-center ${isMobile ? 'justify-center' : 'justify-between'} border-b bg-[#242C54] border-[#E4141C]`}>
        {sidebarOpen && !isMobile && (
          <h1 className="text-xl font-bold">Tarco Aviation</h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className="relative text-white"
        >
          {sidebarOpen ? (
            <RxCross2 className="text-2xl" />
          ) : (
            <FiMenu className='text-white ' size={24} />
          )}
        </button>
      </div>
      
      <nav className="mt-6">
        <div className="flex items-center">
          <NavItem 
            icon={<FiHome size={20} />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'}
            path="/"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          {sidebarOpen && !isMobile && <span className="text-md"></span>}
        </div>
        
        <div className="flex items-center">
          <NavItem 
            icon={<FiUsers size={20} />} 
            text="Passengers" 
            active={activeTab === 'passengers'}
            path="/passengers"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          {sidebarOpen && !isMobile && <span></span>}
        </div>
        
        <div className="flex items-center">
          <NavItem 
            icon={<FiMessageSquare size={20} />} 
            text="Campaigns" 
            active={activeTab === 'campaigns'}
            path="/campaigns"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          {sidebarOpen && !isMobile && <span></span>}
        </div>
        
        <div className="flex items-center">
          <NavItem 
            icon={<FiStar size={20} />} 
            text="Feedback" 
            active={activeTab === 'feedback'}
            path="/feedback"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          {sidebarOpen && !isMobile && <span></span>}
        </div>
        
        <div className="flex items-center">
          <NavItem 
            icon={<FiPieChart size={20} />} 
            text="Reports" 
            active={activeTab === 'reports'}
            path="/reports"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          {sidebarOpen && !isMobile && <span></span>}
        </div>
        
        <div className="flex items-center">
          <NavItem 
            icon={<FiSettings size={20} />} 
            text="Settings" 
            active={activeTab === 'settings'}
            path="/setting"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          {sidebarOpen && !isMobile && <span></span>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;