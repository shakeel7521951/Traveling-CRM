import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdOutlineEmail, MdDateRange, MdOutlineDelete } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import SuperCpnModel from "./SuperCpnModel";
import { Link } from "react-router-dom";
import { bwpstAryData } from "./SuperCampnArray";
import { FaRegEdit } from "react-icons/fa";

const St1superCampn = () => {
  const [bwpstAry, setBwpstAry] = useState(bwpstAryData);
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
        setBwpstAry((prev) =>
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
          id: bwpstAry.length + 1,
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
        setBwpstAry((prev) => [...prev, newCpn]);
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
    setBwpstAry((prev) => prev.filter((c) => c.id !== id));
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

  const filteredCampaigns = bwpstAry.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  return (
  <div className=" bg-gray-50 mt-5">
  
    

      {/* Campaign List */}
      <div className="bg-gradient-to-br from-[#2A3163] to-[#ec8086] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl bg-[#FB2C36] text-center text-white font-bold px-6 py-3 rounded-lg">
            Bahawalpur
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 items-center w-full lg:w-auto">
            <div className="flex items-center px-4 py-2 rounded-lg border border-gray-200 shadow-sm bg-white w-full sm:w-auto">
              <CiSearch className="text-xl text-gray-400" />
              <input
                className="p-1 ml-2 text-gray-700 bg-transparent focus:outline-none w-full"
                type="text"
                placeholder="Search Campaign"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 rounded-lg shadow-sm w-full sm:w-auto">
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

            <button
              className="flex items-center gap-2 bg-[#D1131E] text-white px-4 py-3 cursor-pointer rounded-lg hover:bg-[#FB2C36] transition-all duration-300 shadow-md w-full sm:w-auto justify-center"
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
                className="relative p-6 rounded-xl border border-gray-100 shadow-md bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-[#FB2C36] rounded-t-xl"></div>
                
                <h1 className="font-bold text-xl mb-4 text-gray-800 truncate">{item.name}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#FB2C36] text-white rounded-lg shadow-sm">
                    {item.email}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-700">{item.selectedCampaign}</h2>
                    <p className="text-sm text-gray-500">Target: {item.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-gray-100 rounded-lg">{item.calender}</div>
                  <div>
                    <h2 className="font-semibold text-gray-700">Duration</h2>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <p>{item.date1}</p>
                      <span className="text-gray-300">-</span>
                      <p>{item.date2}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Sent: {item.sentVAlue}</span>
                    <span>0% Response Rate ({item.resValue})</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FB2C36] rounded-full" 
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>

                <div className="w-full border-t border-gray-200 mb-4"></div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <Link to="/" className="w-full sm:w-auto">
                    <button className="text-sm flex items-center justify-center py-2 gap-1 font-medium text-gray-700 hover:text-[#FB2C36] transition-colors w-full sm:w-auto">
                      <FiEye className="text-base" /> View Analytics
                    </button>
                  </Link>

                  <div className="flex gap-2 items-center w-full sm:w-auto justify-center sm:justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center px-3 py-2 gap-1 bg-[#1E2449] hover:bg-[#2a3163] text-white font-medium rounded-lg cursor-pointer transition-colors shadow-sm w-full sm:w-auto justify-center"
                    >
                      <FaRegEdit className="text-sm" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center px-3 py-2 gap-1 bg-[#FB2C36] hover:bg-[#e04149] text-white font-medium rounded-lg cursor-pointer transition-colors shadow-sm w-full sm:w-auto justify-center"
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
                  className={`px-4 py-2 rounded-lg border border-gray-200 cursor-pointer transition-colors ${
                    currentPage === 1 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Previous</span>
                </li>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#FB2C36] text-white border-[#FB2C36]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{index + 1}</span>
                  </li>
                ))}
                
                <li
                  onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
                  className={`px-4 py-2 rounded-lg border border-gray-200 cursor-pointer transition-colors ${
                    currentPage === totalPages 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Next</span>
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

export default St1superCampn;
