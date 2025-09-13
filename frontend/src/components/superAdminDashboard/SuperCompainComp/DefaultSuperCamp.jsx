import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FiUsers, FiBell, FiStar } from "react-icons/fi";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

// ✅ Moved StatCard outside JSX (this was breaking your code)
const StatCard = ({ title, value, value2,value3, change, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div>{icon}</div>
    </div>
    <p className="text-2xl font-bold text-[#242C54]">{value}</p>

    <span className="text-sm text-red-600">{change}</span>
  </div>
);

const DefaultSuperCamp = () => {
  return (
    <div className="p-6 ">
      {/* Header Section */}
     

      {/* Campaign List Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-serif mt-4 font-bold text-[#242C54] mb-6">
          All Station Performance Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="All Campaings"
            value="4,670"
         
            change="+12%"
            icon={<FiUsers className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="Email Campaign"
            value="4.2"
         
            change="+0.3"
            icon={<FiStar className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="WhatsApp Campaign"
            value="3,245"
        
            change="+8%"
            icon={<FaWhatsapp className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="Draft Campaign"
            value="1,876"
           
            change="+5%"
            icon={<FaEnvelope className="text-[#E4141C]" size={24} />}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultSuperCamp;
