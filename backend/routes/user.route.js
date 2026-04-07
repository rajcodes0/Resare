import express from "express";
import User from "../models/User.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  searchProfiles,
  getUserProfile,
  updateUserProfile,
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

// PROTECTED
router.put("/profile", authMiddleware, updateUserProfile);

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    // Clear refresh token from DB
    const user = await User.findById(req.user._id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
});

export default router;
