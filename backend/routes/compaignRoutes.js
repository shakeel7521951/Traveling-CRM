import express from "express";
import { createCompaign, deleteCompaign, getAllCompaigns, getCompaignById, updateCompaign } from "../controllers/CompaignController.js";
const router = express.Router();

router.post("/createCompaign", createCompaign);
router.get("/getCompaigns", getAllCompaigns);
router.get("/getCompaign/:id", getCompaignById);
router.put("/updateCompaign/:id", updateCompaign);
router.delete("/deleteCompaign/:id", deleteCompaign);

export default router;