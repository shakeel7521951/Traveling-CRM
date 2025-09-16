import React, { useState } from "react";
import { MdOutlineEmail, MdDateRange, MdOutlineDelete } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import SuperCpnModel from "./SuperCpnModel";
import { FaRegEdit } from "react-icons/fa";

const CampainPage = ({
  campaigns,
  searchQuery,
  filterStatus,
  setCampaigns,
}) => {
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

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add or edit campaign
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (editMode) {
        // update existing
        setCampaigns((prev) =>
          prev.map((campaign) =>
            campaign.id === editId
              ? {
                  ...campaign,
                  name: newCampaign.name,
                  city: newCampaign.city,
                  selectedCampaign:
                    newCampaign.type === "email"
                      ? "Email Campaign"
                      : "Whatsapp Campaign",
                  target: newCampaign.target,
                  date1: newCampaign.startDate,
                  date2: newCampaign.endDate,
                  status: newCampaign.status,
                }
              : campaign
          )
        );
        setEditMode(false);
        setEditId(null);
      } else {
        // add new
        const newCpn = {
          id: Math.max(...campaigns.map((c) => c.id), 0) + 1,
          name: newCampaign.name,
          city: newCampaign.city,
          email: <MdOutlineEmail />,
          selectedCampaign:
            newCampaign.type === "email"
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

        setCampaigns((prev) => [...prev, newCpn]);
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
    }, 800);
  };

  // delete
  const handleDelete = (id) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  // edit
  const handleEdit = (campaign) => {
    setEditMode(true);
    setEditId(campaign.id);
    setNewCampaign({
      name: campaign.name,
      city: campaign.city,
      type: campaign.selectedCampaign.includes("Email") ? "email" : "whatsapp",
      status: campaign.status,
      target: campaign.target,
      startDate: campaign.date1,
      endDate: campaign.date2,
      message: "",
    });
    setIsModal(true);
  };

  // filtering + search
  const filteredCampaigns = campaigns.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  // pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-gray-50 mt-5">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Header + Create Button */}
       

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCampaigns.length > 0 ? (
            paginatedCampaigns.map((item) => (
              <div
                key={item.id}
                className="relative p-6 rounded-2xl border border-gray-100 shadow-md bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#242C54] to-[#E4141C] rounded-t-2xl"></div>

                {/* Campaign Header */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex-1 min-w-0">
                    <h1 className="font-bold whitespace-normal w-full text-lg text-[#242C54] mb-1">
                      {item.name}
                    </h1>

                    <div className="flex flex-wrap justify-between my-2 gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                        {item.city}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                          item.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Campaign Type */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-[#242C54] to-[#3A4375] text-white rounded-xl shadow-sm">
                    {item.email}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-[#242C54]">
                      {item.selectedCampaign}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Target: {item.target}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-gray-100 rounded-xl">{item.calender}</div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-[#242C54]">Duration</h2>
                    <p className="text-sm text-gray-500">
                      {item.date1} - {item.date2}
                    </p>
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
                      className="h-full bg-gradient-to-r from-[#242C54] to-[#E4141C] rounded-full transition-all duration-500"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                  <button className="text-sm flex cursor-pointer font-serif items-center justify-center py-2 gap-1 font-medium text-[#242C54] hover:text-[#E4141C] transition-colors w-full sm:w-auto">
                    <FiEye className="text-base" /> View Analytics
                  </button>

                  <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex cursor-pointer items-center gap-1"
                    >
                      <FaRegEdit className="text-2xl text-[#1D2348]" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center cursor-pointer px-4 py-2 gap-1 text-red-400"
                    >
                      <MdOutlineDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium mb-1">
                No campaigns found
              </p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCampaigns.length > 0 && (
          <div className="flex justify-end mt-8">
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
                        ? "bg-gradient-to-b from-[#E4141C] to-[#FF2B34] text-white border-[#E4141C]"
                        : "bg-white text-[#242C54] border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </li>
                ))}

                <li
                  onClick={() =>
                    setCurrentPage((p) => (p < totalPages ? p + 1 : p))
                  }
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