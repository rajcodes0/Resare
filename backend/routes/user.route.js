import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken
} from "../controllers/user.controllers.js";
import forgotPassword from "../controllers/forgot-password.js";
import { resetPassword } from "../controllers/reset-password.controller.js";

const router = express.Router();

// PUBLIC
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshAccessToken);

export default router;
