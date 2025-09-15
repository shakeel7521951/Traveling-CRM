import React from 'react';
import { FiUsers, FiLayers, FiPlayCircle, FiTrendingUp } from 'react-icons/fi';
import { MdOutlineTrain } from 'react-icons/md';

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl hover:translate-y-[-4px] group">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-[#fef2f2] transition-colors">
        {React.cloneElement(icon, { className: "text-[#E4141C]", size: 20 })}
      </div>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-bold text-[#242C54]">{value}</p>
      <span className="text-sm font-medium text-green-600 flex items-center">
        <FiTrendingUp size={16} className="mr-1" />
        {change}
      </span>
    </div>
  </div>
);

const StationsHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#242C54] mb-2">Station Performance Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of station operations and performance metrics</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Stations"
            value="120"
            change="+5%"
            icon={<MdOutlineTrain />}
          />
          <StatCard
            title="Total Campaigns"
            value="45"
            change="+10%"
            icon={<FiLayers />}
          />
          <StatCard
            title="Active Campaigns"
            value="18"
            change="+3%"
            icon={<FiPlayCircle />}
          />
          <StatCard
            title="Total Passengers"
            value="4,670"
            change="+12%"
            icon={<FiUsers />}
          />
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#242C54]">Performance Summary</h2>
            <div className="text-sm text-green-600 font-medium flex items-center">
              <FiTrendingUp size={16} className="mr-1" />
              Overall improvement
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Station Utilization", value: "78%", color: "bg-[#242C54]" },
              { label: "Campaign Efficiency", value: "85%", color: "bg-[#3A4375]" },
              { label: "Passenger Growth", value: "+12%", color: "bg-[#4A5275]" },
              { label: "Operational Uptime", value: "99.2%", color: "bg-[#5A6275]" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gray-50">
                <div className="text-sm text-gray-600 mb-2">{item.label}</div>
                <div className={`text-lg font-bold text-[#242C54]`}>{item.value}</div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`} 
                    style={{ width: item.value.includes('%') ? item.value : '100%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationsHero;