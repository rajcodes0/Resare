import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { checkFileAccess } from "../middlewares/checkFileAccess.js";
import { downloadFile } from "../controllers/file-controller.js";
import { File } from "../models/File.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    const query = { accessType: { $ne: "private" } };
    
    if (q) {
      // Search by partial filename (case-insensitive)
      query.$or = [
        { "document.originalName": { $regex: q, $options: "i" } },
        // Also could search by tags if they existed in the model
      ];
    }

    const files = await File.find(query)
      .populate("creatorId", "username")
      .sort({ createdAt: -1 });
      
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
});

export default router;
