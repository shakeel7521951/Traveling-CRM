import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useAddCompaignMutation,
  useGetAllCompaignsQuery,
  useDeleteCompaignMutation,
} from "../redux/slices/CompaignSlice";
import CampaignAnalytics from "../components/campaigns/CampaignAnalytics";
import CampaignCard from "../components/campaigns/CampaignCard";
import CampaignModal from "../components/campaigns/CampaignModal";
import StatCard from "../components/campaigns/StatCard";
import { FiBarChart2, FiChevronDown, FiFilter, FiMail, FiPhone, FiPlus, FiSearch } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Campaigns = () => {
  const location = useLocation();

  // API hooks
  const { data: campaignsData, isLoading, refetch } = useGetAllCompaignsQuery();
  const [addCampaign] = useAddCompaignMutation();
  const [deleteCampaign] = useDeleteCompaignMutation();
  // Local UI state
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ for modal button
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "whatsapp",
    status: "draft",
    target: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  // Detailed view
  const [isDetailedView, setIsDetailedView] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  // Load campaigns from API
  useEffect(() => {
    if (campaignsData) {
      setCampaigns(
        campaignsData.map((campaign) => ({
          id: campaign._id || campaign.id,
          name: campaign.name,
          type: campaign.channel,
          status: campaign.status,
          target: campaign.targetAudience,
          sent: campaign.sent || 0,
          responses: campaign.responses || 0,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          color: campaign.type === "whatsapp" ? "bg-[#242C54]" : "bg-[#E4141C]",
          message: campaign.message || "",
        }))
      );
    }
  }, [campaignsData]);

  useEffect(() => {
    if (location.state) {
      const incomingCampaign = location.state;
      handleAddCampaign(incomingCampaign);
    }
  }, [location.state]);

  const handleAddCampaign = async (campaignData) => {
    try {
      await addCampaign(campaignData).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to add campaign:", error);
    }
  };

  const calculateResponseRate = () => {
    if (campaigns.length === 0) return "0%";

    const totalResponseRate = campaigns.reduce((sum, c) => {
      return sum + c.responses / (c.sent || 1);
    }, 0);

    const averageRate = (totalResponseRate / campaigns.length) * 100;
    return `${Math.round(averageRate)}%`;
  };

  // Filter campaigns based on search and filter
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || campaign.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new campaign
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // ✅ start loading
    try {
      await addCampaign(newCampaign).unwrap();
      setIsModalOpen(false);
      setNewCampaign({
        name: "",
        type: "whatsapp",
        status: "draft",
        target: "",
        startDate: "",
        endDate: "",
        message: "",
      });
      refetch();
    } catch (error) {
      console.error("Failed to create campaign:", error);
    } finally {
      setIsSubmitting(false); // ✅ stop loading
    }
  };

  // Delete a campaign
  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete campaign:", error);
    }
  };

  // Loading state for campaigns list
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4141C] mx-auto"></div>
          <p className="mt-4 text-[#242C54]">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  // Detailed analytics view
  if (isDetailedView && selectedCampaign) {
    return (
      <CampaignAnalytics
        campaign={selectedCampaign}
        onBack={() => {
          setIsDetailedView(false);
          setSelectedCampaign(null);
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header and search/filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#242C54]">
            Campaign Management
          </h1>
          <p className="text-gray-500 text-sm">
            Create and manage your marketing campaigns
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E4141C] text-white p-2 rounded-lg hover:bg-[#C1121F] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Campaigns"
          value={campaigns.length}
          icon={<FiMail />}
          color="bg-[#242C54]"
        />
        <StatCard
          title="Active Campaigns"
          value={campaigns.filter((c) => c.status === "active").length}
          icon={<FiBarChart2 />}
          color="bg-[#E4141C]"
        />
        <StatCard
          title="Messages Sent"
          value={campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
          icon={<FiPhone />}
          color="bg-[#242C54]"
        />
        <StatCard
          title="Response Rate"
          value={calculateResponseRate()}
          icon={<FaWhatsapp />}
          color="bg-[#E4141C]"
        />
      </div>

      {/* Campaigns grid */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onViewAnalytics={() => {
                setSelectedCampaign(campaign);
                setIsDetailedView(true);
              }}
              onDelete={() => handleDelete(campaign.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <FiMail className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-md font-medium text-[#242C54] mb-1">
            No campaigns found
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E4141C] text-white px-4 py-2 rounded-lg hover:bg-[#C1121F] transition-colors text-sm"
          >
            Create New Campaign
          </button>
        </div>
      )}

      {/* New Campaign Modal */}
      {isModalOpen && (
        <CampaignModal
          isLoading={isSubmitting} // ✅ now correct
          newCampaign={newCampaign}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Campaigns;
