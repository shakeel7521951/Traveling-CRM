import React, { useState } from "react";
import { useCreateFeedbackMutation } from "../redux/slices/FeedbackSlice";
import { toast } from "react-toastify";
import { FaStar, FaRegStar } from "react-icons/fa";

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
        source: "Web",
        dateOfExperience:
          formData.dateOfIncident || new Date().toISOString().split("T")[0],
      };

      if (activeTab === "complaint") {
        submissionData.feedbackType = formData.complaintType;
        submissionData.rating = 1;
        submissionData.priority = "Medium";
      } else {
        submissionData.feedbackType = formData.feedbackType;
        submissionData.rating = formData.rating;
      }

      await createFeedback(submissionData).unwrap();

      toast.success(
        `Thank you for your ${
          activeTab === "complaint" ? "complaint" : "feedback"
        }! We will address it shortly.`
      );

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
      toast.error(
        "There was an error submitting your feedback. Please try again."
      );
    }
  };

  const complaintTypes = [
    "Baggage",
    "Flight Delay",
    "Booking Issue",
    "Accessibility",
    "Customer Service",
    "Refund",
    "Other",
  ];

  const feedbackTypes = [
    "Service Quality",
    "Staff Feedback",
    "Facilities",
    "Booking Process",
    "Overall Experience",
    "Other",
  ];

  const stations = ["JED", "RUH", "DXB", "DMM", "Other"];

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
            📝 File a Complaint
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg ${
              activeTab === "feedback"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            ⭐ Share Feedback
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error.data?.message || "Failed to submit feedback"}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Station/Location *
                  </label>
                  <select
                    name="station"
                    value={formData.station}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a Station</option>
                    {stations.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Complaint-specific */}
            {activeTab === "complaint" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Complaint Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Type *
                    </label>
                    <select
                      name="complaintType"
                      value={formData.complaintType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an issue type</option>
                      {complaintTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Incident *
                    </label>
                    <input
                      type="date"
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

            {/* Feedback-specific */}
            {activeTab === "feedback" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Feedback Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback Category *
                    </label>
                    <select
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      {feedbackTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                          {star <= formData.rating ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-yellow-400" />
                          )}
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

            {/* Travel Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Travel Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flight Number (if applicable)
                  </label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="AA1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Reference
                  </label>
                  <input
                    type="text"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === "complaint"
                  ? "Complaint Details *"
                  : "Feedback Details *"}
              </label>
              <textarea
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

            {/* Submit */}
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    {activeTab === "complaint" ? "📤" : "⭐"} Submit{" "}
                    {activeTab === "complaint" ? "Complaint" : "Feedback"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Support */}
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
            <span className="flex items-center text-green-600 font-medium">
              <span className="text-xl mr-2">💬</span> Message us on WhatsApp
            </span>
            <span className="flex items-center text-blue-600 font-medium">
              <span className="text-xl mr-2">📧</span> Email us directly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelFeedbackPortal;
