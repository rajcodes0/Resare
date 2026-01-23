import File from "../models/File.js";
import Follow from "../models/Follow.js";

/**
 * ACCESS MIDDLEWARE
 * Decides whether a user can access a file
 *
 * Rules:
 * 1. Public file → allow
 * 2. Private file → deny
 * 3. follow_to_unlock →
 *    - must follow creator
 *    - follow must be active
 *    - unlockAt must be passed
 */
export const checkFileAccess = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { fileId } = req.params;

    // 1️⃣ Fetch file
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // 2️⃣ Public file → allow
    if (file.accessType === "public") {
      req.file = file;
      return next();
    }

    // 3️⃣ Private file → deny
    if (file.accessType === "private") {
      return res.status(403).json({
        message: "This file is private",
      });
    }

    // 4️⃣ follow_to_unlock requires auth
    if (!userId) {
      return res.status(401).json({
        message: "Login required to access this file",
      });
    }

    // 5️⃣ Check follow relationship
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

    // 6️⃣ Check unlock time
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
