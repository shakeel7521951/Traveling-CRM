import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StationDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [showAllPassengers, setShowAllPassengers] = useState(false);

    // Sample data - in real app this would come from API
    const stationDetails = {
        id: state?.id || 1,
        name: state?.stationName || 'Khartoum Station',
        email: state?.email || 'khartoum@tarco.com',
        destination: state?.destination || 'Jeddah',
        totalPassengers: 142,
        monthlyPassengers: [45, 52, 48, 58, 62, 55, 60, 65, 58, 62, 68, 72], // Last 12 months
        flights: 18,
        rating: 4.7,
        feedbackCount: 98,
        positiveFeedback: 85,
        neutralFeedback: 10,
        negativeFeedback: 3,
        lastUpdated: '2023-06-15',
        staffCount: 8,
        popularDestinations: [
            { name: 'Jeddah', passengers: 65 },
            { name: 'Dubai', passengers: 42 },
            { name: 'Riyadh', passengers: 35 }
        ]
    };

    // Prepare chart data
    const monthlyData = stationDetails.monthlyPassengers.map((count, index) => ({
        name: new Date(2023, index).toLocaleString('default', { month: 'short' }),
        passengers: count
    }));

    const feedbackData = [
        { name: 'Positive', value: stationDetails.positiveFeedback, color: '#E4141C' },
        { name: 'Neutral', value: stationDetails.neutralFeedback, color: '#F59E0B' },
        { name: 'Negative', value: stationDetails.negativeFeedback, color: '#242C54' }
    ];

    const handleViewAll = () => {
        navigate('/station-passengers', { state: stationDetails });
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-[#242C54] mb-2">{stationDetails.name} Dashboard</h1>
            <p className="text-gray-600 mb-6">Detailed performance metrics and analytics</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#E4141C] hover:shadow-lg transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Total Passengers</h3>
                    <p className="text-2xl font-bold text-[#242C54]">{stationDetails.totalPassengers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Current year</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#242C54] hover:shadow-lg transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Completed Flights</h3>
                    <p className="text-2xl font-bold text-[#242C54]">{stationDetails.flights}</p>
                    <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#E4141C] hover:shadow-lg transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Feedback Received</h3>
                    <p className="text-2xl font-bold text-[#242C54]">{stationDetails.feedbackCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">{Math.round((stationDetails.feedbackCount / stationDetails.totalPassengers) * 100)}% response rate</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#242C54] hover:shadow-lg transition-shadow">
                    <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                    <p className="text-2xl font-bold text-[#242C54]">{stationDetails.rating.toFixed(1)}/5</p>
                    <p className="text-xs text-gray-500 mt-1">From {stationDetails.feedbackCount} reviews</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-[#242C54] mb-4">Monthly Passenger Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis dataKey="name" stroke="#242C54" />
                                <YAxis stroke="#242C54" />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: '#242C54',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#FFFFFF'
                                    }}
                                />
                                <Legend />
                                <Bar 
                                    dataKey="passengers" 
                                    fill="#E4141C" 
                                    name="Passengers"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-[#242C54] mb-4">Feedback Analysis</h3>
                    <div className="h-80 flex flex-col">
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={feedbackData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                    <XAxis dataKey="name" stroke="#242C54" />
                                    <YAxis stroke="#242C54" />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: '#242C54',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#FFFFFF'
                                        }}
                                    />
                                    <Bar dataKey="value" name="Feedback Count">
                                        {feedbackData.map((entry, index) => (
                                            <Bar 
                                                key={`bar-${index}`} 
                                                fill={entry.color} 
                                                radius={[4, 4, 0, 0]}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center space-x-4 mt-2">
                            {feedbackData.map((item) => (
                                <div key={item.name} className="flex items-center">
                                    <div 
                                        className="w-3 h-3 rounded-full mr-1" 
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-xs text-gray-600">{item.name}: {item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Station Details */}
            <div className="bg-white p-4 rounded-xl shadow-md mb-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-[#242C54] mb-4">Station Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-[#242C54] mb-2">Basic Details</h4>
                        <div className="space-y-2">
                            <p><span className="text-gray-500">Station ID:</span> <span className="font-medium text-[#242C54]">{stationDetails.id}</span></p>
                            <p><span className="text-gray-500">Contact Email:</span> <span className="font-medium text-[#242C54]">{stationDetails.email}</span></p>
                            <p><span className="text-gray-500">Staff Members:</span> <span className="font-medium text-[#242C54]">{stationDetails.staffCount}</span></p>
                            <p><span className="text-gray-500">Last Data Update:</span> <span className="font-medium text-[#242C54]">{stationDetails.lastUpdated}</span></p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-[#242C54] mb-2">Top Destinations</h4>
                        <div className="space-y-2">
                            {stationDetails.popularDestinations.map((dest, index) => (
                                <div key={index} className="flex justify-between hover:bg-gray-50 p-2 rounded transition-colors">
                                    <span className="text-gray-600">{dest.name}</span>
                                    <span className="font-medium text-[#242C54]">{dest.passengers} passengers</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Passengers Table */}
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#242C54]">Recent Passengers</h3>
                    <button 
                        onClick={handleViewAll}
                        className="px-3 py-1 bg-[#E4141C] text-white rounded-md text-sm hover:bg-[#C1121F] transition-colors"
                    >
                        View All
                    </button>
                </div>
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
                            {[
                                { id: 1001, name: 'Ahmed Mohammed', phone: '+249912345678', destination: 'Jeddah', date: '2023-06-14', feedback: 'Positive' },
                                { id: 1002, name: 'Samira Abdelrahman', phone: '+249987654321', destination: 'Dubai', date: '2023-06-14', feedback: 'Positive' },
                                { id: 1003, name: 'Youssef Ibrahim', phone: '+249911223344', destination: 'Riyadh', date: '2023-06-13', feedback: 'Neutral' },
                                { id: 1004, name: 'Fatima Ahmed', phone: '+249955667788', destination: 'Jeddah', date: '2023-06-12', feedback: 'Positive' },
                                { id: 1005, name: 'Omar Hassan', phone: '+249966778899', destination: 'Doha', date: '2023-06-11', feedback: null },
                            ].map((passenger) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}