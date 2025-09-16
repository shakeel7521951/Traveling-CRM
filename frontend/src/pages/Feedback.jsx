import React, { useState, useEffect } from 'react';
import {
  FiStar,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiCheckCircle,
  FiMessageSquare,
  FiUser
} from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetStationFeedbacksQuery
} from '../redux/slices/FeedbackSlice';

const Feedback = () => {
  // State for UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 5;

  // Fetch feedback data from API
  const {
    data: feedbackData,
    isLoading,
    error,
    refetch
  } = useGetStationFeedbacksQuery({
    page: currentPage,
    limit: feedbackPerPage,
    ...(searchTerm && { search: searchTerm }),
    ...(filter !== 'all' && { status: filter })
  });

  // Fetch stats
  const { data: statsData } = useGetAllFeedbackQuery();

  // Mutation hooks
  const [updateFeedback] = useUpdateFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  // Extract feedback and pagination info from API response
  const feedback = feedbackData?.data || [];
  const pagination = feedbackData?.pagination || {};
  const totalFeedback = pagination.totalItems || 0;
  const totalPages = pagination.totalPages || 1;

  // Filter feedback based on search and filter (client-side as fallback)
  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details?.toLowerCase().includes(searchTerm.toLowerCase());
    const ratingCategory = item.rating >= 4 ? 'positive' : 'negative';
    const matchesFilter = filter === 'all' || ratingCategory === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic (client-side as fallback)
  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle follow-up status toggle
  const handleFollowUpToggle = async (id, currentStatus) => {
    try {
      await updateFeedback({
        id,
        data: { followUp: !currentStatus }
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update feedback:', error);
    }
  };

  // Handle delete feedback
  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await deleteFeedback(id).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to delete feedback:', error);
      }
    }
  };

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          i < rating ?
            <FaStar key={i} className="text-yellow-400" /> :
            <FaRegStar key={i} className="text-yellow-400" />
        ))}
      </div>
    );
  };

  // Status badge component
  const StatusBadge = ({ rating }) => {
    const status = rating >= 4 ? 'positive' : 'negative';
    return status === 'positive' ? (
      <span className="bg-green-100 text-[#242C54] text-xs px-2 py-1 rounded-full flex items-center">
        <FiCheckCircle className="mr-1" /> Positive
      </span>
    ) : (
      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
        <FiAlertCircle className="mr-1" /> Needs Attention
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4141C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
            <FiAlertCircle className="text-2xl mx-auto mb-2" />
            <p>Error loading feedback: {error.data?.message || 'Please try again later'}</p>
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

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header and search/filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#242C54]">Passenger Feedback</h1>
          <p className="text-gray-500 text-sm">Review and manage passenger feedback</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search feedback..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-8"
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
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-[#242C54] text-white p-3 rounded-lg mr-4">
              <FiStar className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Feedback</p>
              <p className="text-xl font-bold text-[#242C54]">{totalFeedback}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
              <FiCheckCircle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Positive</p>
              <p className="text-xl font-bold text-[#242C54]">
                {statsData?.data?.feedbackByType?.find(t => t._id === 'Service Quality')?.count || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-[#242C54] text-white p-3 rounded-lg mr-4">
              <FiAlertCircle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Needs Attention</p>
              <p className="text-xl font-bold text-[#242C54]">
                {statsData?.data?.feedbackByType?.find(t => t._id === 'Other')?.count || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-[#E4141C] text-white p-3 rounded-lg mr-4">
              <FiMessageSquare className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Rating</p>
              <p className="text-xl font-bold text-[#242C54]">
                {statsData?.data?.averageRating ? statsData.data.averageRating.toFixed(1) : '0.0'}/5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-6">
        {currentFeedback.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {currentFeedback.map(item => (
              <li key={item._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#242C54] text-white p-3 rounded-lg">
                      <FiUser />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="text-sm font-medium text-[#242C54]">
                          {item.name}
                        </p>
                        <StatusBadge rating={item.rating} />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.station} • {formatDate(item.dateOfExperience || item.createdAt)}
                        {item.feedbackType && ` • ${item.feedbackType}`}
                      </p>
                      {renderStars(item.rating)}
                      <p className="mt-2 text-sm text-gray-700">{item.details}</p>
                      {item.flightNumber && (
                        <p className="text-xs text-gray-500 mt-1">Flight: {item.flightNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end md:justify-start gap-2">
                    <button
                      onClick={() => handleFollowUpToggle(item._id, item.followUp)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${item.followUp ? 'bg-[#E4141C] text-white hover:bg-[#C1121F]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
                    >
                      {item.followUp ? 'Follow Up' : 'Resolved'}
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
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FiMessageSquare className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-md font-medium text-[#242C54] mb-1">No feedback found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstFeedback + 1} to {Math.min(indexOfLastFeedback, totalFeedback)} of {totalFeedback} feedback
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#242C54] hover:bg-gray-100'} transition-colors`}
            >
              <FiChevronLeft className="text-lg" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-lg ${currentPage === number ? 'bg-[#E4141C] text-white' : 'text-[#242C54] hover:bg-gray-100'} transition-colors`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#242C54] hover:bg-gray-100'} transition-colors`}
            >
              <FiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;