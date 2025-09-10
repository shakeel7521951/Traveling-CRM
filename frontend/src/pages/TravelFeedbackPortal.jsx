import React, { useState } from "react";
import { useCreateFeedbackMutation } from "../redux/slices/FeedbackSlice";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const TravelFeedbackPortal = () => {
  const [createFeedback, { isLoading, error }] = useCreateFeedbackMutation();
  const [activeTab, setActiveTab] = useState("complaint");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    station: "",
    complaintType: "",
    feedbackType: "",
    details: "",
    flightNumber: "",
    bookingReference: "",
    dateOfIncident: "",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        station: formData.station,
        details: formData.details,
        flightNumber: formData.flightNumber,
        bookingReference: formData.bookingReference,
        source: "Email",
      };

      if (activeTab === "complaint") {
        submissionData.feedbackType = formData.complaintType;
        submissionData.dateOfExperience = formData.dateOfIncident;
        submissionData.rating = 1;
      } else {
        submissionData.feedbackType = formData.feedbackType;
        submissionData.rating = formData.rating;
        submissionData.dateOfExperience = new Date()
          .toISOString()
          .split("T")[0];
      }

      // Call the API
      const result = await createFeedback(submissionData).unwrap();

      toast(
        `Thank you for your ${
          activeTab === "complaint" ? "complaint" : "feedback"
        }! We will address it shortly.`
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        station: "",
        complaintType: "",
        feedbackType: "",
        details: "",
        flightNumber: "",
        bookingReference: "",
        dateOfIncident: "",
        rating: 5,
      });
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      toast("There was an error submitting your feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
            Travel Agency Feedback Portal
          </h1>
          <p className="text-gray-600">
            We value your experience. Share your feedback or report an issue
            with us.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium text-lg ${
              activeTab === "complaint"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("complaint")}
          >
            <i className="fas fa-exclamation-circle mr-2"></i>File a Complaint
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg ${
              activeTab === "feedback"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            <i className="fas fa-star mr-2"></i>Share Feedback
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error.data?.message || "Failed to submit feedback"}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8 fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="station"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Station/Location *
                  </label>
                  <input
                    type="text"
                    id="station"
                    name="station"
                    value={formData.station}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="New York JFK Airport"
                  />
                </div>
              </div>
            </div>

            {/* Complaint-specific fields */}
            {activeTab === "complaint" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Complaint Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="complaintType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Issue Type *
                    </label>
                    <select
                      id="complaintType"
                      name="complaintType"
                      value={formData.complaintType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an issue type</option>
                      <option value="Baggage">Baggage Issue</option>
                      <option value="Flight Delay">Flight Delay</option>
                      <option value="Booking Issue">Booking Issue</option>
                      <option value="Accessibility">Accessibility</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Refund">Refund Problem</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfIncident"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Incident *
                    </label>
                    <input
                      type="date"
                      id="dateOfIncident"
                      name="dateOfIncident"
                      value={formData.dateOfIncident}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Feedback-specific fields */}
            {activeTab === "feedback" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Feedback Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="feedbackType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Feedback Category *
                    </label>
                    <select
                      id="feedbackType"
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      <option value="Service Quality">Service Quality</option>
                      <option value="Staff Feedback">Staff Feedback</option>
                      <option value="Facilities">Facilities</option>
                      <option value="Booking Process">Booking Process</option>
                      <option value="Overall Experience">
                        Overall Experience
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Rating *
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, rating: star })
                          }
                          className="text-2xl mr-1 focus:outline-none"
                        >
                          <FaStar
                            className={
                              star <= formData.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-gray-600">
                        {formData.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Flight/Booking Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Travel Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="flightNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Flight Number (if applicable)
                  </label>
                  <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="AA1234"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bookingReference"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Booking Reference
                  </label>
                  <input
                    type="text"
                    id="bookingReference"
                    name="bookingReference"
                    value={formData.bookingReference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="XYZ789"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {activeTab === "complaint"
                  ? "Complaint Details *"
                  : "Feedback Details *"}
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={
                  activeTab === "complaint"
                    ? "Please describe your issue in detail..."
                    : "Please share your experience with us..."
                }
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i
                      className={`fas ${
                        activeTab === "complaint" ? "fa-paper-plane" : "fa-star"
                      } mr-2`}
                    ></i>
                    Submit{" "}
                    {activeTab === "complaint" ? "Complaint" : "Feedback"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Support Information */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Need immediate assistance?
          </h3>
          <p className="text-gray-600 mb-4">
            Call our customer support team at{" "}
            <span className="text-blue-600 font-medium">1-800-TRAVEL-HELP</span>{" "}
            or email us at{" "}
            <span className="text-blue-600 font-medium">
              support@travelagency.com
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="flex items-center text-green-600 font-medium"
            >
              <i className="fab fa-whatsapp text-xl mr-2"></i> Message us on
              WhatsApp
            </a>
            <a href="#" className="flex items-center text-blue-600 font-medium">
              <i className="fas fa-envelope text-xl mr-2"></i> Email us directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelFeedbackPortal;
