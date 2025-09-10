import Feedback from "../models/Feedback.js";

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    if (!feedbackData.source) {
      feedbackData.source = "Email";
    }

    const feedback = new Feedback(feedbackData);
    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: savedFeedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      error: error.message,
    });
  }
};

// Get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10, rating, station, feedbackType } = req.query;

    const filter = {};
    if (rating) filter.rating = parseInt(rating);
    if (station) filter.station = new RegExp(station, "i");
    if (feedbackType) filter.feedbackType = feedbackType;

    const feedbacks = await Feedback.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Feedback.countDocuments(filter);

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
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

// Update feedback
export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

// Get feedback statistics
export const getFeedbackStats = async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const averageRating = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    const ratingDistribution = await Feedback.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const feedbackByType = await Feedback.aggregate([
      { $group: { _id: "$feedbackType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        averageRating: averageRating[0]?.avgRating || 0,
        ratingDistribution,
        feedbackByType,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching feedback statistics",
      error: error.message,
    });
  }
};
