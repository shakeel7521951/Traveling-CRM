import express from "express";
import {
  createAccount,
  login,
  myProfile,
  verifyAccount,
} from "../controllers/userController.js";
import { isLoggedIn } from "../utils/Auth.js";
const router = express.Router();

router.post("/signup", createAccount);
router.post("/verify-user", verifyAccount);
router.post("/login", login);
router.get("/my-profile",isLoggedIn,myProfile);

export default router;
