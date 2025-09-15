import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;

    if (!feedbackData.source) feedbackData.source = "Web";

    const complaintTypes = [
      "Baggage",
      "Flight Delay",
      "Booking Issue",
      "Accessibility",
      "Customer Service",
      "Refund",
      "Other",
    ];

    // Default values if it's a complaint
    if (complaintTypes.includes(feedbackData.feedbackType)) {
      feedbackData.status = feedbackData.status || "Pending";
      feedbackData.priority = feedbackData.priority || "Medium";
      if (!feedbackData.rating) feedbackData.rating = 1;
    }

    const feedback = new Feedback(feedbackData);
    const saved = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all feedback with filtering options
export const getFeedbacks = async (req, res) => {
  try {
    const { page = 1, limit = 10, rating, station } = req.query;

    const feedbackTypes = [
      "Service Quality",
      "Staff Feedback",
      "Facilities",
      "Booking Process",
      "Overall Experience",
    ];

    const filter = { feedbackType: { $in: feedbackTypes } };
    if (rating) filter.rating = parseInt(rating);
    if (station) filter.station = new RegExp(station, "i");

    const feedbacks = await Feedback.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Feedback.countDocuments(filter);

    res.json({
      success: true,
      data: feedbacks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;

    const complaintTypes = [
      "Baggage",
      "Flight Delay",
      "Booking Issue",
      "Accessibility",
      "Customer Service",
      "Refund",
      "Other",
    ];

    const filter = { feedbackType: { $in: complaintTypes } };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const complaints = await Feedback.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Feedback.countDocuments(filter);

    res.json({
      success: true,
      data: complaints,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getComplaintStats = async (req, res) => {
  try {
    const complaintTypes = [
      "Baggage",
      "Flight Delay",
      "Booking Issue",
      "Accessibility",
      "Customer Service",
      "Refund",
      "Other",
    ];

    const totalComplaints = await Feedback.countDocuments({
      feedbackType: { $in: complaintTypes },
    });

    const byStatus = await Feedback.aggregate([
      { $match: { feedbackType: { $in: complaintTypes } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const byType = await Feedback.aggregate([
      { $match: { feedbackType: { $in: complaintTypes } } },
      { $group: { _id: "$feedbackType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const byPriority = await Feedback.aggregate([
      { $match: { feedbackType: { $in: complaintTypes } } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: { total: totalComplaints, byStatus, byType, byPriority },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update feedback/complaint
export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true,
        runValidators: true,
      }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating feedback",
      error: error.message,
    });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting feedback",
      error: error.message,
    });
  }
};

// Get single feedback by ID
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      error: error.message,
    });
  }
};