import React from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiChevronRight } from 'react-icons/fi';

const Passengers = () => {
  // Sample data
  const passengers = [
    { id: 1, name: 'Ahmed Mohamed', phone: '+966501234567', email: 'ahmed@example.com', flightDate: '2023-06-15', station: 'JED' },
    { id: 2, name: 'Youssef Ali', phone: '+971501234567', email: 'youssef@example.com', flightDate: '2023-06-14', station: 'DXB' },
    { id: 3, name: 'Fatima Hassan', phone: '+249901234567', email: 'fatima@example.com', flightDate: '2023-06-14', station: 'KRT' },
    { id: 4, name: 'Mohammed Omar', phone: '+966501234567', email: 'mohammed@example.com', flightDate: '2023-06-13', station: 'RUH' },
    { id: 5, name: 'Aisha Abdullah', phone: '+966501234567', email: 'aisha@example.com', flightDate: '2023-06-12', station: 'JED' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-[#242C54]">Recent Passengers</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                Flight Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                Station
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">
                {/* Empty header for action column */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {passengers.map((passenger) => (
              <tr 
                key={passenger.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#242C54] to-[#3A4375] rounded-full flex items-center justify-center text-white">
                      <FiUser className="text-sm" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{passenger.name}</div>
                      <div className="text-xs text-gray-500">ID: {passenger.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 flex items-center">
                    <FiPhone className="mr-2 text-gray-400" /> {passenger.phone}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <FiMail className="mr-2 text-gray-400" /> 
                    <span className="truncate max-w-[180px]">{passenger.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-50 mr-3">
                      <FiCalendar className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{passenger.flightDate}</div>
                      <div className="text-xs text-gray-500">Departure</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-[#E4141C] to-[#FF6B6B] text-white">
                    {passenger.station}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-[#242C54] transition-colors">
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-right">
        <button className="text-sm font-medium text-[#242C54] hover:text-[#3A4375]">
          View All Passengers →
        </button>
      </div>
    </div>
  );
};

export default Passengers;