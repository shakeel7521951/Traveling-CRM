import React, { useEffect, useState } from 'react';
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus
} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const Passengers = () => {
  const initialPassengers = [
    { id: 1, name: 'Ahmed Salman', phone: '+966501234001', email: 'ahmed.salman@example.com', flightDate: '2023-06-01', station: 'JED' },
    { id: 2, name: 'Fatima Yasin', phone: '+966501234002', email: 'fatima.yasin@example.com', flightDate: '2023-06-02', station: 'MED' },
    { id: 3, name: 'Hassan Ali', phone: '+966501234003', email: 'hassan.ali@example.com', flightDate: '2023-06-03', station: 'RUH' },
    { id: 4, name: 'Layla Ahmed', phone: '+966501234004', email: 'layla.ahmed@example.com', flightDate: '2023-06-04', station: 'JED' },
    { id: 5, name: 'Omar Kareem', phone: '+966501234005', email: 'omar.kareem@example.com', flightDate: '2023-06-05', station: 'MED' },
    { id: 6, name: 'Sara Hamza', phone: '+966501234006', email: 'sara.hamza@example.com', flightDate: '2023-06-06', station: 'RUH' },
    { id: 7, name: 'Yousef Nabil', phone: '+966501234007', email: 'yousef.nabil@example.com', flightDate: '2023-06-07', station: 'JED' },
    { id: 8, name: 'Noor Hassan', phone: '+966501234008', email: 'noor.hassan@example.com', flightDate: '2023-06-08', station: 'MED' },
    { id: 9, name: 'Ali Tarek', phone: '+966501234009', email: 'ali.tarek@example.com', flightDate: '2023-06-09', station: 'RUH' },
    { id: 10, name: 'Mona Abdullah', phone: '+966501234010', email: 'mona.abdullah@example.com', flightDate: '2023-06-10', station: 'JED' },
    { id: 11, name: 'Khalid Younis', phone: '+966501234011', email: 'khalid.younis@example.com', flightDate: '2023-06-11', station: 'MED' },
    { id: 12, name: 'Rania Fathi', phone: '+966501234012', email: 'rania.fathi@example.com', flightDate: '2023-06-12', station: 'RUH' },
    { id: 13, name: 'Ibrahim Sami', phone: '+966501234013', email: 'ibrahim.sami@example.com', flightDate: '2023-06-13', station: 'JED' },
    { id: 14, name: 'Salma Bilal', phone: '+966501234014', email: 'salma.bilal@example.com', flightDate: '2023-06-14', station: 'MED' },
    { id: 15, name: 'Zainab Omar', phone: '+966501234015', email: 'zainab.omar@example.com', flightDate: '2023-06-15', station: 'RUH' },
    { id: 16, name: 'Mustafa Zaki', phone: '+966501234016', email: 'mustafa.zaki@example.com', flightDate: '2023-06-16', station: 'JED' },
    { id: 17, name: 'Dina Adel', phone: '+966501234017', email: 'dina.adel@example.com', flightDate: '2023-06-17', station: 'MED' },
    { id: 18, name: 'Tariq Latif', phone: '+966501234018', email: 'tariq.latif@example.com', flightDate: '2023-06-18', station: 'RUH' },
    { id: 19, name: 'Nadia Sherif', phone: '+966501234019', email: 'nadia.sherif@example.com', flightDate: '2023-06-19', station: 'JED' },
    { id: 20, name: 'Mahmoud Essam', phone: '+966501234020', email: 'mahmoud.essam@example.com', flightDate: '2023-06-20', station: 'MED' },
    { id: 21, name: 'Amina Jamal', phone: '+966501234021', email: 'amina.jamal@example.com', flightDate: '2023-06-21', station: 'RUH' },
    { id: 22, name: 'Bilal Hani', phone: '+966501234022', email: 'bilal.hani@example.com', flightDate: '2023-06-22', station: 'JED' },
    { id: 23, name: 'Reem Tamer', phone: '+966501234023', email: 'reem.tamer@example.com', flightDate: '2023-06-23', station: 'MED' },
    { id: 24, name: 'Nabil Farouk', phone: '+966501234024', email: 'nabil.farouk@example.com', flightDate: '2023-06-24', station: 'RUH' },
    { id: 25, name: 'Samar Ghali', phone: '+966501234025', email: 'samar.ghali@example.com', flightDate: '2023-06-25', station: 'JED' },
    { id: 26, name: 'Rami Waleed', phone: '+966501234026', email: 'rami.waleed@example.com', flightDate: '2023-06-26', station: 'MED' },
    { id: 27, name: 'Huda Nasser', phone: '+966501234027', email: 'huda.nasser@example.com', flightDate: '2023-06-27', station: 'RUH' },
    { id: 28, name: 'Ziad Hossam', phone: '+966501234028', email: 'ziad.hossam@example.com', flightDate: '2023-06-28', station: 'JED' },
    { id: 29, name: 'Ahlam Reda', phone: '+966501234029', email: 'ahlam.reda@example.com', flightDate: '2023-06-29', station: 'MED' },
    { id: 30, name: 'Wael Bassem', phone: '+966501234030', email: 'wael.bassem@example.com', flightDate: '2023-06-30', station: 'RUH' },
    { id: 31, name: 'Nisreen Salah', phone: '+966501234031', email: 'nisreen.salah@example.com', flightDate: '2023-07-01', station: 'JED' },
    { id: 32, name: 'Kareem Mounir', phone: '+966501234032', email: 'kareem.mounir@example.com', flightDate: '2023-07-02', station: 'MED' },
    { id: 33, name: 'Rasha Taha', phone: '+966501234033', email: 'rasha.taha@example.com', flightDate: '2023-07-03', station: 'RUH' },
    { id: 34, name: 'Tamer Fouad', phone: '+966501234034', email: 'tamer.fouad@example.com', flightDate: '2023-07-04', station: 'JED' },
    { id: 35, name: 'Hana Mostafa', phone: '+966501234035', email: 'hana.mostafa@example.com', flightDate: '2023-07-05', station: 'MED' },
    { id: 36, name: 'Samir Adnan', phone: '+966501234036', email: 'samir.adnan@example.com', flightDate: '2023-07-06', station: 'RUH' },
    { id: 37, name: 'Walaa Samy', phone: '+966501234037', email: 'walaa.samy@example.com', flightDate: '2023-07-07', station: 'JED' },
    { id: 38, name: 'Ayman Fadel', phone: '+966501234038', email: 'ayman.fadel@example.com', flightDate: '2023-07-08', station: 'MED' },
    { id: 39, name: 'Hala Zain', phone: '+966501234039', email: 'hala.zain@example.com', flightDate: '2023-07-09', station: 'RUH' },
    { id: 40, name: 'Fady Nour', phone: '+966501234040', email: 'fady.nour@example.com', flightDate: '2023-07-10', station: 'JED' },
    { id: 41, name: 'Nada Saad', phone: '+966501234041', email: 'nada.saad@example.com', flightDate: '2023-07-11', station: 'MED' },
    { id: 42, name: 'Adel Mustafa', phone: '+966501234042', email: 'adel.mustafa@example.com', flightDate: '2023-07-12', station: 'RUH' },
    { id: 43, name: 'Lina Rauf', phone: '+966501234043', email: 'lina.rauf@example.com', flightDate: '2023-07-13', station: 'JED' },
    { id: 44, name: 'Nader Fouzi', phone: '+966501234044', email: 'nader.fouzi@example.com', flightDate: '2023-07-14', station: 'MED' },
    { id: 45, name: 'Jana Riyad', phone: '+966501234045', email: 'jana.riyad@example.com', flightDate: '2023-07-15', station: 'RUH' },
    { id: 46, name: 'Ola Fathi', phone: '+966501234046', email: 'ola.fathi@example.com', flightDate: '2023-07-16', station: 'JED' },
    { id: 47, name: 'Malik Sherif', phone: '+966501234047', email: 'malik.sherif@example.com', flightDate: '2023-07-17', station: 'MED' },
    { id: 48, name: 'Areej Jamal', phone: '+966501234048', email: 'areej.jamal@example.com', flightDate: '2023-07-18', station: 'RUH' },
    { id: 49, name: 'Hatem Emad', phone: '+966501234049', email: 'hatem.emad@example.com', flightDate: '2023-07-19', station: 'JED' },
    { id: 50, name: 'Yara Hamid', phone: '+966501234050', email: 'yara.hamid@example.com', flightDate: '2023-07-20', station: 'MED' },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassenger, setCurrentPassenger] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setPassengers(prevPassengers => {
        const exists = prevPassengers.some(p => 
          p.name === location.state.name && 
          p.phone === location.state.phone
        );
        
        if (!exists) {
          const newPassenger = {
            ...location.state,
            id: prevPassengers.length + 1,
            station: location.state.destination || 'JED'
          };
          return [...prevPassengers, newPassenger];
        }
        return prevPassengers;
      });
      
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate, location.pathname]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    flightDate: '',
    station: 'JED'
  });

  const filteredPassengers = passengers.filter(passenger => {
    const searchLower = searchTerm.toLowerCase();
    return (
      passenger.name.toLowerCase().includes(searchLower) ||
      passenger.phone.includes(searchTerm) ||
      passenger.email.toLowerCase().includes(searchLower) ||
      (passenger.station && passenger.station.toLowerCase().includes(searchLower))
    );
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPassengers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);

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
      setPassengers(passengers.map(p =>
        p.id === currentPassenger.id ? { ...formData, id: currentPassenger.id } : p
      ));
    } else {
      const newPassenger = {
        ...formData,
        id: passengers.length + 1
      };
      setPassengers([...passengers, newPassenger]);
    }

    setFormData({
      name: '',
      phone: '',
      email: '',
      flightDate: '',
      station: 'JED'
    });
    setCurrentPassenger(null);
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  const handleEdit = (passenger) => {
    setCurrentPassenger(passenger);
    setFormData({
      name: passenger.name,
      phone: passenger.phone,
      email: passenger.email,
      flightDate: passenger.flightDate,
      station: passenger.station || 'JED'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPassengers(passengers.filter(p => p.id !== id));
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination controls
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(1);
    
    // Show current page and surrounding pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're near the start
    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    }
    
    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }
    
    // Add ellipsis if needed after first page
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed before last page
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 items-center flex-col gap-3">
        <h3 className="text-2xl whitespace-nowrap mb-3 font-semibold text-[#242C54]">Total Passengers</h3>
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#242C54] focus:border-[#242C54] sm:text-sm"
              placeholder="Search by name, phone, email, or station..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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
                station: 'JED'
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
            {currentItems.length > 0 ? (
              currentItems.map((passenger) => (
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
                    <div className="text-sm text-gray-900">{passenger.station || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3 justify-start">
                      <button onClick={() => handleEdit(passenger)} className="text-gray-400 hover:text-blue-500 transition-colors">
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(passenger.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No passengers found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Pagination */}
      {filteredPassengers.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex flex-col gap-4 sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastItem, filteredPassengers.length)}</span> of{' '}
            <span className="font-medium">{filteredPassengers.length}</span> passengers
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? goToPage(page) : null}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage 
                    ? 'bg-[#242C54] text-white' 
                    : typeof page === 'number' 
                      ? 'text-gray-700 hover:bg-gray-200' 
                      : 'cursor-default'
                }`}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed bg-black/70 z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentPassenger ? 'Edit Passenger' : 'Add New Passenger'}
                </h3>
                <form onSubmit={handleSubmit}>
                  {['name', 'phone', 'email', 'flightDate'].map((field, idx) => (
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
                  <div className="mb-4">
                    <label htmlFor="station" className="block text-sm font-medium text-gray-700">Station</label>
                    <select
                      name="station"
                      id="station"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#242C54] focus:border-[#242C54] sm:text-sm"
                      value={formData.station}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="JED">Jeddah (JED)</option>
                      <option value="MED">Medina (MED)</option>
                      <option value="RUH">Riyadh (RUH)</option>
                    </select>
                  </div>
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
                          station: 'JED'
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