import express from "express";
import { addPassenger, allPassenger,deletePassenger,editPassenger } from "../controllers/passengerController.js";
import { isLoggedIn } from "../utils/Auth.js";
const router = express.Router();

router.post("/add-passenger",isLoggedIn,addPassenger);
router.get("/all-passenger",isLoggedIn,allPassenger);
router.put("/edit-passenger/:id",editPassenger);
router.delete("/delete-passenger/:id",deletePassenger);

export default router;