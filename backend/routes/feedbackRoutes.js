import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackStats
} from "../controllers/FeedbackController.js";

const router = express.Router();
router.post("/createFeedback", createFeedback);
router.get("/getAllFeedback", getAllFeedback);
router.get("/stats", getFeedbackStats);
router.get("/getSingleFeedback", getFeedback);
router.put("/updateFeedback/:id", updateFeedback);
router.delete("/deleteFeedback/:id", deleteFeedback);

export default router;