import React, { useState } from "react";
import {
  FiAlertTriangle,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
  FiUsers,
  FiX,
  FiEdit3,
  FiPlus,
} from "react-icons/fi";

const Complaints = () => {
  // State for complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      passenger: "Ahmed Mohamed",
      station: "JED",
      priority: "high",
      category: "Baggage",
      date: "2023-06-15",
      description:
        "Lost luggage during connecting flight. No updates provided for 3 days.",
      status: "pending",
      assignedTo: null,
      resolution: null,
      lastUpdated: "2023-06-15",
    },
    {
      id: 2,
      passenger: "Sarah Johnson",
      station: "DXB",
      priority: "medium",
      category: "Flight Delay",
      date: "2023-06-14",
      description: "Flight delayed by 4 hours without proper notification.",
      status: "in-progress",
      assignedTo: "John Smith",
      resolution: "Investigating with operations team",
      lastUpdated: "2023-06-16",
    },
    {
      id: 3,
      passenger: "Fatima Hassan",
      station: "KRT",
      priority: "low",
      category: "Service",
      date: "2023-06-14",
      description: "Rude behavior from cabin crew member during meal service.",
      status: "completed",
      assignedTo: "Maria Garcia",
      resolution: "Addressed with crew. Passenger contacted and apologized.",
      lastUpdated: "2023-06-18",
    },
    {
      id: 4,
      passenger: "Mohammed Omar",
      station: "RUH",
      priority: "high",
      category: "Booking Issue",
      date: "2023-06-13",
      description:
        "Double charged for seat selection. Credit card charged twice.",
      status: "pending",
      assignedTo: null,
      resolution: null,
      lastUpdated: "2023-06-13",
    },
    {
      id: 5,
      passenger: "Lisa Chen",
      station: "JED",
      priority: "medium",
      category: "Accessibility",
      date: "2023-06-12",
      description:
        "Wheelchair assistance not provided as requested during check-in.",
      status: "in-progress",
      assignedTo: "David Wilson",
      resolution: "Training session scheduled for ground staff",
      lastUpdated: "2023-06-17",
    },
  ]);

  // State for team members
  const [teamMembers] = useState([
    "John Smith",
    "Maria Garcia",
    "David Wilson",
    "Sarah Connor",
    "Ahmed Ali",
    "Lisa Wang",
  ]);

  // State for UI controls
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const complaintsPerPage = 5;

  // Filter complaints based on search and filters
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || complaint.status === filter;
    const matchesPriority =
      priorityFilter === "all" || complaint.priority === priorityFilter;
    return matchesSearch && matchesFilter && matchesPriority;
  });

  // Pagination logic
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle assignment
  const handleAssignment = (complaintId, assignee) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              assignedTo: assignee,
              status: assignee ? "in-progress" : "pending",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : complaint
      )
    );
  };

  // Handle status change
  const handleStatusChange = (complaintId, newStatus, resolution = null) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: newStatus,
              resolution,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : complaint
      )
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const priorityClasses = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <span
        className={`text-xs px-3 py-1 rounded-full border ${priorityClasses[priority]} font-medium`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      pending: "bg-gray-100 text-gray-800 border-gray-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
    };

    const statusLabels = {
      pending: "Pending",
      "in-progress": "In Progress",
      completed: "Completed",
    };

    return (
      <span
        className={`text-xs px-3 py-1 rounded-full border ${statusClasses[status]} font-medium`}
      >
        {statusLabels[status]}
      </span>
    );
  };

  // Complaint details modal
  const ComplaintModal = ({ complaint, onClose, onAssign, onStatusChange }) => {
    const [assignee, setAssignee] = useState(complaint?.assignedTo || "");
    const [resolution, setResolution] = useState(complaint?.resolution || "");

    if (!complaint) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (assignee && assignee !== complaint.assignedTo) {
        onAssign(complaint.id, assignee);
      }
      if (resolution !== complaint.resolution) {
        onStatusChange(
          complaint.id,
          resolution ? "completed" : "in-progress",
          resolution
        );
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="border-b border-gray-200 p-6 flex justify-between items-center bg-gray-50 rounded-t-xl">
            <div>
              <h3 className="text-xl font-bold text-[#242C54]">
                Complaint Details
              </h3>
              <p className="text-sm text-gray-600">ID: #{complaint.id}</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passenger
                </label>
                <p className="text-[#242C54] font-semibold">
                  {complaint.passenger}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Station
                </label>
                <p className="text-[#242C54] font-semibold">
                  {complaint.station}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <p className="text-[#242C54] font-semibold">
                  {complaint.category}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <p className="text-[#242C54] font-semibold">{complaint.date}</p>
              </div>
            </div>

            {/* Priority and Status */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <PriorityBadge priority={complaint.priority} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <StatusBadge status={complaint.status} />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <p className="text-gray-800 bg-gray-50 p-4 rounded-lg border">
                {complaint.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To
                </label>
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

              {/* Resolution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Notes
                </label>
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                  placeholder="Enter resolution details..."
                />
              </div>

              {/* Action Buttons */}
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
                  className="px-6 py-2 bg-[#E4141C] text-white rounded-lg hover:bg-[#C1121F] transition-colors"
                >
                  Update Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header and search/filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#242C54]">
            Complaint Management
          </h1>
          <p className="text-gray-600 text-sm">
            Track and resolve passenger complaints efficiently
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

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
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="bg-[#242C54] text-white p-4 rounded-xl mr-4">
              <FiAlertTriangle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Complaints
              </p>
              <p className="text-2xl font-bold text-[#242C54]">
                {complaints.length}
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
                {complaints.filter((c) => c.status === "pending").length}
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
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-[#242C54]">
                {complaints.filter((c) => c.status === "in-progress").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="bg-[#E4141C] text-white p-4 rounded-xl mr-4">
              <FiCheckCircle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Resolved</p>
              <p className="text-2xl font-bold text-[#242C54]">
                {complaints.filter((c) => c.status === "completed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6">
        {currentComplaints.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Passenger
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Priority
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Assigned To
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#242C54] text-white p-2 rounded-lg">
                          <FiUser className="text-sm" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#242C54]">
                            {complaint.passenger}
                          </p>
                          <p className="text-xs text-gray-500">
                            {complaint.station} • {complaint.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-800">
                        {complaint.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {complaint.assignedTo ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-[#E4141C] text-white rounded-full flex items-center justify-center text-xs font-semibold">
                              {complaint.assignedTo
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm font-medium text-gray-800">
                              {complaint.assignedTo}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 italic">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsModalOpen(true);
                          }}
                          className="bg-[#E4141C] text-white p-2 rounded-lg hover:bg-[#C1121F] transition-colors"
                          title="Edit Complaint"
                        >
                          <FiEdit3 className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiAlertTriangle className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#242C54] mb-2">
              No complaints found
            </h3>
            <p className="text-gray-600 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredComplaints.length > complaintsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstComplaint + 1} to{" "}
            {Math.min(indexOfLastComplaint, filteredComplaints.length)} of{" "}
            {filteredComplaints.length} complaints
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#242C54] hover:bg-gray-100"
              } transition-colors`}
            >
              <FiChevronLeft className="text-lg" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === number
                        ? "bg-[#E4141C] text-white"
                        : "text-[#242C54] hover:bg-gray-100"
                    } transition-colors`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#242C54] hover:bg-gray-100"
              } transition-colors`}
            >
              <FiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* Complaint Modal */}
      {isModalOpen && (
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

export default Complaints;
