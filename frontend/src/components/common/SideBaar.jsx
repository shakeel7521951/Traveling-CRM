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

const NavItem = ({ icon, text, active, onClick, sidebarOpen }) => {
  return (
    <div 
      className={`flex items-center p-3 cursor-pointer ${active ? 'bg-[#E4141C]' : 'hover:bg-[#2d365a]'}`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      {sidebarOpen && <span>{text}</span>}
    </div>
  );
};

const Sidebaar = ({ sidebarOpen, toggleSidebar, activeTab, setActiveTab }) => {
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
          icon={<FiHome />} 
          text="Dashboard" 
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiUsers />} 
          text="Passengers" 
          active={activeTab === 'passengers'}
          onClick={() => setActiveTab('passengers')}
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiMessageSquare />} 
          text="Campaigns" 
          active={activeTab === 'campaigns'}
          onClick={() => setActiveTab('campaigns')}
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiStar />} 
          text="Reviews" 
          active={activeTab === 'reviews'}
          onClick={() => setActiveTab('reviews')}
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiPieChart />} 
          text="Reports" 
          active={activeTab === 'reports'}
          onClick={() => setActiveTab('reports')}
          sidebarOpen={sidebarOpen}
        />
        <NavItem 
          icon={<FiSettings />} 
          text="Settings" 
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          sidebarOpen={sidebarOpen}
        />
      </nav>
    </div>
  );
};

export default Sidebaar;