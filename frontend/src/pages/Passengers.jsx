import React, { useEffect, useState } from "react";
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
  FiPlus,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddPassengerMutation,
  useUpdatePassengerMutation,
  useDeletePassengerMutation,
  useStationPassengersQuery,
} from "../redux/slices/PassengerSlice"; // adjust path if needed

const Passengers = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassenger, setCurrentPassenger] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ RTK Query hooks
  const { data, refetch, isLoading } = useStationPassengersQuery();
  const passengers = data?.allPassenger || [];
  const [addPassenger] = useAddPassengerMutation();
  const [updatePassenger] = useUpdatePassengerMutation();
  const [deletePassenger] = useDeletePassengerMutation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    flightDate: "",
  });

  // ✅ Handle new passenger from navigation state
  useEffect(() => {
    if (location.state) {
      addPassenger(location.state).then(() => refetch());
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate, location.pathname, addPassenger, refetch]);

  // ✅ Search filter
  const filteredPassengers = passengers.filter((passenger) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      passenger.name.toLowerCase().includes(searchLower) ||
      passenger.phone.includes(searchTerm) ||
      passenger.email.toLowerCase().includes(searchLower) ||
      (passenger.station &&
        passenger.station.toLowerCase().includes(searchLower))
    );
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPassengers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);

  // Form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit form (Add or Update passenger)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassenger) {
      await updatePassenger({ id: currentPassenger._id, ...formData });
    } else {
      await addPassenger(formData);
    }

    await refetch();

    setFormData({
      name: "",
      phone: "",
      email: "",
      flightDate: "",
      station: "JED",
    });
    setCurrentPassenger(null);
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  // ✅ Edit passenger
  const handleEdit = (passenger) => {
    setCurrentPassenger(passenger);
    setFormData({
      name: passenger.name,
      phone: passenger.phone,
      email: passenger.email,
      flightDate: passenger.flightDate,
      station: passenger.station || "JED",
    });
    setIsModalOpen(true);
  };

  // ✅ Delete passenger
  const handleDelete = async (id) => {
    await deletePassenger(id);
    await refetch();
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination controls
  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    pages.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 items-center flex-col gap-3">
        <h3 className="text-2xl whitespace-nowrap mb-3 font-semibold text-[#242C54]">
          Total Passengers
        </h3>
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
                name: "",
                phone: "",
                email: "",
                flightDate: "",
                station: "JED",
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentItems.length > 0 ? (
              currentItems.map((passenger) => (
                <tr
                  key={passenger._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#242C54] to-[#3A4375] rounded-full flex items-center justify-center text-white">
                        <FiUser className="text-sm" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-red-900">
                          {passenger.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {passenger._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <FiPhone className="mr-2 text-gray-400" />{" "}
                      {passenger.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <FiMail className="mr-2 text-gray-400" />
                      <span className="truncate max-w-[180px]">
                        {passenger.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-blue-50 mr-3">
                        <FiCalendar className="text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {passenger.flightDate}
                        </div>
                        <div className="text-xs text-gray-500">Departure</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {passenger.station || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3 justify-start">
                      <button
                        onClick={() => handleEdit(passenger)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(passenger._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
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
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredPassengers.length)}
            </span>{" "}
            of <span className="font-medium">{filteredPassengers.length}</span>{" "}
            passengers
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" ? goToPage(page) : null
                }
                className={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? "bg-[#242C54] text-white"
                    : typeof page === "number"
                    ? "text-gray-700 hover:bg-gray-200"
                    : "cursor-default"
                }`}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bg-black/70 z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentPassenger ? "Edit Passenger" : "Add New Passenger"}
                </h3>
                <form onSubmit={handleSubmit}>
                  {["name", "phone", "email", "flightDate"].map(
                    (field, idx) => (
                      <div className="mb-4" key={idx}>
                        <label
                          htmlFor={field}
                          className="block text-sm font-medium text-gray-700 capitalize"
                        >
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type={field === "flightDate" ? "date" : "text"}
                          name={field}
                          id={field}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#242C54] focus:border-[#242C54] sm:text-sm"
                          value={formData[field]}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    )
                  )}
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-[#242C54] to-[#3A4375] text-base font-medium text-white hover:from-[#3A4375] hover:to-[#242C54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242C54] sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {currentPassenger ? "Update" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setCurrentPassenger(null);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          flightDate: "",
                          station: "JED",
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
