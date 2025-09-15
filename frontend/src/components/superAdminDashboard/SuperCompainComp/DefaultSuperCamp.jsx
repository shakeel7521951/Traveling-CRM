import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FiUsers, FiStar } from "react-icons/fi";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { MdOutlineEmail, MdDateRange } from "react-icons/md";

import SuperCpnModel from "./SuperCampCity/SuperCpnModel";
import { SuerCmpnData } from "./SuperCampCity/SuperCampnArray";
import CampainPage from "./SuperCampCity/CampainPage";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [campaigns, setCampaigns] = useState(SuerCmpnData);

  // Campaign Data to pass into modal
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "whatsapp",
    status: "active",
    target: "all",
    startDate: "",
    endDate: "",
    city: "",
  });

  // Handle input change inside modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle campaign creation
  const handleSubmit = () => {
    const campaignId = Date.now();
    const campaignItem = {
      id: campaignId,
      name: newCampaign.name,
      city: newCampaign.city,
      email: <MdOutlineEmail />,
      selectedCampaign: newCampaign.type === "email" ? "Email Campaign" : "Whatsapp Campaign",
      target: newCampaign.target,
      calender: <MdDateRange />,
      date1: newCampaign.startDate,
      date2: newCampaign.endDate,
      sentVAlue: "0",
      resValue: "0",
      status: newCampaign.status,
    };

    // Add to campaigns
    setCampaigns(prev => [...prev, campaignItem]);

    // Reset modal state
    setIsModal(false);
    setNewCampaign({
      name: "",
      type: "whatsapp",
      status: "active",
      target: "all",
      startDate: "",
      endDate: "",
      city: "",
    });
  };

  // Get filtered campaigns based on city selection
  const getFilteredCampaigns = () => {
    let filtered = campaigns;
    
    // Filter by city if not "all"
    if (selectedCity !== "all") {
      filtered = filtered.filter(campaign => campaign.city === selectedCity);
    }
    
    // Filter by search query and status
    return filtered.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus ? campaign.status === filterStatus : true;
      return matchesSearch && matchesFilter;
    });
  };

  // Calculate stats
  const filteredCampaigns = getFilteredCampaigns();
  const allCampaignsCount = filteredCampaigns.length;
  const emailCampaignsCount = filteredCampaigns.filter(c => c.selectedCampaign.includes("Email")).length;
  const whatsappCampaignsCount = filteredCampaigns.filter(c => c.selectedCampaign.includes("Whatsapp")).length;
  const activeCampaignsCount = filteredCampaigns.filter(c => c.status === "active").length;

  return (
    <div className="mb-5 ">
      {/* Performance Dashboard */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <h2 className="text-2xl font-serif mt-4 font-bold text-[#242C54] mb-6">
          All Station Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="All Campaigns"
            value={allCampaignsCount}
            change="+12%"
            icon={<FiUsers className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="Email Campaign"
            value={emailCampaignsCount}
            change="+23%"
            icon={<FiStar className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="WhatsApp Campaign"
            value={whatsappCampaignsCount}
            change="+23%"
            icon={<FaWhatsapp className="text-[#E4141C]" size={24} />}
          />
          <StatCard
            title="Active Campaign"
            value={activeCampaignsCount}
            change="+23%"
            icon={<FaEnvelope className="text-[#E4141C]" size={24} />}
          />
        </div>
      </div>

      {/* Campaign Filter + List */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        {/* Header */}
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
            {/* Search */}
            <div className="flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 w-full sm:w-auto">
              <CiSearch className="text-lg text-gray-500" />
              <input
                className="ml-2 text-gray-700 bg-transparent focus:outline-none w-full"
                type="text"
                placeholder="Search Campaign"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 border border-gray-300 bg-gray-50 px-3 py-2 rounded-lg w-full sm:w-auto">
              <CiFilter className="text-lg text-gray-500" />
              <select
                className="bg-transparent outline-none text-gray-700 w-full"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Campaigns</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Create Button */}
            <button
              className="flex items-center gap-2 bg-[#E4141C] text-white px-4 py-2 rounded-lg hover:bg-[#C1121F] transition-all shadow-sm w-full sm:w-auto justify-center"
              onClick={() => setIsModal(true)}
            >
              <AiOutlinePlus className="text-lg" />
              <span>Create Campaign</span>
            </button>

            {/* City Dropdown */}
            <div className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 rounded-lg shadow-sm">
              <CiFilter className="text-lg text-gray-500" />
              <select
                className="bg-transparent font-medium outline-none text-gray-700"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">All</option>
                <option value="JED Passenger">JED Passenger</option>
                <option value="RUH Passengers">RUH Passengers</option>
                <option value="DXB Passenger">DXB Passenger</option>
                <option value="Frequent Flyes">Frequent Flyes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModal && (
          <SuperCpnModel
            newCampaign={newCampaign}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={() => setIsModal(false)}
          />
        )}

        {/* Render Campaigns */}
        <div>
          <CampainPage 
            campaigns={getFilteredCampaigns()}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            setCampaigns={setCampaigns}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultSuperCamp;