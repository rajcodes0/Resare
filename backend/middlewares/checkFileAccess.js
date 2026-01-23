import mongoose from "mongoose";
import{ File} from "../models/File.js";
import Follow from "../models/Follow.js";
import ActionLog from "../models/ActionLog.js";

/**
 * checkFileAccess
 *
 * Enforces:
 * - public access
 * - follow requirement
 * - social action verification
 * - 30-day lock
 */
export const checkFileAccess = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { fileId } = req.params;

    // 1️⃣ Validate fileId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file id" });
    }

    // 2️⃣ Fetch file
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // 3️⃣ Public file → allow
    if (file.accessType === "public") {
      req.file = file;
      return next();
    }

    // 4️⃣ Private file → deny
    if (file.accessType === "private") {
      return res.status(403).json({
        message: "This file is private",
      });
    }

    // 5️⃣ follow_to_unlock → must be logged in
    if (!userId) {
      return res.status(401).json({
        message: "Login required to access this file",
      });
    }

    // 6️⃣ Check follow relationship
    const follow = await Follow.findOne({
      userId,
      creatorId: file.creatorId,
      isActive: true,
    });

    if (!follow) {
      return res.status(403).json({
        message: "Follow the creator to unlock this file",
      });
    }

    // 7️⃣ Verify required social action
    // (platform stored when follow was created)
    const requiredPlatform = follow.socialAction?.platform;

    if (!requiredPlatform) {
      return res.status(403).json({
        message: "Social action not completed",
      });
    }

    const actionDone = await ActionLog.findOne({
      userId,
      creatorId: file.creatorId,
      action: `visit_${requiredPlatform}`,
    });

    if (!actionDone) {
      return res.status(403).json({
        message: "Complete required social action to unlock this file",
      });
    }

    // 8️⃣ Check unlock time
    const now = new Date();

    if (now < follow.unlockAt) {
      return res.status(403).json({
        message: "File is locked",
        unlockAt: follow.unlockAt,
      });
    }

    // ✅ Access granted
    req.file = file;
    next();

  } catch (error) {
    return res.status(500).json({
      message: "Access check failed",
      error: error.message,
    });
  }
};
