import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdOutlineEmail, MdDateRange, MdOutlineDelete } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import SuperCpnModel from "./SuperCpnModel";
import { Link } from "react-router-dom";
import { multnCmpnAry } from "./SuperCampnArray";
import { FaRegEdit } from "react-icons/fa";

const St2superCampn = () => {
  const [multstAry, setmultstAry] = useState(multnCmpnAry);
  const [isModal, setIsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "whatsapp",
    status: "draft",
    target: "",
    startDate: "",
    endDate: "",
    message: "",
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
        setmultstAry((prev) =>
          prev.map((c) =>
            c.id === editId
              ? {
                  ...c,
                  name: newCampaign.name,
                  selectedCampaign:
                    newCampaign.type === "email"
                      ? "Email Campaign"
                      : "Whatsapp Campaign",
                  target: newCampaign.target,
                  date1: newCampaign.startDate,
                  date2: newCampaign.endDate,
                  status: newCampaign.status,
                }
              : c
          )
        );
        setEditMode(false);
        setEditId(null);
      } else {
        const newCpn = {
          id: multstAry.length + 1,
          name: newCampaign.name,
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
        setmultstAry((prev) => [...prev, newCpn]);
      }

      setIsModal(false);
      setIsSubmitting(false);
      setNewCampaign({
        name: "",
        type: "whatsapp",
        status: "draft",
        target: "",
        startDate: "",
        endDate: "",
        message: "",
      });
    }, 1000);
  };

  const handleDelete = (id) => {
    setmultstAry((prev) => prev.filter((c) => c.id !== id));
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
    });
    setIsModal(true);
  };

  const filteredCampaigns = multstAry.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-50 mt-5">
      <div className="bg-white rounded-xl p-6 shadow-md">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold text-[#242C54]">📍 Multan Campaigns</h1>

          {/* Search + Filter + Create */}
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full lg:w-auto">
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
              onClick={() => {
                setEditMode(false);
                setIsModal(true);
              }}
            >
              <AiOutlinePlus className="text-lg" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCampaigns.length > 0 ? (
            paginatedCampaigns.map((item) => (
              <div
                key={item.id}
                className="relative p-6 rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#242C54] rounded-t-2xl"></div>

                <h1 className="font-semibold text-lg mb-4 text-[#242C54] truncate">
                  {item.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#242C54] text-white rounded-lg shadow-sm">
                    {item.email}
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-800">{item.selectedCampaign}</h2>
                    <p className="text-sm text-gray-500">Target: {item.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-gray-100 rounded-lg">{item.calender}</div>
                  <div>
                    <h2 className="font-medium text-gray-800">Duration</h2>
                    <p className="text-sm text-gray-500">
                      {item.date1} – {item.date2}
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Sent: {item.sentVAlue}</span>
                    <span>0% Response Rate ({item.resValue})</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#242C54] rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <Link to="/" className="w-full sm:w-auto">
                    <button className="text-sm flex items-center justify-center py-2 gap-1 font-medium text-gray-700 hover:text-[#E4141C] transition-colors w-full sm:w-auto">
                      <FiEye className="text-base" /> View Analytics
                    </button>
                  </Link>

                  <div className="flex gap-2 items-center w-full sm:w-auto justify-center sm:justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center px-3 py-2 gap-1 bg-[#242C54] hover:bg-[#1a2140] text-white font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
                    >
                      <FaRegEdit className="text-sm" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center px-3 py-2 gap-1 bg-[#E4141C] hover:bg-[#C1121F] text-white font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
                    >
                      <MdOutlineDelete className="text-sm" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <div className="text-gray-400 text-5xl mb-3">📋</div>
              <p className="text-gray-500 text-lg">No campaigns found.</p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filter criteria
              </p>
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
                  className={`px-4 py-2 rounded-lg border cursor-pointer ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  Previous
                </li>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg border cursor-pointer ${
                      currentPage === index + 1
                        ? "bg-[#E4141C] text-white border-[#E4141C]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
                  className={`px-4 py-2 rounded-lg border cursor-pointer ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  Next
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Modal */}
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

export default St2superCampn;
