import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FiUsers, FiStar } from "react-icons/fi";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { MdOutlineEmail, MdDateRange } from "react-icons/md";
import St1superCampn from "./SuperCampCity/St1superCampn";
import St2superCampn from "./SuperCampCity/St2superCampn";
import SuperCpnModel from "./SuperCampCity/SuperCpnModel";
import { campaignData } from "./SuperCampCity/SuperCampnArray";

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
  const [campaigns, setCampaigns] = useState(campaignData);

  // Campaign Data to pass into modal
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "whatsapp",
    status: "draft",
    target: "",
    startDate: "",
    endDate: "",
    city: "all",
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
      email: <MdOutlineEmail />,
      selectedCampaign: newCampaign.type === "email" ? "Email Campaign" : "Whatsapp Campaign",
      target: newCampaign.target,
      calender: <MdDateRange />,
      date1: newCampaign.startDate,
      date2: newCampaign.endDate,
      sentVAlue: "0",
      resValue: "0",
      status: newCampaign.status,
      city: newCampaign.city
    };

    // Add to selected city/cities
    setCampaigns(prev => {
      const updated = [...prev];
      
      if (newCampaign.city === "all") {
        // Add to both cities
        const bwpIndex = updated.findIndex(c => c.city === "bahawalpur");
        const multanIndex = updated.findIndex(c => c.city === "multan");
        
        if (bwpIndex !== -1) {
          updated[bwpIndex].Elements = [...updated[bwpIndex].Elements, {...campaignItem}];
        }
        if (multanIndex !== -1) {
          updated[multanIndex].Elements = [...updated[multanIndex].Elements, {...campaignItem}];
        }
      } else {
        // Add to specific city
        const cityIndex = updated.findIndex(c => c.city === newCampaign.city);
        if (cityIndex !== -1) {
          updated[cityIndex].Elements = [...updated[cityIndex].Elements, campaignItem];
        }
      }
      
      return updated;
    });

    // Reset modal state
    setIsModal(false);
    setNewCampaign({
      name: "",
      type: "whatsapp",
      status: "draft",
      target: "",
      startDate: "",
      endDate: "",
      city: "all",
    });
  };

  // Get filtered campaigns for a specific city
  const getFilteredCampaigns = (city) => {
    const cityData = campaigns.find(c => c.city === city);
    if (!cityData) return [];
    
    return cityData.Elements.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus ? campaign.status === filterStatus : true;
      return matchesSearch && matchesFilter;
    });
  };

  // Get all campaigns for stats (without duplication)
  const getAllCampaigns = () => {
    // Use a Set to track unique campaign IDs to avoid duplication
    const seenIds = new Set();
    const uniqueCampaigns = [];
    
    campaigns.flatMap(city => city.Elements).forEach(campaign => {
      if (!seenIds.has(campaign.id)) {
        seenIds.add(campaign.id);
        uniqueCampaigns.push(campaign);
      }
    });
    
    return uniqueCampaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus ? campaign.status === filterStatus : true;
      return matchesSearch && matchesFilter;
    });
  };

  // Calculate stats using getAllCampaigns to avoid double counting
  const allCampaignsList = getAllCampaigns();
  const allCampaignsCount = allCampaignsList.length;
  const emailCampaignsCount = allCampaignsList.filter(c => c.selectedCampaign.includes("Email")).length;
  const whatsappCampaignsCount = allCampaignsList.filter(c => c.selectedCampaign.includes("Whatsapp")).length;
  const draftCampaignsCount = allCampaignsList.filter(c => c.status === "draft").length;

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
            title="Draft Campaign"
            value={draftCampaignsCount}
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
                <option value="bahawalpur">Bahawalpur</option>
                <option value="multan">Multan</option>
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

        {/* Render Based on Selected City */}
        <div>
          {selectedCity === "all" ? (
            <>
              <div className="mb-8">
               
                <St1superCampn 
                  campaigns={getFilteredCampaigns("bahawalpur")}
                  searchQuery={searchQuery}
                  filterStatus={filterStatus}
                  setCampaigns={setCampaigns}
                />
              </div>
              <div>
               
                <St2superCampn 
                  campaigns={getFilteredCampaigns("multan")}
                  searchQuery={searchQuery}
                  filterStatus={filterStatus}
                  setCampaigns={setCampaigns}
                />
              </div>
            </>
          ) : selectedCity === "bahawalpur" ? (
            <St1superCampn 
              campaigns={getFilteredCampaigns("bahawalpur")}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              setCampaigns={setCampaigns}
            />
          ) : (
            <St2superCampn 
              campaigns={getFilteredCampaigns("multan")}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              setCampaigns={setCampaigns}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultSuperCamp;