import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function StationPassengers() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    // Sample passenger data - in real app this would come from API
    const allPassengers = Array.from({ length: 50 }, (_, i) => ({
        id: 1000 + i + 1,
        name: `Passenger ${i + 1}`,
        phone: `+2499${Math.floor(10000000 + Math.random() * 90000000)}`,
        destination: ['Jeddah', 'Dubai', 'Riyadh', 'Doha', 'Cairo'][Math.floor(Math.random() * 5)],
        date: `2023-06-${Math.floor(Math.random() * 15) + 1}`,
        feedback: ['Positive', 'Neutral', 'Negative', null][Math.floor(Math.random() * 4)]
    }));

    // State for search, filter and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [feedbackFilter, setFeedbackFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 20;

    // Filter passengers based on search and filter criteria
    const filteredPassengers = allPassengers.filter(passenger => {
        const matchesSearch =
            passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            passenger.id.toString().includes(searchTerm) ||
            passenger.phone.includes(searchTerm);

        const matchesFilter =
            feedbackFilter === 'All' ||
            (feedbackFilter === 'No Feedback' && passenger.feedback === null) ||
            passenger.feedback === feedbackFilter;

        return matchesSearch && matchesFilter;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPassengers.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredPassengers.slice(indexOfFirstRecord, indexOfLastRecord);

    // Reset to first page when filters change
    useEffect(() => {
        // setCurrentPage(1);
    }, [searchTerm, feedbackFilter]);

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#242C54]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-[#242C54]">
                    All Passengers - {state?.name || 'Station'}
                </h1>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, ID or phone..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-[#242C54]">Filter by Feedback:</label>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] sm:text-sm rounded-md"
                        value={feedbackFilter}
                        onChange={(e) => setFeedbackFilter(e.target.value)}
                    >
                        <option value="All">All Feedback</option>
                        <option value="Positive">Positive</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Negative">Negative</option>
                        <option value="No Feedback">No Feedback</option>
                    </select>
                </div>
            </div>

            {/* Passengers Table */}
            <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#242C54] text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-3 px-4">Passenger ID</th>
                                <th className="py-3 px-4">Full Name</th>
                                <th className="py-3 px-4">Contact</th>
                                <th className="py-3 px-4">Destination</th>
                                <th className="py-3 px-4">Flight Date</th>
                                <th className="py-3 px-4">Feedback</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y divide-gray-200">
                            {currentRecords.length > 0 ? (
                                currentRecords.map((passenger) => (
                                    <tr
                                        key={passenger.id}
                                        className="hover:bg-[#E4141C]/10 transition-colors"
                                    >
                                        <td className="py-3 px-4 font-medium text-[#242C54]">{passenger.id}</td>
                                        <td className="py-3 px-4">{passenger.name}</td>
                                        <td className="py-3 px-4">{passenger.phone}</td>
                                        <td className="py-3 px-4">{passenger.destination}</td>
                                        <td className="py-3 px-4">{passenger.date}</td>
                                        <td className="py-3 px-4">
                                            {passenger.feedback ? (
                                                <span className={`px-2 py-1 rounded-full text-xs ${passenger.feedback === 'Positive' ? 'bg-[#E4141C]/10 text-[#E4141C]' :
                                                    passenger.feedback === 'Neutral' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                                                        'bg-[#242C54]/10 text-[#242C54]'
                                                    }`}>
                                                    {passenger.feedback}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-4 text-center text-gray-500">
                                        No passengers found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredPassengers.length)} of {filteredPassengers.length} passengers
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#242C54] text-white hover:bg-[#1A2244]'}`}
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-[#E4141C] text-white' : 'bg-[#242C54] text-white hover:bg-[#1A2244]'}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className="px-2 py-1">...</span>
                    )}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-3 py-1 rounded-md bg-[#242C54] text-white hover:bg-[#1A2244]"
                        >
                            {totalPages}
                        </button>
                    )}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#242C54] text-white hover:bg-[#1A2244]'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}