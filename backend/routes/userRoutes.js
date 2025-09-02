import express from "express";
import {
  createAccount,
  login,
  verifyAccount,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", createAccount);
router.post("/verify-user", verifyAccount);
router.post("/login", login);

export default router;
