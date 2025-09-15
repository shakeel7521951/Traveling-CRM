// components/Feedback/SupFeedback.jsx
import { useState } from "react";
import {
  FiStar, FiSearch, FiChevronLeft, FiChevronRight,
  FiAlertCircle, FiCheckCircle, FiMessageSquare, FiUser
} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  useGetAllFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation
} from "../../redux/slices/FeedbackSlice";

// 🔹 Station options
const stations = ["All", "JED", "RUH", "DXB", "DMM"];

const SupFeedback = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [station, setStation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 5;

  // --- API queries ---
  const { data: feedbackData, isLoading, error, refetch } = useGetAllFeedbackQuery({
    page: currentPage,
    limit: feedbackPerPage,
    ...(searchTerm && { search: searchTerm }),
    ...(filter !== "all" && { status: filter }),
    ...(station !== "All" && { station }),
  });

  const { data: statsData } = useGetAllFeedbackQuery(
    station !== "All" ? { station } : {}
  );

  const [updateFeedback] = useUpdateFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const feedback = feedbackData?.data || [];
  const pagination = feedbackData?.pagination || {};
  const totalFeedback = pagination.totalItems || 0;
  const totalPages = pagination.totalPages || 1;

  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;

  // --- Helpers ---
  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) =>
        i < rating ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />
      )}
    </div>
  );

  const StatusBadge = ({ rating }) =>
    rating >= 4 ? (
      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
        <FiCheckCircle className="mr-1" /> Positive
      </span>
    ) : (
      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
        <FiAlertCircle className="mr-1" /> Needs Attention
      </span>
    );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const handleFollowUpToggle = async (id, currentStatus) => {
    try {
      await updateFeedback({ id, data: { followUp: !currentStatus } }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update feedback:", err);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Delete this feedback?")) {
      try {
        await deleteFeedback(id).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete feedback:", err);
      }
    }
  };

  // --- Loading/Error States ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4141C]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
          <FiAlertCircle className="text-2xl mx-auto mb-2" />
          <p>Error loading feedback. {error.data?.message || "Please try again later"}</p>
        </div>
        <button
          onClick={refetch}
          className="bg-[#E4141C] text-white px-4 py-2 rounded-lg hover:bg-[#C1121F]"
        >
          Retry
        </button>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        station={station}
        setStation={setStation}
        setCurrentPage={setCurrentPage}
      />

      {/* Stats */}
      <Stats statsData={statsData} totalFeedback={totalFeedback} />

      {/* Feedback List */}
      <FeedbackList
        feedback={feedback}
        renderStars={renderStars}
        StatusBadge={StatusBadge}
        formatDate={formatDate}
        handleFollowUpToggle={handleFollowUpToggle}
        handleDeleteFeedback={handleDeleteFeedback}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalFeedback={totalFeedback}
        indexOfFirstFeedback={indexOfFirstFeedback}
        indexOfLastFeedback={indexOfLastFeedback}
        paginate={setCurrentPage}
      />
    </div>
  );
};

// --- Subcomponents ---

const Header = ({ searchTerm, setSearchTerm, filter, setFilter, station, setStation, setCurrentPage }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-[#242C54]">Passenger Feedback</h1>
      <p className="text-gray-500 text-sm">Review and manage feedback across stations</p>
    </div>
    <div className="flex flex-wrap gap-3 w-full md:w-auto">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search feedback..."
          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4141C]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {/* Filter */}
      <select
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4141C]"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">All Feedback</option>
        <option value="positive">Positive</option>
        <option value="negative">Needs Attention</option>
      </select>
      {/* Station Selector */}
      <select
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4141C]"
        value={station}
        onChange={(e) => {
          setStation(e.target.value);
          setCurrentPage(1);
        }}
      >
        {stations.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All Stations" : s}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const Stats = ({ statsData, totalFeedback }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <StatCard icon={<FiStar />} title="Total Feedback" value={totalFeedback} color="bg-[#242C54]" />
    <StatCard icon={<FiCheckCircle />} title="Positive" value={statsData?.data?.positive || 0} color="bg-green-500" />
    <StatCard icon={<FiAlertCircle />} title="Needs Attention" value={statsData?.data?.negative || 0} color="bg-red-500" />
    <StatCard icon={<FiMessageSquare />} title="Avg. Rating" value={`${statsData?.data?.averageRating?.toFixed(1) || "0.0"}/5`} color="bg-[#E4141C]" />
  </div>
);

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center">
    <div className={`${color} text-white p-3 rounded-lg mr-4`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-[#242C54]">{value}</p>
    </div>
  </div>
);

const FeedbackList = ({ feedback, renderStars, StatusBadge, formatDate, handleFollowUpToggle, handleDeleteFeedback }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-6">
    {feedback.length > 0 ? (
      <ul className="divide-y divide-gray-200">
        {feedback.map((item) => (
          <li key={item._id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="bg-[#242C54] text-white p-3 rounded-lg">
                  <FiUser />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Passenger name + status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[#242C54]">{item.name}</p>
                    <StatusBadge rating={item.rating} />
                  </div>

                  {/* 🔹 Station Badge + Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-[#242C54] rounded-full font-medium">
                      {item.station}
                    </span>
                    <span>• {formatDate(item.dateOfExperience || item.createdAt)}</span>
                  </div>

                  {/* Rating stars */}
                  {renderStars(item.rating)}

                  {/* Feedback details */}
                  <p className="mt-2 text-sm text-gray-700">{item.details}</p>
                  {item.flightNumber && (
                    <p className="text-xs text-gray-500 mt-1">Flight: {item.flightNumber}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleFollowUpToggle(item._id, item.followUp)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    item.followUp
                      ? "bg-[#E4141C] text-white hover:bg-[#C1121F]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  {item.followUp ? "Follow Up" : "Resolved"}
                </button>
                <button
                  onClick={() => handleDeleteFeedback(item._id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="p-8 text-center">
        <FiMessageSquare className="text-gray-400 text-3xl mx-auto mb-3" />
        <h3 className="text-md font-medium text-[#242C54]">No feedback found</h3>
        <p className="text-gray-500 text-sm">Try adjusting search or filters</p>
      </div>
    )}
  </div>
);

const Pagination = ({ currentPage, totalPages, totalFeedback, indexOfFirstFeedback, indexOfLastFeedback, paginate }) => (
  totalPages > 1 && (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-500">
        Showing {indexOfFirstFeedback + 1} to {Math.min(indexOfLastFeedback, totalFeedback)} of {totalFeedback} feedback
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#242C54] hover:bg-gray-100"}`}
        >
          <FiChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => paginate(num)}
            className={`w-10 h-10 rounded-lg ${currentPage === num ? "bg-[#E4141C] text-white" : "text-[#242C54] hover:bg-gray-100"}`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#242C54] hover:bg-gray-100"}`}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
);

export default SupFeedback;
