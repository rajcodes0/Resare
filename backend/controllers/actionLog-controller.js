import ActionLog from "../models/ActionLog.js";
import mongoose from "mongoose";

export const logSocialAction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { creatorId } = req.params;
    const { action } = req.body;

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ message: "Invalid creator id" });
    }

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    // Try to create log (unique index prevents duplicates)
    await ActionLog.create({
      userId,
      creatorId,
      action,
    });

    return res.status(201).json({
      message: "Action recorded successfully",
    });
  } catch (error) {
    // Duplicate action → already done
    if (error.code === 11000) {
      return res.status(200).json({
        message: "Action already completed",
      });
    }

    return res.status(500).json({
      message: "Failed to record action",
      error: error.message,
    });
  }
};
