import React, { useState } from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiMessageSquare, 
  FiStar, 
  FiPieChart, 
  FiSettings,
  FiGlobe,
  FiCalendar,
  FiDownload,
  FiBell,
  FiSearch,
  FiMenu
} from 'react-icons/fi';
import { FaWhatsapp, FaEnvelope, FaQrcode } from 'react-icons/fa';

const TarcoDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const stations = [
    { id: 1, name: 'Khartoum', code: 'KRT', passengers: 1245, rating: 4.2 },
    { id: 2, name: 'Dubai', code: 'DXB', passengers: 982, rating: 4.5 },
    { id: 3, name: 'Istanbul', code: 'IST', passengers: 1567, rating: 4.1 },
    { id: 4, name: 'Cairo', code: 'CAI', passengers: 876, rating: 3.9 },
  ];

  const recentPassengers = [
    { name: 'Ahmed Mohamed', flight: 'TA201', destination: 'KRT', date: '2023-11-15' },
    { name: 'Youssef Ali', flight: 'TA305', destination: 'DXB', date: '2023-11-14' },
    { name: 'Fatima Hassan', flight: 'TA102', destination: 'IST', date: '2023-11-14' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FiSearch className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="border-none outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-gray-600" size={20} />
            <div className="w-8 h-8 rounded-full bg-[#E4141C] flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold text-[#242C54] mb-6">
            Station Performance Dashboard
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Passengers" 
              value="4,670" 
              change="+12%" 
              icon={<FiUsers className="text-[#E4141C]" size={24} />}
            />
            <StatCard 
              title="Average Rating" 
              value="4.2" 
              change="+0.3" 
              icon={<FiStar className="text-[#E4141C]" size={24} />}
            />
            <StatCard 
              title="WhatsApp Messages" 
              value="3,245" 
              change="+8%" 
              icon={<FaWhatsapp className="text-[#E4141C]" size={24} />}
            />
            <StatCard 
              title="Email Campaigns" 
              value="1,876" 
              change="+5%" 
              icon={<FaEnvelope className="text-[#E4141C]" size={24} />}
            />
          </div>

          {/* Stations Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#242C54]">
                Station Performance
              </h3>
              <button className="flex items-center text-[#E4141C]">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                      Station
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                      Passengers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stations.map((station) => (
                    <tr key={station.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiGlobe className="text-[#E4141C] mr-2" />
                          <span>{station.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {station.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {station.passengers}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 rounded-full bg-[#E4141C]" 
                              style={{ width: `${(station.rating / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span>{station.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#E4141C] hover:text-[#242C54] mr-3">
                          View
                        </button>
                        <button className="text-[#242C54] hover:text-[#E4141C]">
                          QR Code
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Passengers and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Passengers */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#242C54] mb-4">
                Recent Passengers
              </h3>
              <div className="space-y-4">
                {recentPassengers.map((passenger, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-[#242C54]">{passenger.name}</p>
                      <p className="text-sm text-gray-500">{passenger.flight} • {passenger.destination}</p>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{passenger.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[#E4141C] flex items-center">
                View All Passengers
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#242C54] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-[#242C54] text-white rounded-lg">
                  <span>Add New Passenger</span>
                  <FiUsers />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-[#E4141C] text-white rounded-lg">
                  <span>Send Campaign</span>
                  <FiMessageSquare />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-100 text-[#242C54] rounded-lg">
                  <span>Generate QR Code</span>
                  <FaQrcode />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-100 text-[#242C54] rounded-lg">
                  <span>Create Report</span>
                  <FiDownload />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, sidebarOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-4 ${active ? 'bg-[#E4141C] text-white' : 'text-gray-300 hover:bg-[#E4141C] hover:bg-opacity-50 hover:text-white'}`}
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-[#242C54] mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-[#242C54] bg-opacity-10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`mt-4 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change} {isPositive ? '↑' : '↓'}
      </div>
    </div>
  );
};

export default TarcoDashboard;