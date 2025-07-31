import React, { useState } from 'react';
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

const Feedback = () => {
  // State for feedback data
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      passenger: 'Ahmed Mohamed',
      station: 'JED',
      rating: 5,
      date: '2023-06-15',
      comments: 'Excellent service! The staff was very helpful and friendly.',
      status: 'positive',
      followUp: false
    },
    {
      id: 2,
      passenger: 'Youssef Ali',
      station: 'DXB',
      rating: 3,
      date: '2023-06-14',
      comments: 'Flight was delayed by 2 hours with no explanation.',
      status: 'negative',
      followUp: true
    },
    {
      id: 3,
      passenger: 'Fatima Hassan',
      station: 'KRT',
      rating: 4,
      date: '2023-06-14',
      comments: 'Good experience overall, but the food could be better.',
      status: 'positive',
      followUp: false
    },
    {
      id: 4,
      passenger: 'Mohammed Omar',
      station: 'RUH',
      rating: 1,
      date: '2023-06-13',
      comments: 'Lost my luggage and no one helped me resolve the issue.',
      status: 'negative',
      followUp: true
    },
    {
      id: 5,
      passenger: 'Aisha Abdullah',
      station: 'JED',
      rating: 5,
      date: '2023-06-12',
      comments: 'Best airline I\'ve flown with! Will definitely recommend.',
      status: 'positive',
      followUp: false
    }
  ]);

  // State for UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 5;

  // Filter feedback based on search and filter
  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.passenger.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.comments.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
  const StatusBadge = ({ status }) => {
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
          
          <div className="relative">
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
              <p className="text-xl font-bold text-[#242C54]">{feedback.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-red-500 text-white p-3 rounded-lg mr-4">
              <FiCheckCircle className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Positive</p>
              <p className="text-xl font-bold text-[#242C54]">
                {feedback.filter(f => f.status === 'positive').length}
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
                {feedback.filter(f => f.status === 'negative').length}
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
                {(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)}/5
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
              <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#242C54] text-white p-3 rounded-lg">
                      <FiUser />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="text-sm font-medium text-[#242C54]">
                          {item.passenger}
                        </p>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{item.station} • {item.date}</p>
                      {renderStars(item.rating)}
                      <p className="mt-2 text-sm text-gray-700">{item.comments}</p>
                    </div>
                  </div>
                  <div className="flex justify-end md:justify-start">
                    <button className={`px-3 py-1 rounded-lg text-sm font-medium ${item.followUp ? 'bg-[#E4141C] text-white hover:bg-[#C1121F]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                      {item.followUp ? 'Follow Up' : 'Resolved'}
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
      {filteredFeedback.length > feedbackPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstFeedback + 1} to {Math.min(indexOfLastFeedback, filteredFeedback.length)} of {filteredFeedback.length} feedback
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