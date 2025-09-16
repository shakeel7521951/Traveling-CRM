import express from "express";
import { createCompaign, deleteCompaign, getAllCompaigns, getCompaignById, stationCompaigns, updateCompaign } from "../controllers/CompaignController.js";
import { isLoggedIn } from "../utils/Auth.js";
const router = express.Router();

router.get('/stationCompaigns', isLoggedIn, stationCompaigns);

router.post("/createCompaign",isLoggedIn, createCompaign);
router.get("/getCompaigns", getAllCompaigns);
router.get("/getCompaign/:id", getCompaignById);
router.put("/updateCompaign/:id", updateCompaign);
router.delete("/deleteCompaign/:id", deleteCompaign);

export default router;