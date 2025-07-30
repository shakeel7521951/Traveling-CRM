import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUsers, FiMapPin, FiTrendingUp, FiStar } from 'react-icons/fi'

export default function HomeStations() {
    const navigate = useNavigate()
    const stations = [
        { id: 1, stationName: "JED", passenger: 8, destination: "USA", rating: 4.5, flights: 12 },
        { id: 2, stationName: "RUH", passenger: 21, destination: "Chicago", rating: 4.2, flights: 18 },
        { id: 3, stationName: "DMM", passenger: 10, destination: "London", rating: 4.7, flights: 15 },
        { id: 4, stationName: "MED", passenger: 5, destination: "Italy", rating: 3.9, flights: 8 },
        { id: 5, stationName: "CAI", passenger: 20, destination: "Asia", rating: 4.8, flights: 22 },
    ]

    // Calculate summary statistics
    const totalPassengers = stations.reduce((sum, station) => sum + station.passenger, 0)
    const totalFlights = stations.reduce((sum, station) => sum + station.flights, 0)
    const avgRating = (stations.reduce((sum, station) => sum + station.rating, 0) / stations.length)
    const topStation = stations.reduce((max, station) => 
        station.passenger > max.passenger ? station : max, stations[0])

    const handleStationClick = (station) => {
        navigate(`/stationsdetail/${station.id}`, { state: station })
    }

    return (
        <div className='px-4 py-6 max-w-6xl mx-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-2xl font-bold text-[#242C54]'>Station Management Dashboard</h1>
                <div className='text-sm text-gray-500'>
                    {stations.length} International Stations
                </div>
            </div>

            {/* Summary Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                    <div className='flex items-center'>
                        <div className='p-2 bg-[#E4141C]/10 rounded-full mr-3'>
                            <FiUsers className='text-[#E4141C]' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-[#242C54]'>Total Passengers</p>
                            <p className='text-xl font-bold text-[#242C54]'>{totalPassengers}</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                    <div className='flex items-center'>
                        <div className='p-2 bg-[#242C54]/10 rounded-full mr-3'>
                            <FiMapPin className='text-[#242C54]' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-[#242C54]'>Total Flights</p>
                            <p className='text-xl font-bold text-[#242C54]'>{totalFlights}</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                    <div className='flex items-center'>
                        <div className='p-2 bg-[#E4141C]/10 rounded-full mr-3'>
                            <FiStar className='text-[#E4141C]' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-[#242C54]'>Avg. Rating</p>
                            <p className='text-xl font-bold text-[#242C54]'>{avgRating.toFixed(1)}/5</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
                    <div className='flex items-center'>
                        <div className='p-2 bg-[#242C54]/10 rounded-full mr-3'>
                            <FiTrendingUp className='text-[#242C54]' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-[#242C54]'>Top Station</p>
                            <p className='text-xl font-bold text-[#242C54]'>{topStation.stationName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stations Table */}
            <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-200'>
                <div className='p-4 border-b border-gray-200 bg-[#242C54]'>
                    <h2 className='text-lg font-semibold text-white'>Station Performance</h2>
                </div>
                <div className='overflow-x-auto'>
                    <table className="w-full text-sm">
                        <thead className="bg-[#242C54]/10 text-[#242C54] uppercase text-xs">
                            <tr>
                                <th className="py-3 px-4 sm:px-6 text-left">Station</th>
                                <th className="py-3 px-4 sm:px-6 text-left">Primary Destination</th>
                                <th className="py-3 px-4 sm:px-6 text-right">Passengers</th>
                                <th className="py-3 px-4 sm:px-6 text-right">Flights</th>
                                <th className="py-3 px-4 sm:px-6 text-right">Rating</th>
                                <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#242C54] divide-y divide-gray-200">
                            {stations.map((station) => (
                                <tr key={station.id} className="hover:bg-[#E4141C]/5 transition-colors">
                                    <td className="py-4 px-4 sm:px-6">
                                        <div className='font-medium'>{station.stationName}</div>
                                        <div className='text-xs text-gray-500'>ID: {station.id}</div>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6">
                                        <div className='font-medium'>{station.destination}</div>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-right">
                                        <span className='font-medium'>{station.passenger}</span>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-right">
                                        <span className='font-medium'>{station.flights}</span>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-right">
                                        <div className='inline-flex items-center'>
                                            <FiStar className='text-[#E4141C] mr-1' size={14} />
                                            <span>{station.rating}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 sm:px-6 text-right">
                                        <button 
                                            onClick={() => handleStationClick(station)}
                                            className="text-[#E4141C] hover:text-[#E4141C]/80 font-medium text-sm px-3 py-1 rounded-md hover:bg-[#E4141C]/10 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='text-xs text-gray-500 text-right'>
                Data refreshed: {new Date().toLocaleString()}
            </div>
        </div>
    )
}