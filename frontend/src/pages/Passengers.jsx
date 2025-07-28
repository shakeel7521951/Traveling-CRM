import React, { useState } from 'react';
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiChevronRight,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus
} from 'react-icons/fi';

const Passengers = () => {
  const initialPassengers = [
    { id: 1, name: 'Ahmed Mohamed', phone: '+966501234567', email: 'ahmed@example.com', flightDate: '2023-06-15', station: 'JED' },
    { id: 2, name: 'Youssef Ali', phone: '+971501234567', email: 'youssef@example.com', flightDate: '2023-06-14', station: 'DXB' },
    { id: 3, name: 'Fatima Hassan', phone: '+249901234567', email: 'fatima@example.com', flightDate: '2023-06-14', station: 'KRT' },
    { id: 4, name: 'Mohammed Omar', phone: '+966501234567', email: 'mohammed@example.com', flightDate: '2023-06-13', station: 'RUH' },
    { id: 5, name: 'Aisha Abdullah', phone: '+966501234567', email: 'aisha@example.com', flightDate: '2023-06-12', station: 'JED' },
  ];

  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassenger, setCurrentPassenger] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    flightDate: '',
    station: ''
  });

  const filteredPassengers = passengers.filter(passenger =>
    passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.phone.includes(searchTerm) ||
    passenger.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.station.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassenger) {
      // Edit existing
      setPassengers(passengers.map(p =>
        p.id === currentPassenger.id ? { ...formData, id: currentPassenger.id } : p
      ));
    } else {
      // Add new
      const newPassenger = {
        ...formData,
        id: passengers.length + 1
      };
      setPassengers([...passengers, newPassenger]);
    }

    // Reset state
    setFormData({
      name: '',
      phone: '',
      email: '',
      flightDate: '',
      station: ''
    });
    setCurrentPassenger(null);
    setIsModalOpen(false);
  };

  const handleEdit = (passenger) => {
    setCurrentPassenger(passenger);
    setFormData({
      name: passenger.name,
      phone: passenger.phone,
      email: passenger.email,
      flightDate: passenger.flightDate,
      station: passenger.station
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPassengers(passengers.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#242C54]">Recent Passengers</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#242C54] focus:border-[#242C54] sm:text-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentPassenger(null);
              setFormData({
                name: '',
                phone: '',
                email: '',
                flightDate: '',
                station: ''
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#242C54] to-[#3A4375] hover:from-[#3A4375] hover:to-[#242C54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242C54]"
          >
            <FiPlus className="mr-2" />
            Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">Flight Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">Station</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#242C54] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredPassengers.map((passenger) => (
              <tr key={passenger.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#242C54] to-[#3A4375] rounded-full flex items-center justify-center text-white">
                      <FiUser className="text-sm" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-red-900">{passenger.name}</div>
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
                  <div className="flex space-x-3 justify-start">
                    <button onClick={() => handleEdit(passenger)} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(passenger.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                    {/* <button className="text-gray-400 hover:text-[#242C54] transition-colors">
                      <FiChevronRight className="h-5 w-5" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View all */}
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-right">
        <button className="text-sm font-medium text-[#242C54] hover:text-[#3A4375]">
          View All Passengers →
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentPassenger ? 'Edit Passenger' : 'Add New Passenger'}
                </h3>
                <form onSubmit={handleSubmit}>
                  {['name', 'phone', 'email', 'flightDate', 'station'].map((field, idx) => (
                    <div className="mb-4" key={idx}>
                      <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                      <input
                        type={field === 'flightDate' ? 'date' : 'text'}
                        name={field}
                        id={field}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#242C54] focus:border-[#242C54] sm:text-sm"
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))}
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-[#242C54] to-[#3A4375] text-base font-medium text-white hover:from-[#3A4375] hover:to-[#242C54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242C54] sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {currentPassenger ? 'Update' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setCurrentPassenger(null);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          flightDate: '',
                          station: ''
                        });
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242C54] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passengers;
