import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getComplaints,
  getComplaintStats,
  getFeedback,
  getFeedbacks,
  getStationComplaintStats,
  getStationFeedbacks,
  stationComplaints,
  updateFeedback,
} from "../controllers/FeedbackController.js";
import { isLoggedIn } from "../utils/Auth.js";

const router = express.Router();

// Feedback routes
router.post("/createFeedback", createFeedback);
router.get("/getStationFeedbacks",isLoggedIn, getStationFeedbacks);
router.get("/getFeedbacks", getFeedbacks);
router.get("/getSingleFeedback/:id", getFeedback);
router.put("/updateFeedback/:id", updateFeedback);
router.delete("/deleteFeedback/:id", deleteFeedback);

// Complaint routes
router.get("/getComplaints", getComplaints);
router.get("/getComplaintStats", getComplaintStats);
router.get("/getStationComplaintStats", getStationComplaintStats);
router.get("/stationComplaints",isLoggedIn,stationComplaints);

export default router;
