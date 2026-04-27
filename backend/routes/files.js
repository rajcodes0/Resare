import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/auth.js";
import { checkFileAccess } from "../middlewares/checkFileAccess.js";
import { downloadFile, deleteFile } from "../controllers/file-controller.js";
import { File } from "../models/File.js";

const router = express.Router();

// Get all public files (with search)
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    const query = { accessType: { $ne: "private" } };

    if (q) {
      // Search by partial filename, title, or creator username (case-insensitive)
      const users = await mongoose
        .model("User")
        .find({ username: { $regex: q, $options: "i" } })
        .select("_id");
      const userIds = users.map((u) => u._id);

      query.$or = [
        { "document.originalName": { $regex: q, $options: "i" } },
        { "document.title": { $regex: q, $options: "i" } },
        { creatorId: { $in: userIds } },
      ];
    }

    const files = await File.find(query)
      .populate("creatorId", "username")
      .sort({ createdAt: -1 });

    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch files" });
  }
});

// Get files by creator/user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await File.find({ creatorId: userId })
      .populate("creatorId", "username email")
      .sort({ createdAt: -1 });

    res.json({ success: true, files });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user files" });
  }
});

// Get current user's own files (protected route)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const files = await File.find({ creatorId: userId })
      .populate("creatorId", "username email")
      .sort({ createdAt: -1 });

    res.json({ success: true, files });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch your files" });
  }
});

// Download a file (with access check)
router.get("/:fileId/download", authMiddleware, checkFileAccess, downloadFile);

// Delete a file (protected route - owner only)
router.delete("/:fileId", authMiddleware, deleteFile);

export default router;
