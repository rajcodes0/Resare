import crypto from "crypto";
import User from "../models/User.js";

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate inputs
    if (!token) {
      return res.status(400).json({ success: false, message: "Reset token is required" });
    }
    if (!password || password.trim().length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Token" });
    }

    // Set the new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("RESET ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error", 
      error: error.message 
    });
  }
};
