import React, { useState } from "react";
import { MdOutlineEmail, MdDateRange, MdOutlineDelete } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import SuperCpnModel from "./SuperCpnModel";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const CampainPage = ({ campaigns, searchQuery, filterStatus, setCampaigns }) => {
  const [isModal, setIsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "whatsapp",
    status: "active",
    target: "all",
    startDate: "",
    endDate: "",
    message: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (editMode) {
        // Update existing campaign
        setCampaigns(prev => {
          return prev.map(campaign => 
            campaign.id === editId 
              ? {
                  ...campaign,
                  name: newCampaign.name,
                  selectedCampaign: newCampaign.type === "email" 
                    ? "Email Campaign" 
                    : "Whatsapp Campaign",
                  target: newCampaign.target,
                  date1: newCampaign.startDate,
                  date2: newCampaign.endDate,
                  status: newCampaign.status,
                  city: newCampaign.city,
                }
              : campaign
          );
        });
        setEditMode(false);
        setEditId(null);
      } else {
        // Add new campaign
        const newCpn = {
          id: Math.max(...campaigns.map(c => c.id), 0) + 1,
          name: newCampaign.name,
          city: newCampaign.city,
          email: <MdOutlineEmail />,
          selectedCampaign: newCampaign.type === "email" 
            ? "Email Campaign" 
            : "Whatsapp Campaign",
          target: newCampaign.target,
          calender: <MdDateRange />,
          date1: newCampaign.startDate,
          date2: newCampaign.endDate,
          sentVAlue: "0",
          resValue: "0",
          status: newCampaign.status,
        };
        
        setCampaigns(prev => [...prev, newCpn]);
      }

      setIsModal(false);
      setIsSubmitting(false);
      setNewCampaign({
        name: "",
        type: "whatsapp",
        status: "active",
        target: "all",
        startDate: "",
        endDate: "",
        message: "",
        city: "",
      });
    }, 1000);
  };

  const handleDelete = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const handleEdit = (campaign) => {
    setEditMode(true);
    setEditId(campaign.id);
    setNewCampaign({
      name: campaign.name,
      type: campaign.selectedCampaign.includes("Email") ? "email" : "whatsapp",
      status: campaign.status,
      target: campaign.target,
      startDate: campaign.date1,
      endDate: campaign.date2,
      message: "",
      city: campaign.city,
    });
    setIsModal(true);
  };

  const filteredCampaigns = campaigns.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-50 mt-5">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCampaigns.length > 0 ? (
            paginatedCampaigns.map((item) => (
              <div
                key={item.id}
                className="relative p-6 rounded-2xl border border-gray-100 shadow-md bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute flex flex-col top-0 -right-9  gap-2">
                 <span className="relative text-center top-5 right-10 p-2 text-xs uppercase bg-gray-100 text-black font-semibold rounded-xl shadow-sm"> {item.status}</span>
                 
                  <div className="relative top-5 right-10 p-2 text-xs capitalize bg-[#242C54] text-white font-semibold rounded-xl shadow-sm">
                    <h1>{item.city}</h1>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-2 bg-[#242C54] rounded-t-2xl"></div>

                <h1 className="font-bold font-serif text-lg mb-4 text-[#242C54] truncate">
                  {item.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#E4141C] text-white rounded-xl shadow-sm">
                    {item.email}
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#242C54]">{item.selectedCampaign}</h2>
                    <p className="text-sm text-gray-500">Target: {item.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-gray-100 rounded-xl">{item.calender}</div>
                  <div>
                    <h2 className="font-semibold text-[#242C54]">Duration</h2>
                    <p className="text-sm text-gray-500">{item.date1} - {item.date2}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Sent: {item.sentVAlue}</span>
                    <span>0% Response Rate ({item.resValue})</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#242C54] rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                  <Link to="/" className="w-full sm:w-auto">
                    <button className="text-sm flex font-serif cursor-pointer items-center justify-center py-2 gap-1 font-medium text-[#242C54] hover:text-[#E4141C] transition-colors w-full sm:w-auto">
                      <FiEye className="text-base" /> View Analytics
                    </button>
                  </Link>

                  <div className="flex gap-2 items-center w-full sm:w-auto justify-center sm:justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center px-3 py-2 gap-1 bg-[#242C54] hover:bg-[#1a1f3f] text-white font-medium rounded-xl cursor-pointer transition-colors shadow-sm w-full sm:w-auto justify-center"
                    >
                      <FaRegEdit className="text-sm" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center px-3 py-2 gap-1 bg-[#E4141C] hover:bg-[#c70e16] text-white font-medium rounded-xl cursor-pointer transition-colors shadow-sm w-full sm:w-auto justify-center"
                    >
                      <MdOutlineDelete className="text-sm" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-500 text-lg">No campaigns found.</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCampaigns.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex items-center space-x-2">
                <li
                  onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : p))}
                  className={`px-4 py-2 rounded-xl border cursor-pointer transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#242C54] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </li>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-xl border cursor-pointer transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#E4141C] text-white border-[#E4141C]"
                        : "bg-white text-[#242C54] border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </li>
                ))}

                <li
                  onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
                  className={`px-4 py-2 rounded-xl border cursor-pointer transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#242C54] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Next
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {isModal && (
        <SuperCpnModel
          isLoading={isSubmitting}
          newCampaign={newCampaign}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={() => setIsModal(false)}
          editMode={editMode}
        />
      )}
    </div>
  );
};

export default CampainPage;