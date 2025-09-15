import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getComplaints,
  getComplaintStats,
  getFeedback,
  getFeedbacks,
  updateFeedback,
} from "../controllers/FeedbackController.js";

const router = express.Router();

// Feedback routes
router.post("/createFeedback", createFeedback);
router.get("/getFeedbacks", getFeedbacks);
router.get("/getSingleFeedback/:id", getFeedback);
router.put("/updateFeedback/:id", updateFeedback);
router.delete("/deleteFeedback/:id", deleteFeedback);

// Complaint routes
router.get("/getComplaints", getComplaints);
router.get("/getComplaintStats", getComplaintStats);

export default router;
