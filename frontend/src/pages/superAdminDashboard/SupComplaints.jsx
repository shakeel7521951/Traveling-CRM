import React, { useState } from "react";
import {
  FiAlertTriangle,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiUsers,
  FiX,
  FiEdit3,
  FiRefreshCw,
} from "react-icons/fi";
import {
  useGetComplaintsQuery,
  useUpdateComplaintStatusMutation,
  useDeleteFeedbackMutation,
} from "../../redux/slices/FeedbackSlice";

const SupComplaints = () => {
  // ======================
  // State
  // ======================
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stationFilter, setStationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const complaintsPerPage = 5;

  const [teamMembers] = useState([
    "John Smith",
    "Maria Garcia",
    "David Wilson",
    "Sarah Connor",
    "Ahmed Ali",
    "Lisa Wang",
  ]);

  // ======================
  // API Calls
  // ======================
  const {
    data: complaintsData,
    isLoading,
    error,
    refetch,
  } = useGetComplaintsQuery({
    page: currentPage,
    limit: complaintsPerPage,
    ...(searchTerm && { search: searchTerm }),
    ...(filter !== "all" && { status: filter }),
    ...(priorityFilter !== "all" && { priority: priorityFilter }),
    ...(stationFilter !== "all" && { station: stationFilter }),
  });

  const { data: statsData } = useGetComplaintsQuery();

  const [updateComplaintStatus] = useUpdateComplaintStatusMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const complaints = complaintsData?.data || [];
  const pagination = complaintsData?.pagination || {};
  const totalComplaints = pagination.totalItems || 0;
  const totalPages = pagination.totalPages || 1;

  // ======================
  // Helpers
  // ======================
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const PriorityBadge = ({ priority }) => {
    const priorityClasses = {
      High: "bg-red-100 text-red-800 border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      <span
        className={`text-xs px-3 py-1 rounded-full border ${priorityClasses[priority]} font-medium`}
      >
        {priority}
      </span>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusClasses = {
      Pending: "bg-gray-100 text-gray-800 border-gray-200",
      "In Review": "bg-blue-100 text-blue-800 border-blue-200",
      Resolved: "bg-green-100 text-green-800 border-green-200",
      Closed: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return (
      <span
        className={`text-xs px-3 py-1 rounded-full border ${statusClasses[status]} font-medium`}
      >
        {status}
      </span>
    );
  };

  const handleAssignment = async (complaintId, assignee) => {
    try {
      await updateComplaintStatus({
        id: complaintId,
        assignedTo: assignee,
        status: assignee ? "In Review" : "Pending",
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update complaint:", error);
    }
  };

  const handleStatusChange = async (complaintId, newStatus, resolution = null) => {
    try {
      await updateComplaintStatus({
        id: complaintId,
        status: newStatus,
        resolution: resolution || undefined,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update complaint:", error);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await deleteFeedback(complaintId).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete complaint:", error);
      }
    }
  };

  // Filter complaints based on search term, status filter, priority filter, and station filter
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.feedbackType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || complaint.status === filter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    const matchesStation = stationFilter === "all" || complaint.station === stationFilter;
    
    return matchesSearch && matchesFilter && matchesPriority && matchesStation;
  });

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ======================
  // Complaint Modal
  // ======================
  const ComplaintModal = ({ complaint, onClose, onAssign, onStatusChange }) => {
    const [assignee, setAssignee] = useState(complaint?.assignedTo || "");
    const [resolution, setResolution] = useState(complaint?.resolution || "");
    const [isUpdating, setIsUpdating] = useState(false);

    if (!complaint) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsUpdating(true);
      try {
        if (assignee && assignee !== complaint.assignedTo) {
          await onAssign(complaint._id, assignee);
        }
        if (resolution !== complaint.resolution) {
          await onStatusChange(
            complaint._id,
            resolution ? "Resolved" : (assignee ? "In Review" : "Pending"),
            resolution
          );
        }
        onClose();
      } catch (error) {
        console.error("Failed to update complaint:", error);
      } finally {
        setIsUpdating(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="border-b border-gray-200 p-6 flex justify-between items-center bg-gray-50 rounded-t-xl">
            <div>
              <h3 className="text-xl font-bold text-[#242C54]">Complaint Details</h3>
              <p className="text-sm text-gray-600">ID: #{complaint._id?.slice(-8)}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-[#E4141C] transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passenger</label>
                <p className="text-[#242C54] font-semibold">{complaint.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Station</label>
                <p className="text-[#242C54] font-semibold">{complaint.station}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <p className="text-[#242C54] font-semibold">{complaint.feedbackType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <p className="text-[#242C54] font-semibold">
                  {formatDate(complaint.dateOfExperience || complaint.createdAt)}
                </p>
              </div>
            </div>

            {/* Priority and Status */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <PriorityBadge priority={complaint.priority} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <StatusBadge status={complaint.status} />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <p className="text-gray-800 bg-gray-50 p-4 rounded-lg border">{complaint.details}</p>
            </div>

            {complaint.flightNumber && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                <p className="text-[#242C54] font-semibold">{complaint.flightNumber}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Notes</label>
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                  placeholder="Enter resolution details..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isUpdating
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#E4141C] text-white hover:bg-[#C1121F]"
                  }`}
                >
                  {isUpdating ? "Updating..." : "Update Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // ======================
  // Loading/Error
  // ======================
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4141C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
            <FiAlertTriangle className="text-2xl mx-auto mb-2" />
            <p>Error loading complaints: {error?.data?.message || "Please try again later"}</p>
          </div>
          <button
            onClick={refetch}
            className="bg-[#E4141C] text-white px-4 py-2 rounded-lg hover:bg-[#C1121F] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ======================
  // Main UI
  // ======================
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header + Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#242C54]">Complaint Management</h1>
          <p className="text-gray-600 text-sm">Track and resolve passenger complaints efficiently</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search complaints..."
              className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-10 shadow-sm"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-10 shadow-sm"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Station Filter */}
          <div className="relative">
            <select
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-10 shadow-sm"
              value={stationFilter}
              onChange={(e) => {
                setStationFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Stations</option>
              <option value="AILK">AILK</option>
              <option value="XYZ">XYZ</option>
              <option value="DEF">DEF</option>
            </select>
          </div>

          {/* Refresh */}
          <button
            onClick={refetch}
            className="bg-[#242C54] text-white p-3 rounded-xl hover:bg-[#1a223f] transition-colors flex items-center gap-2"
          >
            <FiRefreshCw className="text-sm" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="bg-[#242C54] text-white p-4 rounded-xl mr-4">
              <FiAlertTriangle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Complaints</p>
              <p className="text-2xl font-bold text-[#242C54]">
                {statsData?.data?.complaints?.total || totalComplaints}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="bg-red-500 text-white p-4 rounded-xl mr-4">
              <FiClock className="text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-[#242C54]">
                {statsData?.data?.complaints?.pending || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="bg-green-500 text-white p-4 rounded-xl mr-4">
              <FiCheckCircle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Resolved</p>
              <p className="text-2xl font-bold text-[#242C54]">
                {statsData?.data?.complaints?.resolved || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-4 rounded-xl mr-4">
              <FiUsers className="text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">In Review</p>
              <p className="text-2xl font-bold text-[#242C54]">
                {statsData?.data?.complaints?.inReview || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Passenger
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Station
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentComplaints.length > 0 ? (
                currentComplaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{complaint.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{complaint.feedbackType}</td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {complaint.assignedTo || (
                        <span className="text-gray-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {complaint.station}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {formatDate(complaint.dateOfExperience || complaint.createdAt)}
                    </td>
                    <td
                      className="px-6 py-4 text-right space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <FiEdit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteComplaint(complaint._id)}
                        className="inline-flex items-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiX size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-[#E4141C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft /> Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? "bg-[#E4141C] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-[#E4141C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {isModalOpen && selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedComplaint(null);
          }}
          onAssign={handleAssignment}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default SupComplaints;