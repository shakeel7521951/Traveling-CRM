import React from 'react';
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

const NavItem = ({ icon, text, active, path, sidebarOpen }) => {
  return (
    <Link to={path}>
      <div 
        className={`flex items-center p-3 cursor-pointer group relative ${active ? 'bg-[#E4141C]' : 'hover:bg-[#2d365a]'}`}
      >
        <span className="mr-3">{icon}</span>
        {sidebarOpen && <span>{text}</span>}
        
        {/* Tooltip for when sidebar is closed */}
        {!sidebarOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#242C54] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {text}
          </div>
        )}
      </div>
    </Link>
  );
};

const Sidebaar = ({ sidebarOpen, toggleSidebar, activeTab }) => {
  return (
    <div 
      className={`bg-[#242C54] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="p-4 flex items-center justify-between border-b border-[#E4141C]">
        {sidebarOpen && (
          <h1 className="text-xl font-bold">Tarco Aviation</h1>
        )}
        <button onClick={toggleSidebar} className="text-white">
          <FiMenu size={24} />
        </button>
      </div>
      
      <nav className="mt-6">
        <NavItem 
          icon={<FiHome size={20} />} 
          text="Dashboard" 
          active={activeTab === 'dashboard'}
          path="/"
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiUsers size={20} />} 
          text="Passengers" 
          active={activeTab === 'passengers'}
          path="/passengers"
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiMessageSquare size={20} />} 
          text="Campaigns" 
          active={activeTab === 'campaigns'}
          path="/campaigns"
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiStar size={20} />} 
          text="Feedback" 
          active={activeTab === 'feedback'}
          path="/feedback"
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiPieChart size={20} />} 
          text="Reports" 
          active={activeTab === 'reports'}
          path="/reports"
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiSettings size={20} />} 
          text="Settings" 
          active={activeTab === 'settings'}
          path="/setting"
          sidebarOpen={sidebarOpen}
        />
      </nav>
    </div>
  );
};

export default Sidebaar;