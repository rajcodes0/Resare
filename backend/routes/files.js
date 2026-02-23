import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/auth.js";
import { checkFileAccess } from "../middlewares/checkFileAccess.js";
import { downloadFile } from "../controllers/file-controller.js";
import { File } from "../models/File.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    const query = { accessType: { $ne: "private" } };
    
    if (q) {
      // Search by partial filename or creator username (case-insensitive)
      const users = await mongoose.model("User").find({ username: { $regex: q, $options: "i" } }).select("_id");
      const userIds = users.map(u => u._id);
      
      query.$or = [
        { "document.originalName": { $regex: q, $options: "i" } },
        { creatorId: { $in: userIds } }
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

export default router;
