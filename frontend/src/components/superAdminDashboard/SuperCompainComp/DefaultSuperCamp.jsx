import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FiUsers, FiStar } from "react-icons/fi";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import St1superCampn from "./SuperCampCity/St1superCampn";
import St2superCampn from "./SuperCampCity/St2superCampn";

const StatCard = ({ title, value, change, icon }) => (
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
  const [selectedCity, setSelectedCity] = useState("all");

  return (
    <div className="mb-5">
      {/* Performance Dashboard */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-serif mt-4 font-bold text-[#242C54] mb-6">
          All Station Performance 
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="All Campaigns"
            value="4,670"
            change="+12%"
            icon={<FiUsers className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="Email Campaign"
            value="4.2"
            change="+23%"
            icon={<FiStar className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="WhatsApp Campaign"
            value="3,245"
            change="+23%"
            icon={<FaWhatsapp className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="Draft Campaign"
            value="1,876"
            change="+23%"
            icon={<FaEnvelope className="text-[#E4141C]" size={24} />}
          />
        </div>
      </div>

      {/* Campaign Filter + List */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">
              All Campaigns
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create and manage your campaign in your required area.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 rounded-lg shadow-sm">
              <CiFilter className="text-lg text-gray-500" />
              <select
                className="bg-transparent font-medium outline-none text-gray-700"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">All</option>
                <option value="bahawalpur">Bahawalpur</option>
                <option value="multan">Multan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Render Based on Selected City */}
        <div>
          {(selectedCity === "all" || selectedCity === "bahawalpur") && <St1superCampn />}
          {(selectedCity === "all" || selectedCity === "multan") && <St2superCampn />}
        </div>
      </div>
    </div>
  );
};

export default DefaultSuperCamp;
