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
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, text, active, path, sidebarOpen, isMobile }) => {
  return (
    <Link to={path} className="block">
      <div 
        className={`flex gap-3 m-2 p-3 cursor-pointer group relative ${
          active ? '' : 'hover:bg-[#2d365a]'
        }`}
      >
        {/* Show icon only when sidebar is open on mobile */}
        {sidebarOpen && (
          <span className="mr-0">
            {icon}
          </span>
        )}
        {sidebarOpen && !isMobile && <span>{text}</span>}
        
        {/* Tooltip for desktop when sidebar is closed */}
        {!sidebarOpen && !isMobile && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#242C54] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {text}
          </div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getSidebarWidth = () => {
    if (isMobile) {
      return sidebarOpen ? 'w-15' : 'w-0';
    } else {
      return sidebarOpen ? 'w-64' : 'w-15';
    }
  };

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path === '/passengers') return 'passengers';
    if (path === '/campaigns') return 'campaigns';
    if (path === '/feedback') return 'feedback';
    if (path === '/reports') return 'reports';
    if (path === '/setting') return 'settings';
    return '';
  };

  return (
    <div 
      className={`bg-[#242C54] text-white transition-all duration-300 h-full z-50 ${getSidebarWidth()}`}
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
            <FiMenu className='text-white' size={24} />
          )}
        </button>
      </div>
      
      {/* Only show nav items when sidebar is open on mobile */}
      {(sidebarOpen || !isMobile) && (
        <nav className="mt-6 w-full">
          <NavItem 
            icon={<FiHome size={20} />} 
            text="Dashboard" 
            active={getActiveTab() === 'dashboard'}
            path="/"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          
          <NavItem 
            icon={<FiUsers size={20} />} 
            text="Passengers" 
            active={getActiveTab() === 'passengers'}
            path="/passengers"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          
          <NavItem 
            icon={<FiMessageSquare size={20} />} 
            text="Campaigns" 
            active={getActiveTab() === 'campaigns'}
            path="/campaigns"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          
          <NavItem 
            icon={<FiStar size={20} />} 
            text="Feedback" 
            active={getActiveTab() === 'feedback'}
            path="/feedback"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          
          <NavItem 
            icon={<FiPieChart size={20} />} 
            text="Reports" 
            active={getActiveTab() === 'reports'}
            path="/reports"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          
          <NavItem 
            icon={<FiSettings size={20} />} 
            text="Settings" 
            active={getActiveTab() === 'settings'}
            path="/setting"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
        </nav>
      )}
    </div>
  );
};

export default Sidebar;