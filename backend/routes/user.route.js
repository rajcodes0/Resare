import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  searchProfiles,
  getUserProfile,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import forgotPassword from "../controllers/forgot-password.js";
import { resetPassword } from "../controllers/reset-password.controller.js";

const router = express.Router();

// PUBLIC
router.get("/search", searchProfiles);
router.get("/profile/:userId", getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

export default router;
