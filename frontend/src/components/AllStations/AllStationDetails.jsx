import React from 'react'
import { useLocation } from 'react-router-dom';

export default function AllStationDetails() {
    const passengerList = [
        { id: 1, stationName: 'Station A', passenger: 12, email: 'a@example.com', destination: 'City X' },
        { id: 2, stationName: 'Station B', passenger: 8, email: 'b@example.com', destination: 'City Y' },
        { id: 3, stationName: 'Station C', passenger: 15, email: 'c@example.com', destination: 'City Z' },
        { id: 4, stationName: 'Station D', passenger: 10, email: 'd@example.com', destination: 'City W' },
        { id: 5, stationName: 'Station E', passenger: 6, email: 'e@example.com', destination: 'City V' },
        { id: 6, stationName: 'Station F', passenger: 18, email: 'f@example.com', destination: 'City U' },
        { id: 7, stationName: 'Station G', passenger: 20, email: 'g@example.com', destination: 'City T' },
        { id: 8, stationName: 'Station H', passenger: 11, email: 'h@example.com', destination: 'City S' },
        { id: 9, stationName: 'Station I', passenger: 9, email: 'i@example.com', destination: 'City R' },
        { id: 10, stationName: 'Station J', passenger: 13, email: 'j@example.com', destination: 'City Q' },
    ];

    const totalPassenger = passengerList.reduce((sum, p) => sum + p.passenger, 0);

    const location=useLocation();
    const{state}=location
    return (
        <div className="p-4">
            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Passengers</h3>
                    <p className="text-2xl font-bold text-blue-700">{totalPassenger}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Station Name</h3>
                    <p className="text-xl font-medium text-green-700">{state.stationName}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Top Destination</h3>
                    <p className="text-xl font-medium text-purple-700">{passengerList[0].destination}</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="py-3 px-4 border border-gray-300">No</th>
                            <th className="py-3 px-4 border border-gray-300">Station</th>
                            <th className="py-3 px-4 border border-gray-300">Total Passenger</th>
                            <th className="py-3 px-4 border border-gray-300">Email</th>
                            <th className="py-3 px-4 border border-gray-300">Destination</th>
                            <th className="py-3 px-4 border border-gray-300">Flight NO</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {
                            passengerList.map((item, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <td className="py-2 px-4 border border-gray-200 font-medium">{item.id}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.stationName}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.passenger}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.email}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.destination}</td>
                                    <td className="py-2 px-4 border border-gray-200">A220</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
